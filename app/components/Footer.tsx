'use client'
import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

function getCurrentYear() {
  return new Date().getFullYear();
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.style.opacity = '0';
      footerRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (footerRef.current) {
          footerRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          footerRef.current.style.opacity = '1';
          footerRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about-us", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
  ];

  const socialLinks = [
    { href: "https://www.instagram.com/kpzsproductions/", label: "Instagram", icon: "IG" },
    { href: "https://www.linkedin.com/in/kacper-duda-282150224/", label: "LinkedIn", icon: "in" },
    { href: "https://github.com/KPZ231", label: "Github", icon: "gh" },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#2a2a2a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        .footer-container {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .footer-link {
          transition: all 0.2s ease;
          position: relative;
          color: #b5b5b5;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        
        .footer-link::before {
          content: '→ ';
          opacity: 0;
          margin-right: -12px;
          transition: all 0.2s ease;
        }
        
        .footer-link:hover::before {
          opacity: 1;
          margin-right: 4px;
        }
        
        .footer-link:hover {
          color: #e5e5e5;
          padding-left: 4px;
        }

        .footer-link.active {
          color: #f8b500;
          font-weight: 600;
        }
        
        .social-icon {
          transition: all 0.3s ease;
          border: 1px solid #3a3a3a;
          background: #0d0d0d;
          min-width: 48px;
          min-height: 48px;
        }
        
        .social-icon:hover {
          background: #f8b500;
          border-color: #f8b500;
          color: #0a0a0a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(248, 181, 0, 0.3);
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* Responsywność */
        @media (max-width: 640px) {
          .social-icon:active {
            transform: scale(0.95);
          }
        }
      `}</style>

      <div ref={footerRef} className="footer-container mx-auto px-4 sm:px-6 lg:px-8 grid-pattern">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 p-6 sm:p-8 md:p-10 lg:p-12 place-items-center md:place-items-start">
          {/* Logo/Brand Section */}
          <div className="flex flex-col gap-4 w-full">
            {/* Komentarz ukryty na mobile */}
            <div className="hidden sm:block text-[#6a6a6a] text-xs mb-2">
              <span className="text-[#7a7a7a]">/**</span>
              <div className="pl-3">* Brand identity</div>
              <span className="text-[#7a7a7a]"> */</span>
            </div>
            <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-5 sm:p-6 flex items-center justify-center">
              <div className="relative w-full max-w-[180px] sm:max-w-[200px] h-auto">
                <Image 
                  src={"/Images/logo_white.png"} 
                  alt="KPZsProductions logo" 
                  width={200} 
                  height={100}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 w-full">
            {/* Komentarz ukryty na mobile */}
            <div className="hidden sm:block text-[#a5a5a5] text-sm font-semibold mb-2">
              // QUICK_LINKS
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`footer-link text-sm sm:text-base ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-6 sm:gap-8 w-full">
            {/* Social Media */}
            <div>
              {/* Komentarz ukryty na mobile */}
              <div className="hidden sm:block text-[#a5a5a5] text-sm font-semibold mb-3">
                // SOCIAL_MEDIA
              </div>
              <div className="flex gap-3 sm:gap-4 justify-center md:justify-start">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg text-[#b5b5b5] hover:text-[#0a0a0a] text-xs sm:text-sm font-bold"
                    title={social.label}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              {/* Nagłówek z komentarzem */}
              <div className="text-[#f8b500] text-sm sm:text-base font-semibold mb-3">
                {/* // ukryte na mobile */}
                <span className="hidden sm:inline text-[#7ba4d4]">// </span>
                <span className="text-[#f8b500]">CONTACT</span>
              </div>
              <div className="flex flex-col gap-3 sm:gap-2">
                <Link
                  href="tel:+48501740587"
                  className="footer-link text-sm sm:text-base font-medium hover:text-[#f8b500]"
                >
                  +48 501 740 587
                </Link>
                <Link
                  href="mailto:kpzsproductionscontact@gmail.com"
                  className="footer-link text-xs sm:text-sm break-all hover:text-[#f8b500]"
                >
                  kpzsproductionscontact@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a2a2a] px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#7a7a7a]">
            {/* Deklaracja const - ukryta na mobile */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[#61afef]">const</span>
              <span className="text-[#d0dae8]">year</span>
              <span className="text-[#e06c75]">=</span>
              <span className="text-[#f8b500]">{getCurrentYear()}</span>
            </div>
            
            {/* Copyright - zawsze widoczny */}
            <div className="text-center md:text-left">
              {/* // ukryty na mobile */}
              <span className="hidden sm:inline text-[#7ba4d4]">// </span>
              <span className="text-[#a5a5a5]">Copyright © </span>
              <span className="text-[#f8b500] font-semibold">{getCurrentYear()}</span>
              <span className="text-[#a5a5a5]"> KPZsProductions</span>
            </div>
            
            {/* Version info */}
            <div className="flex items-center gap-3 text-center">
              <span className="text-[#f8b500] font-semibold">v1.0.0</span>
              <span className="hidden sm:inline text-[#4a4a4a]">|</span>
              <span className="hidden sm:inline text-[#a5a5a5]">Built with Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
