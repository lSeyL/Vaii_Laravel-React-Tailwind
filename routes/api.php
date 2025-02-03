<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ShopItemController;
use App\Http\Controllers\Api\UserShopItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Verejne
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/shop-items/search', [ShopItemController::class, 'search']);
Route::apiResource('shop-items', ShopItemController::class); 


//Pre logged userov
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile-update', [UserController::class, 'update']);
    Route::delete('delete-account', [UserController::class, 'userDelete']);

    Route::get('/user', function (Request $request) {
        return new \App\Http\Resources\UserResource($request->user());
    });
    Route::post('/purchase', [UserShopItemController::class, 'purchaseItems']); 
    Route::get('/my-orders', [UserShopItemController::class, 'getUserPurchases']); 

//Admin routy
    Route::middleware('admin')->group(function () {
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
        Route::apiResource('users', UserController::class); 

        Route::post('/shop-items', [ShopItemController::class, 'store']);
        Route::put('/shop-items/{id}', [ShopItemController::class, 'update']);
        Route::delete('/shop-items/{id}', [ShopItemController::class, 'destroy']);
        //Route::apiResource('shop-items', ShopItemController::class); 

    });
});
