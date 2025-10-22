import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const listNav = [
    { title: "About", href: "/#about" },
    { title: "Event", href: "/#event" },
    { title: "Kerja Sama", href: "/#partnership" },
    { title: "Kontak", href: "/#contact" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Overlay untuk mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl bg-[#202020]/90 shadow-lg rounded-full px-6 py-3 flex items-center justify-between border border-gray-700/50 backdrop-blur-md">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center text-white font-bold text-lg hover:text-indigo-400 transition-colors relative z-50"
        >
          gFest
        </a>

        {/* NAV MENU - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {listNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-300 text-sm font-medium hover:text-yellow-300 transition-colors relative group"
            >
              {item.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* NAV MENU - Mobile Sidebar */}
        <div
          className={`md:hidden fixed top-0 right-0 h-screen w-72 bg-[#1a1a1a] shadow-2xl transition-transform duration-300 ease-out z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-[400px]"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header mobile menu */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <span className="text-white font-bold text-lg">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-1 p-4 flex-1">
              {listNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-gray-300 text-base font-medium hover:text-white hover:bg-gray-800/50 transition-all px-4 py-3 rounded-lg"
                >
                  {item.title}
                </a>
              ))}
            </div>

            {/* CTA Button in mobile menu */}
            <div className="p-6 border-t border-gray-700/50">
              <a
                href="#"
                onClick={handleLinkClick}
                className="block w-full bg-yellow-300 text-white text-center px-4 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Dashboard Admin
              </a>
            </div>
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="flex items-center gap-3">
          {/* Tombol CTA (desktop only) */}
          <a
            href="#"
            className="hidden md:flex bg-yellow-300 text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-yellow-600 hover:text-white hover:shadow-lg hover:shadow-yellow-300/50 transition-all"
          >
            Dashboard Admin
          </a>

          {/* Tombol Hamburger (mobile) - hanya tampil saat menu tertutup */}
          {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-gray-300 hover:text-white transition-colors p-1"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </header>
    </>
  );
}