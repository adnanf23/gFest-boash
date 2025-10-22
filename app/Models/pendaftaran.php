<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;

    /**
     * Nama tabel
     */
    protected $table = 'pendaftarans';

    /**
     * Field yang bisa diisi (mass assignment)
     */
    protected $fillable = [
        'tipe_pendaftar',
        'nama_lengkap',
        'no_telp',
        'usia',
        'alasan',
        'nama_siswa',
        'kelas',
    ];

    /**
     * Cast tipe data
     */
    protected $casts = [
        'tipe_pendaftar' => 'string',
        'usia' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Accessor: Format nomor telepon
     */
    public function getFormattedNoTelpAttribute()
    {
        return substr($this->no_telp, 0, 4) . '-' . substr($this->no_telp, 4, 4) . '-' . substr($this->no_telp, 8);
    }

    /**
     * Scope: Filter by tipe pendaftar
     */
    public function scopeUmum($query)
    {
        return $query->where('tipe_pendaftar', 'umum');
    }

    public function scopeInternal($query)
    {
        return $query->where('tipe_pendaftar', 'internal');
    }

    /**
     * Scope: Filter by usia
     */
    public function scopeByUsia($query, $usia)
    {
        return $query->where('usia', $usia);
    }
}