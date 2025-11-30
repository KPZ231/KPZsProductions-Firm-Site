'use client'
import { useEffect, useRef } from "react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  isIframable: boolean;
  buttonContent: string;
}

interface CarouselProps {
  ProjectsShown: Project[];
}

export default function ProjectsCarousel({ ProjectsShown }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prosta animacja fade-in dla kart
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          htmlCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          htmlCard.style.opacity = '1';
          htmlCard.style.transform = 'translateY(0)';
        }, 100 + index * 150);
      });
    }
  }, [ProjectsShown]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] py-8 sm:py-12 lg:py-16" ref={containerRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .projects-container {
          font-family: 'JetBrains Mono', monospace;
        }

        .project-card {
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 640px) {
          .project-card:active {
            transform: scale(0.99);
          }
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .cta-button {
          transition: all 0.3s ease;
          min-height: 48px;
          min-width: 120px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #f8b500 0%, #e09600 100%);
          border-color: #f8b500;
          color: #0a0a0a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(248, 181, 0, 0.3);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        .image-container {
          position: relative;
          overflow: hidden;
        }

        .image-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3));
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .cta-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="projects-container max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 lg:space-y-20">
        {ProjectsShown.map((project, index) => (
          <div key={index} className="project-card mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-4xl bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl">
            {/* Header - ukryty na mobile */}
            <div className="hidden sm:flex bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 sm:px-6 py-3 sm:py-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
                </div>
                <span className="text-[#f8b500] text-xs tracking-wider">
                  // PROJECT_{index + 1}.TSX
                </span>
              </div>
              <div className="text-[#7ba4d4] text-xs">
                <span className="text-[#d0dae8]">{index + 1} / {ProjectsShown.length}</span>
              </div>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 grid-pattern">
              {/* Image Section */}
              <div className="image-container relative min-h-[200px] sm:min-h-[250px] md:min-h-[380px] bg-[#0d0d0d]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Label - ukryty na mobile */}
                <div className="hidden sm:block absolute bottom-4 left-4 bg-[#0d0d0d] bg-opacity-90 border border-[#3a3a3a] px-3 py-1 rounded text-[#7ba4d4] text-xs">
                  <span className="text-[#7ba4d4]">//</span> <span className="text-[#d0dae8]">thumbnail</span>
                </div>
              </div>

              {/* Text Section */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                {/* Title */}
                <div>
                  {/* Komentarz JSDoc - ukryty na mobile */}
                  <div className="hidden sm:block text-[#7ba4d4] text-xs mb-3">
                    <span className="text-[#7ba4d4]">/**</span>
                    <div className="pl-3 text-[#d0dae8]">* Project details</div>
                    <span className="text-[#7ba4d4]"> */</span>
                  </div>

                  <div className="mb-4 sm:mb-2">
                    {/* Tagi HTML - ukryte na mobile */}
                    <div className="hidden sm:block text-[#7ba4d4] text-xs mb-1">
                      &lt;<span className="text-[#61afef]">h3</span>&gt;
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffc59c] sm:pl-4 mb-1 leading-tight break-words">
                      {project.title}
                    </h3>
                    <div className="hidden sm:block text-[#7ba4d4] text-xs">
                      &lt;/<span className="text-[#61afef]">h3</span>&gt;
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 mb-6 sm:mb-8">
                    {/* Tagi HTML - ukryte na mobile */}
                    <div className="hidden sm:block text-[#7ba4d4] text-xs mb-1">
                      &lt;<span className="text-[#61afef]">p</span>&gt;
                    </div>
                    <p className="text-[#d0dae8] text-sm sm:text-base leading-relaxed sm:pl-4 mb-1 break-words">
                      {project.description}
                    </p>
                    <div className="hidden sm:block text-[#7ba4d4] text-xs">
                      &lt;/<span className="text-[#61afef]">p</span>&gt;
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div>
                  {/* Tagi HTML - ukryte na mobile */}
                  <div className="hidden sm:block text-[#7ba4d4] text-xs mb-2">
                    &lt;<span className="text-[#61afef]">button</span>&gt;
                  </div>
                  <div className="sm:pl-4 mb-2">
                    <Link
                      href={project.link}
                      target={project.isIframable ? "_self" : "_blank"}
                      rel={project.isIframable ? undefined : "noopener noreferrer"}
                      className="cta-button bg-[#1a1a1a] text-[#d5d5d5] hover:text-[#0a0a0a] px-6 sm:px-8 py-3 border border-[#3a3a3a] text-sm sm:text-base font-semibold rounded-lg"
                    >
                      {project.buttonContent}
                    </Link>
                  </div>
                  <div className="hidden sm:block text-[#7ba4d4] text-xs">
                    &lt;/<span className="text-[#61afef]">button</span>&gt;
                  </div>

                  {/* Metadata - ukryte na mobile */}
                  <div className="hidden sm:block mt-6 pt-4 border-t border-[#2a2a2a] text-[#7ba4d4] text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-[#61afef]">const</span>
                      <span className="text-[#d0dae8]">link</span>
                      <span className="text-[#e06c75]">=</span>
                      <span className="text-[#98c379] truncate">'{project.link.substring(0, 30)}...'</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
