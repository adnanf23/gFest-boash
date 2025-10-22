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
        'usia' => 'integer',  // ✅ Ubah dari 'string' ke 'integer'
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Accessor: Format nomor telepon
     */
    public function getFormattedNoTelpAttribute()
    {
        $noTelp = $this->no_telp;
        
        // Pastikan no_telp memiliki panjang yang cukup
        if (strlen($noTelp) < 10) {
            return $noTelp;
        }
        
        return substr($noTelp, 0, 4) . '-' . substr($noTelp, 4, 4) . '-' . substr($noTelp, 8);
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
     * Scope: Filter by usia range
     */
    public function scopeByUsiaRange($query, $minAge, $maxAge)
    {
        return $query->whereBetween('usia', [$minAge, $maxAge]);
    }

    /**
     * Accessor: Get usia range label
     */
    public function getUsiaRangeLabelAttribute()
    {
        $usia = $this->usia;
        
        if ($usia >= 20 && $usia <= 30) {
            return '20 - 30 tahun';
        } elseif ($usia >= 31 && $usia <= 40) {
            return '31 - 40 tahun';
        } elseif ($usia >= 41 && $usia <= 50) {
            return '41 - 50 tahun';
        } elseif ($usia > 50) {
            return '50+ tahun';
        }
        
        return 'Tidak diketahui';
    }
}