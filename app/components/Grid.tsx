'use client'
import { useEffect, useRef } from 'react';

interface GridContentProps {
  content_1: string;
  content_2: string;
  content_3: string;
  content_4: string;
  header_1: string;
  header_2: string;
  header_3: string;
  header_4: string;
}

export default function Grid({
  header_1,
  header_2,
  header_3,
  header_4,
  content_1,
  content_2,
  content_3,
  content_4,
}: GridContentProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.grid-card');
      cards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          htmlCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          htmlCard.style.opacity = '1';
          htmlCard.style.transform = 'translateY(0)';
        }, 100 + index * 150);
      });
    }
  }, []);

  const gridItems = [
    { header: header_1, content: content_1, index: '01' },
    { header: header_2, content: content_2, index: '02' },
    { header: header_3, content: content_3, index: '03' },
    { header: header_4, content: content_4, index: '04' },
  ];

  return (
    <section className="min-h-[60vh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .grid-container {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .grid-card {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .grid-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          border-radius: 0.5rem;
          transition: border-color 0.3s ease;
        }
        
        .grid-card:hover::before {
          border-color: #3a3a3a;
        }
        
        .grid-card:hover {
          transform: translateY(-4px);
          background: #1a1a1a;
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* Responsywność */
        @media (max-width: 640px) {
          .grid-card:active {
            transform: scale(0.98);
          }
        }
      `}</style>

      <div className="grid-container mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]">
        {/* Header - ukryty na mobile */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden mb-4 sm:mb-6">
          <div className="hidden sm:flex bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 sm:px-6 py-3 sm:py-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="dots flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
              </div>
              <span className="text-[#f8b500] text-xs tracking-wider">// FEATURES.TSX</span>
            </div>
            <div className="text-[#6faadb] text-xs">
              <span className="text-[#f8b500]">Grid Layout</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 grid-pattern">
            {/* Comment - ukryty na mobile */}
            <div className="hidden sm:block mb-4 sm:mb-6 text-[#8ba5c4] text-xs sm:text-sm">
              <span className="text-[#6faadb]">/**</span>
              <div className="pl-3">* Key features and benefits</div>
              <div className="pl-3">* @type {'{GridItem[]}'}</div>
              <span className="text-[#6faadb]"> */</span>
            </div>

            {/* Grid - responsywny z większymi gaps */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {gridItems.map((item, index) => (
                <div
                  key={index}
                  className="grid-card bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-5 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 min-h-[200px]"
                >
                  {/* Index number */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Tekst "// index:" ukryty na mobile */}
                    <span className="hidden sm:inline text-[#7ba4d4] text-xs font-mono">
                      // index: {item.index}
                    </span>
                    <span className="text-[#f8b500] text-3xl sm:text-2xl font-bold sm:ml-auto">
                      {item.index}
                    </span>
                  </div>

                  {/* Header */}
                  <div>
                    {/* Tagi HTML ukryte na mobile */}
                    <div className="hidden sm:block text-[#7ba4d4] text-xs mb-2">
                      &lt;h3&gt;
                    </div>
                    <h3 className="text-[#ffc59c] text-xl sm:text-2xl font-semibold sm:pl-4 leading-tight">
                      {item.header}
                    </h3>
                    <div className="hidden sm:block text-[#7ba4d4] text-xs mt-2">
                      &lt;/h3&gt;
                    </div>
                  </div>

                  {/* Content - zwiększone odstępy */}
                  <div className="mt-2 sm:mt-0">
                    {/* Tagi HTML ukryte na mobile */}
                    <div className="hidden sm:block text-[#7ba4d4] text-xs mb-2">
                      &lt;p&gt;
                    </div>
                    <p className="text-[#d0dae8] text-sm sm:text-base leading-relaxed sm:pl-4">
                      {item.content}
                    </p>
                    <div className="hidden sm:block text-[#7ba4d4] text-xs mt-2">
                      &lt;/p&gt;
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer - ukryty na mobile */}
            <div className="hidden sm:flex mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#2a2a2a] items-center justify-between text-[#7ba4d4] text-xs">
              <div className="flex items-center gap-4">
                <span>const features</span>
                <span className="text-[#4a4a4a]">|</span>
                <span className="text-[#8ba5c4]">Array&lt;Feature&gt;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8ba5c4]">Items:</span> {gridItems.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
