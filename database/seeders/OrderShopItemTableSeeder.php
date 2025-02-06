<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
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
            [
                'order_id' => 2,
                'shop_item_id' => 3,
                'created_at' => Carbon::now()->subDays(7),
                'updated_at' => Carbon::now()->subDays(7),
            ],
            [
                'order_id' => 3,
                'shop_item_id' => 4,
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'order_id' => 4,
                'shop_item_id' => 5,
                'created_at' => Carbon::now()->subDays(12),
                'updated_at' => Carbon::now()->subDays(12),
            ],

            
        ]);
    }
}
