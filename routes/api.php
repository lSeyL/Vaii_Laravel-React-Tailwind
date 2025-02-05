<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ShopItemController;
use App\Http\Controllers\Api\UserShopItemController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FileTypeController;
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
Route::get('/shop-items/{category}/{slug}', [ShopItemController::class, 'showByCategoryAndSlug']);
Route::apiResource('shop-items', ShopItemController::class); 


//Pre logged userov
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/profile-update', [UserController::class, 'update']);
    Route::delete('delete-account', [UserController::class, 'userDelete']);
    Route::get('/user', [UserController::class, 'getUser']);
    //Order
    Route::post('/purchase', [UserShopItemController::class, 'purchaseItems']); 
    Route::get('/my-orders', [UserShopItemController::class, 'getUserPurchases']); 
    Route::get('/owns-item/{shopItemId}', [UserShopItemController::class, 'ownsItem']);
    //Favourite
    Route::post('/favorites/{shopItemId}', [FavoriteController::class, 'addToFavorites']);
    Route::delete('/favorites/{shopItemId}', [FavoriteController::class, 'removeFromFavorites']);
    Route::get('/favorites', [FavoriteController::class, 'getUserFavorites']);

    Route::get('/download/{filename}', function ($filename) {
        $path = "files/table/{$filename}";
        if (!Storage::disk('public')->exists($path)) {
            return response()->json(['message' => 'File not found'], 404);
        }
        return response()->download(storage_path("app/public/{$path}"), $filename);
    });
//Admin routy
    Route::middleware('admin')->group(function () {
        //Usery
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users/{user}', [UserController::class, 'updateUserAsAdmin']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
        //Route::apiResource('users', UserController::class); 
        //Produkty
        Route::post('/shop-items', [ShopItemController::class, 'store']);
        Route::post('/shop-items/{id}', [ShopItemController::class, 'update']);
        Route::delete('/shop-items/{id}', [ShopItemController::class, 'destroy']);
        Route::get('/categories', [CategoryController::class, 'getCategories']);
        Route::get('/file-types', [FileTypeController::class, 'getFileTypes']);
        
        //Ordery
        Route::get('/admin/orders', [OrderController::class, 'getAllOrders'])->middleware('admin');

    });
});
