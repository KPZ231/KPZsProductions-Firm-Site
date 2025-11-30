'use client'
import { useEffect, useRef } from 'react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.opacity = '0';
      headerRef.current.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        if (headerRef.current) {
          headerRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          headerRef.current.style.opacity = '1';
          headerRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <section className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0a0a] min-h-[250px] sm:min-h-[450px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .header-box {
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

        @media (max-width: 640px) {
          .header-box {
            font-size: 14px;
          }
        }
      `}</style>

      <div 
        ref={headerRef} 
        className="header-box mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden subtle-glow scan-effect"
      >
        {/* Header - ukryty na mobile */}
        <div className="hidden sm:flex bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 sm:px-6 py-3 sm:py-4 items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>
            <span className="text-[#f8b500] text-[10px] sm:text-xs tracking-wider">// HEADER.TSX</span>
          </div>
          <div className="text-[#6faadb] text-[10px] sm:text-xs">
            <span className="text-[#f8b500]">React Component</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-16 grid-pattern">
          {/* Line numbers and code */}
          <div className="flex gap-3 sm:gap-4 lg:gap-6">
            {/* Line numbers - ukryte na mobile */}
            <div className="hidden sm:flex text-[#7ba4d4] text-xs sm:text-sm select-none flex-col gap-1.5 sm:gap-2 pt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
            </div>

            {/* Code content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base">
                {/* Import statement - ukryty na mobile */}
                <div className="hidden sm:block break-words">
                  <span className="text-[#61afef]">import</span>
                  <span className="text-[#8ba5c4]"> {'{ '}</span>
                  <span className="text-[#98c379]">Component</span>
                  <span className="text-[#8ba5c4]">{' }'}</span>
                  <span className="text-[#61afef]"> from</span>
                  <span className="text-[#98c379]"> 'react';</span>
                </div>
                
                {/* Biała przestrzeń - ukryta na mobile */}
                <div className="hidden sm:block h-3 sm:h-4"></div>

                {/* Comment - ukryty na mobile */}
                <div className="hidden sm:block">
                  <span className="text-[#8ba5c4]">// Main heading</span>
                </div>

                {/* Return statement - ukryty na mobile */}
                <div className="hidden sm:block">
                  <span className="text-[#8ba5c4]">return</span>
                  <span className="text-[#61afef]"> (</span>
                </div>

                {/* ✅ ZMIENIONE: Title - wycentrowany na mobile, wyrównany do lewej na desktop */}
                <div className="sm:pl-4 mt-0 sm:mt-4 mb-2 sm:mb-3 text-center sm:text-left">
                  <h2 className="text-[#ffc59c] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight break-words">
                    {title}
                  </h2>
                </div>

                {/* Closing bracket - ukryty na mobile */}
                <div className="hidden sm:block mt-1 sm:mt-2">
                  <span className="text-[#61afef]">);</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar - ukryty na mobile */}
          <div className="hidden sm:flex mt-8 sm:mt-10 lg:mt-12 pt-3 sm:pt-4 border-t border-[#2a2a2a] flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-[#8ba5c4] text-[10px] sm:text-xs">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-[#e06c75]">JSX</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#98c379]">UTF-8</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#61afef]">Spaces: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6faadb]">Ln</span> 7
              <span className="text-[#6faadb] ml-2">Col</span> {title.length + 11}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
