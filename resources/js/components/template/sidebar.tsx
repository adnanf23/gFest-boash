import { useState, ReactNode } from 'react';
import { Menu, X, Home, Users, Settings, FileText, LogOut } from 'lucide-react'; // Import LogOut icon
import axios from "axios";
import { router } from "@inertiajs/react";

// --- TYPE DEFINITIONS ---
type IconComponent = typeof Home;

interface MenuItem {
  icon: IconComponent;
  label: string;
  href: string;
  badge?: string | number;
  onClick?: () => void; // Optional click handler
}

interface SidebarProps {
  children: ReactNode;
  menuItems?: MenuItem[];
  logo?: string;
  brandName?: string;
}

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ 
  children, 
  menuItems: customMenuItems,
  logo,
  brandName = 'MyApp'
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0); 

  // --- LOGOUT HANDLER ---
  const handleLogout = async () => {
    try {
      // Assuming a POST request to /api/admin/logout to invalidate the session
      await axios.post("/api/admin/logout"); 
      // Redirect to the login page using Inertia
      router.visit("/admin/login");
    } catch (error) {
      console.error("Logout gagal:", error);
      // Fallback redirect even on failure
      router.visit("/admin/login"); 
    }
  };

  // --- MENU ITEMS DEFINITION ---
  const defaultMenuItems: MenuItem[] = [
    { icon: Home, label: 'Dashboard', href: '#dashboard' },
    { icon: Users, label: 'Users', href: '#users', badge: 5 },
    { icon: FileText, label: 'Documents', href: '#documents' },
    { icon: Settings, label: 'Settings', href: '#settings' },
  ];
  
  // Menu items to be rendered in the main navigation area
  const menuItemsToRender = customMenuItems || defaultMenuItems;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-br from-gray-800 to-gray-700 text-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            {logo && <img src={logo} alt="Logo" className="w-8 h-8" />}
            <h1 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>
              {brandName}
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items (Fixed) */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItemsToRender.map((item, index) => { // Render main menu items
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                    className={`flex items-center justify-between gap-4 p-3 rounded-lg transition-all ${
                      activeIndex === index
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <IconComponent size={20} className="flex-shrink-0" />
                      <span className={`${!isOpen && 'hidden'} font-medium`}>
                        {item.label}
                      </span>
                    </div>
                    {item.badge && isOpen && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer (with Logout Button) */}
        <div className={`p-4 border-t border-gray-700`}> 
          {/* Admin Profile Info */}
          <div className={`flex items-center gap-3 ${!isOpen && 'hidden'} mb-4`}>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          
          {/* Logout Button in Footer */}
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
              handleLogout(); // Call the logout function
            }}
            // Use a class to center content when sidebar is closed (only icon visible)
            className={`flex items-center gap-4 p-3 rounded-lg transition-all text-red-400 hover:bg-red-700 hover:text-white ${!isOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className={`${!isOpen && 'hidden'} font-medium`}>
              Logout
            </span>
          </a>
        </div>
      </aside>

      {/* Main Content Area (Children) */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Sidebar