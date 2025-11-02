import { useState, ReactNode } from 'react';
import { Menu, X, Home, Users, Settings, FileText, LogOut } from 'lucide-react';
import axios from "axios";
import { router } from "@inertiajs/react";

type IconComponent = typeof Home;

interface MenuItem {
  icon: IconComponent;
  label: string;
  href: string;
  badge?: string | number;
  onClick?: () => void;
}

interface SidebarProps {
  children: ReactNode;
  menuItems?: MenuItem[];
  logo?: string;
  brandName?: string;
}

const Sidebar = ({ 
  children, 
  menuItems: customMenuItems,
  logo,
  brandName = 'MyApp'
}: SidebarProps) => {
  // Default: TERTUTUP
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0); 

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout");
      router.visit("/admin/login");
    } catch (error) {
      console.error("Logout gagal:", error);
      router.visit("/admin/login"); 
    }
  };

  const defaultMenuItems: MenuItem[] = [
    { icon: Home, label: 'Dashboard', href: '#dashboard' },
    { icon: Users, label: 'Users', href: '#users', badge: 5 },
    { icon: FileText, label: 'Documents', href: '#documents' },
    { icon: Settings, label: 'Settings', href: '#settings' },
  ];

  const menuItemsToRender = customMenuItems || defaultMenuItems;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-68 fixed' : 'w-20'
        } bg-gradient-to-br h-full z-60 from-gray-800 to-gray-700 text-white transition-all duration-300 ease-in-out flex flex-col`}
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

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItemsToRender.map((item, index) => {
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

        {/* Footer */}
        <div className={`p-4 border-t border-gray-700`}> 
          <div className={`flex items-center gap-3 ${!isOpen && 'hidden'} mb-4`}>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all text-red-400 hover:bg-red-700 hover:text-white ${!isOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className={`${!isOpen && 'hidden'} font-medium`}>
              Logout
            </span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
