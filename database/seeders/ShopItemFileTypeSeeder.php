<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ShopItemFileType;
use Illuminate\Support\Facades\DB;

class ShopItemFileTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shop_item_file_types')->insert([
            ['shop_item_id' => 1, 'file_type_id' => 1],
            ['shop_item_id' => 1, 'file_type_id' => 2],
            ['shop_item_id' => 2, 'file_type_id' => 3],
            ['shop_item_id' => 3, 'file_type_id' => 3],
            ['shop_item_id' => 3, 'file_type_id' => 1],
            ['shop_item_id' => 2, 'file_type_id' => 1],
            ['shop_item_id' => 4, 'file_type_id' => 2],
            ['shop_item_id' => 5, 'file_type_id' => 1],
            ['shop_item_id' => 6, 'file_type_id' => 2],
            ['shop_item_id' => 5, 'file_type_id' => 2],
            ['shop_item_id' => 7, 'file_type_id' => 2],
        ]);
    }
}
