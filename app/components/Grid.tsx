"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      const gridItems = gridRef.current.children;
      
      gsap.fromTo(gridItems, 
        { opacity: 0, scale: 0.9, y: 20 }, 
        {
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    }
  }, []);

  return (
    <>
      <section ref={gridRef} className="w-[90%] h-[50vh] grid grid-cols-2 grid-rows-2 gap-4 m-auto">
        <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_1}</h3>
                <p className="text-black text-2xl">{content_1}</p>
            </div>
        </div>
       <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_2}</h3>
                <p className="text-black text-2xl">{content_2}</p>
            </div>
        </div>
        <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_3}</h3>
                <p className="text-black text-2xl">{content_3}</p>
            </div>
        </div>
        <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_4}</h3>
                <p className="text-black text-2xl">{content_4}</p>
            </div>
        </div>
      </section>
    </>
  );
}
