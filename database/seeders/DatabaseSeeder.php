<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([        
            RoleSeeder::class,
        UsersTableSeeder::class,
        CategoriesTableSeeder::class,
        ShopItemsTableSeeder::class,
        OrdersTableSeeder::class,
        OrderShopItemTableSeeder::class,
        UserShopItemTableSeeder::class,
        FileTypeSeeder::class,
        ShopItemFileTypeSeeder::class,
    ]);


         
    }
}
