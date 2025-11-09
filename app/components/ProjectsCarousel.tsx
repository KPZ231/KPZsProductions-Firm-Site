'use client'
import { useEffect, useRef } from "react";

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
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapInstance: any;
    let ScrollTriggerInstance: any;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');

      gsapInstance = gsapModule.gsap || gsapModule.default;
      ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
      gsapInstance.registerPlugin(ScrollTriggerInstance);

      if (!slider.current || !component.current) return;

      const sections = gsapInstance.utils.toArray('.panel') as HTMLElement[];

      // 🔧 Poziomy scroll z przypięciem i scrubem
      gsapInstance.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + slider.current!.offsetWidth,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    };

    initGSAP();

    return () => {
      if (ScrollTriggerInstance) ScrollTriggerInstance.killAll();
      if (gsapInstance) gsapInstance.killTweensOf(".panel");
    };
  }, [ProjectsShown]);

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0a0a0a]" ref={component}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .carousel-container {
          font-family: 'JetBrains Mono', monospace;
          display: flex;
          height: 100vh;
          width: max-content;
        }

        .panel {
          flex: 0 0 100vw;
          height: 100vh;
          scroll-snap-align: start;
        }

        .project-card {
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: scale(1.01);
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
          background: #222222;
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
          pointer-events: none;
        }
      `}</style>

      <div ref={slider} className="carousel-container">
        {ProjectsShown.map((project, index) => (
          <div key={index} className="panel flex items-center justify-center p-6">
            <div className="project-card w-full max-w-6xl bg-[#111111] border border-[#222222] rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
                  </div>
                  <span className="text-[#666666] text-xs tracking-wider">
                    PROJECT_{index + 1}.TSX
                  </span>
                </div>
                <div className="text-[#444444] text-xs">
                  <span className="text-[#666666]">{index + 1} / {ProjectsShown.length}</span>
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 grid-pattern">
                {/* Image Section */}
                <div className="image-container relative min-h-[300px] md:min-h-[500px] bg-[#0d0d0d]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#0d0d0d] bg-opacity-90 border border-[#2a2a2a] px-3 py-1 rounded text-[#888888] text-xs">
                    // thumbnail
                  </div>
                </div>

                {/* Text Section */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  {/* Title */}
                  <div>
                    <div className="text-[#555555] text-xs mb-2">
                      <span className="text-[#666666]">/**</span>
                      <div className="pl-3">* Project details</div>
                      <span className="text-[#666666]"> */</span>
                    </div>

                    <div className="mb-2">
                      <div className="text-[#555555] text-xs mb-1">
                        &lt;h3&gt;
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-[#e0e0e0] pl-4 mb-1">
                        {project.title}
                      </h3>
                      <div className="text-[#555555] text-xs">
                        &lt;/h3&gt;
                      </div>
                    </div>

                    <div className="mt-6 mb-8">
                      <div className="text-[#555555] text-xs mb-1">
                        &lt;p&gt;
                      </div>
                      <p className="text-[#999999] text-sm md:text-base leading-relaxed pl-4 mb-1">
                        {project.description}
                      </p>
                      <div className="text-[#555555] text-xs">
                        &lt;/p&gt;
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div>
                    <div className="text-[#555555] text-xs mb-2">
                      &lt;button&gt;
                    </div>
                    <div className="pl-4 mb-2">
                      <a
                        href={project.link}
                        target={project.isIframable ? "_self" : "_blank"}
                        className="cta-button inline-block bg-[#1a1a1a] text-[#cccccc] hover:text-white px-8 py-3 border border-[#2a2a2a] text-sm font-medium"
                      >
                        {project.buttonContent}
                      </a>
                    </div>
                    <div className="text-[#555555] text-xs">
                      &lt;/button&gt;
                    </div>

                    {/* Metadata */}
                    <div className="mt-6 pt-4 border-t border-[#1a1a1a] text-[#555555] text-xs">
                      <div className="flex items-center gap-4">
                        <span className="text-[#666666]">const</span>
                        <span className="text-[#888888]">link</span>
                        <span className="text-[#666666]">=</span>
                        <span className="text-[#999999] truncate">'{project.link.substring(0, 30)}...'</span>
                      </div>
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
