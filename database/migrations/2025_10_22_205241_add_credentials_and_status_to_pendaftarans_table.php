<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pendaftarans', function (Blueprint $table) {
            
            // Mengubah tipe kolom 'status' menjadi ENUM baru dan menggunakan change()
            $table->enum('status', ['belum di cek', 'diterima', 'ditolak'])
                  ->default('belum di cek')
                  ->change(); 
                  
            // Memodifikasi 'username' (untuk memastikan nullable) dan menggunakan change()
            $table->string('username')->nullable()->after('kelas')->change(); 
            
            // Memodifikasi 'password' dan menggunakan change()
            $table->string('password')->nullable()->after('username')->change(); 
            
            // Memodifikasi 'qr_code_path' dan menggunakan change()
            $table->string('qr_code_path')->nullable()->after('password')->change(); 
        });
    }

    public function down(): void
    {
        Schema::table('pendaftarans', function (Blueprint $table) {
            // Drop kolom baru
            $table->dropColumn(['username', 'password', 'qr_code_path']);
            // Kolom status tidak di-drop.
        });
    }
};