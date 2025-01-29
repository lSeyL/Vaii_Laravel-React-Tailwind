<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

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
            
        ]);
    }
}
