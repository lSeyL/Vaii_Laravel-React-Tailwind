<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

use Carbon\Carbon;

class UserShopItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_shop_item')->insert([
            [
                'user_id' => 1, 
                'shop_item_id' => 1, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'shop_item_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'shop_item_id' => 3,
                'created_at' => Carbon::now()->subDays(7),
                'updated_at' => Carbon::now()->subDays(7),
            ],
            [
                'user_id' => 2,
                'shop_item_id' => 4,
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            
        ]);
    }
}
