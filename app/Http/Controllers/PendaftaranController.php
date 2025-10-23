<?php


namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

    class PendaftaranController extends Controller
    {
        // Method untuk menampilkan form pendaftaran
        public function index()
        {
            return Inertia::render('kajian-akbar/pendaftaran');
        }

        // Method untuk menyimpan data pendaftaran baru
        public function store(Request $request)
        {
            $validated = $request->validate([
                'tipe_pendaftar' => 'required|in:umum,internal',
                'nama_lengkap' => 'required|string|max:255',
                'no_telp' => 'required|string|max:20',
                'usia' => 'required|integer|min:1',
                'alasan' => 'nullable|string',
                'nama_siswa' => 'nullable|string|max:255',
                'kelas' => 'nullable|string|max:50',
            ]);

            // Set status default sebagai 'belum di cek'
            $validated['status'] = 'belum di cek';

            $pendaftaran = Pendaftaran::create($validated);

            return response()->json([
                'message' => 'Pendaftaran berhasil disimpan!',
                'data' => $pendaftaran
            ], 201);
        }

        // Method untuk mendapatkan semua data pendaftaran
        public function list()
        {
            $pendaftaran = Pendaftaran::orderBy('created_at', 'desc')->get();
            return response()->json($pendaftaran);
        }

        // Method untuk mendapatkan detail satu pendaftaran
        public function show($id)
        {
            $pendaftaran = Pendaftaran::findOrFail($id);
            return response()->json($pendaftaran);
        }

        // Method untuk menghapus pendaftaran
        public function destroy($id)
        {
            $pendaftaran = Pendaftaran::findOrFail($id);
            
            // Hapus QR code jika ada
            if ($pendaftaran->qr_code_path) {
                $filePath = public_path($pendaftaran->qr_code_path);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
            
            $pendaftaran->delete();

            return response()->json([
                'message' => 'Pendaftaran berhasil dihapus!'
            ]);
        }

        // ✅ METHOD BARU: Update Status (ACC/Reject)
        public function updateStatus(Request $request, $id)
        {
            $validated = $request->validate([
                'status' => 'required|in:diterima,ditolak'
            ]);

            $pendaftaran = Pendaftaran::findOrFail($id);
            $newStatus = $validated['status'];

            if ($newStatus === 'diterima') {
                // Generate username dan password
                $username = $this->generateUsername($pendaftaran->nama_lengkap, $pendaftaran->id);
                $password = '12345678'; // Password default
                
                $pendaftaran->username = $username;
                $pendaftaran->password = Hash::make($password);
                $pendaftaran->status = 'diterima';
                
                // Generate QR Code
                $qrData = json_encode([
                    'id' => $pendaftaran->id,
                    'username' => $username,
                    'nama' => $pendaftaran->nama_lengkap,
                    'tipe' => $pendaftaran->tipe_pendaftar
                ]);
                
                $qrCodePath = $this->generateQRCode($qrData, $username);
                $pendaftaran->qr_code_path = $qrCodePath;
                
            } elseif ($newStatus === 'ditolak') {
                // Hapus kredensial jika ditolak
                if ($pendaftaran->qr_code_path) {
                    $filePath = public_path($pendaftaran->qr_code_path);
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }
                
                $pendaftaran->username = null;
                $pendaftaran->password = null;
                $pendaftaran->qr_code_path = null;
                $pendaftaran->status = 'ditolak';
            }

            $pendaftaran->save();

            return response()->json([
                'message' => "Status berhasil diubah menjadi {$newStatus}",
                'pendaftar' => $pendaftaran
            ]);
        }

        // Helper: Generate username unik
        private function generateUsername($namaLengkap, $id)
        {
            $cleanName = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $namaLengkap));
            $shortName = substr($cleanName, 0, 8);
            return $shortName . $id;
        }

        // Helper: Generate QR Code
        private function generateQRCode($data, $username)
        {
            $directory = public_path('qrcodes');
            
            // Buat folder jika belum ada
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }
            
            $filename = 'qr_' . $username . '.png';
            $filepath = $directory . '/' . $filename;
            
            // Generate QR Code dan simpan
            QrCode::format('png')
                ->size(300)
                ->margin(2)
                ->generate($data, $filepath);
            
            return '/qrcodes/' . $filename;
        }
    }