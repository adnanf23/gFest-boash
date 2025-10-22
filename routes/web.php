<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PendaftaranController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('/kajian-akbar', function () {
    return Inertia::render('kajian-akbar');
})->name('Kajian');

Route::get('/kajian-akbar/pendaftaran', 
[PendaftaranController::class, 'index'])->name('pendaftaran');



Route::post('/api/pendaftaran', [PendaftaranController::class, 'store']);
Route::get('/api/pendaftaran', [PendaftaranController::class, 'list']);
Route::get('/api/pendaftaran/{id}', [PendaftaranController::class, 'show']);
Route::delete('/api/pendaftaran/{id}', [PendaftaranController::class, 'destroy']);





Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
