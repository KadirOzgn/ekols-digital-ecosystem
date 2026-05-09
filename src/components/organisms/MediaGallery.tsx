import React from 'react';

export const MediaGallery = ({ dict, currentLang }: { dict?: any, currentLang?: string }) => {
  const t = dict?.MediaGallery || {
    badge: "Görsel Ekosistem",
    title: "SİSTEMATİK ESTETİK",
    item1Cat: "STRÜKTÜR / FOTOĞRAF",
    item1Title: "STRÜKTÜREL ÇERÇEVE",
    item2Cat: "CEPHE / VİDEO",
    item2Title: "CEPHE PANELİ (HAREKETLİ)",
    item2Badge: "VİDEO İÇERİK",
    item3Cat: "TEKNİK / 3D MODEL",
    item3Title: "BAĞLANTI ELEMANI (3D)",
    item3Badge: "INTERAKTİF 3D"
  };

  return (
    <section className="px-margin py-xl bg-[#121414] border-t border-[#333535] relative overflow-hidden">
        <div className="flex justify-between items-end mb-16 relative z-10">
            <div>
                <div className="section-stem mb-6">
                    <span className="text-label-technical text-primary uppercase">{t.badge}</span>
                </div>
                <h2 className="text-headline-lg text-white uppercase">{t.title}</h2>
            </div>
            <div className="flex gap-4">
                <button className="w-12 h-12 flex items-center justify-center border border-[#333535] text-white hover:border-primary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">west</span>
                </button>
                <button className="w-12 h-12 flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined">east</span>
                </button>
            </div>
        </div>
        
        <div className="flex gap-gutter overflow-x-auto pb-12 snap-x no-scrollbar relative z-10">
            <div className="min-w-[500px] snap-start group cursor-crosshair">
                <div className="relative overflow-hidden mb-6 aspect-[4/3] border border-[#333535] bg-[#0d0e0f]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI4npky0pz7HnWweyBPWKPhYfUDlxvcYjZ9Js1jItJjqwQR5jw1mZ_a1idaiD5isvdMdFMfjyI05sBiaQWC8yCCFm40H7lSSaP-K0zmqBkAJQFJJ8LScpoRNQBpqyOvXUQvQ4qLd3_pxwyKWr9YsOwh2elVTFlgQQBHyQboZCNGdKe_F5SFT3f8SgINDi7CAiwHnUimWb5lgSgqh4L88Oq544zLN17vvyqWWCn-LEZBzXEDmS9vbRdJh5Vzqkp076QgdyBUCt_c3qr" alt="Strukturel Cerceve"/>
                    <div className="absolute top-4 left-4 bg-[#121414]/90 border border-[#333535] px-4 py-2 text-label-technical text-white uppercase backdrop-blur-md">COORD: 41.0082° N, 28.9784° E</div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 border border-primary flex items-center justify-center bg-[#121414]/50 backdrop-blur-sm text-primary">
                            <span className="material-symbols-outlined">zoom_in</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-label-technical text-zinc-600 uppercase mb-2 block">{t.item1Cat}</span>
                        <p className="text-headline-md text-white uppercase">{t.item1Title}</p>
                    </div>
                    <span className="text-primary font-bold font-display text-xl">01</span>
                </div>
            </div>

            <div className="min-w-[500px] snap-start group cursor-crosshair">
                <div className="relative overflow-hidden mb-6 aspect-[4/3] border border-[#333535] bg-[#0d0e0f]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjzbfdz1B9zODGhgKYoSZORdNQHja44tMkTD2ukSATghCzk3d1AFdvQnvQtnctVPiIvvBRW6-zr8B-KCo7YgvzIK7APmG_72QUad_l6KjiHb5EvMCCjvR1rbcCCVAHK8JuEFh3_ws13jdY2TBmSrJbZNtAXYLvs3K9r5Yj18Cp4cbxpvY48RrhQtaNPYccTZBzzzHB2q_CaCLE7dCw2fnfixJqcF5UGtWOKCYlnr3Oq9iApF8uJV7UOCtor3FWcxw01wdUnatTMGnN" alt="Cephe Paneli"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border border-white text-white flex items-center justify-center bg-[#121414]/50 backdrop-blur-sm group-hover:border-primary group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">play_arrow</span>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-[#121414]/90 border border-[#333535] px-4 py-2 text-label-technical text-white uppercase backdrop-blur-md">{t.item2Badge}</div>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-label-technical text-zinc-600 uppercase mb-2 block">{t.item2Cat}</span>
                        <p className="text-headline-md text-white uppercase">{t.item2Title}</p>
                    </div>
                    <span className="text-primary font-bold font-display text-xl">02</span>
                </div>
            </div>

            <div className="min-w-[500px] snap-start group cursor-crosshair">
                <div className="relative overflow-hidden mb-6 aspect-[4/3] border border-[#333535] bg-[#0d0e0f]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBShYyxjR0WKjqed0H1M8qRkxWq3pECbNnaOfJzBGtpKLM9NZ-18EBcnN-_UG2vlqa0b-IQ8QxhAQs3lBOLEKu5C5w_IWf_pOAgtYVJR6FjvyBj2HXXve5MR-YdVQ6_cwWFw6VajrgXKVP3k3CPE_5Gz6T5ri37awD7D_c7mBJ9q4usQ3qS0FphF4QOXxpi9fI-lGzooFPtazwfrEijVKeThYl9tESmcEsn7NjpimUY7NTA9yXfS4kerDm7D-qrPComfXGsmVQ48hK-" alt="3D Model"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border border-white text-white flex items-center justify-center bg-[#121414]/50 backdrop-blur-sm group-hover:border-primary group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">3d_rotation</span>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-[#121414]/90 border border-[#333535] px-4 py-2 text-label-technical text-white uppercase backdrop-blur-md">{t.item3Badge}</div>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-label-technical text-zinc-600 uppercase mb-2 block">{t.item3Cat}</span>
                        <p className="text-headline-md text-white uppercase">{t.item3Title}</p>
                    </div>
                    <span className="text-primary font-bold font-display text-xl">03</span>
                </div>
            </div>
        </div>
    </section>
  );
};
