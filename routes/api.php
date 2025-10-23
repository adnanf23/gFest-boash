    <?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    // Hapus 'use App\Http\Controllers\PendaftaranController;'
    // Hapus 'use App\Http\Controllers\AdminController;'

    use App\Http\Controllers\Admin\AuthController;
    use App\Http\Controllers\AdminAuthController;


    // Route umum untuk pendaftaran
    // HAPUS SEMUA ROUTE INI:
    /*
    Route::post('/api/pendaftaran', [PendaftaranController::class, 'store']);
    Route::get('/pendaftaran', [PendaftaranController::class, 'list']);
    Route::get('/pendaftaran/{id}', [PendaftaranController::class, 'show']);
    Route::delete('/pendaftaran/{id}', [PendaftaranController::class, 'destroy']);
    */

    // Route admin
    Route::prefix('admin')->group(function () {
        Route::post('/login', [AdminAuthController::class, 'login']);// 👈 Ini untuk API login murni (Jika dibutuhkan)
        Route::post('/logout', [AdminAuthController::class, 'logout']); // 👈 Ini untuk API logout murni (Jika dibutuhkan)

        Route::get('/pendaftaran', [AdminAuthController::class, 'listPendaftaran']);
        Route::delete('/pendaftaran/{id}', [AdminAuthController::class, 'deletePendaftaran']);
    });