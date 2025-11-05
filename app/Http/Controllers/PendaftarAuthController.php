<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PendaftarAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Pendaftar/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Coba login menggunakan guard 'pendaftar'
        if (Auth::guard('pendaftar')->attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->route('pendaftar.dashboard');
        }

        throw ValidationException::withMessages([
            'username' => ['Username atau password salah.'],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('pendaftar')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('pendaftar.login');
    }
}
