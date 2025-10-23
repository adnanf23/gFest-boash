import H1 from '@/components/atom/heading';
import Paragraph from '@/components/atom/paragraph';
import GlassButton from '@/components/molecule/backSwipe';
import { Wallet, User, Phone, Calendar, MessageSquare, BookOpen, GraduationCap, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react'; 
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react'; 
import axios from 'axios';

type TipePendaftar = 'umum' | 'internal';

// Komponen Input Field dengan Icon
const InputField = ({ label, name, type = 'text', value, onChange, placeholder, Icon, error }: {
    label: string; 
    name: string; 
    type?: string; 
    value: string; 
    onChange: React.ChangeEventHandler<HTMLInputElement>; 
    placeholder: string; 
    Icon: React.ElementType; 
    error?: string;
}) => (
    <div>
        <label className="text-gray-300 block mb-1">{label}</label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full p-3 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                    error ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder={placeholder}
            />
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
);

// Komponen Textarea Field dengan Icon
const TextareaField = ({ label, name, value, onChange, placeholder, Icon, error }: {
    label: string; 
    name: string; 
    value: string; 
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>; 
    placeholder: string; 
    Icon: React.ElementType; 
    error?: string;
}) => (
    <div>
        <label className="text-gray-300 block mb-1">{label}</label>
        <div className="relative">
            <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={3}
                className={`w-full p-3 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                    error ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder={placeholder}
            />
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
);

export default function FormPendaftaran() {
    const { 
        data, 
        setData, 
        post,
        processing, 
        errors, 
        reset,
    } = useForm({
        tipe_pendaftar: 'umum' as TipePendaftar,
        nama_lengkap: '',
        no_telp: '',
        usia: '',
        alasan: '',
        nama_siswa: '',
        kelas: '',
    });

    // ✅ HANYA 1 DEKLARASI statusMessage
    const [statusMessage, setStatusMessage] = useState<{ 
        type: 'success' | 'error'; 
        message: string; 
    } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setData(e.target.name as keyof typeof data, e.target.value);
        if (statusMessage) setStatusMessage(null);
    };

    const setTipePendaftar = (tipe: TipePendaftar) => {
        setData('tipe_pendaftar', tipe);
        if (tipe === 'umum') {
            setData('nama_siswa', '');
            setData('kelas', '');
        }
    };

    // ✅ GUNAKAN post() dari Inertia




const handleSubmit = async () => {
  const transformedData: Record<string, any> = { 
    ...data, 
    usia: Number(data.usia) 
  };

  if (data.tipe_pendaftar === 'umum') {
    delete transformedData.nama_siswa;
    delete transformedData.kelas;
  }

  try {
    const response = await axios.post('/api/pendaftaran', transformedData);
    console.log('AXIOS SUCCESS', response);
    setStatusMessage({ type: 'success', message: response.data.message || '✅ Pendaftaran berhasil!' });
    reset();
  } catch (err: any) {
    console.error('AXIOS ERROR:', err);
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;
    setStatusMessage({ type: 'error', message: `❌ Terjadi kesalahan (${status}): ${message}` });
  }
};




    const isInternal = data.tipe_pendaftar === 'internal';

    return (
        <>
            <GlassButton href="/kajian-akbar">Kembali</GlassButton>
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg space-y-6">
                    {/* Header */}
                    <div className='space-y-5'>
                        <H1 className="text-white">Form Pendaftaran</H1>
                        <Paragraph className="text-gray-400 text-sm">
                            Lengkapi data diri Anda untuk mendaftar kajian dan berikan infak terbaik anda! konfirmasi pendaftaran anda
                        </Paragraph>
                    </div>

                    {/* Notifikasi Status */}
                    {statusMessage && (
                        <div className={`border rounded-lg p-3 mb-4 text-sm flex items-center gap-2 ${
                            statusMessage.type === 'success' 
                                ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                                : 'bg-red-500/10 border-red-500/50 text-red-400'
                        }`}>
                            {statusMessage.type === 'success' 
                                ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> 
                                : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
                            <span>{statusMessage.message}</span>
                        </div>
                    )}

                    {/* Informasi Transfer */}
                    <div className="bg-yellow-600/10 border border-yellow-700 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Wallet className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-300" />
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-white">Informasi Transfer</p>
                                <div className="space-y-0.5 text-sm text-gray-300">
                                    <p>Bank: <span className="font-medium text-white">BSI</span></p>
                                    <p>Nama: <span className="font-medium text-white">SILMI DAULATUNNISA</span></p>
                                    <p>No. Rekening: <span className="font-medium text-white">7329244987</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        
                        {/* Tipe Pendaftar */}
                        <div>
                            <label className="mb-2 block text-gray-300 text-sm">Tipe Pendaftar</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setTipePendaftar('umum')}
                                    className={`flex-1 rounded py-2 text-sm transition duration-150 ${
                                        data.tipe_pendaftar === 'umum'
                                            ? 'bg-white font-semibold text-black'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-700/80'
                                    }`}
                                >
                                    Umum
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipePendaftar('internal')}
                                    className={`flex-1 rounded py-2 text-sm transition duration-150 ${
                                        data.tipe_pendaftar === 'internal'
                                            ? 'bg-white font-semibold text-black'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-700/80'
                                    }`}
                                >
                                    Internal
                                </button>
                            </div>
                            {errors.tipe_pendaftar && (
                                <p className="text-red-400 text-sm mt-1">{errors.tipe_pendaftar}</p>
                            )}
                        </div>

                        {/* Nama Lengkap */}
                        <InputField
                            label="Nama Lengkap" 
                            name="nama_lengkap" 
                            value={data.nama_lengkap} 
                            onChange={handleChange}
                            placeholder="Nama lengkap Anda" 
                            Icon={User} 
                            error={errors.nama_lengkap}
                        />

                        {/* No Telepon */}
                        <InputField
                            label="No Telepon" 
                            name="no_telp" 
                            type="tel" 
                            value={data.no_telp} 
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx" 
                            Icon={Phone} 
                            error={errors.no_telp}
                        />

                        {/* Usia */}
                        <div>
                            <label className="text-gray-300 block mb-1">Usia</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <select
                                    name="usia"
                                    value={data.usia}
                                    onChange={handleChange}
                                    className={`w-full p-3 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 appearance-none ${
                                        errors.usia ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                                >
                                    <option value="" disabled>Pilih usia</option>
                                    <option value="20">20 - 30 tahun</option>
                                    <option value="31">31 - 40 tahun</option>
                                    <option value="41">41 - 50 tahun</option>
                                    <option value="50">50+ tahun</option>
                                </select>
                            </div>
                            {errors.usia && <p className="text-red-400 text-sm mt-1">{errors.usia}</p>}
                        </div>

                        {/* Alasan Mengikuti */}
                        <TextareaField
                            label="Alasan Mengikuti" 
                            name="alasan" 
                            value={data.alasan} 
                            onChange={handleChange}
                            placeholder="Alasan Anda mengikuti kajian ini" 
                            Icon={MessageSquare} 
                            error={errors.alasan}
                        />

                        {/* Field Internal */}
                        {isInternal && (
                            <>
                                <InputField
                                    label="Nama Siswa" 
                                    name="nama_siswa" 
                                    value={data.nama_siswa} 
                                    onChange={handleChange}
                                    placeholder="Nama siswa yang Anda daftarkan" 
                                    Icon={BookOpen} 
                                    error={errors.nama_siswa}
                                />

                                <InputField
                                    label="Kelas" 
                                    name="kelas" 
                                    value={data.kelas} 
                                    onChange={handleChange}
                                    placeholder="Contoh: X IPA 1" 
                                    Icon={GraduationCap} 
                                    error={errors.kelas}
                                />
                            </>
                        )}

                        {/* Tombol Daftar */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 text-black" />
                                    Memproses...
                                </>
                            ) : (
                                "Daftar Sekarang"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            © 2025 Admin Dashboard. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}