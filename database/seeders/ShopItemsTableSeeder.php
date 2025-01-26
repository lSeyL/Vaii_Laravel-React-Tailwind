<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ShopItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shop_items')->insert([
            [
                'name' => 'Comfy Haven Sofa',
                'description' => 'A modern, stylish sofa designed for ultimate comfort, perfect for any living space.',
                'price' => 150.00,
                'category_id' => 3, // Sofa category
                'file_path' => '/files/sofa/sofa1.obj',
                'image_file_path' => '/images/sofa/sofa1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Elegant Oak Table',
                'description' => 'A sturdy oak dining table with a polished finish, ideal for family meals.',
                'price' => 349.99,
                'category_id' => 2, // Table category
                'file_path' => '/files/table/table1.obj',
                'image_file_path' => '/images/table/table1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Luxe Lounger Chair',
                'description' => 'A reclining chair with plush padding for the ultimate relaxation experience.',
                'price' => 249.99,
                'category_id' => 1, // Chair category
                'file_path' => '/files/chair/chair1.obj',
                'image_file_path' => '/images/chair/chair1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vintage Console Table',
                'description' => 'A rustic console table with a charming vintage look.',
                'price' => 219.99,
                'category_id' => 2, // Table category
                'file_path' => '/files/table/console_table.obj',
                'image_file_path' => '/images/table/console_table.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Soft Cloud Armchair',
                'description' => 'A cozy armchair with extra padding for superior comfort.',
                'price' => 349.99,
                'category_id' => 1, // Chair category
                'file_path' => '/files/chair/armchair.obj',
                'image_file_path' => '/images/chair/armchair.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Luxury Dining Table',
                'description' => 'A large dining table made of premium hardwood.',
                'price' => 799.99,
                'category_id' => 2, // Table category
                'file_path' => '/files/table/dining_table.obj',
                'image_file_path' => '/images/table/dining_table.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Classic Leather Sofa',
                'description' => 'A timeless leather sofa with a rich, elegant finish.',
                'price' => 1199.99,
                'category_id' => 3, // Sofa category
                'file_path' => '/files/sofa/leather_sofa.obj',
                'image_file_path' => '/images/sofa/leather_sofa.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lounge Bean Bag',
                'description' => 'A large, comfortable bean bag chair perfect for lounging.',
                'price' => 89.99,
                'category_id' => 1, // Chair category
                'file_path' => '/files/chair/bean_bag.obj',
                'image_file_path' => '/images/chair/bean_bag.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Adjustable Work Desk',
                'description' => 'A height-adjustable desk perfect for sitting or standing.',
                'price' => 499.99,
                'category_id' => 2, // Table category
                'file_path' => '/files/table/work_desk.obj',
                'image_file_path' => '/images/table/work_desk.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sunny Day Patio Chair',
                'description' => 'A weather-resistant chair designed for outdoor comfort.',
                'price' => 129.99,
                'category_id' => 1, // Chair category
                'file_path' => '/files/chair/patio_chair.obj',
                'image_file_path' => '/images/chair/patio_chair.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
