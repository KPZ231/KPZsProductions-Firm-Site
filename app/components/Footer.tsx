'use client'
import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
    <footer className="w-full bg-[#0a0a0a] border-t border-[#222222]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        .footer-container {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .footer-link {
          transition: all 0.2s ease;
          position: relative;
          color: #999999;
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
          color: #cccccc;
          padding-left: 4px;
        }
        
        .social-icon {
          transition: all 0.3s ease;
          border: 1px solid #2a2a2a;
          background: #0d0d0d;
        }
        
        .social-icon:hover {
          background: #1a1a1a;
          border-color: #3a3a3a;
          transform: translateY(-2px);
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      <div ref={footerRef} className="footer-container mx-auto px-6 grid-pattern">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-8 md:p-12 place-items-center md:place-items-start">
          {/* Logo/Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="text-[#555555] text-xs mb-2">
              <span className="text-[#666666]">/**</span>
              <div className="pl-3">* Brand identity</div>
              <span className="text-[#666666]"> */</span>
            </div>
            <div className="bg-[#0d0d0d] border border-[#222222] rounded p-6">
              <div className="text-2xl font-bold text-[#cccccc] mb-2">
                <Image src={"/Images/logo_white.png"} alt="logo" width={200} height={100}></Image>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <div className="text-[#888888] text-sm font-semibold mb-2">
              // QUICK_LINKS
            </div>
            <nav className="flex flex-col gap-2">
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
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-6">
            {/* Social Media */}
            <div>
              <div className="text-[#888888] text-sm font-semibold mb-3">
                // SOCIAL_MEDIA
              </div>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon w-12 h-12 flex items-center justify-center rounded text-[#888888] hover:text-[#cccccc] text-xs font-bold"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div className="text-[#f8b500] text-sm font-semibold mb-3">
                <span className="text-[#6faadb]">//</span> <span className="text-[#f8b500]">CONTACT_INFO</span>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+48501740587"
                  className="footer-link text-sm"
                >
                  +48 501 740 587
                </a>
                <a
                  href="mailto:kpzsproductionscontact@gmail.com"
                  className="footer-link text-xs break-all"
                >
                  kpzsproductionscontact@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a1a1a] px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#555555]">
            <div className="flex items-center gap-3">
              <span className="text-[#61afef]">const</span>
              <span className="text-[#c5d4e8]">year</span>
              <span className="text-[#e06c75]">=</span>
              <span className="text-[#ffc59c]">{getCurrentYear()}</span>
            </div>
            <div>
              <span className="text-[#6faadb]">// Copyright © </span>
              <span className="text-[#ffc59c]">{getCurrentYear()}</span>
              <span className="text-[#6faadb]"> KPZsProductions</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#f8b500]">v1.0.0</span>
              <span className="text-[#333333]">|</span>
              <span className="text-[#c5d4e8]">Built with Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}