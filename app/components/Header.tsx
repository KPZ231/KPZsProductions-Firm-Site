"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps{
    title: string;
}

export default function Header({
    title
}:HeaderProps) {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (header) {
      gsap.fromTo(header, 
        { opacity: 0, y: 50 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    }
  }, []);

  return (
    <section ref={headerRef} className="h-[30vh] w-[80%] flex flex-col items-start justify-start p-4 md:p-8 lg:p-16 pt-32 overflow-hidden">
      {/* Główny container - 70% szerokości */}
      <div className="w-full lg:w-[80%] flex flex-col gap-6 md:gap-8">
        {/* Box z glassmorphism i zawartością */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 md:p-8 lg:p-10 shadow-2xl flex flex-col gap-6">
          {/* Górny pasek z kolorowymi kółkami (terminal style) */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* Treść w stylu kodu z HTML tagami */}
          <div className="flex flex-col gap-4 text-sm md:text-base lg:text-lg">
            {/* Tytuł */}
            <h2 className="leading-relaxed w-[90%]">
              <span className="text-gray-500">&lt;</span>
              <span className="text-red-400">H2</span>
              <span className="text-gray-500">&gt;</span>
              <span className="text-white">{title}</span>
              <span className="text-gray-500"> &lt;/</span>
              <span className="text-red-400">H2</span>
              <span className="text-gray-500">&gt;</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
