'use client'
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about-us", label: "About Us" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
    { href: "/pricing", label: "Pricing" },
  ];

  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.style.opacity = '0';
      navbarRef.current.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (navbarRef.current) {
          navbarRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          navbarRef.current.style.opacity = '1';
          navbarRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-[#222222] sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        .navbar-container { font-family: 'JetBrains Mono', monospace; }
        .nav-link {
          transition: all 0.25s ease;
          position: relative;
          color: #c5d4e8;
          font-size: 0.875rem;
        }
        .nav-link::before {
          content: '→ ';
          opacity: 0;
          margin-right: -12px;
          transition: all 0.25s ease;
          color: #ffc59c;
        }
        .nav-link:hover::before { 
          opacity: 1;
          margin-right: 4px;
        }
        .nav-link:hover { 
          color: #ffc59c;
          padding-left: 4px;
        }
        .nav-link.active {
          color: #ffc59c;
        }
        .nav-link.active::before {
          width: 100%;
          background: #ffc59c;
          content: '';
        }
        .logo-container { transition: all 0.3s ease; }
        .logo-container:hover { transform: scale(1.05); }
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      <div ref={navbarRef} className="navbar-container mx-auto w-[90%] px-6 py-4 grid-pattern">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>

            <a href="/" className="logo-container flex items-center">
              <img src="/Images/logo_white.png" alt="KPZsProductions Logo" className="h-10 w-auto" />
            </a>

            <div className="hidden lg:block text-[#555555] text-xs">
              <span className="text-[#6faadb]">//</span> <span className="text-[#f8b500]">NAV.TSX</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div key={index} className="flex items-center gap-6">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 && <span className="text-[#333333]">|</span>}
                </div>
              );
            })}
          </div>

          {/* Hamburger - Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-between w-6 h-6 focus:outline-none"
            >
              <span className={`block h-0.5 w-full bg-[#888] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block h-0.5 w-full bg-[#888] transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`block h-0.5 w-full bg-[#888] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-[#0a0a0a] p-4 rounded border border-[#222]">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={index}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}

        {/* Bottom code line (optional) */}
        <div className="mt-3 text-[#444444] text-xs hidden xl:block">
          <span className="text-[#61afef]">const</span>
          <span className="text-[#c5d4e8]"> navigation </span>
          <span className="text-[#e06c75]">= </span>
          <span className="text-[#c5d4e8]">[</span>
          {navLinks.map((link, index) => (
            <span key={index}>
              <span className="text-[#999999]">'{link.label}'</span>
              {index < navLinks.length - 1 && <span className="text-[#888888]">, </span>}
            </span>
          ))}
          <span className="text-[#888888]">];</span>
        </div>
      </div>
    </nav>
  );
}
