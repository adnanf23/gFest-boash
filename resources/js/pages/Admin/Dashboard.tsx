import { useEffect, useState } from "react";
import axios from "axios";
// import { router } from "@inertiajs/react";
import Sidebar from "@/components/template/sidebar";
// LogOut tidak lagi di-import di sini jika sudah ada di Sidebar
import { Home, Users, Settings, FileText, Trash2 } from "lucide-react"; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import H1 from "@/components/atom/heading";
import Paragraph from "@/components/atom/paragraph";

// [Type Definitions]
type IconComponent = typeof Home;

interface MenuItem {
  icon: IconComponent;
  label: string;
  href: string;
  badge?: string | number;
  onClick?: () => void;
}

// 🎯 KOREKSI: Tambahkan semua kolom baru dari database
interface Pendaftaran {
  id: number;
  nama_lengkap: string;
  no_telp: string;
  usia: number;
  tipe_pendaftar: string;
  alasan?: string;
  nama_siswa?: string;
  kelas?: string;
  created_at?: string;
  // KOLOM BARU (ditambahkan di database)
  status: 'belum di cek' | 'diterima' | 'ditolak';
  username?: string;
  password?: string;
  qr_code_path?: string;
}

type ApiResponse = Pendaftaran[] | { data: Pendaftaran[] };

