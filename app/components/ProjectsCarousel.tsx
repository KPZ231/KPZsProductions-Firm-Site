'use client'

import { useEffect, useRef, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoplay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ProjectsShown.length);
    }, 3000);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ProjectsShown.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ProjectsShown.length);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Container for carousel content with arrows */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Arrow */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={prevSlide}
            className="group relative bg-[#0d0d0d] hover:bg-[#1a1a1a] text-[#00bfff] border border-[#00bfff] hover:border-[#00bfff] p-3 sm:p-4 rounded-sm font-mono transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]"
          >
            <span className="text-lg sm:text-xl font-bold">&lt;</span>
            <div className="absolute inset-0 bg-[#00bfff] opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
          </button>
        </div>

        {/* Right Arrow */}
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={nextSlide}
            className="group relative bg-[#0d0d0d] hover:bg-[#1a1a1a] text-[#00bfff] border border-[#00bfff] hover:border-[#00bfff] p-3 sm:p-4 rounded-sm font-mono transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]"
          >
            <span className="text-lg sm:text-xl font-bold">&gt;</span>
            <div className="absolute inset-0 bg-[#00bfff] opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
          </button>
        </div>

        {/* Slides */}
        <div
          className="transition-transform duration-700 ease-in-out flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ProjectsShown.map((project, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
            >
              <div className="mx-auto w-full max-w-4xl bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2">
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
                      className="bg-[#1a1a1a] text-[#d5d5d5] hover:text-[#0a0a0a] px-6 py-3 border border-[#3a3a3a] text-sm sm:text-base font-semibold rounded-lg hover:bg-[#f8b500] hover:border-[#f8b500] transition-all duration-300"
                    >
                      {project.buttonContent}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {ProjectsShown.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === currentIndex ? "bg-[#f8b500] scale-110" : "bg-[#3a3a3a]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}