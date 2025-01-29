<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderShopItem extends Model
{
    use HasFactory;
    protected $table = 'order_shop_item';
    protected $fillable = ['order_id', 'shop_item_id'];
}
