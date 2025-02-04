<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ShopItem;
use App\Http\Resources\ShopItemResource;

class FavoriteController extends Controller
{
    public function addToFavorites(Request $request, $shopItemId)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if ($user->favoriteItems()->where('shop_item_id', $shopItemId)->exists()) {
            return response()->json(['message' => 'Item already in favorites'], 400);
        }

        $user->favoriteItems()->attach($shopItemId);
        return response()->json(['message' => 'Item added to favorites'], 201);
    }

    public function removeFromFavorites(Request $request, $shopItemId)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user->favoriteItems()->detach($shopItemId);
        return response()->json(['message' => 'Item removed from favorites'], 200);
    }



    public function getUserFavorites()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $favorites = $user->favoriteItems()->with('category')->get();
        
        return ShopItemResource::collection($favorites);
    }

}
