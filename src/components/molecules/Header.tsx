"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = ({ dict, currentLang }: { dict: any, currentLang: string }) => {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkClass = (path: string) => {
      const isActive = pathname === path || pathname === `/${currentLang}${path}` || (path === '/' && pathname === `/${currentLang}`);
      return isActive
          ? "text-nav-link text-primary border-b-[3px] border-primary pb-1 uppercase transition-all duration-300 tracking-wide font-medium"
          : "text-nav-link text-zinc-400 hover:text-white border-b-[3px] border-transparent pb-1 uppercase transition-all duration-300 tracking-wide";
  };

  const getLocalizedPath = (path: string) => {
      if (path === '/') return `/${currentLang}`;
      return `/${currentLang}${path}`;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[110] flex justify-between items-center gap-8 px-6 md:px-12 lg:px-20 py-3 md:py-4 transition-all duration-300 ${mobileMenuOpen ? 'bg-transparent border-transparent' : 'bg-[#0d0e0f]/70 backdrop-blur-xl border-b border-[#333535]/50 shadow-sm'}`}>
        <Link href={`/${currentLang}`} className="flex items-center gap-3 md:gap-6 hover:opacity-80 transition-opacity flex-shrink-0">
            <img src="/logo.png" alt="Ekols Logo" className="h-12 md:h-14 w-auto object-contain rounded-sm" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.removeAttribute('style');
            }}/>
            <div style={{display: 'none'}} className="text-white font-display text-xl tracking-widest font-bold">EKOLS<span className="text-primary">.</span></div>
            <div className="h-6 md:h-8 w-[1px] bg-[#333535]/50 md:bg-gradient-to-b md:from-transparent md:via-[#333535] md:to-transparent"></div>
            <div className="flex flex-col justify-center leading-[1.4] md:leading-tight">
                <span className="text-[7px] md:text-[9px] lg:text-[10px] text-primary/80 uppercase tracking-[0.12em] md:tracking-[0.18em] font-light">{(dict?.Header?.archEng || "ENGINEERING & ARCHITECTURE").split('&')[0].trim()} &</span>
                <span className="text-[7px] md:text-[9px] lg:text-[10px] text-primary/80 uppercase tracking-[0.12em] md:tracking-[0.18em] font-light">{(dict?.Header?.archEng || "ENGINEERING & ARCHITECTURE").split('&')[1]?.trim()}</span>
            </div>
        </Link>
        
        {/* Mesafe azaltıldı: gap-8 lg:gap-12 -> gap-5 lg:gap-8 */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-center h-full pt-1 flex-shrink-0">
            <Link href={getLocalizedPath('/')} className={getLinkClass('/')}>{dict?.Header?.home || "Ana Sayfa"}</Link>
            <Link href={getLocalizedPath('/hakkimizda')} className={getLinkClass('/hakkimizda')}>{dict?.Header?.about || "Hakkımızda"}</Link>
            <Link href={getLocalizedPath('/urunlerimiz')} className={getLinkClass('/urunlerimiz')}>{dict?.Header?.products || "Ürünlerimiz"}</Link>
            <Link href={getLocalizedPath('/projelerimiz')} className={getLinkClass('/projelerimiz')}>{dict?.Header?.projects || "Projelerimiz"}</Link>
            <Link href={getLocalizedPath('/teklif-al')} className={getLinkClass('/teklif-al')}>{dict?.Header?.contact || "İletişim"}</Link>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            {/* İkonlar daha küçük (w-[14px] h-[14px]) ve hafif yukarıda (mb-1) */}
            <div className="hidden lg:flex items-center gap-4 pr-6 border-r border-[#333535]/50 mb-1">
                <a className="text-zinc-500 hover:text-primary hover:scale-110 transition-all duration-300" href="https://www.linkedin.com/in/ekolsdesing/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a className="text-zinc-500 hover:text-primary hover:scale-110 transition-all duration-300" href="#" aria-label="Pinterest">
                    <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.279 1.14c-.038.154-.128.184-.286.11-1.06-.492-1.724-2.031-1.724-3.268 0-2.659 1.932-5.105 5.578-5.105 2.934 0 5.213 2.091 5.213 4.881 0 2.915-1.836 5.263-4.385 5.263-1.182 0-2.294-.614-2.673-1.341l-.73 2.78c-.264 1.01-1.002 2.274-1.493 3.045 1.144.35 2.353.541 3.593.541 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
                <a className="text-zinc-500 hover:text-primary hover:scale-110 transition-all duration-300" href="#" aria-label="TikTok">
                    <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.26-1.15 4.41-2.9 5.8-1.57 1.25-3.66 1.83-5.64 1.55-2.02-.27-3.83-1.39-5.06-3-1.2-1.58-1.68-3.66-1.31-5.61.35-1.93 1.53-3.6 3.19-4.6 1.59-.96 3.53-1.25 5.35-1V14.1c-1.06-.11-2.14.07-3.08.56-.91.47-1.62 1.25-2 2.18-.36.88-.38 1.88-.06 2.78.31.9 1 1.64 1.84 2.05.86.42 1.87.51 2.81.25.93-.24 1.74-.83 2.24-1.62.48-.77.72-1.69.7-2.61V.02h-.01z"/></svg>
                </a>
                <a className="text-zinc-500 hover:text-primary hover:scale-110 transition-all duration-300" href="#" aria-label="Instagram">
                    <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
            </div>

            {/* Dropdown Dil Seçici */}
            <div className="relative pr-2 border-r border-[#333535]/50" ref={dropdownRef}>
                <button 
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-2 text-xs md:text-sm font-medium text-zinc-300 hover:text-primary transition-colors focus:outline-none"
                >
                    {currentLang === 'tr' ? (
                        <div className="flex items-center gap-1.5">
                            <svg width="18" height="12" viewBox="0 0 1200 800" className="rounded-[1px] shadow-sm">
                                <rect width="1200" height="800" fill="#e30a17"/>
                                <circle cx="425" cy="400" r="200" fill="#fff"/>
                                <circle cx="475" cy="400" r="160" fill="#e30a17"/>
                                <polygon points="583.3,400 711.9,441.8 632.4,332.5 632.4,467.5 711.9,358.2" fill="#fff"/>
                            </svg>
                            <span>TR</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            <svg width="18" height="12" viewBox="0 0 60 30" className="rounded-[1px] shadow-sm">
                                <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                            </svg>
                            <span>EN</span>
                        </div>
                    )}
                    <span className="material-symbols-outlined !text-[16px] text-zinc-500">{langOpen ? 'expand_less' : 'expand_more'}</span>
                </button>
                
                {langOpen && (
                    <div className="absolute top-full right-0 mt-3 w-32 bg-[#121414]/95 backdrop-blur-md border border-[#333535] rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
                        <Link 
                            href={pathname.replace(`/${currentLang}`, '/tr') || '/tr'} 
                            onClick={() => setLangOpen(false)}
                            className={`px-4 py-2.5 text-xs transition-colors hover:bg-[#1a1c1c] flex items-center gap-2.5 ${currentLang === 'tr' ? 'text-primary' : 'text-zinc-400'}`}
                        >
                            <svg width="16" height="11" viewBox="0 0 1200 800" className="rounded-[1px]">
                                <rect width="1200" height="800" fill="#e30a17"/>
                                <circle cx="425" cy="400" r="200" fill="#fff"/>
                                <circle cx="475" cy="400" r="160" fill="#e30a17"/>
                                <polygon points="583.3,400 711.9,441.8 632.4,332.5 632.4,467.5 711.9,358.2" fill="#fff"/>
                            </svg>
                            Türkçe
                        </Link>
                        <Link 
                            href={pathname.replace(`/${currentLang}`, '/en') || '/en'} 
                            onClick={() => setLangOpen(false)}
                            className={`px-4 py-2.5 text-xs transition-colors hover:bg-[#1a1c1c] flex items-center gap-2.5 ${currentLang === 'en' ? 'text-primary' : 'text-zinc-400'}`}
                        >
                            <svg width="16" height="11" viewBox="0 0 60 30" className="rounded-[1px]">
                                <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                            </svg>
                            English
                        </Link>
                    </div>
                )}
            </div>

            <Link 
                href={getLocalizedPath('/teklif-al')}
                className="bg-primary text-on-primary px-6 md:px-8 py-2 md:py-2.5 text-[10px] md:text-xs font-bold uppercase transition-all duration-300 hover:bg-white hover:text-[#0d0e0f] hover:shadow-[0_0_15px_rgba(242,202,80,0.5)] rounded-sm"
            >
                {dict?.Header?.getQuote || "Teklif Al"}
            </Link>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden flex flex-col items-center justify-center gap-[6px] w-8 h-8 z-[110]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </button>
        </div>

      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0d0e0f]/40 backdrop-blur-sm z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden pt-20 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <Link onClick={() => setMobileMenuOpen(false)} href={getLocalizedPath('/')} className="text-headline-md text-white hover:text-primary transition-colors">{dict?.Header?.home || "Ana Sayfa"}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href={getLocalizedPath('/hakkimizda')} className="text-headline-md text-white hover:text-primary transition-colors">{dict?.Header?.about || "Hakkımızda"}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href={getLocalizedPath('/urunlerimiz')} className="text-headline-md text-white hover:text-primary transition-colors">{dict?.Header?.products || "Ürünlerimiz"}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href={getLocalizedPath('/projelerimiz')} className="text-headline-md text-white hover:text-primary transition-colors">{dict?.Header?.projects || "Projelerimiz"}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href={getLocalizedPath('/teklif-al')} className="text-headline-md text-primary">{dict?.Header?.contact || "İletişim"}</Link>
      </div>
    </>
  );
};
