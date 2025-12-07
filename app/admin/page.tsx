'use client'

import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Posty Blog', value: '12', href: '/admin/blog', icon: '📝' },
    { label: 'Case Studies', value: '8', href: '/admin/case-studies', icon: '🎯' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#ffc59c] mb-2">Witaj w Panelu Admina</h2>
        <p className="text-[#d0dae8]">Zarządzaj zawartością swojej strony</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#00bfff] transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#d0dae8] text-sm">{stat.label}</p>
                <p className="text-4xl font-bold text-[#ffc59c] mt-2">{stat.value}</p>
              </div>
              <span className="text-5xl">{stat.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
        <h3 className="text-xl font-bold text-[#ffc59c] mb-4">Szybkie akcje</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-[#1a1a1a] border border-[#3a3a3a] text-[#d5d5d5] hover:bg-[#f8b500] hover:text-[#0a0a0a] rounded transition-all duration-300 text-center font-semibold"
          >
            + Nowy Post Blog
          </Link>
          <Link
            href="/admin/case-studies/new"
            className="px-4 py-2 bg-[#1a1a1a] border border-[#3a3a3a] text-[#d5d5d5] hover:bg-[#f8b500] hover:text-[#0a0a0a] rounded transition-all duration-300 text-center font-semibold"
          >
            + Nowe Case Study
          </Link>
        </div>
      </div>
    </div>
  );
}
