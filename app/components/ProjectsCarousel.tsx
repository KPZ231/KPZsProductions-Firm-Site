'use client'

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  isIframable: boolean;
  buttonContent: string;
}

interface ProjectsScrollProps {
  ProjectsShown: Project[];
}

export default function ProjectsScroll({ ProjectsShown }: ProjectsScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scroll = scrollRef.current;

    // Calculate total scroll width
    const scrollWidth = scroll.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation
    const tl = gsap.to(scroll, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ProjectsShown]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden"
    >
      <div 
        ref={scrollRef}
        className="flex items-center gap-8 px-8 h-screen"
      >
        {ProjectsShown.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[60vw] max-w-4xl"
          >
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl h-full">
              <div className="grid md:grid-cols-2 h-full">
                {/* IMG */}
                <div className="relative min-h-[250px] md:min-h-[380px] bg-[#0d0d0d]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffc59c] mb-4 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-[#d0dae8] text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <Link
                    href={project.link}
                    target={project.isIframable ? "_self" : "_blank"}
                    rel={project.isIframable ? undefined : "noopener noreferrer"}
                    className="bg-[#1a1a1a] text-[#d5d5d5] hover:text-[#0a0a0a] px-6 py-3 border border-[#3a3a3a] text-sm sm:text-base font-semibold rounded-lg hover:bg-[#f8b500] hover:border-[#f8b500] transition-all duration-300 inline-block text-center"
                  >
                    {project.buttonContent}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#00bfff] font-mono text-sm flex flex-col items-center gap-2 pointer-events-none">
        <span>SCROLL →</span>
        <div className="w-8 h-1 bg-[#00bfff] animate-pulse" />
      </div>
    </div>
  );
}