"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  title: string;
  description: string;
  ctaButtonContent: string;
  ctaButtonLink: string;
}

export default function CTA({
  title,
  description,
  ctaButtonContent,
  ctaButtonLink,
}: CTAProps) {
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });

    if (boxRef.current) {
      tl.fromTo(
        boxRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 }
      );
    }

    tl.fromTo(
      ".terminal-dot",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, stagger: 0.2, duration: 0.5 },
      "-=0.5"
    );

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    }

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    }

    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );
    }
  }, []);

  return (
    <>
      {/* Główny container - 70% szerokości */}
      <div ref={ctaRef} className="w-full lg:w-[80%] flex mx-auto mb-12 flex-col gap-6 md:gap-8">
        {/* Box z glassmorphism i zawartością */}
        <div ref={boxRef} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 md:p-8 lg:p-10 shadow-2xl flex flex-col gap-6">
          {/* Górny pasek z kolorowymi kółkami (terminal style) */}
          <div className="flex items-center gap-2">
            <div className="terminal-dot w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="terminal-dot w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="terminal-dot w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* Treść w stylu kodu z HTML tagami */}
          <div className="flex flex-col gap-4 font-mono text-sm md:text-base lg:text-lg">
            {/* Tytuł */}
            <h1 ref={titleRef} className="leading-relaxed w-[90%]">
              <span className="text-gray-500">&lt;</span>
              <span className="text-red-400">H2</span>
              <span className="text-gray-500">&gt;</span>
              <span className="text-white">{title}</span>
              <span className="text-gray-500"> &lt;/</span>
              <span className="text-red-400">H2</span>
              <span className="text-gray-500">&gt;</span>
            </h1>

            {/* Opis */}
            <p ref={descRef} className="leading-relaxed w-[70%]">
              <span className="text-gray-500">&lt;</span>
              <span className="text-red-400">P</span>
              <span className="text-gray-500">&gt;</span>
              <span className="text-gray-400">{description}</span>
              <span className="text-gray-500">&lt;/</span>
              <span className="text-red-400">P</span>
              <span className="text-gray-500">&gt;</span>
            </p>

            {/* CTA Button */}
            <div ref={buttonRef} className="mt-4 font-mono text-sm md:text-base">
              <button>
                <Link href={ctaButtonLink}>
                  <span className="text-red-500">&lt;button&gt;</span>
                  {ctaButtonContent}
                  <span className="text-red-500">&lt;/button&gt;</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
