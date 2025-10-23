<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
public function up(): void
    {
        // 🚨 Ganti 'pendaftar' menjadi 'pendaftarans'
        Schema::table('pendaftarans', function (Blueprint $table) { 
            // Kolom Status
            $table->enum('status', ['belum di cek', 'diterima', 'ditolak'])->default('belum di cek')->after('tipe_pendaftar');
            
            // ... (sisa kolom lainnya)
        });
    }

    public function down(): void
    {
        // 🚨 Ganti 'pendaftar' menjadi 'pendaftarans'
        Schema::table('pendaftarans', function (Blueprint $table) {
            $table->dropColumn(['status', 'username', 'password', 'qr_code_path']);
        });
    }
};