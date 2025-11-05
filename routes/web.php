<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\PendaftarAuthController;

// ========== RUTE PUBLIK ==========
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/kajian-akbar', function () {
    return Inertia::render('kajian-akbar');
})->name('Kajian');

Route::get('/kajian-akbar/pendaftaran', [PendaftaranController::class, 'index'])
    ->name('pendaftaran.index');



// ROUTE LOGIN PENDAFTAR
Route::get('/pendaftar/login', [PendaftarAuthController::class, 'showLoginForm'])->name('pendaftar.login');
Route::post('/api/pendaftar/login', [PendaftarAuthController::class, 'login'])->name('pendaftar.login.submit');
Route::post('/pendaftar/logout', [PendaftarAuthController::class, 'logout'])->name('pendaftar.logout');

Route::middleware('auth:pendaftar')->group(function () {
    Route::get('/pendaftar/dashboard', function () {
        return Inertia::render('Pendaftar/Dashboard');
    })->name('pendaftar.dashboard');
});




// API Publik untuk simpan pendaftaran
Route::post('/api/pendaftaran', [PendaftaranController::class, 'store']);

// ========== RUTE ADMIN LOGIN ==========
Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])
    ->name('admin.login');
Route::post('/api/admin/login', [AdminAuthController::class, 'login'])
    ->name('admin.login.submit');

// ========== RUTE ADMIN (PROTECTED) ==========
Route::middleware('auth:admin')->group(function () {
    // Dashboard
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');
    
    // Logout
    Route::post('/admin/logout', [AdminAuthController::class, 'logout'])
        ->name('admin.logout');
    
    // ✅ API Pendaftaran (Protected)
    Route::prefix('api')->group(function () {
        Route::get('/pendaftaran', [PendaftaranController::class, 'list']);
        Route::get('/pendaftaran/{id}', [PendaftaranController::class, 'show']);
        Route::put('/pendaftaran/update-status/{id}', [PendaftaranController::class, 'updateStatus']);
        Route::delete('/admin/pendaftaran/{id}', [PendaftaranController::class, 'destroy']);
        
    });
});

require __DIR__.'/settings.php';