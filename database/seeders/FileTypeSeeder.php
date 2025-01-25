<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fileTypes = ['fbx', 'obj', 'stl'];

        foreach ($fileTypes as $type) {
            FileType::create(['type' => $type]);
        }
    }
}
