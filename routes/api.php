<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PendaftaranController;

use App\Http\Controllers\AdminController;

use App\Http\Controllers\Admin\AuthController;



use App\Http\Controllers\AdminAuthController;



Route::post('/pendaftaran', [PendaftaranController::class, 'store']);
Route::get('/pendaftaran', [PendaftaranController::class, 'list']);
Route::get('/pendaftaran/{id}', [PendaftaranController::class, 'show']);
Route::delete('/pendaftaran/{id}', [PendaftaranController::class, 'destroy']);


Route::prefix('admin')->group(function () {
    Route::get('/pendaftaran', [AdminController::class, 'listPendaftaran']);
    Route::delete('/pendaftaran/{id}', [AdminController::class, 'deletePendaftaran']);
});