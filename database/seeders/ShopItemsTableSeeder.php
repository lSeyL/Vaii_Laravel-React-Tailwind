<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ShopItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'name' => 'Comfy Haven Sofa',
                'description' => 'A modern, stylish sofa designed for ultimate comfort, perfect for any living space.',
                'long_description' => 'The Comfy Haven Sofa features premium upholstery and high-density foam cushions, ensuring superior support and durability. Designed with a sleek silhouette, this sofa is perfect for both contemporary and classic interiors.',
                'price' => 150.00,
                'category_id' => 3,
                'file_path' => 'files/sofa/sofa1.fbx',
                'image_file_path' => 'images/sofa/sofa1.jpg',
            ],
            [
                'name' => 'Elegant Oak Table',
                'description' => 'A sturdy oak dining table with a polished finish, ideal for family meals.',
                'long_description' => 'Crafted from high-quality solid oak, the Elegant Oak Table is a timeless centerpiece for any dining room. Its polished finish enhances the wood grain, making it both durable and aesthetically pleasing.',
                'price' => 349.99,
                'category_id' => 2,
                'file_path' => 'files/table/table1.obj',
                'image_file_path' => 'images/table/table1.jpg',
            ],
            [
                'name' => 'Luxe Lounger Chair',
                'description' => 'A reclining chair with plush padding for the ultimate relaxation experience.',
                'long_description' => 'The Luxe Lounger Chair offers an adjustable reclining mechanism and extra plush padding to provide unparalleled comfort. Its ergonomic design supports proper posture, making it ideal for long hours of relaxation.',
                'price' => 249.99,
                'category_id' => 1,
                'file_path' => 'files/chair/chair1.obj',
                'image_file_path' => 'images/chair/chair1.jpg',
            ],
            [
                'name' => 'Vintage Console Table',
                'description' => 'A rustic console table with a charming vintage look.',
                'long_description' => 'Handcrafted from reclaimed wood, the Vintage Console Table brings a rustic charm to any hallway or living room. Its distressed finish adds character, while the sturdy construction ensures longevity.',
                'price' => 219.99,
                'category_id' => 2,
                'file_path' => 'files/table/console_table.obj',
                'image_file_path' => 'images/table/console_table.jpg',
            ],
            [
                'name' => 'Soft Cloud Armchair',
                'description' => 'A cozy armchair with extra padding for superior comfort.',
                'long_description' => 'Designed with an ultra-soft fabric cover and high-density foam padding, the Soft Cloud Armchair provides maximum comfort and durability. Its ergonomic design supports posture while giving a plush, cloud-like feel.',
                'price' => 349.99,
                'category_id' => 1,
                'file_path' => 'files/chair/armchair.obj',
                'image_file_path' => 'images/chair/armchair.jpg',
            ],
            [
                'name' => 'Luxury Dining Table',
                'description' => 'A large dining table made of premium hardwood.',
                'long_description' => 'Handcrafted from the finest hardwood, this luxury dining table is a statement piece for any dining space. Featuring a polished finish and sturdy construction, it provides a grand setting for gatherings and family meals.',
                'price' => 799.99,
                'category_id' => 2,
                'file_path' => 'files/table/dining_table.obj',
                'image_file_path' => 'images/table/dining_table.jpg',
            ],
            [
                'name' => 'Classic Leather Sofa',
                'description' => 'A timeless leather sofa with a rich, elegant finish.',
                'long_description' => 'Made from premium full-grain leather, the Classic Leather Sofa offers a perfect blend of sophistication and comfort. Its robust frame and plush cushions make it an ideal centerpiece for any living room.',
                'price' => 1199.99,
                'category_id' => 3,
                'file_path' => 'files/sofa/leather_sofa.obj',
                'image_file_path' => 'images/sofa/leather_sofa.jpg',
            ],
            [
                'name' => 'Lounge Bean Bag',
                'description' => 'A large, comfortable bean bag chair perfect for lounging.',
                'long_description' => 'Filled with high-quality memory foam beads, the Lounge Bean Bag contours to your body for the ultimate relaxation experience. Its durable, easy-to-clean cover ensures long-lasting use in any space.',
                'price' => 89.99,
                'category_id' => 1,
                'file_path' => 'files/chair/bean_bag.obj',
                'image_file_path' => 'images/chair/bean_bag.jpg',
            ],
            [
                'name' => 'Adjustable Work Desk',
                'description' => 'A height-adjustable desk perfect for sitting or standing.',
                'long_description' => 'Engineered with a smooth height-adjustment mechanism, the Adjustable Work Desk allows seamless transitions between sitting and standing. Its sturdy frame and spacious surface make it ideal for modern workspaces.',
                'price' => 499.99,
                'category_id' => 2,
                'file_path' => 'files/table/work_desk.obj',
                'image_file_path' => 'images/table/work_desk.jpg',
            ],
            [
                'name' => 'Sunny Day Patio Chair',
                'description' => 'A weather-resistant chair designed for outdoor comfort.',
                'long_description' => 'Constructed with UV-resistant materials and a rust-proof aluminum frame, the Sunny Day Patio Chair is built to withstand outdoor elements. Its breathable mesh seating ensures comfort during warm weather.',
                'price' => 129.99,
                'category_id' => 1,
                'file_path' => 'files/chair/patio_chair.obj',
                'image_file_path' => 'images/chair/patio_chair.jpg',
            ],
        ];

        foreach ($items as &$item) {
            $item['slug'] = Str::slug($item['name'], '-');
            $item['created_at'] = now();
            $item['updated_at'] = now();
        }

        DB::table('shop_items')->insert($items);
    }
}
