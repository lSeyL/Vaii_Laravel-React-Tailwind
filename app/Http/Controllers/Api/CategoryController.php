<?php

namespace App\Http\Controllers\Api;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::paginate(10); // Consider pagination for large datasets
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
        ]);
    
        $category = Category::create($validated);
    
        return (new CategoryResource($category))
                ->additional(['message' => 'Category created successfully'])
                ->response()
                ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
        ]);
    
        $category->update($validated);
    
        return (new CategoryResource($category))
                ->additional(['message' => 'Category updated successfully'])
                ->response()
                ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
