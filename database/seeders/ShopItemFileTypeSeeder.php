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
        $data = [];
        
        for ($shopItemId = 1; $shopItemId <= 10; $shopItemId++) {
            $fileTypeCount = rand(2, 5);
            $fileTypes = array_rand(array_flip(range(1, 20)), $fileTypeCount);

            if (!is_array($fileTypes)) {
                $fileTypes = [$fileTypes];
            }

            foreach ($fileTypes as $fileTypeId) {
                $data[] = [
                    'shop_item_id' => $shopItemId,
                    'file_type_id' => $fileTypeId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        DB::table('shop_item_file_types')->insert($data);
    }
}

