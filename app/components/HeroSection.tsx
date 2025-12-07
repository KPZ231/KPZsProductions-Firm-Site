'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

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
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animacja początkowa - fade-in całego kontenera
    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Animacja nagłówka
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: "cubic.out" }
    );

    // Animacja tytułu - bardziej elegancka
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.35, ease: "cubic.out" }
    );

    // Animacja opisu
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.55, ease: "cubic.out" }
    );

    // Animacja przycisku CTA
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.75, ease: "cubic.out" }
    );

    // Animacja stopki
    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.9, ease: "power2.out" }
    );

    // Subtelna animacja całej sekcji treści (float effect)
    gsap.fromTo(
      contentRef.current,
      { y: 0 },
      {
        y: -8,
        duration: 3,
        delay: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    // Hover animacja przycisku
    const ctaButton = ctaRef.current;
    let cleanupFunctions: (() => void)[] = [];

    if (ctaButton) {
      const handleMouseEnter = () => {
        gsap.to(ctaButton, {
          y: -6,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(ctaButton, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      ctaButton.addEventListener("mouseenter", handleMouseEnter);
      ctaButton.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        ctaButton.removeEventListener("mouseenter", handleMouseEnter);
        ctaButton.removeEventListener("mouseleave", handleMouseLeave);
      });
    }

    // ScrollTrigger - dla efektu parallax
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top center",
      onUpdate: (self) => {
        gsap.to(contentRef.current, {
          y: self.getVelocity() * 0.1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    // Cleanup
    return () => {
      cleanupFunctions.forEach(fn => fn());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="w-[95%] mt-4 mx-auto flex items-center justify-center bg-[#0a0a0a] min-h-[70vh]">
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
        
        /* ✅ POPRAWIONE style przycisku - usunięto konflikty */
        .cta-button { 
          cursor: pointer;
          min-height: 48px;
          min-width: 120px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          /* Tylko background/border/shadow transition - NIE transform! */
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .cta-button:hover {
          background: linear-gradient(135deg, #f8b500 0%, #e09600 100%);
          border-color: #f8b500;
          box-shadow: 0 4px 16px rgba(248, 181, 0, 0.4);
        }

        /* ✅ Usunięto !important które blokowało GSAP */

        @media (max-width: 640px) {
          .cta-button {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <div 
        ref={heroRef} 
        className="hero-box w-full bg-[#111111] border rounded-2xl border-[#2a2a2a] subtle-glow scan-effect"
      >
        <div 
          ref={headerRef}
          className="hidden sm:flex bg-[#0d0d0d] border-b border-[#2a2a2a] px-6 sm:px-8 lg:px-12 py-3 sm:py-4 items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>
            <span className="text-[#f8b500] text-xs tracking-wider">// HERO.TSX</span>
          </div>
          <div className="text-[#6faadb] text-xs">
            <span className="text-[#f8b500]">Main Landing</span>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16 grid-pattern flex flex-col gap-6">
          <div className="flex gap-4 sm:gap-6">
            <div className="hidden sm:flex text-[#7ba4d4] text-sm select-none flex-col gap-2 pt-1">
              {Array.from({ length: 17 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col gap-4 sm:gap-6">
              <h1 
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#60a5fa] leading-tight break-words"
              >
                {title}
              </h1>
              
              <p 
                ref={descRef}
                className="text-[#d0dae8] text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed break-words"
              >
                {desc}
              </p>
              
              <Link
                ref={ctaRef}
                href={ctaButtonLink}
                className="cta-button bg-gradient-to-r from-[#f8b500] to-[#e09600] text-[#0a0a0a] px-8 sm:px-10 py-3 sm:py-4 border border-[#f8b500] text-base sm:text-lg font-semibold rounded-lg shadow-lg mt-2"
              >
                {ctaButtonContent}
              </Link>
            </div>
          </div>

          <div 
            ref={footerRef}
            className="hidden sm:flex mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#2a2a2a] flex-col sm:flex-row items-start sm:items-center justify-between text-[#8ba5c4] text-xs gap-2 sm:gap-0"
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
