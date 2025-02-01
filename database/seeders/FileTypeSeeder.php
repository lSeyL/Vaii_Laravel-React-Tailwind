<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('file_types')->insert([
            ['type' => 'fbx'],  
            ['type' => 'obj'],  
            ['type' => 'stl'],  
            ['type' => 'glb'],  
            ['type' => 'gltf'], 
            ['type' => 'blend'],
            ['type' => 'dae'],  
            ['type' => '3ds'],  
            ['type' => 'max'],  
            ['type' => 'c4d'],  
            ['type' => 'x3d'],  
            ['type' => 'vrml'], 
            ['type' => 'ply'],  
            ['type' => 'usd'],  
            ['type' => 'usdz'], 
            ['type' => 'step'], 
            ['type' => 'iges'],
            ['type' => 'bvh'],  
            ['type' => 'abc'], 
            ['type' => 'vox'], 
        ]);

    }
}