export default function AdminDashboard() {
  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);
  
  const [activeTab, setActiveTab] = useState<string>('');
  
  // 🎯 STATE BARU UNTUK MODAL DETAIL
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftaran | null>(null); 

  // 1. Inisialisasi dan Pemantauan Hash URL
  useEffect(() => {
    const updateActiveTab = () => {
        const hash = window.location.hash.substring(1); 
        setActiveTab(hash || 'overview'); 
    };

    updateActiveTab();
    window.addEventListener('hashchange', updateActiveTab);

    return () => {
      window.removeEventListener('hashchange', updateActiveTab);
    };
  }, []); 

  // 🎯 FUNGSI BARU: Update Status (ACC/Reject)
  const handleUpdateStatus = async (id: number, newStatus: 'diterima' | 'ditolak'): Promise<void> => {
    if (!window.confirm(`Yakin ingin mengubah status ID ${id} menjadi ${newStatus}? Tindakan ini akan ${newStatus === 'diterima' ? 'menggenerasi kredensial.' : 'menghapus kredensial yang ada.'}`)) {
        return;
    }
    
    try {
        // Panggil API updateStatus yang sudah Anda buat di PendaftaranController
        const res = await axios.put(`http://localhost:8000/api/pendaftaran/update-status/${id}`, { status: newStatus }); 
        
        const updatedPendaftar = res.data.pendaftar as Pendaftaran;
        
        setPendaftaran((prev) => 
            prev.map((p) => (p.id === id ? updatedPendaftar : p))
        );
        alert(`Status berhasil diubah menjadi ${newStatus}.`);

    } catch (error) {
        console.error("Gagal update status:", error);
        alert("Gagal update status. Pastikan API updateStatus berfungsi dan kolom database ada.");
    }
  };

  // 🎯 FUNGSI BARU: Membuka Modal Detail
  const handleViewDetails = (pendaftar: Pendaftaran) => {
    setSelectedPendaftar(pendaftar);
    setShowModal(true);
  };
  
  // 🗑️ Fungsi hapus data (tetap sama)
  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?")) {
        return;
    }
    
    try {
      await axios.delete(`http://localhost:8000/api/admin/pendaftaran/${id}`); 
      setPendaftaran((prev) => prev.filter((p) => p.id !== id));
      console.log(`Data pendaftar ID ${id} berhasil dihapus.`);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus. Pastikan Anda memiliki izin akses.");
    }
  };

  useEffect(() => {
      axios
        .get<ApiResponse>("http://localhost:8000/api/pendaftaran") 
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setPendaftaran(data ?? []); 
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
      });
  }, []);

  // [Logika Grafik dan Data Statistik tetap sama]
  const targetTotal = 1000;
  const startDate = new Date();
  const endDate = new Date('2025-12-01');
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const totalWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  const targetPerWeek = Math.ceil(targetTotal / totalWeeks);

  const getWeekNumber = (date: Date) => {
    const onejan = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const millisecsInDay = 86400000;
    return Math.ceil((((date.getTime() - onejan.getTime()) / millisecsInDay) + onejan.getDay() + 1) / 7);
  };

  const weeklyData: { [key: number]: number } = {};
  pendaftaran.forEach((item) => {
    const createdDate = item.created_at ? new Date(item.created_at) : new Date();
    const weekNum = getWeekNumber(createdDate);
    weeklyData[weekNum] = (weeklyData[weekNum] || 0) + 1;
  });

  const chartData = [];
  const currentWeek = getWeekNumber(startDate);
  
  for (let i = 0; i < totalWeeks; i++) {
    const weekNum = currentWeek + i;
    const targetCumulative = targetPerWeek * (i + 1);
    const actualCumulative = Object.keys(weeklyData)
      .filter(key => parseInt(key) <= weekNum)
      .reduce((sum, key) => sum + weeklyData[parseInt(key)], 0);
    
    chartData.push({
      minggu: `Minggu ${i + 1}`,
      target: targetCumulative > targetTotal ? targetTotal : targetCumulative,
      aktual: i === 0 ? actualCumulative : (i < totalWeeks ? actualCumulative : 0)
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // const todayRegistrations = pendaftaran.filter((item) => {
  //   const createdDate = item.created_at ? new Date(item.created_at) : new Date();
  //   createdDate.setHours(0, 0, 0, 0);
  //   return createdDate.getTime() === today.getTime();
  // }).length;
  
  const pendingRegistrations = pendaftaran.filter(p => p.status === 'belum di cek').length;

  // Custom menu items untuk admin
  const adminMenuItems: MenuItem[] = [
    { icon: Home, label: 'Overview', href: '#overview' }, 
    { icon: Users, label: 'Manage', href: '#manage', badge: pendingRegistrations > 0 ? pendingRegistrations : undefined },
  ];

  return (
    <Sidebar brandName="Administrator" menuItems={adminMenuItems}>
      <div className="p-6 bg-gray-950 min-h-screen">
        
        {/* Header (Selalu ditampilkan) */}
        <div className="mb-6 pb-4">
          <H1 className="text-3xl font-bold text-blue-500">
            {activeTab === 'manage' ? 'Kelola Data Pendaftar' : 'Dashboard Admin'}
          </H1>
          <Paragraph className="text-gray-400 mt-2">
             {activeTab === 'manage' ? 'Daftar lengkap pendaftar dan opsi kelola status.' : 'Ringkasan performa pendaftaran.'}
          </Paragraph>
        </div>

        {/* ======================================================= */}
        {/* TAMPILAN OVERVIEW (Sama) */}
        {/* ======================================================= */}
        {activeTab === 'overview' && (
            <>
                {/* Stats Cards (Sama) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm font-medium">Total Pendaftar</p>
                          <p className="text-5xl font-bold text-white mt-2">{pendaftaran.length}</p>
                          <p className="text-gray-400 text-xs mt-1">Target: {targetTotal}</p>
                        </div>
                        <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <Users className="text-white" size={28} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm font-medium">Belum Dicek</p>
                          <p className="text-5xl font-bold text-white mt-2">{pendingRegistrations}</p>
                          <p className="text-gray-400 text-xs mt-1">Total Pendaftar Baru</p>
                        </div>
                        <div className="w-14 h-14 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                          <FileText className="text-white" size={28} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm font-medium">Status</p>
                          <p className="text-2xl font-bold text-green-400 mt-2">Aktif</p>
                          <p className="text-gray-400 text-xs mt-1">Sistem berjalan</p>
                        </div>
                        <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <Settings className="text-white" size={28} />
                        </div>
                      </div>
                    </div>
                </div>

                {/* Grafik Pendaftar (Sama) */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-xl overflow-hidden mb-6 border border-gray-600">
                    <div className="p-6 border-b border-gray-600">
                      <h2 className="text-xl font-semibold text-white">Grafik Pendaftar Mingguan (Target: 1000 Pendaftar)</h2>
                      <p className="text-gray-400 text-sm mt-1">
                        Periode: Sekarang - 1 Desember 2025 ({totalWeeks} minggu) • Target per minggu: {targetPerWeek}
                      </p>
                    </div>
                    <div className="p-6">
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                          <XAxis 
                            dataKey="minggu" 
                            stroke="#9ca3af"
                            style={{ fontSize: '14px', fontWeight: '500' }}
                          />
                          <YAxis 
                            stroke="#9ca3af"
                            style={{ fontSize: '14px' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1f2937', 
                              border: '1px solid #374151', 
                              borderRadius: '12px',
                              color: '#fff',
                              padding: '12px'
                            }}
                            labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                          />
                          <Legend 
                            wrapperStyle={{ 
                              paddingTop: '20px',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="target" 
                            stroke="#ef4444" 
                            strokeWidth={3}
                            dot={{ fill: '#ef4444', r: 6, strokeWidth: 2, stroke: '#fff' }}
                            name="Target"
                            activeDot={{ r: 8 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="aktual" 
                            stroke="#8b5cf6" 
                            strokeWidth={3}
                            dot={{ fill: '#8b5cf6', r: 6, strokeWidth: 2, stroke: '#fff' }}
                            name="Aktual"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="mt-4 flex items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                          <span className="text-gray-300">Target: <span className="font-bold text-white">{targetTotal}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300">Aktual: <span className="font-bold text-white">{pendaftaran.length}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300">Progress: <span className="font-bold text-green-400">{((pendaftaran.length / targetTotal) * 100).toFixed(1)}%</span></span>
                        </div>
                      </div>
                    </div>
                </div>
            </>
        )}

        {/* ======================================================= */}
        {/* TAMPILAN MANAGE (Tabel Data Pendaftaran) */}
        {/* ======================================================= */}
        {activeTab === 'manage' && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-xl overflow-auto border border-gray-600">
              <div className="p-6 border-b border-gray-600">
                <h2 className="text-xl font-semibold text-white">Data Pendaftaran</h2>
                <p className="text-gray-400 text-sm mt-1">Daftar lengkap pendaftar</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-900/50 text-left text-sm font-semibold text-gray-300 border-b border-gray-600">
                      <th className="p-4 w-16">ID</th>
                      <th className="p-4">Nama Lengkap</th>
                      <th className="p-4">No. Telp</th>
                      <th className="p-4 w-24">Usia</th>
                      <th className="p-4">Tipe</th>
                      <th className="p-4">Status</th> {/* ⬅️ Kolom Status Baru */}
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendaftaran.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center p-8 text-gray-400">
                          <Users className="mx-auto mb-2 text-gray-500" size={48} />
                          <p>Belum ada data pendaftar.</p>
                        </td>
                      </tr>
                    ) : (
                      pendaftaran.map((item) => (
                        <tr key={item.id} className="border-b border-gray-600/50 hover:bg-gray-700/50 transition duration-100">
                          <td className="p-4 text-gray-300">{item.id}</td>
                          <td className="p-4 font-medium text-white">{item.nama_lengkap}</td>
                          <td className="p-4 text-gray-300">{item.no_telp}</td>
                          <td className="p-4 text-gray-300">{item.usia}</td>
                          <td className="p-4">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-600 text-white">
                              {item.tipe_pendaftar}
                            </span>
                          </td>
                          {/* ⬅️ Tampilan Status */}
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full 
                              ${item.status === 'diterima' ? 'bg-green-600' : 
                                item.status === 'ditolak' ? 'bg-red-600' : 
                                'bg-yellow-600'} text-white`}>
                              {item.status.toUpperCase()}
                            </span>
                          </td>
                          {/* ⬅️ Tombol Aksi */}
                          <td className="p-4 text-center space-x-2 flex items-center justify-center">
                            
                            {/* Tombol Lihat (Hanya aktif jika status DITERIMA) */}
                                <button
                                  onClick={() => handleViewDetails(item)}
                                  className="bg-blue-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-700 transition font-medium"
                                >
                                  Lihat
                                </button>
                            
                            {/* Tombol ACC (hanya aktif jika belum di cek atau ditolak) */}
                            {item.status !== 'diterima' && (
                                <button
                                  onClick={() => handleUpdateStatus(item.id, 'diterima')}
                                  className="bg-green-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-green-700 transition font-medium"
                                >
                                  ACC
                                </button>
                            )}

                            {/* Tombol Reject (hanya aktif jika belum di cek atau diterima) */}
                            {item.status !== 'ditolak' && (
                                <button
                                  onClick={() => handleUpdateStatus(item.id, 'ditolak')}
                                  className="bg-red-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                  Reject
                                </button>
                            )}

                            {/* Tombol Hapus */}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-900 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-800 transition font-medium"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
        )}
        
        {/* 🎯 MODAL DETAIL (Untuk Tombol Lihat) */}
        {showModal && selectedPendaftar && (
            <div className="fixed inset-0 bg-[#000000c4] bg-opacity-30 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Detail Kredensial Pendaftar</h3>
                    
                    <div className="space-y-3 text-gray-300">
                        <p><strong>Nama:</strong> <span className="text-white">{selectedPendaftar.nama_lengkap}</span></p>
                        <p><strong>Status:</strong> <span className="text-green-400 font-bold">{selectedPendaftar.status.toUpperCase()}</span></p>
                        <p><strong>Username:</strong> <span className="text-white font-mono">{selectedPendaftar.username || 'N/A'}</span></p>
                        {/* Password default: 12345678 (Sesuai PendaftaranController) */}
                        <p><strong>Password Default:</strong> <span className="text-white font-mono">12345678</span></p> 
                    </div>

                    <div className="mt-6 text-center">
                        <h4 className="font-semibold text-lg text-white mb-3">QR Code Akses</h4>
                       {selectedPendaftar.qr_code_path ? (
    <img 
        // 🎯 Ganti localhost menjadi 127.0.0.1 untuk sinkronisasi dengan server yang terdeteksi
        src={`http://127.0.0.1:8000${selectedPendaftar.qr_code_path}`} 
        alt={`QR Code ${selectedPendaftar.username}`} 
        className="mx-auto w-48 h-48 border-4 border-white p-2 bg-white rounded-lg shadow-xl"
        // Tambahkan onError untuk debug
        onError={(e) => {
            console.error("QR Code gagal dimuat. URL yang dicoba:", e.currentTarget.src);
            e.currentTarget.onerror = null; // Mencegah loop
        }}
    />
) : (
    <p className="text-red-400">QR Code belum digenerate atau tidak ditemukan.</p>
)}
                    </div>

                    <button
                        onClick={() => setShowModal(false)}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        )}

      </div>
    </Sidebar>
  );
}