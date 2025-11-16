'use client'

import { useEffect, useRef } from "react";

interface CitedTextProps {
  content: string;
}

export default function CitedText({ content }: CitedTextProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Simple fade-in animation
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
    <div className="w-full lg:w-[90%] mx-auto mb-12 mt-12 px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        .code-box {
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

      <div
        ref={boxRef}
        className="code-box w-full bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow scan-effect"
      >
        {/* Header */}
        <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>
            <span className="text-[#f8b500] text-xs tracking-wider">// MISSION.TS</span>
          </div>
          <div className="text-[#6faadb] text-xs">
            <span className="text-[#61afef]">readonly</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 lg:p-12 grid-pattern">
          {/* Line numbers and code */}
          <div className="flex gap-6">
            {/* Line numbers */}
            <div className="text-[#6faadb] text-sm select-none flex flex-col gap-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>

            {/* Code content */}
            <div className="flex-1 text-sm md:text-base">
              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-[#6faadb]">/**</span>
                </div>
                <div>
                  <span className="text-[#6faadb]"> * </span>
                  <span className="text-[#7ba4d4]">@description Our mission statement</span>
                </div>
                <div>
                  <span className="text-[#6faadb]"> */</span>
                </div>
                <div className="mt-2">
                  <span className="text-[#61afef]">const </span>
                  <span className="text-[#98c379]">mission</span>
                  <span className="text-[#6faadb]"> = </span>
                  <span className="text-[#cfe8ff]">"{content}"</span>
                  <span className="text-[#6faadb]">;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="mt-8 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[#7ba4d4] text-xs">
            <div className="flex items-center gap-4">
              <span className="text-[#e06c75]">TypeScript</span>
              <span className="text-[#6faadb]">|</span>
              <span className="text-[#98c379]">UTF-8</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6faadb]">Ln</span> 4
              <span className="text-[#6faadb]">Col</span> {content.length + 18}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}