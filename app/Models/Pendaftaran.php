<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pendaftaran extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'pendaftarans';

    protected $fillable = [
        'tipe_pendaftar',
        'nama_lengkap',
        'no_telp',
        'usia',
        'alasan',
        'nama_siswa',
        'kelas',
        'status',
        'username',
        'password',
        'qr_code_path',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'tipe_pendaftar' => 'string',
        'usia' => 'string',
        'created_at' => 'datetime:d-m-Y',
        'updated_at' => 'datetime:d-m-Y',
    ];

    // Accessor
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
