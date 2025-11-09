'use client'
import { useRef, useEffect } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const itemElements = timelineRef.current.querySelectorAll('.timeline-item-wrapper');
      
      itemElements.forEach((item, index) => {
        const htmlItem = item as HTMLElement;
        htmlItem.style.opacity = '0';
        htmlItem.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          htmlItem.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          htmlItem.style.opacity = '1';
          htmlItem.style.transform = 'translateY(0)';
        }, 100 + index * 200);
      });
    }
  }, [items]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .timeline-container {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .timeline-card {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .timeline-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          border-radius: 0.5rem;
          transition: border-color 0.3s ease;
        }
        
        .timeline-card:hover::before {
          border-color: #333333;
        }
        
        .timeline-card:hover {
          transform: translateY(-4px);
          background: #1a1a1a;
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, #222222 10%, #222222 90%, transparent);
          transform: translateX(-50%);
        }

        .timeline-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #2a2a2a;
          border: 2px solid #111111;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }

        .timeline-dot-left {
          right: -6px;
        }

        .timeline-dot-right {
          left: -6px;
        }
      `}</style>

      <div className="timeline-container w-full max-w-6xl">
        {/* Header */}
        <div className="bg-[#111111] border border-[#222222] rounded-lg overflow-hidden mb-6">
          <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
              </div>
              <span className="text-[#666666] text-xs tracking-wider">TIMELINE.TSX</span>
            </div>
            <div className="text-[#444444] text-xs">
              <span className="text-[#666666]">{items.length} milestones</span>
            </div>
          </div>

          <div className="p-8 grid-pattern">
            {/* Comment */}
            <div className="mb-8 text-[#555555] text-sm">
              <span className="text-[#666666]">/**</span>
              <div className="pl-3">* Company history and milestones</div>
              <div className="pl-3">* @type {'{TimelineItem[]}'}</div>
              <span className="text-[#666666]"> */</span>
            </div>

            {/* Timeline */}
            <div ref={timelineRef} className="relative">
              {/* Center line */}
              <div className="timeline-line"></div>

              {/* Timeline items */}
              <div className="space-y-16">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`timeline-item-wrapper flex ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className="w-full md:w-[45%] relative">
                      {/* Dot on timeline */}
                      <div className={`timeline-dot ${index % 2 === 0 ? 'timeline-dot-left' : 'timeline-dot-right'}`}></div>

                      {/* Card */}
                      <div className="timeline-card bg-[#0d0d0d] border border-[#222222] rounded-lg p-6">
                        {/* Year badge */}
                        <div className="inline-block bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1 rounded mb-4">
                          <span className="text-[#888888] text-xs">
                            // year:
                          </span>
                          <span className="text-[#cccccc] text-sm font-semibold ml-2">
                            {item.year}
                          </span>
                        </div>

                        {/* Title */}
                        <div className="mb-3">
                          <div className="text-[#555555] text-xs mb-1">
                            &lt;h3&gt;
                          </div>
                          <h3 className="text-[#cccccc] text-xl font-semibold pl-4">
                            {item.title}
                          </h3>
                          <div className="text-[#555555] text-xs mt-1">
                            &lt;/h3&gt;
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <div className="text-[#555555] text-xs mb-1">
                            &lt;p&gt;
                          </div>
                          <p className="text-[#999999] text-sm leading-relaxed pl-4">
                            {item.description}
                          </p>
                          <div className="text-[#555555] text-xs mt-1">
                            &lt;/p&gt;
                          </div>
                        </div>

                        {/* Index indicator */}
                        <div className="mt-4 text-[#444444] text-xs text-right">
                          index: [{index}]
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[#555555] text-xs">
              <div className="flex items-center gap-4">
                <span>const timeline</span>
                <span className="text-[#333333]">|</span>
                <span className="text-[#666666]">Array&lt;Milestone&gt;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#666666]">Length:</span> {items.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}