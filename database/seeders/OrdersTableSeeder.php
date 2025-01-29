<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'user_id' => 1, 
                'total_amount' => 400.00,
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'total_amount' => 100.00,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
