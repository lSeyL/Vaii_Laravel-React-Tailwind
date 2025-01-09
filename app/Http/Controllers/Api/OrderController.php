<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['user', 'shopItems'])->paginate(10);
        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'shop_items' => 'required|array|min:1',
            'shop_items.*' => 'required|exists:shop_items,id',
        ]);
    
        DB::beginTransaction();
    
        try {
            $order = Order::create([
                'user_id' => $validated['user_id'],
                'total_amount' => 0, 
                'status' => 'pending',
            ]);
    
            $order->shopItems()->attach($validated['shop_items']);
    
            $totalAmount = $order->shopItems()->sum('price');
            $order->update(['total_amount' => $totalAmount]);
    
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Order creation failed', 'error' => $e->getMessage()], 500);
        }
    
        $order->load(['user', 'shopItems']);
        return (new OrderResource($order))
                ->additional(['message' => 'Order created successfully'])
                ->response()
                ->setStatusCode(201);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['user', 'shopItems'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::with(['user', 'shopItems'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validated = $request->validate([
            'status' => 'sometimes|required|string|in:pending,completed,cancelled',
            
        ]);

        $order->update($validated);

        return (new OrderResource($order))
                ->additional(['message' => 'Order updated successfully'])
                ->response()
                ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}
