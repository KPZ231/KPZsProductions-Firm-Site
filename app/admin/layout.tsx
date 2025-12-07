'use client'

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: 'Pulpit', href: '/admin', icon: '📊' },
    { label: 'Posty Blog', href: '/admin/blog', icon: '📝' },
    { label: 'Case Studies', href: '/admin/case-studies', icon: '🎯' },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#111111] border-r border-[#2a2a2a] transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-[#2a2a2a]">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#00bfff] hover:text-[#ffc59c] transition-colors"
          >
            {isSidebarOpen ? '☰' : '›'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-[#d0dae8] hover:bg-[#1a1a1a] hover:text-[#ffc59c] rounded transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2a2a2a]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-[#d0dae8] hover:bg-red-900/20 hover:text-red-400 rounded transition-colors text-sm"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span>Wyloguj</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#111111] border-b border-[#2a2a2a] px-6 py-4">
          <h1 className="text-2xl font-bold text-[#ffc59c]">Panel Administracyjny</h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
