'use client'
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.opacity = '0';
      boxRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        if (boxRef.current) {
          boxRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          boxRef.current.style.opacity = '1';
          boxRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0a0a0a]">
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

        .cta-button {
          transition: all 0.3s ease;
          border-radius: 0.375rem; /* rounded */
        }

        .cta-button:hover {
          background: #222222;
          border-color: #3a3a3a;
          transform: translateY(-2px);
        }
      `}</style>

      <div
        ref={boxRef}
        className="cta-box w-full max-w-7xl bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow scan-effect px-4 sm:px-6 md:px-8"
      >
        {/* Header */}
        <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
            </div>
            <span className="text-[#666666] text-xs tracking-wider">CTA.TSX</span>
          </div>
          <div className="text-[#444444] text-xs">
            <span className="text-[#666666]">Call to Action</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-12 grid-pattern">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Line numbers */}
            <div className="text-[#333333] text-sm select-none flex flex-row sm:flex-col gap-2 sm:gap-1">
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
            <div className="flex-1">
              {/* Comment */}
              <div className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="text-[#555555]">/**</span>
                </div>
                <div>
                  <span className="text-[#555555]"> * </span>
                  <span className="text-[#666666]">@component CTA Section</span>
                </div>
                <div>
                  <span className="text-[#555555]"> */</span>
                </div>

                <div className="h-2"></div>

                {/* Return statement */}
                <div>
                  <span className="text-[#888888]">return</span>
                  <span className="text-[#666666]"> (</span>
                </div>

                {/* Section opening */}
                <div className="pl-4">
                  <span className="text-[#666666]">&lt;</span>
                  <span className="text-[#888888]">section</span>
                  <span className="text-[#666666]">&gt;</span>
                </div>

                {/* Title */}
                <div className="pl-8 mt-4">
                  <div className="mb-1">
                    <span className="text-[#666666]">&lt;</span>
                    <span className="text-[#888888]">h2</span>
                    <span className="text-[#666666]">&gt;</span>
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#cccccc] pl-2 sm:pl-4 mb-1">
                    {title}
                  </div>
                  <div>
                    <span className="text-[#666666]">&lt;/</span>
                    <span className="text-[#888888]">h2</span>
                    <span className="text-[#666666]">&gt;</span>
                  </div>
                </div>

                {/* Description */}
                <div className="pl-8 mt-4">
                  <div className="mb-1">
                    <span className="text-[#666666]">&lt;</span>
                    <span className="text-[#888888]">p</span>
                    <span className="text-[#666666]">&gt;</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg text-[#999999] pl-2 sm:pl-4 mb-4 max-w-full sm:max-w-2xl leading-relaxed">
                    {description}
                  </div>
                  <div>
                    <span className="text-[#666666]">&lt;/</span>
                    <span className="text-[#888888]">p</span>
                    <span className="text-[#666666]">&gt;</span>
                  </div>
                </div>

                {/* Button */}
                <div className="pl-8 mt-6">
                  <a
                    href={ctaButtonLink}
                    className="cta-button inline-block bg-[#1a1a1a] text-[#cccccc] hover:text-white px-6 py-2 text-sm sm:text-base border border-[#2a2a2a] font-medium rounded"
                  >
                    {ctaButtonContent}
                  </a>
                </div>

                {/* Section closing */}
                <div className="pl-4 mt-4">
                  <span className="text-[#666666]">&lt;/</span>
                  <span className="text-[#888888]">section</span>
                  <span className="text-[#666666]">&gt;</span>
                </div>

                <div>
                  <span className="text-[#666666]">);</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="mt-12 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[#555555] text-xs">
            <div className="flex items-center gap-4">
              <span>TSX</span>
              <span className="text-[#333333]">|</span>
              <span>UTF-8</span>
              <span className="text-[#333333]">|</span>
              <span className="text-[#666666]">Spaces: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#666666]">Ln</span> 14
              <span className="text-[#666666]">Col</span> 3
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
