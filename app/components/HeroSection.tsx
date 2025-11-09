'use client'
import { useEffect, useRef } from "react";

interface HeroProps {
  title: string;
  desc: string;
  ctaButtonContent: string;
  ctaButtonLink: string;
}

export default function Hero({
  title,
  desc,
  ctaButtonContent,
  ctaButtonLink,
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        if (heroRef.current) {
          heroRef.current.style.transition = 'opacity 1s ease, transform 1s ease';
          heroRef.current.style.opacity = '1';
          heroRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .hero-box { font-family: 'JetBrains Mono', monospace; }
        .subtle-glow { box-shadow: 0 0 60px rgba(100, 100, 100, 0.12); }
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .scan-effect { position: relative; overflow: hidden; }
        .scan-effect::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(100, 100, 100, 0.04),
            transparent
          );
          animation: scan 10s linear infinite;
        }
        @keyframes scan { 0% { top: -100%; } 100% { top: 200%; } }
        .cta-button { transition: all 0.3s ease; }
        .cta-button:hover {
          background: #222222;
          border-color: #3a3a3a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .typing-cursor::after {
          content: '|';
          animation: blink 1s infinite;
          margin-left: 4px;
        }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

        /* Responsywność */
        @media (max-width: 768px) {
          .line-numbers { display: none; }
          .code-content { font-size: 0.875rem; }
          .cta-button { padding: 0.75rem 1.5rem; font-size: 0.875rem; }
        }
        @media (max-width: 480px) {
          h1 { font-size: 1.75rem; }
          p { font-size: 0.875rem; }
          .cta-button { padding: 0.5rem 1rem; font-size: 0.8rem; }
        }
      `}</style>

      <div ref={heroRef} className="hero-box w-full bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow scan-effect">
        <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#2a2a2a]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2a2a2a]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2a2a2a]"></div>
            </div>
            <span className="text-[#666666] text-xs tracking-wider">HERO.TSX</span>
          </div>
          <div className="text-[#444444] text-xs">
            <span className="text-[#666666]">Main Landing</span>
          </div>
        </div>

        <div className="p-6 md:p-12 grid-pattern flex flex-col gap-6">
          <div className="flex gap-4 md:gap-6 flex-wrap">
            <div className="line-numbers text-[#333333] text-sm select-none flex flex-col gap-2">
              {Array.from({ length: 17 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className="flex-1 code-content text-sm md:text-base flex flex-col gap-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#e0e0e0] leading-tight">{title}</h1>
              <p className="text-[#999999] sm:text-lg md:text-xl max-w-3xl leading-relaxed">{desc}</p>
              <a
                href={ctaButtonLink}
                className="cta-button inline-block bg-[#1a1a1a] text-[#cccccc] hover:text-white px-8 sm:px-10 py-3 sm:py-4 border border-[#2a2a2a] text-base sm:text-lg font-medium rounded"
              >
                {ctaButtonContent}
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[#555555] text-xs gap-2 sm:gap-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span>TSX</span>
              <span className="text-[#333333]">|</span>
              <span>UTF-8</span>
              <span className="text-[#333333]">|</span>
              <span className="text-[#666666]">React 18.x</span>
              <span className="text-[#333333]">|</span>
              <span className="text-[#666666]">Next.js</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#666666]">Ln</span> 17
              <span className="text-[#666666]">Col</span> 2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
