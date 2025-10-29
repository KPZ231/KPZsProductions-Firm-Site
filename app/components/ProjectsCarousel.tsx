'use client'
import { Project } from "../classes/Projects";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CarouselProps {
    time_interval: number;
    projects_show: number;
    ProjectsShown: Project[];
}

export default function ProjectsCarousel({
    time_interval,
    projects_show,
    ProjectsShown
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => 
                prev + projects_show >= ProjectsShown.length ? 0 : prev + 1
            );
        }, time_interval);

        return () => clearInterval(interval);
    }, [time_interval, projects_show, ProjectsShown.length]);

    // Wyświetlane projekty
    const visibleProjects = ProjectsShown.slice(
        currentIndex, 
        currentIndex + projects_show
    );

    return (
        <div className="w-full py-12">
            <div className="container mx-auto px-4">
                {/* Carousel - karty z obrazkiem po lewej */}
                <div className="flex flex-col gap-6">
                    {visibleProjects.map((project, index) => (
                        <div 
                            key={index} 
                            className="w-full max-w-4xl mx-auto bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Thumbnail po lewej */}
                                <div className="w-full md:w-1/3 relative min-h-[200px] md:min-h-[250px] bg-gray-400">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Treść po prawej */}
                                <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                                            {project.description}
                                        </p>
                                    </div>
                                    
                                    {/* Button */}
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
                    ))}
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ 
                        length: Math.ceil(ProjectsShown.length / projects_show) 
                    }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index * projects_show)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                Math.floor(currentIndex / projects_show) === index
                                    ? 'bg-gray-900 w-8'
                                    : 'bg-gray-400 hover:bg-gray-500'
                            }`}
                        />
                    ))}
                </div>

                {/* Navigation arrows */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={() => setCurrentIndex(Math.max(0, currentIndex - projects_show))}
                        disabled={currentIndex === 0}
                        className="px-6 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                        ← Poprzednie
                    </button>
                    <button
                        onClick={() => setCurrentIndex(
                            Math.min(ProjectsShown.length - projects_show, currentIndex + projects_show)
                        )}
                        disabled={currentIndex + projects_show >= ProjectsShown.length}
                        className="px-6 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                        Następne →
                    </button>
                </div>
            </div>
        </div>
    );
}
