"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function TeklifAlPage() {
    const params = useParams();
    const lang = params?.lang as string || 'tr';
    const isEn = lang === 'en';
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        category: isEn ? 'Architectural Design' : 'Mimari Tasarım',
        details: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{type: 'success' | 'error' | null, message: string}>({ type: null, message: '' });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: 'error', message: isEn ? 'Please enter a valid email address.' : 'Lütfen geçerli bir e-posta adresi giriniz.' });
            setIsSubmitting(false);
            return;
        }

        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            setStatus({ type: 'error', message: isEn ? 'Please enter a valid phone number.' : 'Lütfen geçerli bir telefon numarası giriniz.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: isEn ? 'Your request has been successfully received. We will contact you as soon as possible.' : 'Talebiniz başarıyla alınmıştır. En kısa sürede iletişime geçeceğiz.' });
                setFormData({ fullName: '', email: '', phone: '', category: isEn ? 'Architectural Design' : 'Mimari Tasarım', details: '' });
            } else {
                setStatus({ type: 'error', message: data.message || (isEn ? 'An error occurred.' : 'Bir hata oluştu.') });
            }
        } catch (error) {
            setStatus({ type: 'error', message: isEn ? 'Could not connect to the server. Please try again later.' : 'Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen relative flex items-center justify-center bg-[#0d0e0f] pt-[88px] md:pt-[112px] pb-16 overflow-hidden">
            {/* Mimari Moodboard / Kolaj Arkaplanı */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-2000 overflow-hidden ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {/* Kolaj Grid (Tilted and Scattered) */}
                <div className="absolute inset-[-20%] w-[140%] h-[140%] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 opacity-[0.08] mix-blend-luminosity filter grayscale -rotate-3 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={`relative w-full h-[300px] md:h-[400px] ${i % 2 === 0 ? 'translate-y-16' : '-translate-y-8'} ${i % 3 === 0 ? 'opacity-50' : 'opacity-100'}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={`/products/product-${(i % 10) + 1}.jpg`} 
                                alt="Mimari Kolaj" 
                                className="w-full h-full object-cover rounded-lg shadow-2xl"
                            />
                        </div>
                    ))}
                </div>
                {/* Yumuşatıcı ve Karartıcı Katmanlar */}
                <div className="absolute inset-0 bg-[#0d0e0f]/60 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e0f] via-transparent to-[#0d0e0f] opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e0f] via-transparent to-[#0d0e0f] opacity-80"></div>
            </div>

            {/* Ambient Arkaplan Efektleri */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#f2ca50]/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-2000 z-0 ${mounted ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#333535]/30 -translate-x-1/2 pointer-events-none hidden md:block z-0"></div>

            <div className={`relative z-10 w-full max-w-4xl px-8 md:px-16 transition-all duration-1000 delay-100 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                
                <div className="mb-12 text-center flex flex-col items-center">
                    {/* Animasyonlu Logo */}
                    <div className="mb-8 relative group">
                        <div className="absolute inset-0 bg-[#f2ca50]/20 blur-xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-700"></div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src="/logo-yellow.png" 
                            alt="Ekols" 
                            className="h-16 w-auto object-contain relative z-10 hover:scale-105 transition-transform duration-500" 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>

                    <div className="inline-flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-12 bg-[#f2ca50]"></div>
                        <span className="text-label-technical text-[#f2ca50] uppercase tracking-widest">{isEn ? "Let's Build Together" : "Birlikte İnşa Edelim"}</span>
                        <div className="h-[1px] w-12 bg-[#f2ca50]"></div>
                    </div>
                    
                    <h1 className="text-display-md text-white uppercase mb-4 drop-shadow-md">{isEn ? "Get a Quote" : "Proje Teklifi Al"}</h1>
                    <p className="text-zinc-500 text-body-lg max-w-2xl mx-auto">
                        {isEn ? "Please fill out the form below completely. Our architects and engineers will get back to you regarding your project as soon as possible." : "Lütfen aşağıdaki formu eksiksiz doldurun. Mimarlarımız ve mühendislerimiz en kısa sürede projeniz için size dönüş yapacaktır."}
                    </p>
                </div>

                {/* Glassmorphism Form Container */}
                <form 
                    className="relative space-y-8 bg-[#121414]/70 backdrop-blur-2xl p-8 md:p-12 border border-[#333535]/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm group overflow-hidden" 
                    onSubmit={handleSubmit}
                >
                    {/* Hover durumunda genişleyen şık üst çizgi */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-12 bg-[#f2ca50] group-hover:w-full transition-all duration-1000 ease-in-out"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-2">
                            <label className="text-label-technical text-zinc-400 uppercase">{isEn ? "Full Name" : "Ad Soyad"}</label>
                            <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" required className="w-full bg-[#0d0e0f]/80 border border-[#333535] focus:border-[#f2ca50] focus:outline-none text-white px-6 py-4 transition-colors disabled:opacity-50" placeholder={isEn ? "John Doe" : "İsim Soyisim"} disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-label-technical text-zinc-400 uppercase">{isEn ? "Email" : "E-Posta"}</label>
                            <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full bg-[#0d0e0f]/80 border border-[#333535] focus:border-[#f2ca50] focus:outline-none text-white px-6 py-4 transition-colors disabled:opacity-50" placeholder={isEn ? "example@company.com" : "ornek@sirket.com"} disabled={isSubmitting} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-2">
                            <label className="text-label-technical text-zinc-400 uppercase">{isEn ? "Phone" : "Telefon"}</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#0d0e0f]/80 border border-[#333535] focus:border-[#f2ca50] focus:outline-none text-white px-6 py-4 transition-colors disabled:opacity-50" placeholder="+90 5XX XXX XX XX" disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-label-technical text-zinc-400 uppercase">{isEn ? "Category" : "İlgili Alan"}</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#0d0e0f]/80 border border-[#333535] focus:border-[#f2ca50] focus:outline-none text-white px-6 py-4 transition-colors appearance-none cursor-pointer disabled:opacity-50" disabled={isSubmitting}>
                                <option value={isEn ? "Architectural Design" : "Mimari Tasarım"}>{isEn ? "Architectural Design" : "Mimari Tasarım"}</option>
                                <option value={isEn ? "Interior Design" : "İç Mimari"}>{isEn ? "Interior Design" : "İç Mimari"}</option>
                                <option value={isEn ? "Collection Products" : "Koleksiyon Ürünleri"}>{isEn ? "Collection Products" : "Koleksiyon Ürünleri"}</option>
                                <option value={isEn ? "Custom Production" : "Özel Üretim (Custom)"}>{isEn ? "Custom Production" : "Özel Üretim (Custom)"}</option>
                                <option value={isEn ? "Other" : "Diğer"}>{isEn ? "Other" : "Diğer"}</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2 relative z-10">
                        <label className="text-label-technical text-zinc-400 uppercase">{isEn ? "Project / Product Details" : "Proje / Ürün Detayları"}</label>
                        <textarea name="details" value={formData.details} onChange={handleChange} required rows={6} className="w-full bg-[#0d0e0f]/80 border border-[#333535] focus:border-[#f2ca50] focus:outline-none text-white px-6 py-4 transition-colors resize-none disabled:opacity-50" placeholder={isEn ? "Please detail your vision or the product you need..." : "Lütfen vizyonunuzu veya ihtiyaç duyduğunuz ürünü detaylandırın..."} disabled={isSubmitting}></textarea>
                    </div>

                    {status.message && (
                        <div className={`p-4 rounded-sm border relative z-10 ${status.type === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-red-900/20 border-red-500/50 text-red-400'}`}>
                            {status.message}
                        </div>
                    )}

                    <div className="pt-6 flex gap-6 items-center relative z-10">
                        <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#f2ca50] text-[#0d0e0f] font-bold uppercase tracking-widest py-5 hover:bg-white hover:shadow-[0_0_20px_rgba(242,202,80,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting ? (isEn ? 'SUBMITTING...' : 'GÖNDERİLİYOR...') : (isEn ? 'SUBMIT' : 'GÖNDER')}
                        </button>
                        <Link href={isEn ? "/en" : "/tr"} className="px-8 py-5 border border-[#333535] text-zinc-400 hover:text-white hover:border-zinc-500 uppercase text-label-technical transition-colors text-center disabled:pointer-events-none">
                            {isEn ? "Cancel" : "İptal"}
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
