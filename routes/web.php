<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Root route (default response for web routes)
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::apiResource('shop-items', ShopItemController::class)->only(['index', 'show']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
// Auth routes (if needed for web-based apps, not APIs)
/*
Route::middleware('web')->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/signup', [AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});
*/

require __DIR__.'/auth.php';
