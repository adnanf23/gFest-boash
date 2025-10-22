<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PendaftaranController;

Route::post('/pendaftaran', [PendaftaranController::class, 'store']);
Route::get('/pendaftaran', [PendaftaranController::class, 'list']);
Route::get('/pendaftaran/{id}', [PendaftaranController::class, 'show']);
Route::delete('/pendaftaran/{id}', [PendaftaranController::class, 'destroy']);
