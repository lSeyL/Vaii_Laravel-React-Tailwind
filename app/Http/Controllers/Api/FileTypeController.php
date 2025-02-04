<?php

namespace App\Http\Controllers\Api;
use App\Models\FileType;
use App\Http\Resources\FileTypeResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FileTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getFileTypes() {
        $fileTypes = FileType::all();
        return FileTypeResource::collection($fileTypes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
