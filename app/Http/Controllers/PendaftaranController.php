<?php

namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class PendaftaranController extends Controller
{
    /**
     * Tampilkan form pendaftaran
     */
    public function index(): Response
    {
        return Inertia::render('kajian-akbar/pendaftaran');
    }

    /**
     * Simpan data pendaftaran
     */
    public function store(Request $request)
{
    $rules = [
        'tipe_pendaftar' => 'required|string',
        'nama_lengkap'   => 'required|string|max:255',
        'no_telp'        => 'required|string|max:15',
        'usia'           => 'required|integer|min:5|max:100',
        'alasan'         => 'nullable|string',
        'nama_siswa'     => 'required_if:tipe_pendaftar,siswa|string',
        'kelas'          => 'required_if:tipe_pendaftar,siswa|string',
    ];

    // Jika internal, tambahkan aturan tambahan
    if ($request->tipe_pendaftar === 'internal') {
        $rules['nama_siswa'] = 'required|string|max:255';
        $rules['kelas'] = 'required|string|max:50';
    }

    $validator = Validator::make($request->all(), $rules, [
        'nama_lengkap.required' => 'Nama lengkap harus diisi',
        'no_telp.required' => 'No telepon harus diisi',
        'no_telp.regex' => 'Format no telepon tidak valid (contoh: 08123456789)',
        'usia.required' => 'Usia harus dipilih',
        'alasan.required' => 'Alasan mengikuti harus diisi',
        'alasan.min' => 'Alasan minimal 10 karakter',
        'nama_siswa.required' => 'Nama siswa harus diisi',
        'kelas.required' => 'Kelas harus diisi',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal',
            'errors' => $validator->errors()
        ], 422);
    }

    try {
        $pendaftaran = Pendaftaran::create($request->only([
            'tipe_pendaftar', 'nama_lengkap', 'no_telp', 'usia', 'alasan', 'nama_siswa', 'kelas'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil disimpan',
            'data' => $pendaftaran
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menyimpan pendaftaran',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Ambil semua data pendaftaran
     */
    public function list()
    {
        $pendaftarans = Pendaftaran::latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $pendaftarans
        ]);
    }

    /**
     * Ambil detail pendaftaran by ID
     */
    public function show($id)
    {
        $pendaftaran = Pendaftaran::find($id);

        if (!$pendaftaran) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $pendaftaran
        ]);
    }

    /**
     * Hapus pendaftaran
     */
    public function destroy($id)
    {
        $pendaftaran = Pendaftaran::find($id);

        if (!$pendaftaran) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $pendaftaran->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ]);
    }
}