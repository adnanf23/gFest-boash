<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth; // Tambahkan ini jika ingin menggunakan session Laravel

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            // 1. Validasi field yang diterima dari frontend
            'username' => 'required|string', 
            'password' => 'required'
        ]);

        // 2. PERBAIKAN KRITIS: Cari user berdasarkan 'username'
        $user = User::where('username', $request->username)->first(); 
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            // 3. Pesan error yang akurat
            return response()->json([
                'success' => false,
                'message' => 'Username atau password salah' 
            ], 401);
        }
        
        // 4. (OPSIONAL) Login menggunakan sistem session/guard Laravel
        // Jika Anda ingin menggunakan middleware 'auth' di rute admin/dashboard,
        // Anda harus membuat session login yang valid:
        Auth::login($user); 

        // Karena Anda menggunakan endpoint API, kita tetap sertakan token 
        // sebagai respons standar API, meskipun Auth::login sudah dilakukan.
        $token = base64_encode(random_bytes(40));

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user
        ]);
    }
}
