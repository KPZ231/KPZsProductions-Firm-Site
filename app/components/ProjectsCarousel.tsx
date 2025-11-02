'use client'
import { Project } from "../classes/Projects";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CarouselProps {
    ProjectsShown: Project[];
}

export default function ProjectsCarousel({ ProjectsShown }: CarouselProps) {
    const component = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            let panels = gsap.utils.toArray(".panel");
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + slider.current!.offsetWidth
                }
            });
        }, component);
        return () => ctx.revert();
    }, [ProjectsShown]);

    return (
        <div className="w-full overflow-hidden" ref={component}>
            <div ref={slider} className="w-[400vw] h-screen flex flex-nowrap">
                {ProjectsShown.map((project, index) => (
                    <div key={index} className="panel w-screen h-screen flex items-center justify-center">
                        <div className="w-full max-w-6xl mx-auto bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px] bg-gray-400">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                                            {project.description}
                                        </p>
                                    </div>
                                    <Link 
                                        href={project.link}
                                        target={project.isIframable ? "_self" : "_blank"}
                                        className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-all w-fit"
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
    );
}