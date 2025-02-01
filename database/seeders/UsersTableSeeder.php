<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'password' => Hash::make('password'), 
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@example.com',
                'password' => Hash::make('password'),
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@admin.sk',
                'password' => Hash::make('admin123@'),
                'role_id' => 2, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
