<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Vehicles',
                'description' => '3D models of various vehicles like cars, planes, and tanks.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Architecture',
                'description' => 'Detailed architectural models of buildings and structures.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
