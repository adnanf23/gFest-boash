import { useState, FormEvent } from "react";
import axios from "axios";
import H1 from "@/components/atom/heading";
import Paragraph from "@/components/atom/paragraph";



export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/pendaftar/login", { username, password });

      if (res.status === 200) {
        // Simpan token/session jika perlu, atau langsung redirect
        window.location.href = "/admin/dashboard";
      }
    } catch (err: unknown) {
if (axios.isAxiosError(err)) {
            // Jika err adalah error Axios, properti '.response' akan ada.
            const errorMessage = err.response?.data?.message || "Terjadi kesalahan";
            
            setError(errorMessage);
            console.log(err.response?.data || err);
        } else {
            // Tangani error yang tidak berasal dari Axios
            setError("Terjadi kesalahan yang tidak diketahui.");
            console.log(err);
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="space-y-2">
        <H1>Portal Masuk Pendaftar</H1>
<Paragraph>Silahkan masuk untuk melihat status pendaftaran dan informasi acara!</Paragraph>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 mb-4">
            {error}
          </div>
        )}
<br /><br />
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-8">
          {/* Username */}
          <div>
            <label className="text-gray-300 block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div><br />

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </>
            ) : (
              "Login"
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
  );
}
