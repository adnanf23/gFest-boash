import GlassButton from '@/components/molecule/backSwipe';
import { Wallet } from 'lucide-react';
import React, { useState } from 'react';

interface FormData {
    namaLengkap: string;
    noTelp: string;
    usia: string;
    alasan: string;
    namaSiswa: string;
    kelas: string;
}

type BodyData = {
  tipe_pendaftar: 'umum' | 'internal';
  nama_lengkap: string;
  no_telp: string;
  usia: number;
  alasan?: string;
  nama_siswa?: string;
  kelas?: string;
};

type TipePendaftar = 'umum' | 'internal';

export default function FormPendaftaran() {
    const [tipePendaftar, setTipePendaftar] = useState<TipePendaftar>('umum');
    const [formData, setFormData] = useState<FormData>({
        namaLengkap: '',
        noTelp: '',
        usia: '',
        alasan: '',
        namaSiswa: '',
        kelas: '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

const handleSubmit = async () => {
  // 🔹 Validasi frontend sederhana
  if (!formData.namaLengkap || !formData.noTelp || !formData.usia) {
    alert('⚠️ Mohon isi semua field wajib sebelum mengirim.');
    return;
  }

  if (tipePendaftar === 'internal' && (!formData.namaSiswa || !formData.kelas)) {
    alert('⚠️ Untuk pendaftar internal, nama siswa dan kelas wajib diisi.');
    return;
  }

  try {
    // 🔹 Gunakan tipe BodyData, bukan any
    const bodyData: BodyData = {
      tipe_pendaftar: tipePendaftar,
      nama_lengkap: formData.namaLengkap,
      no_telp: formData.noTelp,
      usia: Number(formData.usia), // pastikan integer
      alasan: formData.alasan || '',
      ...(tipePendaftar === 'internal'
        ? {
            nama_siswa: formData.namaSiswa,
            kelas: formData.kelas,
          }
        : {}),
    };

    console.log('Data yang dikirim ke server:', bodyData);

    const response = await fetch('http://127.0.0.1:8000/api/pendaftaran', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    console.log('Server response:', data);

    if (response.ok && data.success) {
      alert('✅ Pendaftaran berhasil!');
    } else {
      console.warn('Validasi gagal:', data.errors);
      const firstErrorKey = Object.keys(data.errors || {})[0];
      const firstErrorMsg = data.errors?.[firstErrorKey]?.[0];
      alert(`❌ ${firstErrorMsg || 'Validasi gagal'}`);
    }
  } catch (error) {
    console.error('Error saat submit:', error);
    alert('⚠️ Terjadi kesalahan saat mendaftar');
  }
};




    return (
        <>
            <GlassButton href="/kajian-akbar">Kembali</GlassButton>
            <div
                className="flex min-h-screen items-center justify-center p-4"
                style={{ backgroundColor: '#121216' }}
            >
                <div
                    className="w-full max-w-md space-y-6 rounded-lg p-6"
                    style={{ backgroundColor: '#1a1a1f' }}
                >
                    <h1 className="text-xl font-bold text-white">
                        Form Pendaftaran
                    </h1>

                    {/* Informasi Transfer */}
                    <div className="bg-yellow-1000 bg-opacity-30 border-y-ellow-700 rounded-lg border p-4">
                        <div className="flex items-start gap-3">
                            <Wallet className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-300" />
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-white">
                                    Informasi Transfer
                                </p>
                                <div className="space-y-0.5 text-sm text-gray-300">
                                    <p>
                                        Bank:{' '}
                                        <span className="font-medium text-white">
                                            BSI
                                        </span>
                                    </p>
                                    <p>
                                        Nama:{' '}
                                        <span className="font-medium text-white">
                                            SILMI DAULATUNNISA
                                        </span>
                                    </p>
                                    <p>
                                        No. Rekening:{' '}
                                        <span className="font-medium text-white">
                                            7329244987
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Tipe Pendaftar
                            </label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setTipePendaftar('umum')}
                                    className={`flex-1 rounded py-2 text-sm ${
                                        tipePendaftar === 'umum'
                                            ? 'bg-yellow-600 text-white'
                                            : 'bg-gray-700 text-gray-300'
                                    }`}
                                >
                                    Umum
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipePendaftar('internal')}
                                    className={`flex-1 rounded py-2 text-sm ${
                                        tipePendaftar === 'internal'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-300'
                                    }`}
                                >
                                    Internal
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="namaLengkap"
                                value={formData.namaLengkap}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400"
                                placeholder="Nama lengkap"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                No Telepon
                            </label>
                            <input
                                type="tel"
                                name="noTelp"
                                value={formData.noTelp}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400"
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Usia
                            </label>
                            <select
                                name="usia"
                                value={formData.usia}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
                            >
                                <option value="">Pilih usia</option>
                                <option value="20">20 - 30 tahun</option>
                                <option value="31">31 - 40 tahun</option>
                                <option value="41">41 - 50 tahun</option>
                                <option value="50">50+ tahun</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Alasan Mengikuti
                            </label>
                            <textarea
                                name="alasan"
                                value={formData.alasan}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400"
                                placeholder="Alasan Anda"
                            />
                        </div>

                        {tipePendaftar === 'internal' && (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Nama Siswa
                                    </label>
                                    <input
                                        type="text"
                                        name="namaSiswa"
                                        value={formData.namaSiswa}
                                        onChange={handleChange}
                                        className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400"
                                        placeholder="Nama siswa"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Kelas
                                    </label>
                                    <input
                                        type="text"
                                        name="kelas"
                                        value={formData.kelas}
                                        onChange={handleChange}
                                        className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400"
                                        placeholder="Contoh: X IPA 1"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full rounded bg-yellow-600 py-2 text-sm text-white hover:bg-blue-700"
                        >
                            Daftar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
