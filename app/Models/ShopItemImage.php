<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopItemImage extends Model
{
    protected $fillable = ['shop_item_id', 'image_path'];
    public function shopItem()
    {
        return $this->belongsTo(ShopItem::class);
    }
}
