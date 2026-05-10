"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const products = [
  { id: 1, src: '/products/product-1.jpg', category: 'Seri 01 / Ahşap', title: 'GEOMETRİK AHŞAP SEHPA', accentColor: 'rgba(242, 202, 80, 0.4)' }, // Brand Primary Gold
  { id: 2, src: '/products/product-2.jpg', category: 'Seri 01 / Ahşap', title: 'MASİF SEHPA', accentColor: 'rgba(201, 92, 71, 0.4)' }, // Terracotta / Burnt Sienna
  { id: 3, src: '/products/product-3.jpg', category: 'Seri 02 / Seramik', title: 'MİNİMAL BEYAZ SEHPA', accentColor: 'rgba(76, 106, 101, 0.4)' }, // Muted Emerald/Teal
  { id: 4, src: '/products/product-4.jpg', category: 'Seri 03 / Hibrit', title: 'KUARTZ & CAM SEHPA', accentColor: 'rgba(138, 109, 75, 0.4)' }, // Bronze / Brass
  { id: 5, src: '/products/product-5.jpg', category: 'Seri 04 / Lake', title: 'MAVİ İKONİK SEHPA', accentColor: 'rgba(212, 138, 85, 0.4)' }, // Vibrant Copper
  { id: 6, src: '/products/product-6.jpg', category: 'Seri 05 / Metal', title: 'SİYAH TASARIM MASA', accentColor: 'rgba(161, 61, 61, 0.4)' }, // Brick Red
  { id: 7, src: '/products/product-7.jpg', category: 'Seri 01 / Ahşap', title: 'DALGALI YAN SEHPA', accentColor: 'rgba(81, 96, 117, 0.4)' }, // Slate Blue
  { id: 8, src: '/products/product-8.jpg', category: 'Seri 03 / Hibrit', title: 'KİNETİK KONSOL', accentColor: 'rgba(158, 152, 88, 0.4)' }, // Olive Gold
  { id: 9, src: '/products/product-9.jpg', category: 'Seri 02 / Doğal Taş', title: 'TRAVERTEN ORTA SEHPA', accentColor: 'rgba(194, 160, 119, 0.4)' }, // Travertine Sand
  { id: 10, src: '/products/product-10.jpg', category: 'Seri 01 / Ahşap', title: 'MİNİMAL SİYAH SEHPA', accentColor: 'rgba(110, 72, 74, 0.4)' }, // Deep Rose / Mauve
];

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
      }, 3000); // 3 saniyede bir yumuşak kayma

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
            <Link href={getLocalizedPath('/urunlerimiz')} className="text-label-technical text-zinc-400 hover:text-primary uppercase hidden md:flex items-center gap-sm transition-colors border border-transparent hover:border-primary px-4 py-2">
                {t.scrollAll} <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </Link>
        </div>

        {/* Kaydırmalı Carousel Alanı */}
        <div 
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex overflow-x-auto gap-4 md:gap-8 pb-8 md:pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pr-margin"
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
