<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ShopItemController;
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
Route::apiResource('shop-items', ShopItemController::class); 

//Pre logged userov
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile-update', [UserController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return new \App\Http\Resources\UserResource($request->user());
    });

//Admin routy
    Route::middleware('admin')->group(function () {
        Route::apiResource('/users', UserController::class); 
    });
});
