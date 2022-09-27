<?php

use App\Http\Controllers\BuildingController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\StorageTypeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route Building
    Route::resource('/building', BuildingController::class)->except(['create', 'edit']);

    // Route Room
    Route::get('/room', [RoomController::class, 'index']);
    Route::post('/room', [RoomController::class, 'store']);
    Route::get('/room/{id}', [RoomController::class, 'show']);
    Route::get('/room/building/{id}', [RoomController::class, 'showByBuilding']);
    Route::put('/room/{id}', [RoomController::class, 'update']);
    Route::delete('/room/{id}', [RoomController::class, 'destroy']);

    // Route Storage Type
    Route::resource('/storage-type', StorageTypeController::class)->except(['create', 'edit']);

    // Route Storage
    Route::get('/storage', [StorageController::class, 'index']);
    Route::post('/storage', [StorageController::class, 'store']);
    Route::get('/storage/{id}', [StorageController::class, 'show']);
    Route::get('/storage/type/{id}', [StorageController::class, 'showByType']);
    Route::put('/storage/{id}', [StorageController::class, 'update']);
    Route::delete('/storage/{id}', [StorageController::class, 'destroy']);

    // Route Location
    Route::get('/location', [LocationController::class, 'index']);
    Route::post('/location', [LocationController::class, 'store']);
    Route::put('/location/{id}', [LocationController::class, 'update']);
    Route::delete('/location/{id}', [LocationController::class, 'destroy']);

    // Route File
    Route::get('/file', [FileController::class, 'index']);
    Route::get('/file/{id}', [FileController::class, 'show']);
    Route::post('/file', [FileController::class, 'store']);
    Route::post('/file/{id}', [FileController::class, 'update']);
    Route::delete('/file/{id}', [FileController::class, 'destroy']);
});
