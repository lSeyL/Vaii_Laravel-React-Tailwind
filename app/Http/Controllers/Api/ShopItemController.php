<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShopItem;
use App\Models\Category;
use App\Models\ShopItemImage;
use Illuminate\Http\Request;
use App\Http\Resources\ShopItemResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ShopItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shopItems = ShopItem::with('category','fileTypes', 'additionalImages')->withCount('purchasedByUsers')->paginate(9);
    
        return ShopItemResource::collection($shopItems);
    }

    public function search(Request $request)
    {
        $perPage = $request->input('per_page', 9);
        \Log::info('Search function triggered', ['query' => $request->all()]);
        $query = ShopItem::with('category', 'fileTypes')->withCount('purchasedByUsers');

        if ($request->has('name')) {
            $name = $request->input('name');
            $query->where('name', 'LIKE', "%{$name}%");
        }

        if ($request->has('category')) {
            $category = $request->input('category');
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', 'LIKE', "%{$category}%");
            });
        }

        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->input('min_price'), $request->input('max_price')]);
        }
        $shopItems = $query->paginate($perPage);
        return ShopItemResource::collection($shopItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Log::info("🛒 Creating new shop item", ['data' => $request->all()]);
    
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:shop_items,name',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'file' => [
                        'required',
                        'file',
                        function ($attribute, $value, $fail) {
                            $allowedExtensions = ['obj', 'fbx', 'glb', 'gltf'];
                            $extension = strtolower($value->getClientOriginalExtension()); 

                            if (!in_array($extension, $allowedExtensions)) {
                                $fail("The $attribute must be a file of type: " . implode(", ", $allowedExtensions));
                            }
                        },
                        'max:20480',
                    ],
            'image' => 'required|file|mimes:jpg,png,jpeg,gif,webp|max:2048',
            'file_type_ids' => 'required|array',
            'file_type_ids.*' => 'exists:file_types,id',
            'additional_images' => 'nullable|array',
            'additional_images.*' => 'file|mimes:jpg,png,jpeg,gif,webp|max:2048',
        ]);
        \Log::info("Uploaded file type: " . $request->file('file')->getMimeType());
        \Log::info("Uploaded file extension: " . $request->file('file')->getClientOriginalExtension());
        if ($validator->fails()) {
            \Log::error("❌ Validation Failed:", $validator->errors()->toArray());
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }


        $category = Category::find($request->category_id);
        $categoryName = strtolower(str_replace(" ", "-", $category->name));

        $filePath = null;
        if ($request->hasFile('file')) {
            $originalExtension = $request->file('file')->getClientOriginalExtension(); 
            $originalFilename = pathinfo($request->file('file')->getClientOriginalName(), PATHINFO_FILENAME);


            $filePath = $request->file('file')->storeAs("files/{$categoryName}", "{$originalFilename}.{$originalExtension}", 'public');
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store("images/{$categoryName}", 'public');
        }
        $shopItem = ShopItem::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'file_path' => $filePath,
            'image_file_path' => $imagePath,

        ]);

        if ($request->hasFile('additional_images')) {
            foreach ($request->file('additional_images') as $imageFile) {
                $imagePath = $imageFile->store("images/{$categoryName}/additional", 'public');
                ShopItemImage::create([
                    'shop_item_id' => $shopItem->id,
                    'image_path' => $imagePath,
                ]);
            }
        }
        $shopItem->fileTypes()->sync($request->file_type_ids);
        $shopItem->load(['category', 'fileTypes'])->loadCount('purchasedByUsers');
    


        \Log::info("✅ Shop item created successfully", ['id' => $shopItem->id]);
        return (new ShopItemResource($shopItem))
            ->additional(['message' => 'Shop item created successfully'])
            ->response()
            ->setStatusCode(201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shopItem = ShopItem::with('category')->withCount('purchasedByUsers')->find($id);

        if (!$shopItem) {
            return response()->json(['message' => 'Shop item not found'], 404);
        }
    
        return new ShopItemResource($shopItem);
    }

    public function showByCategoryAndSlug(string $category, string $slug)
    {
        $product = ShopItem::whereHas('category', function ($query) use ($category) {
            $query->where('name', $category);
        })->where('slug', $slug)
        ->with('category') 
        ->first();

        if (!$product) {
            return response()->json(['message' => 'Shop item not found'], 404);
        }

        $product->loadMissing('additionalImages');

        return new ShopItemResource($product);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        \Log::info("📥 Raw Request Data:", $request->all());
        \Log::info("📥 Request Headers:", $request->header());

        $name = $request->input('name');
$price = $request->input('price');
$category_id = $request->input('category_id');
$file_type_ids = $request->input('file_type_ids', []);

\Log::info("📥 Extracted Fields:", compact('name', 'price', 'category_id', 'file_type_ids'));


        $shopItem = ShopItem::find($id);

        if (!$shopItem) {
            return response()->json(['message' => 'Shop item not found'], 404);
        }

        // ✅ Log incoming request data for debugging
        \Log::info("🔄 Updating Shop Item ID: " . $shopItem->id, ['data' => $request->all()]);

        // ✅ Validate request
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:shop_items,name,' . $id,
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'file' => 'nullable|file|mimes:obj,fbx,glb,glTF',
            'file_type_ids' => 'sometimes|array',
            'file_type_ids.*' => 'exists:file_types,id',
        ]);

        if ($validator->fails()) {
            \Log::error("❌ Validation Failed:", $validator->errors()->toArray());
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // ✅ Handle file upload
        if ($request->hasFile('file')) {
            if ($shopItem->file_path && Storage::disk('public')->exists($shopItem->file_path)) {
                Storage::disk('public')->delete($shopItem->file_path);
            }
            $filePath = $request->file('file')->store('shop_items', 'public');
            $shopItem->file_path = $filePath;
        }

        // ✅ Only update fields that are sent
        if ($request->has('name')) {
            $shopItem->name = $request->name;
        }
        if ($request->has('description')) {
            $shopItem->description = $request->description;
        }
        if ($request->has('price')) {
            $shopItem->price = $request->price;
        }
        if ($request->has('category_id')) {
            $shopItem->category_id = $request->category_id;
        }
        if ($request->has('file_type_ids')) {
            $shopItem->fileTypes()->sync($request->file_type_ids);
        }
        \Log::info("🔄 Before saving:", $shopItem->toArray());
        // ✅ Save the updated shop item
        $shopItem->save();
        \Log::info("✅ After saving:", $shopItem->toArray());

        // ✅ Load related data and return the full updated item
        $shopItem->load(['category', 'fileTypes'])->loadCount('purchasedByUsers');

        \Log::info("✅ Shop Item Updated Successfully:", $shopItem->toArray());

        $shopItem->refresh();
\Log::info("🔍 After refresh:", $shopItem->toArray());
        return (new ShopItemResource($shopItem))
            ->additional(['message' => 'Shop item updated successfully'])
            ->response()
            ->setStatusCode(200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    \Log::info('🛒 Attempting to delete shop item with ID:', ['id' => $id]);
    $shopItem = ShopItem::find($id);
    if (!$shopItem) {
        \Log::warning('❌ Shop item not found', ['id' => $id]);
        return response()->json(['message' => 'Shop item not found'], 404);
    }
    if ($shopItem->file_path && Storage::disk('public')->exists($shopItem->file_path)) {
        Storage::disk('public')->delete($shopItem->file_path);
        \Log::info('🗑️ File deleted:', ['path' => $shopItem->file_path]);
    }
    $shopItem->delete();
    \Log::info('✅ Shop item deleted successfully', ['id' => $id]);

    return response()->json(['message' => 'Shop item deleted successfully'], 200);
}


}
