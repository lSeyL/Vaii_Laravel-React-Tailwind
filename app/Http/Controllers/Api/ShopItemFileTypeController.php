<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ShopItemFileTypeController extends Controller
{
    public function index($shopItemId)
    {
        $shopItem = ShopItem::with('fileTypes')->findOrFail($shopItemId);
        return response()->json([
            'shop_item' => $shopItem->name,
            'file_types' => $shopItem->fileTypes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shop_item_id' => 'required|exists:shop_items,id',
            'file_type_id' => 'required|exists:file_types,id',
        ]);

        $shopItem = ShopItem::findOrFail($request->shop_item_id);
        $shopItem->fileTypes()->attach($request->file_type_id);

        return response()->json(['message' => 'File type added successfully']);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'shop_item_id' => 'required|exists:shop_items,id',
            'file_type_id' => 'required|exists:file_types,id',
        ]);

        $shopItem = ShopItem::findOrFail($request->shop_item_id);
        $shopItem->fileTypes()->detach($request->file_type_id);

        return response()->json(['message' => 'File type removed successfully']);
    }
}
