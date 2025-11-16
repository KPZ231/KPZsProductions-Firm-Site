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
  <section className="w-full flex items-center justify-center p-6 bg-[#0a0a0a]">
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
      `}</style>

      <div ref={headerRef} className="header-box mx-auto w-[90%]  bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow scan-effect">
        {/* Header */}
        <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>
            <span className="text-[#f8b500] text-xs tracking-wider">// HEADER.TSX</span>
          </div>
          <div className="text-[#6faadb] text-xs">
            <span className="text-[#f8b500]">React Component</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 lg:p-16 grid-pattern">
          {/* Line numbers and code */}
          <div className="flex gap-6">
            {/* Line numbers */}
            <div className="text-[#6faadb] text-sm select-none flex flex-col gap-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
            </div>

            {/* Code content */}
            <div className="flex-1">
              <div className="flex flex-col gap-2 text-sm md:text-base">
                {/* Import statement */}
                <div>
                  <span className="text-[#61afef]">import</span>
                  <span className="text-[#7ba4d4]"> {'{ '}</span>
                  <span className="text-[#98c379]">Component</span>
                  <span className="text-[#7ba4d4]">{' }'}</span>
                  <span className="text-[#61afef]"> from</span>
                  <span className="text-[#98c379]"> 'react';</span>
                </div>
                
                <div className="h-4"></div>

                {/* Comment */}
                <div>
                  <span className="text-[#7ba4d4]">// Main heading</span>
                </div>

                {/* Return statement with JSX */}
                <div>
                  <span className="text-[#7ba4d4]">return</span>
                  <span className="text-[#61afef]"> (</span>
                </div>

                {/* The actual title with proper indentation */}
                <div className="pl-4 text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mt-2">
                  <span className="text-[#61afef]">&lt;</span>
                  <span className="text-[#7ba4d4]">h2</span>
                  <span className="text-[#61afef]">&gt;</span>
                  <h2 className="text-[#ffc59c]">{title}</h2>
                  <span className="text-[#61afef]">&lt;/</span>
                  <span className="text-[#7ba4d4]">h2</span>
                  <span className="text-[#61afef]">&gt;</span>
                </div>

                <div className="mt-2">
                  <span className="text-[#61afef]">);</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="mt-12 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[#7ba4d4] text-xs">
            <div className="flex items-center gap-4">
              <span className="text-[#e06c75]">JSX</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#98c379]">UTF-8</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#61afef]">Spaces: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6faadb]">Ln</span> 7
              <span className="text-[#6faadb]">Col</span> {title.length + 11}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}