"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { products } from '@/lib/data';

export const FeaturedProjects = ({ dict, currentLang }: { dict?: any, currentLang?: string }) => {
  const t = dict?.FeaturedProjects || {
    badge: "Ekols Koleksiyonu",
    title: "ÜRÜNLERİMİZ",
    scrollAll: "Tümünü Kaydırarak Gör",
    viewAll: "Tümünü Gör",
    noImage: "Görsel Bekleniyor"
  };

  const getLocalizedPath = (path: string) => {
    if (!currentLang) return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path}`;
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const firstChild = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild.clientWidth + 32; 
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
      if (isHovered) return; // Kullanıcı üstüne geldiğinde kaymayı durdur

      const interval = setInterval(() => {
          if (scrollRef.current && scrollRef.current.children.length > 0) {
              const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
              const firstChild = scrollRef.current.children[0] as HTMLElement;
              
              // Kartın tam genişliği + Tailwind gap-8 (32px) boşluk
              const cardWidth = firstChild.clientWidth + 32; 

              // Eğer sona gelindiyse başa dön, değilse tam 1 kart genişliği kaydır (snap özelliği ile tam oturur)
              if (scrollLeft + clientWidth >= scrollWidth - 10) {
                  scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              } else {
                  scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
              }
          }
      }, 5000); // interval slightly increased to give user time with manual buttons

      return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="pl-margin py-xl bg-[#0d0e0f] overflow-hidden" id="products">
        <div className="flex justify-between items-end mb-8 md:mb-16 pr-margin">
            <div>
                <div className="section-stem mb-6">
                    <span className="text-label-technical text-primary uppercase">{t.badge}</span>
                </div>
                <h2 className="text-headline-lg text-white uppercase">{t.title}</h2>
            </div>
        </div>

        <div className="relative group/carousel pr-margin">
            {/* Manual Navigation Buttons - Positioned on sides of the images */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center bg-[#0d0e0f]/60 backdrop-blur-md border border-[#333535] text-white hover:text-primary hover:border-primary transition-all duration-300 rounded-full opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
                aria-label="Previous product"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
                onClick={() => scroll('right')}
                className="absolute right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center bg-[#0d0e0f]/60 backdrop-blur-md border border-[#333535] text-white hover:text-primary hover:border-primary transition-all duration-300 rounded-full opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
                aria-label="Next product"
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </button>

            <div 
                ref={scrollRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex overflow-x-auto gap-4 md:gap-8 pb-8 md:pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((product, idx) => {
                    const localizedProduct = {
                        ...product,
                        title: (t.items as any)?.[`p${idx + 1}Title`] || product.title,
                        category: (t.items as any)?.[`p${idx + 1}Cat`] || product.category
                    };
                    return <ProductCard key={product.id} product={localizedProduct} t={t} />;
                })}
            </div>
        </div>
        
        <div className="md:hidden pr-margin mt-4 flex justify-end">
            <Link href={getLocalizedPath('/urunlerimiz')} className="text-label-technical text-primary uppercase flex items-center gap-sm transition-colors">
                {t.viewAll} <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </Link>
        </div>
    </section>
  );
};

const ProductCard = ({ product, t }: { product: any, t: any }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div 
            className="min-w-[85vw] md:min-w-[280px] lg:min-w-[320px] aspect-[3/4] flex-shrink-0 snap-center relative group cursor-pointer overflow-hidden border border-[#333535]/50 rounded-sm bg-[#0a0b0c]"
        >
            {/* Animated Background Glow */}
            <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-all duration-1000 scale-150 group-hover:scale-100 mix-blend-screen"
                style={{
                    background: `radial-gradient(circle at center, ${product.accentColor} 0%, transparent 60%)`
                }}
            />
            
            {/* Ambient Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#121414]/80 to-[#0d0e0f]/95 pointer-events-none z-0" />

            {/* Content Container with slight glassmorphism effect on hover */}
            <div className="absolute inset-0 p-8 flex items-center justify-center bg-white/0 group-hover:bg-white/[0.02] backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-700 z-10">
                {!imgError ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                        src={product.src} 
                        alt={product.title} 
                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 relative z-10 drop-shadow-2xl brightness-90 group-hover:brightness-110"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    // Görsel yüklenemediğinde gösterilecek zarif placeholder
                    <div className="w-full h-full flex flex-col items-center justify-center text-center relative z-10">
                        <span className="material-symbols-outlined text-zinc-500 text-4xl mb-4 opacity-50">image_not_supported</span>
                        <p className="text-zinc-600 text-sm mb-2">{t?.noImage || "Görsel Bekleniyor"}</p>
                    </div>
                )}
            </div>

            {/* Dark theme blend overlay to anchor the bottom text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e0f] via-[#0d0e0f]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            <div className="absolute bottom-8 left-8 right-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out z-30">
                <span className="text-[10px] tracking-widest text-primary uppercase mb-3 block opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
                    {product.category}
                </span>
                <h3 className="text-lg md:text-xl text-white uppercase leading-tight font-bold tracking-wide">
                    {product.title}
                </h3>
                <div className="h-[1px] w-0 group-hover:w-full bg-primary/50 mt-4 transition-all duration-700 ease-in-out" />
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0 z-30">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121414]/80 backdrop-blur-md border border-[#333535]/50 text-white hover:bg-primary hover:border-primary transition-colors">
                    <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                </span>
            </div>
        </div>
    );
};
