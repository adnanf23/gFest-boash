<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;

    protected $table = 'pendaftarans';

    protected $fillable = [
        'tipe_pendaftar',
        'nama_lengkap',
        'no_telp',
        'usia',
        'alasan',
        'nama_siswa',
        'kelas',
        'status',           // ✅ TAMBAHKAN
        'username',         // ✅ TAMBAHKAN
        'password',         // ✅ TAMBAHKAN
        'qr_code_path',     // ✅ TAMBAHKAN
    ];

    protected $casts = [
        'tipe_pendaftar' => 'string',
        'usia' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Accessor untuk format nomor telepon
    public function getFormattedNoTelpAttribute()
    {
        return substr($this->no_telp, 0, 4) . '-' . substr($this->no_telp, 4, 4) . '-' . substr($this->no_telp, 8);
    }

    // Scopes
    public function scopeUmum($query)
    {
        return $query->where('tipe_pendaftar', 'umum');
    }

    public function scopeInternal($query)
    {
        return $query->where('tipe_pendaftar', 'internal');
    }

    public function scopeByUsia($query, $usia)
    {
        return $query->where('usia', $usia);
    }
}