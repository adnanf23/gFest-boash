<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;

// ========== RUTE PUBLIK ==========
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/kajian-akbar', function () {
    return Inertia::render('kajian-akbar');
})->name('Kajian');

Route::get('/kajian-akbar/pendaftaran', [PendaftaranController::class, 'index'])
    ->name('pendaftaran.index');

// API Publik untuk simpan pendaftaran
Route::post('/api/pendaftaran', [PendaftaranController::class, 'store']);


// ========== RUTE ADMIN LOGIN ==========
Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])
    ->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])
    ->name('admin.login.submit');
    Route::post('/api/admin/login', [AdminAuthController::class, 'login']);
    

// ========== RUTE ADMIN (PROTECTED) ==========
Route::middleware('auth:admin')->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');
    Route::post('/logout', [AdminAuthController::class, 'logout'])
        ->name('admin.logout');
});

Route::middleware('auth:admin')->group(function () {
    
    // Rute untuk Admin Dashboard (GET)
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // ===============================================
    // ✅ RUTE PENGELOLAAN DATA PENDAFTARAN (API)
    // ===============================================
    Route::prefix('api/admin/pendaftaran')->group(function () {
        
        // 1. LIHAT DAFTAR (Dashboard.tsx::fetchPendaftaranData)
        Route::get('/', [PendaftaranController::class, 'list']); 
        
        // 2. UPDATE STATUS (Dashboard.tsx::handleUpdateStatus)
        // Gunakan PUT/PATCH dengan ID (disarankan PATCH untuk update parsial)
        Route::patch('/update-status/{pendaftaran}', [PendaftaranController::class, 'updateStatus']); 
        
        // 3. HAPUS (Dashboard.tsx::handleDelete)
        Route::delete('/{id}', [PendaftaranController::class, 'destroy']);
    });
});

// ========== API ADMIN ==========
Route::prefix('api')->group(function () {
    // API Pendaftaran (bisa diakses publik untuk read)
    Route::get('/pendaftaran', [PendaftaranController::class, 'list']);
    Route::get('/pendaftaran/{id}', [PendaftaranController::class, 'show']);
    
    // API Admin (protected)
    Route::middleware('auth:admin')->prefix('admin/pendaftaran')->group(function () {
        Route::delete('/{id}', [PendaftaranController::class, 'destroy']);
    });
    
    // ✅ API Update Status (bisa tanpa auth untuk testing, tapi sebaiknya pakai auth)
    Route::put('/pendaftaran/update-status/{id}', [PendaftaranController::class, 'updateStatus']);
});

require __DIR__.'/settings.php';