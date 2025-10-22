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
Schema::create('pendaftarans', function (Blueprint $table) {
    $table->id();
    $table->enum('tipe_pendaftar', ['umum', 'internal']); // atau string jika lebih fleksibel
    $table->string('nama_lengkap', 255);
    $table->string('no_telp', 20); // pastikan cukup panjang
    $table->unsignedTinyInteger('usia'); // atau integer jika range lebih besar
    $table->text('alasan')->nullable(); // gunakan TEXT bukan VARCHAR
    $table->string('nama_siswa', 255)->nullable();
    $table->string('kelas', 50)->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftarans');
    }
};
