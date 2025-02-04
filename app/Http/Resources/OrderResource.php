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
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'total_amount' => $this->total_amount,
            'status' => $this->status,
            'created_at' => $this->created_at->format('d.m.Y H:i'),
            'items_count' => $this->shopItems->count(),
            'items' => $this->shopItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'price' => $item->price,
                ];
            }),
        ];
    }
}
