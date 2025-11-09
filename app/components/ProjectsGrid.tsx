'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '../classes/Projects'

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
    <section ref={containerRef} className="relative min-h-screen bg-[#0a0a0a] text-white px-6 py-32 flex flex-col gap-48 items-center overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .project-terminal {
          font-family: 'JetBrains Mono', monospace;
          background: #111;
          border: 1px solid #222;
          border-radius: 12px;
          overflow: hidden;
        }

        .project-header {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .project-header .dots div {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #2a2a2a;
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .cta-button {
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: #222;
          border-color: #3a3a3a;
          transform: translateY(-2px);
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
      `}</style>

      {projects.map((project, i) => (
        <div
          key={i}
          ref={(el) => setCardRef(el, i)}
          className="project-terminal w-full max-w-6xl shadow-2xl"
        >
          {/* HEADER */}
          <div className="project-header">
            <div className="flex items-center gap-3">
              <div className="dots flex gap-1.5">
                <div></div><div></div><div></div>
              </div>
              <span className="text-[#666] text-xs tracking-wider">
                PROJECT_{i + 1}.TSX
              </span>
            </div>
            <span className="text-[#666] text-xs">{i + 1} / {projects.length}</span>
          </div>

          {/* CONTENT */}
          <div className="grid md:grid-cols-2 grid-pattern">
            {/* IMAGE */}
            <div className="image-container bg-[#0d0d0d] min-h-[300px] md:min-h-[500px]">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="project-image w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#0d0d0d] bg-opacity-90 border border-[#2a2a2a] px-3 py-1 rounded text-[#888] text-xs">
                // thumbnail
              </div>
            </div>

            {/* TEXT */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="text-[#555] text-xs mb-2">
                  <span className="text-[#666]">/**</span>
                  <div className="pl-3">* Project details</div>
                  <span className="text-[#666]"> */</span>
                </div>

                <div className="mb-2">
                  <div className="text-[#555] text-xs mb-1">&lt;h3&gt;</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#e0e0e0] pl-4 mb-1">
                    {project.title}
                  </h3>
                  <div className="text-[#555] text-xs">&lt;/h3&gt;</div>
                </div>

                <div className="mt-6 mb-8">
                  <div className="text-[#555] text-xs mb-1">&lt;p&gt;</div>
                  <p className="text-[#999] text-sm md:text-base leading-relaxed pl-4 mb-1">
                    {project.description}
                  </p>
                  <div className="text-[#555] text-xs">&lt;/p&gt;</div>
                </div>
              </div>

              {/* BUTTON */}
              <div>
                <div className="text-[#555] text-xs mb-2">&lt;button&gt;</div>
                <div className="pl-4 mb-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="cta-button inline-block bg-[#1a1a1a] text-[#ccc] hover:text-white px-8 py-3 border border-[#2a2a2a] text-sm font-medium"
                  >
                    {project.buttonContent}
                  </button>
                </div>
                <div className="text-[#555] text-xs">&lt;/button&gt;</div>

                <div className="mt-6 pt-4 border-t border-[#1a1a1a] text-[#555] text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-[#666]">const</span>
                    <span className="text-[#888]">link</span>
                    <span className="text-[#666]">=</span>
                    <span className="text-[#999] truncate">'{project.link.substring(0, 30)}...'</span>
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="project-modal relative bg-neutral-900 rounded-3xl p-10 max-w-3xl w-[90%] text-white shadow-2xl border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition"
              onClick={() => setActiveProject(null)}
            >
              ✕
            </button>

            <div className="flex flex-col gap-6">
              <img
                src={activeProject.thumbnail}
                alt={activeProject.title}
                className="w-full h-[300px] object-cover rounded-2xl"
              />
              <h2 className="text-4xl font-bold tracking-tight">{activeProject.title}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{activeProject.description}</p>

              {activeProject.isIframable ? (
                <iframe
                  src={activeProject.link}
                  className="w-full h-[400px] rounded-xl border border-white/10 mt-6"
                  allowFullScreen
                ></iframe>
              ) : (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/40 transition-all duration-300 text-white text-center"
                >
                  Visit Project ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
