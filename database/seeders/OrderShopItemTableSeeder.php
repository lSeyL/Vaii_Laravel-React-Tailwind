<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class OrderShopItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_shop_item')->insert([
            [
                'order_id' => 1, 
                'shop_item_id' => 1, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1,
                'shop_item_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
