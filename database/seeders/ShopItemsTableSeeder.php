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
                'name' => 'Race Car',
                'description' => 'A high-speed race car model suitable for racing games.',
                'price' => 150.00,
                'category_id' => 1, 
                'file_path' => '/files/shop_items/race_car.obj',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Battle Tank',
                'description' => 'A robust battle tank model for strategy simulations.',
                'price' => 200.00,
                'category_id' => 1,
                'file_path' => '/files/shop_items/battle_tank.obj',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
