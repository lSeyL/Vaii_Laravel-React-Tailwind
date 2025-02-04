<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ShopItem extends Model
{
    use HasFactory;

    protected $fillable = ['name','slug', 'description',
     'price', 'category_id','image_file_path', 'file_path'];

     protected static function boot()
     {
         parent::boot();
         
         static::creating(function ($shopItem) {
             $shopItem->slug = Str::slug($shopItem->name, '-');
             $count = ShopItem::where('slug', $shopItem->slug)->count();
             if ($count > 0) {
                 $shopItem->slug .= '-' . ($count + 1);
             } 
         });
 
         static::updating(function ($shopItem) {
            $shopItem->slug = Str::slug($shopItem->name, '-');
         });
     }
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

    public function favoritedByUsers()
{
    return $this->belongsToMany(User::class, 'user_favorite_items', 'shop_item_id', 'user_id')
        ->withTimestamps();
}
}
