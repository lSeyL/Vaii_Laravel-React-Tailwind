<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileType extends Model
{
    use HasFactory;

    protected $fillable = ['type'];

    public function shopItems()
    {
        return $this->belongsToMany(ShopItem::class, 'shop_item_file_types');
    }
}
