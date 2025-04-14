<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Auth\AuthController;

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

Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
});

Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('/cart/sync', [CartController::class, 'syncCart']);
Route::get('/cart', [CartController::class, 'viewCart']);
Route::put('/cart/update/{itemId}', [CartController::class, 'updateCartItem']);
// Route::delete('/cart/remove/{itemId}', [CartController::class, 'removeCartItem']);
Route::delete('/cart/clear', [CartController::class, 'clearCart']);
   
});


Route::delete('/cart/remove/{itemId}', [CartController::class, 'removeCartItem']);


Route::post('/puppies', [ProductController::class, 'store']);
Route::get('/all-puppies', [ProductController::class, 'arrivals']);
Route::get('/puppies', [ProductController::class, 'index']);
Route::get('/puppie/{id}', [ProductController::class, 'show']);
Route::put('/puppies/{id}', [ProductController::class, 'update']);
Route::delete('/puppie/{id}', [ProductController::class, 'destroy']);

Route::post('/orders', [OrderController::class, 'store']); // Place a new order
Route::get('/orders', [OrderController::class, 'index']); // Get all orders for the logged-in user

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/category/{id}', [CategoryController::class, 'update']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy']);



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
