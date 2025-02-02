<?php

namespace App\Http\Resources;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\FileTypeResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => number_format($this->price, 2, '.', ''),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'file_types' => FileTypeResource::collection($this->whenLoaded('fileTypes')),
            'file_url' => url('storage/' . $this->file_path),
            'image_file_path' => url('storage/' . $this->image_file_path),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'purchased_by_users_count' => $this->purchased_by_users_count, 
        ];
    }
}
