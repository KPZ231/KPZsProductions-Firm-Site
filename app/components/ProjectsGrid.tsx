'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '../classes/Projects'
import Image from 'next/image'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

interface ProjectsShowcaseProps {
  projects: Project[]
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        const image = card.querySelector('.project-image')
        gsap.to(image, {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [projects])

  useEffect(() => {
    if (activeProject) {
      gsap.fromTo(
        '.project-modal',
        { opacity: 0, scale: 0.92, y: 40, rotateX: 10 },
        { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }
      )
    }
  }, [activeProject])

  return (
    <section ref={containerRef} className="relative min-h-[70vh] bg-[#0a0a0a] text-white px-4 sm:px-6 py-16 sm:py-24 lg:py-32 flex flex-col gap-16 sm:gap-24 lg:gap-32 items-center overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .project-terminal {
          font-family: 'JetBrains Mono', monospace;
          background: #111;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
        }

        .project-header {
          background: #0d0d0d;
          border-bottom: 1px solid #2a2a2a;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (min-width: 640px) {
          .project-header {
            padding: 16px 24px;
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
        }

        /* Modal button */
        .modal-cta {
          transition: all 0.3s ease;
          min-height: 48px;
        }

        .modal-cta:hover {
          background: linear-gradient(135deg, #f8b500 0%, #e09600 100%);
          box-shadow: 0 4px 16px rgba(248, 181, 0, 0.4);
          transform: translateY(-2px);
        }

        /* Mobile responsywność */
        @media (max-width: 640px) {
          .cta-button {
            width: 100%;
          }
        }
      `}</style>

      {projects.map((project, i) => (
        <div
          key={i}
          ref={(el) => setCardRef(el, i)}
          className="project-terminal mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-4xl shadow-2xl"
        >
          {/* HEADER - ukryty na mobile */}
          <div className="project-header hidden sm:flex">
            <div className="flex items-center gap-3">
              <div className="dots flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
              </div>
              <span className="text-[#f8b500] text-xs tracking-wider">
                // PROJECT_{i + 1}.TSX
              </span>
            </div>
            <span className="text-[#7ba4d4] text-xs">{i + 1} / {projects.length}</span>
          </div>

          {/* CONTENT */}
          <div className="grid md:grid-cols-2 grid-pattern">
            {/* IMAGE */}
            <div className="image-container bg-[#0d0d0d] min-h-[200px] sm:min-h-[250px] md:min-h-[380px] relative">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="project-image w-full h-full object-cover"
              />
              {/* Label - ukryty na mobile */}
              <div className="hidden sm:block absolute bottom-4 left-4 bg-[#0d0d0d] bg-opacity-90 border border-[#3a3a3a] px-3 py-1 rounded text-[#7ba4d4] text-xs">
                <span className="text-[#7ba4d4]">//</span> <span className="text-[#d0dae8]">thumbnail</span>
              </div>
            </div>

            {/* TEXT */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Komentarz JSDoc - ukryty na mobile */}
                <div className="hidden sm:block text-[#7ba4d4] text-xs mb-3">
                  <span className="text-[#7ba4d4]">/**</span>
                  <div className="pl-3 text-[#d0dae8]">* Project details</div>
                  <span className="text-[#7ba4d4]"> */</span>
                </div>

                {/* Title */}
                <div className="mb-4 sm:mb-2">
                  {/* Tagi HTML - ukryte na mobile */}
                  <div className="hidden sm:block text-[#7ba4d4] text-xs mb-1">&lt;<span className="text-[#61afef]">h3</span>&gt;</div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e5e5e5] sm:pl-4 mb-1 leading-tight break-words">
                    {project.title}
                  </h3>
                  <div className="hidden sm:block text-[#7ba4d4] text-xs">&lt;/<span className="text-[#61afef]">h3</span>&gt;</div>
                </div>

                {/* Description */}
                <div className="mt-4 sm:mt-6 mb-6 sm:mb-8">
                  {/* Tagi HTML - ukryte na mobile */}
                  <div className="hidden sm:block text-[#7ba4d4] text-xs mb-1">&lt;<span className="text-[#61afef]">p</span>&gt;</div>
                  <p className="text-[#d0dae8] text-sm sm:text-base leading-relaxed sm:pl-4 mb-1 break-words">
                    {project.description}
                  </p>
                  <div className="hidden sm:block text-[#7ba4d4] text-xs">&lt;/<span className="text-[#61afef]">p</span>&gt;</div>
                </div>
              </div>

              {/* BUTTON */}
              <div>
                {/* Tagi HTML - ukryte na mobile */}
                <div className="hidden sm:block text-[#7ba4d4] text-xs mb-2">&lt;<span className="text-[#61afef]">button</span>&gt;</div>
                <div className="sm:pl-4 mb-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="cta-button bg-[#1a1a1a] text-[#d5d5d5] hover:text-[#0a0a0a] px-6 sm:px-8 py-3 border border-[#3a3a3a] text-sm sm:text-base font-semibold rounded-lg"
                  >
                    {project.buttonContent}
                  </button>
                </div>
                <div className="hidden sm:block text-[#7ba4d4] text-xs">&lt;/<span className="text-[#61afef]">button</span>&gt;</div>

                {/* Footer const - ukryty na mobile */}
                <div className="hidden sm:block mt-6 pt-4 border-t border-[#2a2a2a] text-[#6a6a6a] text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-[#8a8a8a]">const</span>
                    <span className="text-[#a5a5a5]">link</span>
                    <span className="text-[#8a8a8a]">=</span>
                    <span className="text-[#b5b5b5] truncate">'{project.link.substring(0, 30)}...'</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {activeProject && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="project-modal relative bg-[#0d0d0d] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 max-w-3xl w-full text-white shadow-2xl border border-[#2a2a2a] overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - min 48x48px */}
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-2xl sm:text-3xl transition min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-[#1a1a1a] rounded-lg"
              onClick={() => setActiveProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="relative w-full h-[200px] sm:h-[300px] rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src={activeProject.thumbnail}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#e5e5e5] leading-tight break-words pr-12">
                {activeProject.title}
              </h2>
              
              <p className="text-[#d0dae8] leading-relaxed text-base sm:text-lg break-words">
                {activeProject.description}
              </p>

              {activeProject.isIframable ? (
                <iframe
                  src={activeProject.link}
                  className="w-full h-[300px] sm:h-[400px] rounded-xl border border-[#2a2a2a] mt-2 sm:mt-6"
                  allowFullScreen
                  title={`${activeProject.title} preview`}
                ></iframe>
              ) : (
                <Link
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-cta inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#f8b500] to-[#e09600] rounded-lg sm:rounded-xl font-semibold shadow-lg text-[#0a0a0a] text-center text-base sm:text-lg mt-2"
                >
                  Visit Project ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
