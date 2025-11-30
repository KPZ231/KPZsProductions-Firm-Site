'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
      { name: 'Astro', image: '/Images/astro-logo.png', color: '#FF5D01' },
      { name: 'React', image: '/Images/react-logo.png', color: '#61DAFB' },
      { name: 'Next.js', image: '/Images/nextjs-logo.png', color: '#000000' },
    ],
    [
      { name: 'WordPress', image: '/Images/wp.png', color: '#21759B' },
      { name: 'TypeScript', image: '/Images/ts.png', color: '#3178C6' },
      { name: 'JavaScript', image: '/Images/js.png', color: '#F7DF1E' },
    ],
    [
      { name: 'Tailwind', image: '/Images/tailwind.png', color: '#06B6D4' },
      { name: 'HTML', image: '/Images/html.png', color: '#E34F26' },
      { name: 'CSS', image: '/Images/css.png', color: '#1572B6' },
    ],
  ];

  return (
    <section className="min-h-[50vh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0a0a]">
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
          min-height: 140px;
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
          border-color: #3a3a3a;
        }
        
        .tech-card:hover {
          transform: translateY(-4px);
          background: #1a1a1a;
        }

        .tech-card:hover .tech-image {
          transform: scale(1.1);
        }

        .tech-image {
          transition: transform 0.3s ease;
          filter: brightness(0.9);
        }

        .tech-card:hover .tech-image {
          filter: brightness(1);
        }

        /* Responsywność - touch feedback */
        @media (max-width: 640px) {
          .tech-card:active {
            transform: scale(0.98);
          }
        }
      `}</style>

      <div ref={gridRef} className="tech-grid mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-6xl">
        {/* Header */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden subtle-glow mb-4 sm:mb-6">
          {/* Header z kropkami - ukryty na mobile */}
          <div className="hidden sm:flex bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 sm:px-6 py-3 sm:py-4 items-center justify-between">
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

          <div className="p-5 sm:p-6 lg:p-8 grid-pattern">
            {/* Comment - ukryty na mobile */}
            <div className="hidden sm:block mb-4 sm:mb-6 text-[#8ba5c4] text-xs sm:text-sm">
              <span className="text-[#7ba4d4]">/**</span>
              <div className="pl-3">* Technologies we work with</div>
              <span className="text-[#7ba4d4]"> */</span>
            </div>

            {/* Tech Grid - responsywny */}
            <div className="space-y-3 sm:space-y-4">
              {techStack.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4">
                  {row.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className={`tech-card bg-[#8b8b8b] border border-[#2a2a2a] rounded-lg p-5 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 ${
                        // Na mobile wszystkie karty równej szerokości
                        'w-[calc(50%-0.375rem)] sm:w-auto flex-1'
                      } ${
                        // Na desktop pierwsze większe
                        techIndex === 0 ? 'sm:flex-[2]' : 'sm:flex-1'
                      }`}
                    >
                      {/* Logo Image */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                        <Image
                          src={tech.image}
                          alt={`${tech.name} logo`}
                          fill
                          className="tech-image object-contain"
                          sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                        />
                      </div>
                      
                      {/* Tech name */}
                      <div className="text-center">
                        <div className="text-sm sm:text-base font-semibold" style={{ color: tech.color }}>
                          {tech.name}
                        </div>
                        {/* Komentarz // - ukryty na mobile */}
                        <div className="hidden sm:block text-[#6a6a6a] text-xs mt-1">
                          // {tech.name.toLowerCase().replace(' ', '_').replace('.', '')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer - ukryty na mobile */}
            <div className="hidden sm:flex mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#2a2a2a] items-center justify-between text-[#8ba5c4] text-xs">
              <div className="flex items-center gap-4">
                <span>const technologies</span>
                <span className="text-[#4a4a4a]">|</span>
                <span className="text-[#9ba5b4]">Array&lt;Tech&gt;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#9ba5b4]">Total:</span> {techStack.flat().length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
