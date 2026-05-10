"use client";

import React from 'react';
import Link from 'next/link';

export const CtaSection = ({ dict, currentLang }: { dict?: any, currentLang?: string }) => {
  const t = dict?.CtaSection || {
    badge: "Birlikte İnşa Edelim",
    titleLine1: "BİR SONRAKİ VİZYONUNUZU",
    titleLine2: "MÜKEMMELLEŞTİRELİM.",
    description: "EKOLS, mimari fikirlerinizi üst düzey mühendislik çözümleriyle somut birer sanat eserine dönüştürür.",
    button: "Projenizi Başlatın"
  };

  const getLocalizedPath = (path: string) => {
    if (!currentLang) return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path}`;
  };

  return (
    <section className="px-margin py-16 md:py-[120px] relative overflow-hidden bg-[#0d0e0f] border-t border-[#333535]">
        <div className="relative z-10 p-6 md:p-16 text-center max-w-5xl mx-auto border-t-4 border-[#333535] hover:border-primary transition-colors duration-500 bg-[#121414]/40 backdrop-blur-md">
            <span className="text-label-technical text-primary uppercase mb-6 md:mb-8 block">{t.badge}</span>
            <h2 className="text-display-xl text-white mb-8 md:mb-12 uppercase">
                {t.titleLine1} <br/>
                <span className="text-primary">{t.titleLine2}</span>
            </h2>
            <p className="text-body-lg text-zinc-400 max-w-2xl mx-auto mb-10 md:mb-16">
                {t.description}
            </p>
            <div className="flex justify-center gap-8">
                <Link 
                    href={getLocalizedPath('/teklif-al')}
                    className="bg-primary text-on-primary px-8 md:px-16 py-4 md:py-6 text-label-technical uppercase transition-colors hover:bg-white inline-block"
                >
                    {t.button}
                </Link>
            </div>
        </div>
    </section>
  );
};
