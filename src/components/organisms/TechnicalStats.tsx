import React from 'react';

export const TechnicalStats = ({ dict, currentLang }: { dict?: any, currentLang?: string }) => {
  const t = dict?.TechnicalStats || {
    stat1Value: "120+",
    stat1Label: "Tamamlanan Proje",
    stat2Value: "45K",
    stat2Label: "M2 İnşaat Alanı",
    stat3Value: "0.2",
    stat3Label: "Hata Payı (mm)"
  };

  return (
    <section className="px-margin py-xl relative z-10 border-b border-[#333535] bg-[#121414]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="flex flex-col gap-base border-l border-[#333535] pl-6">
                <span className="text-display-xl text-primary">{t.stat1Value}</span>
                <span className="text-label-technical text-zinc-500 uppercase">{t.stat1Label}</span>
            </div>
            <div className="flex flex-col gap-base border-l border-[#333535] pl-6">
                <span className="text-display-xl text-white">{t.stat2Value}</span>
                <span className="text-label-technical text-zinc-500 uppercase">{t.stat2Label}</span>
            </div>
            <div className="flex flex-col gap-base border-l border-[#333535] pl-6">
                <span className="text-display-xl text-white">{t.stat3Value}</span>
                <span className="text-label-technical text-zinc-500 uppercase">{t.stat3Label}</span>
            </div>
        </div>
    </section>
  );
};
