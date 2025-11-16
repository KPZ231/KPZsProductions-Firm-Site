'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Rejestracja pluginu ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  desc: string;
  ctaButtonContent: string;
  ctaButtonLink: string;
}

export default function Hero({
  title = "Innowacyjne Rozwiązania Webowe",
  desc = "Tworzymy nowoczesne aplikacje z wykorzystaniem najnowszych technologii React i Next.js",
  ctaButtonContent = "Rozpocznij Projekt",
  ctaButtonLink = "#contact",
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animacja początkowa - fade-in całego kontenera
    gsap.fromTo(
      heroRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Animacja nagłówka (header z kropkami) - fade-in z opóźnieniem
    gsap.fromTo(
      headerRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      }
    );

    // Animacja tytułu - slide-in z lewej strony
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      }
    );

    // Animacja opisu - slide-in z lewej strony
    gsap.fromTo(
      descRef.current,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      }
    );

    // Animacja przycisku CTA - fade-in z scale effect
    gsap.fromTo(
      ctaRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.4)",
      }
    );

    // Animacja stopki - fade-in z dołu
    gsap.fromTo(
      footerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.0,
        ease: "power2.out",
      }
    );

    // Animacja hover dla przycisku CTA z użyciem GSAP
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      ctaButton.addEventListener("mouseenter", () => {
        gsap.to(ctaButton, {
          y: -4,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      ctaButton.addEventListener("mouseleave", () => {
        gsap.to(ctaButton, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // ScrollTrigger - animacja przy przewijaniu (jeśli sekcja nie jest widoczna na starcie)
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(heroRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      once: true, // Animacja tylko raz
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0a0a0a]">
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
        .cta-button { 
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }
        .cta-button:hover {
          background: #222222;
          border-color: #3a3a3a;
          color: white;
        }

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

      <div 
        ref={heroRef} 
        className="hero-box w-full bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow scan-effect"
      >
        {/* Header z kropkami */}
        <div 
          ref={headerRef}
          className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#f8b500]"></div>
                <div className="w-2 h-2 rounded-full bg-[#6faadb]"></div>
                <div className="w-2 h-2 rounded-full bg-[#e06c75]"></div>
              </div>
            <span className="text-[#f8b500] text-xs tracking-wider">// HERO.TSX</span>
          </div>
          <div className="text-[#6faadb] text-xs">
            <span className="text-[#f8b500]">Main Landing</span>
          </div>
        </div>

        {/* Główna zawartość */}
        <div className="p-6 md:p-12 grid-pattern flex flex-col gap-6">
          <div className="flex gap-4 md:gap-6 flex-wrap">
            <div className="line-numbers text-[#6faadb] text-sm select-none flex flex-col gap-2">
              {Array.from({ length: 17 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className="flex-1 code-content text-sm md:text-base flex flex-col gap-3">
              <h1 
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#60a5fa] leading-tight"
              >
                {title}
              </h1>
              <p 
                ref={descRef}
                className="text-[#c5d4e8] sm:text-lg md:text-xl max-w-3xl leading-relaxed"
              >
                {desc}
              </p>
              <a
                ref={ctaRef}
                href={ctaButtonLink}
                className="cta-button inline-block bg-linear-to-r from-blue-600 via-indigo-500 to-indigo-600 text-white px-8 sm:px-10 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded"
              >
                {ctaButtonContent}
              </a>
            </div>
          </div>

          {/* Stopka z informacjami */}
          <div 
            ref={footerRef}
            className="mt-8 pt-4 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[#7ba4d4] text-xs gap-2 sm:gap-0"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#e06c75]">TSX</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#98c379]">UTF-8</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#61afef]">React 18.x</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#61afef]">Next.js</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6faadb]">Ln</span> 17
              <span className="text-[#6faadb]">Col</span> 2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}