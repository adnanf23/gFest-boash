import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
// Link tidak digunakan, tapi tetap di-import jika Anda berencana menggunakannya
import { Link } from "@inertiajs/react"; 

// 🧩 Type definition untuk 1 pendaftar
interface Pendaftaran {
  id: number;
  nama_lengkap: string;
  no_telp: string;
  usia: number;
  tipe_pendaftar: string;
  alasan?: string;
  nama_siswa?: string;
  kelas?: string;
}

export default function AdminDashboard() {
  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);

  // 🚪 Fungsi Logout
  const handleLogout = async () => {
    try {
      // Mengirim request POST ke endpoint logout Laravel
      await axios.post("/api/admin/logout"); 

      // Redirect ke halaman login admin menggunakan Inertia
      router.visit("/admin/login");
    } catch (error) {
      console.error("Logout gagal:", error);
      // Tetap redirect meskipun gagal (kemungkinan session sudah expired)
      router.visit("/admin/login"); 
    }
  };

  // 🗑️ Fungsi hapus data
  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?")) {
        return;
    }
    
    try {
      // Menggunakan endpoint DELETE yang diasumsikan terproteksi (api/admin/pendaftaran/{id})
      // Pastikan URL dan endpoint ini sesuai dengan yang Anda definisikan di routes/web.php
      await axios.delete(`http://localhost:8000/api/admin/pendaftaran/${id}`); 
      
      // Update state secara lokal (optimistic update)
      setPendaftaran((prev) => prev.filter((p) => p.id !== id));
      console.log(`Data pendaftar ID ${id} berhasil dihapus.`);

    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus. Pastikan Anda memiliki izin akses.");
    }
  };

  useEffect(() => {
    // 📝 Catatan: Cek login berbasis token telah dihapus karena otentikasi ditangani oleh middleware Laravel (auth:admin)
    
    axios
      // Mengambil data pendaftaran
      .get("http://localhost:8000/api/pendaftaran") 
      .then((res) => {
        // Pastikan Anda menangani kasus di mana data berada di res.data.data (Resource Collection)
        setPendaftaran(res.data.data ?? res.data); 
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        // Jika middleware Laravel menolak, Inertia akan melakukan redirect
      });
  }, []);


  return (
    <div className="p-6">
      
      {/* Header dengan Tombol Logout */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-150"
        >
          Logout
        </button>
      </div>

      {/* Tabel Data Pendaftaran */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 border-b border-gray-300">
              <th className="p-3 w-16">ID</th>
              <th className="p-3 w-48">Nama Lengkap</th>
              <th className="p-3 w-32">No. Telp</th>
              <th className="p-3 w-16">Usia</th>
              <th className="p-3 w-32">Tipe</th>
              <th className="p-3 w-20 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pendaftaran.length === 0 ? (
                <tr>
                    <td colSpan={6} className="text-center p-4 text-gray-500">
                        Belum ada data pendaftar.
                    </td>
                </tr>
            ) : (
                pendaftaran.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50 transition duration-100">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.nama_lengkap}</td>
                      <td className="p-3">{item.no_telp}</td>
                      <td className="p-3">{item.usia}</td>
                      <td className="p-3">{item.tipe_pendaftar}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-600 transition duration-150"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}