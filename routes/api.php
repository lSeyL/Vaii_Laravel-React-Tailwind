<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ShopItemController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;

// Public routes
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::apiResource('shop-items', ShopItemController::class)->only(['index', 'show']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::get('/api/products/{category}/{slug}', [ShopItemController::class, 'showByCategoryAndSlug']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('shop-items', ShopItemController::class)->except(['index', 'show']);
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    Route::apiResource('orders', OrderController::class); // Fully protected
    Route::apiResource('users', UserController::class);  // Fully protected
});
