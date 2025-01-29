<?php

namespace App\Http\Resources;
use App\Http\Resources\UserResource;
use App\Http\Resources\ShopItemResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user' => new UserResource($this->whenLoaded('user')),
            'total_amount' => $this->total_amount,
            'status' => $this->status,
            'shop_items' => ShopItemResource::collection($this->whenLoaded('shopItems')),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'shop_items_count' => $this->shopItems()->count(),
        ];
    }
}
