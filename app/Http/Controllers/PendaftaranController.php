<?php

namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;



class PendaftaranController extends Controller
{
    // 🟢 Tampilkan form pendaftaran
    public function index()
    {
        return Inertia::render('kajian-akbar/pendaftaran');
    }

    // 🟢 Simpan data pendaftaran baru (langsung generate username + QR)
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

        // Default status langsung diterima
        // Default status: belum dicek
$validated['status'] = 'belum dicek';
        $password = '12345678';

        // Simpan dulu agar punya ID
        $pendaftaran = Pendaftaran::create($validated);

        // Generate username unik
        $username = $this->generateUsername($pendaftaran->nama_lengkap, $pendaftaran->id);

        // Simpan username dan password hash
        $pendaftaran->username = $username;
        $pendaftaran->password = Hash::make($password);

        // ✅ QR code hanya berisi username dan status
        $qrData = json_encode([
            'username' => $username,
            'status' => $pendaftaran->status
        ]);

        $qrCodePath = $this->generateQRCode($qrData, $username);
        $pendaftaran->qr_code_path = $qrCodePath;

        $pendaftaran->save();

        return response()->json([
            'message' => 'Pendaftaran berhasil disimpan dan QR code telah dibuat!',
            'data' => $pendaftaran
        ], 201);
    }

    // 🟢 Ambil semua data
    public function list()
    {
        return response()->json(Pendaftaran::orderBy('created_at', 'desc')->get());
    }

    // 🟢 Detail 1 pendaftar
    public function show($id)
    {
        return response()->json(Pendaftaran::findOrFail($id));
    }

    // 🟢 Hapus data
    public function destroy($id)
    {
        $pendaftaran = Pendaftaran::findOrFail($id);

        if ($pendaftaran->qr_code_path) {
            $filePath = public_path($pendaftaran->qr_code_path);
            if (file_exists($filePath)) unlink($filePath);
        }

        $pendaftaran->delete();

        return response()->json(['message' => 'Pendaftaran berhasil dihapus!']);
    }

    // 🟢 Update status (ACC / Reject)r
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:diterima,ditolak'
        ]);

        $pendaftaran = Pendaftaran::findOrFail($id);
        $newStatus = $validated['status'];

        if ($newStatus === 'diterima') {
            $username = $pendaftaran->username ?? $this->generateUsername($pendaftaran->nama_lengkap, $pendaftaran->id);
            $password = '12345678';

            $pendaftaran->username = $username;
            $pendaftaran->password = Hash::make($password);
            $pendaftaran->status = 'diterima';

            // ✅ QR hanya username dan status
            $qrData = json_encode([
                'username' => $username,
                'status' => $newStatus
            ]);

            $qrCodePath = $this->generateQRCode($qrData, $username);
            $pendaftaran->qr_code_path = $qrCodePath;

        } elseif ($newStatus === 'ditolak') {
            // Hapus QR code dan kredensial
            if ($pendaftaran->qr_code_path) {
                $filePath = public_path($pendaftaran->qr_code_path);
                if (file_exists($filePath)) unlink($filePath);
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

    // 🧩 Helper: generate username unik
    private function generateUsername($namaLengkap, $id)
    {
        $cleanName = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $namaLengkap));
        $shortName = substr($cleanName, 0, 8);
        return $shortName . $id;
    }

    // 🧩 Helper: generate QR code
private function generateQRCode($data, $username)
{
    $directory = public_path('qrcodes');
    if (!file_exists($directory)) {
        mkdir($directory, 0755, true);
    }

    $filename = 'qr_' . $username . '.png';
    $filepath = $directory . '/' . $filename;

    try {
        // Buat QR code minimal (cukup memasukkan data)
        $qrCode = new QrCode($data);

        // Jika method setSize tersedia, gunakan; jika tidak, biarkan
        if (method_exists($qrCode, 'setSize')) {
            $qrCode->setSize(300);
        }

        // Jika ada method setMargin gunakan, jika tidak abaikan
        if (method_exists($qrCode, 'setMargin')) {
            $qrCode->setMargin(5);
        }

        // Tulis PNG menggunakan writer modern (tersedia di banyak versi)
        $writer = new PngWriter();
        $result = $writer->write($qrCode);

        // Simpan file ke public/qrcodes/
        $result->saveToFile($filepath);

        return '/qrcodes/' . $filename;
    } catch (\Throwable $e) {
        \Log::error('QR generation failed: '.$e->getMessage());
        // Lempar ulang supaya caller (controller) tahu terjadi error 500
        throw $e;
    }
}


}
