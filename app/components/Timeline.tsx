'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineItem } from '../classes/TimelineClass';

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
    items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const itemElements = gsap.utils.toArray<HTMLElement>(".timeline-item-wrapper");

            if (itemElements.length === 0) return;

            // Animate items into view
            itemElements.forEach((item) => {
                gsap.from(item.querySelector('.timeline-content'), {
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }, timelineRef);

        return () => ctx.revert();

    }, [items]);

    return (
        <div ref={timelineRef} className="relative w-full max-w-5xl mx-auto py-24 px-4 font-mono text-white">
            {/* The timeline line */}
            <div className="absolute top-0 left-1/2 w-0.5 bg-gray-700 h-full" style={{ transform: 'translateX(-50%)' }}></div>

            <div className="relative flex flex-col gap-24">
                {items.map((item, index) => (
                    <div key={index} className={`timeline-item-wrapper flex w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                        <div className="w-1/2 relative">
                            {/* Dot on the line for the item */}
                            <div className="w-3 h-3 bg-gray-500 rounded-full absolute top-1/2 -translate-y-1/2" style={{ [index % 2 === 0 ? 'right' : 'left']: 'calc(-0.375rem - 1px)' }}></div>
                            
                            {/* Content Box */}
                            <div className={`timeline-content bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 shadow-2xl ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <p className="text-red-400 text-lg mb-2">{item.year}</p>
                                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}