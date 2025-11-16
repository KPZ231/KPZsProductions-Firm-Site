'use client'
import { useEffect, useRef } from 'react';

export default function ImageGrid() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.opacity = '0';
      gridRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (gridRef.current) {
          gridRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          gridRef.current.style.opacity = '1';
          gridRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  const techStack = [
    [
      { name: 'Astro', icon: '🚀', color: '#FF5D01' },
      { name: 'React', icon: '⚛️', color: '#61DAFB' },
      { name: 'Next.js', icon: '▲', color: '#000000' },
    ],
    [
      { name: 'WordPress', icon: 'W', color: '#21759B' },
      { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
      { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
    ],
    [
      { name: 'Tailwind', icon: '🎨', color: '#06B6D4' },
      { name: 'HTML', icon: '<>', color: '#E34F26' },
      { name: 'CSS', icon: '#', color: '#1572B6' },
    ],
  ];

  return (
    <section className="min-h-[50vh] w-full flex items-center justify-center p-6 bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .tech-grid {
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
        
        .tech-card {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .tech-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          border-radius: 0.5rem;
          transition: border-color 0.3s ease;
        }
        
        .tech-card:hover::before {
          border-color: #333333;
        }
        
        .tech-card:hover {
          transform: translateY(-2px);
          background: #1a1a1a;
        }
      `}</style>

  <div ref={gridRef} className="tech-grid mx-auto w-[90%] max-w-6xl">
        {/* Header */}
        <div className="bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow mb-6">
          <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
              </div>
              <span className="text-[#f8b500] text-xs tracking-wider">// TECH_STACK.TSX</span>
            </div>
            <div className="text-[#6faadb] text-xs">
              <span className="text-[#f8b500]">9 technologies</span>
            </div>
          </div>

          <div className="p-8 grid-pattern">
            {/* Comment */}
            <div className="mb-6 text-[#7ba4d4] text-sm">
              <span className="text-[#6faadb]">/**</span>
              <div className="pl-3">* Technologies we work with</div>
              <span className="text-[#6faadb]"> */</span>
            </div>

            {/* Tech Grid */}
            <div className="space-y-3">
              {techStack.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-3">
                  {row.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className={`tech-card bg-[#0d0d0d] border border-[#222222] rounded-lg p-6 flex flex-col items-center justify-center gap-3 ${
                        techIndex === 0 ? 'w-1/2' : 'w-1/4'
                      }`}
                    >
                      {/* Icon/Logo placeholder */}
                      <div className="text-4xl text-[#888888]">
                        {tech.icon}
                      </div>
                      
                      {/* Tech name */}
                      <div className="text-center">
                        <div className="text-sm font-medium" style={{ color: tech.color }}>
                          {tech.name}
                        </div>
                        <div className="text-[#555555] text-xs mt-1">
                          // {tech.name.toLowerCase().replace(' ', '_')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[#555555] text-xs">
              <div className="flex items-center gap-4">
                <span>const technologies</span>
                <span className="text-[#333333]">|</span>
                <span className="text-[#666666]">Array&lt;Tech&gt;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#666666]">Total:</span> {techStack.flat().length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}