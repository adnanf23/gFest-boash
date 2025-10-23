<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
protected $except = [
    // Tambahkan rute API publik Anda di sini:
    'api/pendaftaran', 
    // atau gunakan wildcard jika ada rute API lain yang dikecualikan
    'api/*', 
];
}