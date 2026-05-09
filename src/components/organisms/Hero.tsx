import React from 'react';
import Link from 'next/link';

export const Hero = ({ dict, currentLang }: { dict?: any, currentLang?: string }) => {
  const t = dict?.Hero || {
    badge: "Vizyoner Mühendislik",
    titleLine1: "GELECEĞİ",
    titleLine2: "TASARLIYORUZ",
    description: "Teknik mühendislik ve lüks estetiğin kusursuz birleşimi. EKOLS, modern yaşam alanlarını milimetrik hassasiyetle inşa eder.",
    explore: "Projeleri Keşfet",
    process: "Sürecimiz",
    scroll: "SCROLL"
  };

  const getLocalizedPath = (path: string) => {
    if (!currentLang) return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path}`;
  };

  return (
    <section className="relative h-screen flex flex-col justify-center px-margin overflow-hidden border-b border-[#333535]">
        <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full object-cover" data-alt="Wide angle view of a luxury modern villa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDrnyh9TEwprZfEQN1-O5108DMJdFuPOsL7tZonjpfCxY-as19_8UAbxxCtsoPv8iodavzhgETnba021UdacNNyxtnjI195vgPdkNK8qN5O70HBUk59Cxmrust6jg-wY_kTaw3LVu4qOKlKPCHAaU5iNpEOXx_DlnQyGan4BDV0vLGx6MVxsEBKWtDCJKAmchm3ubVN6Y0rqFDR-wn7bygbWKLNu6Rq6IZ6QMu-O206M2kajEIdUuTtxCTqoLINT1zTjwGgGbQG8ZA" alt="Background Villa"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#121414] via-[#121414]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121414] to-transparent"></div>
            <div className="scanline"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mt-xl">
            <div className="section-stem mb-8">
                <span className="text-label-technical text-primary uppercase">{t.badge}</span>
            </div>
            
            <h1 className="text-display-xl text-white mb-10 uppercase">
                {t.titleLine1} <br/>
                <span className="text-primary">{t.titleLine2}</span>
            </h1>
            
            <div className="p-8 max-w-2xl mb-12 border border-[#333535] bg-[#1a1c1c]/80 backdrop-blur-md">
                <p className="text-body-lg text-on-surface-variant">
                    {t.description}
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
                <Link href={getLocalizedPath('/projelerimiz')} className="bg-primary text-on-primary px-10 text-label-technical uppercase flex items-center justify-center transition-colors hover:bg-white h-[60px]">
                    {t.explore}
                </Link>
                <Link href={getLocalizedPath('/hakkimizda')} className="group border border-primary text-primary px-10 text-label-technical uppercase flex items-center justify-center gap-2 transition-all hover:bg-primary hover:text-on-primary h-[60px]">
                    <span className="material-symbols-outlined text-xl">play_arrow</span>
                    <span>{t.process}</span>
                </Link>
            </div>
        </div>

        <div className="absolute bottom-12 left-margin flex flex-col items-center gap-4">
            <span className="text-label-technical text-zinc-500 rotate-90 origin-left translate-x-3 mb-10">{t.scroll}</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
    </section>
  );
};
