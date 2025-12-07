'use client'
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/case-studies", label: "Case Studies" },
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

  // Zamknij menu po kliknięciu w link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-[#2a2a2a] sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        .navbar-container { 
          font-family: 'JetBrains Mono', monospace; 
        }
        
        .nav-link {
          transition: all 0.25s ease;
          position: relative;
          color: #d0dae8;
          font-size: 0.875rem;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        
        .nav-link::before {
          content: '→ ';
          opacity: 0;
          margin-right: -12px;
          transition: all 0.25s ease;
          color: #f8b500;
        }
        
        .nav-link:hover::before { 
          opacity: 1;
          margin-right: 4px;
        }
        
        .nav-link:hover { 
          color: #f8b500;
          padding-left: 4px;
        }
        
        .nav-link.active {
          color: #f8b500;
          font-weight: 600;
        }
        
        .logo-container { 
          transition: all 0.3s ease;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        
        .logo-container:hover { 
          transform: scale(1.05); 
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .hamburger-button {
          min-width: 48px;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .hamburger-button:hover {
          background: #1a1a1a;
          border-radius: 0.5rem;
        }

        .hamburger-line {
          transition: all 0.3s ease;
        }

        /* Mobile menu animation */
        .mobile-menu {
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div ref={navbarRef} className="navbar-container mx-auto w-full max-w-[95%] sm:max-w-[90%] px-4 sm:px-6 py-3 sm:py-4 grid-pattern">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Kropki - ukryte na mobile */}
            <div className="hidden md:flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>

            <Link href="/" className="logo-container">
              <div className="relative h-8 sm:h-10 w-auto">
                <Image 
                  src="/Images/logo_white.png" 
                  alt="KPZsProductions Logo" 
                  width={160}
                  height={40}
                  className="h-full w-auto"
                  priority
                />
              </div>
            </Link>

            {/* Komentarz NAV.TSX - ukryty na mobile i tablet */}
            <div className="hidden lg:block text-[#6a6a6a] text-xs">
              <span className="text-[#7ba4d4]">//</span> <span className="text-[#f8b500]">NAV.TSX</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div key={index} className="flex items-center gap-4 lg:gap-6">
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                  {/* Separator | - ukryty na mobile */}
                  {index < navLinks.length - 1 && (
                    <span className="hidden lg:inline text-[#4a4a4a]">|</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hamburger - Mobile (min 48x48px touch target) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-button -mr-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col justify-between w-6 h-5 relative">
                <span 
                  className={`hamburger-line block h-0.5 w-full bg-[#b5b5b5] absolute top-0 ${
                    menuOpen ? "rotate-45 top-2" : ""
                  }`}
                ></span>
                <span 
                  className={`hamburger-line block h-0.5 w-full bg-[#b5b5b5] absolute top-2 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span 
                  className={`hamburger-line block h-0.5 w-full bg-[#b5b5b5] absolute top-4 ${
                    menuOpen ? "-rotate-45 top-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu md:hidden mt-4 flex flex-col gap-1 bg-[#0d0d0d] p-3 rounded-lg border border-[#2a2a2a]">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`nav-link px-3 py-2 rounded hover:bg-[#1a1a1a] ${
                    isActive ? "active bg-[#1a1a1a]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
