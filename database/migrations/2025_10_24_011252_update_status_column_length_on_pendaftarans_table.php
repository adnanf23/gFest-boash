<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pendaftarans', function (Blueprint $table) {
            // Ubah (change) kolom 'status' menjadi VARCHAR dengan panjang 20
            $table->string('status', 20)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pendaftarans', function (Blueprint $table) {
            // Kembalikan ke panjang sebelumnya (jika Anda ingat panjang aslinya, misalnya 10)
            // Jika Anda tidak yakin, Anda bisa biarkan kolom 20, atau ubah ke 10
            $table->string('status', 11)->change();
        });
    }
};