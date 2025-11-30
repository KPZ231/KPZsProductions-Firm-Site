'use client'
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CTAProps {
  title: string;
  description: string;
  ctaButtonContent: string;
  ctaButtonLink: string;
}

export default function CTA({
  title,
  description,
  ctaButtonContent,
  ctaButtonLink,
}: CTAProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // Animacja całego boksu
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Animacja przycisku z opóźnieniem
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          delay: 0.3,
          ease: "back.out(1.2)" 
        }
      );
    }

    // ✅ GSAP hover animations
    const ctaButton = ctaRef.current;
    let cleanupFunctions: (() => void)[] = [];

    if (ctaButton) {
      const handleMouseEnter = () => {
        gsap.to(ctaButton, {
          y: -4,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(ctaButton, {
          y: 0,
          scale: 1,
          duration: 0.3,
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

    // ✅ Cleanup
    return () => {
      cleanupFunctions.forEach(fn => fn());
    };
  }, []);

  return (
    <section className="min-h-[50vh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .cta-box {
          font-family: 'JetBrains Mono', monospace;
        }

        .subtle-glow {
          box-shadow: 0 0 40px rgba(100, 100, 100, 0.08);
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .scan-effect {
          position: relative;
          overflow: hidden;
        }

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
            rgba(100, 100, 100, 0.03),
            transparent
          );
          animation: scan 8s linear infinite;
        }

        @keyframes scan {
          0% { top: -100%; }
          100% { top: 200%; }
        }

        /* ✅ POPRAWIONE style przycisku */
        .cta-button {
          opacity: 0; /* Początkowy stan - ukryty */
          border-radius: 0.5rem;
          min-height: 48px;
          min-width: 120px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          /* Tylko background/border/shadow - BEZ transform! */
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #f8b500 0%, #e09600 100%);
          border-color: #f8b500;
          box-shadow: 0 4px 16px rgba(248, 181, 0, 0.4);
        }

        /* ✅ Usunięto :active z transform - GSAP kontroluje transform */

        @media (max-width: 640px) {
          .cta-button {
            width: 100%;
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <div
        ref={boxRef}
        className="cta-box mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden subtle-glow scan-effect"
      >
        {/* Header - ukryty na mobile */}
        <div className="hidden sm:flex bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 sm:px-6 py-3 sm:py-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>
            <span className="text-[#f8b500] text-xs tracking-wider">// CTA.TSX</span>
          </div>
          <div className="text-[#6faadb] text-xs">
            <span className="text-[#f8b500]">Call to Action</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 grid-pattern">
          <div className="flex gap-4 sm:gap-6">
            {/* Line numbers - ukryte na mobile */}
            <div className="hidden sm:flex text-[#7ba4d4] text-sm select-none flex-col gap-2 pt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
            </div>

            {/* Code content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 text-sm">
                {/* Comment - ukryty na mobile */}
                <div className="hidden sm:block">
                  <span className="text-[#7ba4d4]">/**</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[#7ba4d4]"> * </span>
                  <span className="text-[#d0dae8]">@component CTA Section</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[#7ba4d4]"> */</span>
                </div>

                <div className="hidden sm:block h-2"></div>

                {/* Return statement - ukryty na mobile */}
                <div className="hidden sm:block">
                  <span className="text-[#61afef]">return</span>
                  <span className="text-[#e06c75]"> (</span>
                </div>

                {/* Section opening - ukryty na mobile */}
                <div className="hidden sm:block pl-4">
                  <span className="text-[#e06c75]">&lt;</span>
                  <span className="text-[#61afef]">section</span>
                  <span className="text-[#e06c75]">&gt;</span>
                </div>

                {/* Title */}
                <div className="sm:pl-8 mt-2 sm:mt-4">
                  <div className="hidden sm:block mb-1">
                    <span className="text-[#7ba4d4]">&lt;</span>
                    <span className="text-[#61afef]">h2</span>
                    <span className="text-[#7ba4d4]">&gt;</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#ffc59c] sm:pl-4 mb-3 sm:mb-1 leading-tight break-words">
                    {title}
                  </h2>
                  <div className="hidden sm:block">
                    <span className="text-[#7ba4d4]">&lt;/</span>
                    <span className="text-[#61afef]">h2</span>
                    <span className="text-[#7ba4d4]">&gt;</span>
                  </div>
                </div>

                {/* Description */}
                <div className="sm:pl-8 mt-4 sm:mt-4">
                  <div className="hidden sm:block mb-1">
                    <span className="text-[#7ba4d4]">&lt;</span>
                    <span className="text-[#61afef]">p</span>
                    <span className="text-[#7ba4d4]">&gt;</span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-[#d0dae8] sm:pl-4 mb-6 sm:mb-4 leading-relaxed break-words">
                    {description}
                  </p>
                  <div className="hidden sm:block">
                    <span className="text-[#7ba4d4]">&lt;/</span>
                    <span className="text-[#61afef]">p</span>
                    <span className="text-[#7ba4d4]">&gt;</span>
                  </div>
                </div>

                {/* Button */}
                <div className="sm:pl-8 mt-6 sm:mt-6">
                  <Link
                    ref={ctaRef}
                    href={ctaButtonLink}
                    className="cta-button bg-gradient-to-r from-[#f8b500] to-[#e09600] text-[#0a0a0a] px-8 py-3 sm:py-3 text-base sm:text-lg border border-[#f8b500] font-semibold shadow-lg"
                  >
                    {ctaButtonContent}
                  </Link>
                </div>

                {/* Section closing - ukryty na mobile */}
                <div className="hidden sm:block pl-4 mt-4">
                  <span className="text-[#7ba4d4]">&lt;/</span>
                  <span className="text-[#61afef]">section</span>
                  <span className="text-[#7ba4d4]">&gt;</span>
                </div>

                <div className="hidden sm:block">
                  <span className="text-[#e06c75]">);</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar - ukryty na mobile */}
          <div className="hidden sm:flex mt-10 sm:mt-12 pt-3 sm:pt-4 border-t border-[#2a2a2a] items-center justify-between text-[#7ba4d4] text-xs">
            <div className="flex items-center gap-4">
              <span>TSX</span>
              <span className="text-[#4a4a4a]">|</span>
              <span>UTF-8</span>
              <span className="text-[#4a4a4a]">|</span>
              <span className="text-[#8ba5c4]">Spaces: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8ba5c4]">Ln</span> 14
              <span className="text-[#8ba5c4]">Col</span> 3
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
