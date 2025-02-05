<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopItemImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shop_item_images')->insert([
            [
                'shop_item_id' => 1,
                'image_path' => 'shop_items/image1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'shop_item_id' => 1,
                'image_path' => 'shop_items/image2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'shop_item_id' => 2,
                'image_path' => 'shop_items/image3.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'shop_item_id' => 3,
                'image_path' => 'shop_items/image4.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
