"use client";

import React from 'react';
import Link from 'next/link';

export const Footer = ({ dict, currentLang }: { dict?: any, currentLang?: string }) => {
  const t = dict?.Footer || {
    description: "Mimari hassasiyet ve mühendislik vizyonuyla yarının silüetini bugün tasarlıyoruz.",
    menuTitle: "Menü",
    officeTitle: "Ofis",
    storesTitle: "Mağazalarımız",
    followTitle: "Takip Edin",
    rights: "Tüm hakları saklıdır."
  };

  const getLocalizedPath = (path: string) => {
    if (!currentLang) return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path}`;
  };

  return (
    <footer className="bg-[#0d0e0f] pt-24 pb-8 border-t border-[#333535] px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12 xl:gap-8 mb-24">
            <div className="xl:col-span-2 flex flex-col xl:flex-row items-start xl:items-center gap-6 xl:gap-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Ekols Logo" className="h-16 md:h-20 w-auto object-contain object-left rounded-sm shrink-0" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.removeAttribute('style');
                }}/>
                <div style={{display: 'none'}} className="text-white font-display text-2xl tracking-widest font-bold">EKOLS<span className="text-primary">.</span></div>
                <p className="text-body-md text-zinc-500 max-w-sm leading-relaxed border-l-0 xl:border-l border-[#333535] pl-0 xl:pl-6 py-2">
                    {t.description} www.ekols.com.tr
                </p>
            </div>
            
            <div className="flex flex-col gap-6">
                <h4 className="text-label-technical text-white uppercase">{t.menuTitle}</h4>
                <Link className="text-body-md text-zinc-500 hover:text-primary transition-colors" href={getLocalizedPath('/projelerimiz')}>{dict?.Header?.projects || "Projeler"}</Link>
                <Link className="text-body-md text-zinc-500 hover:text-primary transition-colors" href={getLocalizedPath('/hakkimizda')}>{dict?.Header?.about || "Hakkımızda"}</Link>
                <Link className="text-body-md text-zinc-500 hover:text-primary transition-colors" href={getLocalizedPath('/hakkimizda')}>{dict?.Hero?.process || "Süreç"}</Link>
                <Link className="text-body-md text-zinc-500 hover:text-primary transition-colors" href={getLocalizedPath('/teklif-al')}>{dict?.Header?.contact || "İletişim"}</Link>
            </div>
            
            <div className="flex flex-col gap-6">
                <h4 className="text-label-technical text-white uppercase">{t.officeTitle}</h4>
                <p className="text-body-md text-zinc-500">Defne, Hatay</p>
                <p className="text-body-md text-zinc-500">+90 212 000 00 00</p>
            </div>
            
            <div className="flex flex-col gap-6">
                <h4 className="text-label-technical text-white uppercase">{t.storesTitle}</h4>
                <a className="text-body-md text-zinc-500 hover:text-primary transition-colors flex items-center gap-2" href="#" target="_blank" rel="noopener noreferrer">
                    Trendyol <span className="material-symbols-outlined !text-sm">open_in_new</span>
                </a>
                <a className="text-body-md text-zinc-500 hover:text-primary transition-colors flex items-center gap-2" href="#" target="_blank" rel="noopener noreferrer">
                    Etsy <span className="material-symbols-outlined !text-sm">open_in_new</span>
                </a>
            </div>
            
            <div className="flex flex-col gap-6">
                <h4 className="text-label-technical text-white uppercase">{t.followTitle}</h4>
                <div className="flex flex-wrap gap-3">
                    <a className="w-10 h-10 flex items-center justify-center border border-[#333535] text-zinc-400 hover:text-white hover:bg-primary hover:border-primary transition-colors" href="https://www.linkedin.com/in/ekolsdesing/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a className="w-10 h-10 flex items-center justify-center border border-[#333535] text-zinc-400 hover:text-white hover:bg-primary hover:border-primary transition-colors" href="#" aria-label="Pinterest">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.279 1.14c-.038.154-.128.184-.286.11-1.06-.492-1.724-2.031-1.724-3.268 0-2.659 1.932-5.105 5.578-5.105 2.934 0 5.213 2.091 5.213 4.881 0 2.915-1.836 5.263-4.385 5.263-1.182 0-2.294-.614-2.673-1.341l-.73 2.78c-.264 1.01-1.002 2.274-1.493 3.045 1.144.35 2.353.541 3.593.541 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                    </a>
                    <a className="w-10 h-10 flex items-center justify-center border border-[#333535] text-zinc-400 hover:text-white hover:bg-primary hover:border-primary transition-colors" href="#" aria-label="TikTok">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.26-1.15 4.41-2.9 5.8-1.57 1.25-3.66 1.83-5.64 1.55-2.02-.27-3.83-1.39-5.06-3-1.2-1.58-1.68-3.66-1.31-5.61.35-1.93 1.53-3.6 3.19-4.6 1.59-.96 3.53-1.25 5.35-1V14.1c-1.06-.11-2.14.07-3.08.56-.91.47-1.62 1.25-2 2.18-.36.88-.38 1.88-.06 2.78.31.9 1 1.64 1.84 2.05.86.42 1.87.51 2.81.25.93-.24 1.74-.83 2.24-1.62.48-.77.72-1.69.7-2.61V.02h-.01z"/></svg>
                    </a>
                    <a className="w-10 h-10 flex items-center justify-center border border-[#333535] text-zinc-400 hover:text-white hover:bg-primary hover:border-primary transition-colors" href="#" aria-label="Instagram">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#333535]">
            <p className="text-label-technical text-zinc-600 uppercase">
                © 2026 EKOLS. ARCHITECTURAL PRECISION & INNOVATION.
            </p>
            <div className="flex gap-8 mt-4 md:mt-0">
                <Link className="text-label-technical text-zinc-600 hover:text-white uppercase" href="#">Gizlilik Politikası</Link>
                <Link className="text-label-technical text-zinc-600 hover:text-white uppercase" href="#">KVKK</Link>
            </div>
        </div>
    </footer>
  );
};
