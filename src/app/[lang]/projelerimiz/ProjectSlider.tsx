"use client";

import React, { useState, useEffect, useRef } from 'react';

export const ProjectSlider = ({ title, images }: { title: string, images: string[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleScrollLeft = () => {
        if (scrollRef.current && scrollRef.current.children.length > 0) {
            const firstChild = scrollRef.current.children[0] as HTMLElement;
            const cardWidth = firstChild.clientWidth + 16; // Card full width + gap-4 (16px)
            scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current && scrollRef.current.children.length > 0) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const firstChild = scrollRef.current.children[0] as HTMLElement;
            const cardWidth = firstChild.clientWidth + 16; 

            // If we are at the end, jump back to start
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        if (isHovered || images.length <= 1) return; // Prevent auto-scroll if hovering or not enough images

        const interval = setInterval(handleScrollRight, 4500); // Slower, less eye-straining interval

        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    // Format the title to make it colorful and structured
    const renderTitle = (text: string) => {
        // Try to find an explicit separator with optional spaces around it
        let match = text.match(/(\s*[/:-]\s*)/);
        let isSpaceOnly = false;

        // If no explicit separator is found, fallback to the first space
        if (!match) {
            match = text.match(/(\s+)/);
            isSpaceOnly = true;
        }

        if (match && match.index !== undefined) {
            const index = match.index;
            const prefix = text.substring(0, index).trim();
            const separatorRaw = match[0];
            const suffix = text.substring(index + separatorRaw.length).trim();

            // Only split if we actually have a prefix
            if (prefix) {
                return (
                    <div className="flex flex-wrap items-center gap-x-2">
                        <span className="text-primary font-bold tracking-wide">{prefix}</span>
                        {!isSpaceOnly && (
                            <span className="text-zinc-600 font-light">{separatorRaw.trim()}</span>
                        )}
                        <span className="text-white font-light tracking-wide">{suffix}</span>
                    </div>
                );
            }
        }
        
        return <span className="text-white font-light tracking-wide">{text}</span>;
    };

    return (
        <section className="w-full overflow-hidden flex flex-col">
            <h2 className="text-title-lg uppercase mb-6 border-l-2 border-primary pl-4 leading-tight">
                {renderTitle(title)}
            </h2>
            <div className="relative group/slider" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden w-full"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {images.map((image, idx) => (
                        <div 
                            key={idx} 
                            className="w-[85%] sm:w-[70%] md:w-[90%] lg:w-[85%] xl:w-[75%] aspect-[4/3] flex-shrink-0 snap-center relative group/card cursor-pointer overflow-hidden border border-[#222] bg-[#121414] rounded-md transition-transform duration-500 hover:border-[#444]"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={image} 
                                alt={`${title} - Görsel ${idx + 1}`} 
                                loading="lazy"
                                className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e0f] via-transparent to-transparent opacity-50 group-hover/card:opacity-80 transition-opacity duration-500 pointer-events-none z-10"></div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30">
                                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#121414]/80 border border-[#333535] text-primary backdrop-blur-sm">
                                    <span className="material-symbols-outlined !text-xs">zoom_in</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Left Navigation Button */}
                <button 
                    onClick={(e) => { e.stopPropagation(); handleScrollLeft(); }}
                    className="absolute left-2 top-[40%] -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/80 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-40"
                    aria-label="Önceki Görsel"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>

                {/* Right Navigation Button */}
                <button 
                    onClick={(e) => { e.stopPropagation(); handleScrollRight(); }}
                    className="absolute right-2 top-[40%] -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/80 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-40"
                    aria-label="Sonraki Görsel"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </section>
    );
};
