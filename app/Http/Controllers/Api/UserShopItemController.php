<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\UserShopItem;
use App\Models\ShopItem;
use Illuminate\Support\Facades\Auth;
class UserShopItemController extends Controller
{
    public function purchaseItems(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $cartItems = $request->input('cart');

        if (!$cartItems || !is_array($cartItems)) {
            return response()->json(['message' => 'Invalid cart data'], 400);
        }

        $alreadyOwned = UserShopItem::where('user_id', $user->id)
            ->whereIn('shop_item_id', array_column($cartItems, 'id'))
            ->pluck('shop_item_id')
            ->toArray();

        $itemsToBuy = array_filter($cartItems, function ($item) use ($alreadyOwned) {
            return !in_array($item['id'], $alreadyOwned);
        });

        if (empty($itemsToBuy)) {
            return response()->json(['message' => 'You already own all these items.'], 400);
        }
        foreach ($itemsToBuy as $item) {
            UserShopItem::create([
                'user_id' => $user->id,
                'shop_item_id' => $item['id'],
            ]);
        }

        return response()->json([
            'message' => 'Purchase successful!',
            'purchased_items' => array_column($itemsToBuy, 'id'),
        ], 200);
    }
    public function getUserPurchases()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $purchasedItems = $user->shopItems()->with('category')->get();
        return response()->json($purchasedItems, 200);
    }
}
