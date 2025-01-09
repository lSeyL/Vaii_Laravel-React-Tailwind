<?php

namespace App\Http\Resources;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'purchased_shop_items_count' => $this->purchasedShopItems()->count(),
            'orders_count' => $this->orders()->count(),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'orders' => OrderResource::collection($this->whenLoaded('orders')),
        ];
    }
}
