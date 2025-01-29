<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserShopItem extends Model
{
    use HasFactory;

    protected $table = 'user_shop_item';
    protected $fillable = ['user_id', 'shop_item_id'];
}
