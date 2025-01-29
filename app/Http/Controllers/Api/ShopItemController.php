<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShopItem;
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
        $shopItems = ShopItem::with('category','fileTypes')->withCount('purchasedByUsers')->paginate(9);
    
        return ShopItemResource::collection($shopItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:shop_items,name',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'file' => 'required|file|mimes:obj,fbx,glb,glTF',
            'file_type_ids' => 'required|array',
            'file_type_ids.*' => 'exists:file_types,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('shop_items', 'public');
        } else {
            $filePath = null;
        }

        $shopItem = ShopItem::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'file_path' => $filePath,
        ]);

        $shopItem->fileTypes()->sync($request->file_type_ids);

        $shopItem->load(['category', 'fileTypes'])->loadCount('purchasedByUsers');
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
    $shopItem = ShopItem::with('category')
        ->withCount('purchasedByUsers')
        ->whereHas('category', function ($query) use ($category) {
            $query->where('name', $category);
        })
        ->where('slug', $slug)
        ->first();

    if (!$shopItem) {
        return response()->json(['message' => 'Shop item not found'], 404);
    }

    return new ShopItemResource($shopItem);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $shopItem = ShopItem::find($id);

        if (!$shopItem) {
            return response()->json(['message' => 'Shop item not found'], 404);
        }
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
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }
        if ($request->hasFile('file')) {
            if ($shopItem->file_path && Storage::disk('public')->exists($shopItem->file_path)) {
                Storage::disk('public')->delete($shopItem->file_path);
            }
            $filePath = $request->file('file')->store('shop_items', 'public');
            $shopItem->file_path = $filePath;
        }
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
        $shopItem->save();
        $shopItem->load(['category', 'fileTypes'])->loadCount('purchasedByUsers');
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
        $shopItem = ShopItem::find($id);

        if (!$shopItem) {
            return response()->json(['message' => 'Shop item not found'], 404);
        }
        if ($shopItem->file_path && Storage::disk('public')->exists($shopItem->file_path)) {
            Storage::disk('public')->delete($shopItem->file_path);
        }
        $shopItem->delete();

        return response()->json(['message' => 'Shop item deleted successfully'], 200);
    }


}
