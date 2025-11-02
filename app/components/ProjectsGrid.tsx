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
  const cardRefs = useRef<HTMLDivElement[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        const image = card.querySelector('.project-image')
        const overlay = card.querySelector('.project-overlay')
        const text = card.querySelector('.project-text')

        gsap.set([card, overlay, text], { opacity: 0, y: 50 })

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
          .to(card, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .to(overlay, { opacity: 0.4, y: 0, duration: 1.2, ease: 'power2.out' }, '-=0.5')
          .to(text, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')

        gsap.to(image, {
          scale: 1.05,
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

  // Modal animation
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
    <section
      ref={containerRef}
      className="relative min-h-screen  text-white px-6 py-32 flex flex-col gap-48 items-center overflow-hidden"
    >
      {projects.map((project, i) => (
        <div
          key={i}
          ref={el => { if (el) cardRefs.current[i] = el }}
          className="relative group w-full max-w-6xl aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl"
        >
          {/* image */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="project-image w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
          />

          {/* overlay gradient */}
          <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-700"></div>

          {/* text content */}
          <div className="project-text absolute bottom-0 p-10 flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{project.title}</h2>
            <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
              {project.description}
            </p>
            <button
              onClick={() => setActiveProject(project)}
              className="mt-4 inline-block w-fit px-6 py-3 bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 rounded-xl text-white font-semibold shadow-md hover:shadow-white/10"
            >
              {project.buttonContent}
            </button>
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
            onClick={e => e.stopPropagation()}
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
              <p className="text-gray-300 leading-relaxed text-lg">
                {activeProject.description}
              </p>

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
                  className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/40 transition-all duration-300 text-white text-center"
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
