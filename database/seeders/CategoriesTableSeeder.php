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
                'name' => 'chair',
                'description' => 'Chair category.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'table',
                'description' => 'Table category.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'sofa',
                'description' => 'Sofa category.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
