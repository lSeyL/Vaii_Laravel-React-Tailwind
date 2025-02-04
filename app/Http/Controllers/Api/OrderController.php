<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    public function getAllOrders()
    {
        $orders = Order::with(['user', 'shopItems'])->orderBy('created_at', 'desc')->get();
        return OrderResource::collection($orders);
    }
}
