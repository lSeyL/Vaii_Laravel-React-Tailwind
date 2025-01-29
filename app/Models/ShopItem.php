<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopItem extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'category_id','image_file_path', 'file_path'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function fileTypes()
{
    return $this->belongsToMany(FileType::class, 'shop_item_file_types');
}

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_shop_item')
                    ->withTimestamps();
    }
    
    public function purchasedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_shop_item')
                    ->withTimestamps();
    }
}
