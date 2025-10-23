<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
        public function showLoginForm()
    {
        return Inertia::render('Admin/Login'); // Halaman login admin kamu
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

if (Auth::guard('admin')->attempt($credentials)) {
        $request->session()->regenerate();

        // ✅ Pastikan nama route ini benar dan terdaftar untuk admin dashboard
        return redirect()->route('admin.dashboard'); 
    }

    // ❌ Kegagalan: Throw Validation Exception
    throw ValidationException::withMessages([
        'username' => ['Username atau password salah.'],
    ]);


        // ❌ Kalau gagal login
        return back()->withErrors([
            'username' => 'Username atau password salah.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

       return redirect()->route('admin.login');
    }
}