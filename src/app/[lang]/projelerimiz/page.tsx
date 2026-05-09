import { getDictionary } from "@/dictionaries";
import fs from "fs";
import path from "path";
import { ProjectSlider } from "./ProjectSlider";

export default async function ProjelerimizPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const safeLang = (lang === 'en' ? 'en' : 'tr') as 'tr' | 'en';
    const dict = await getDictionary(safeLang);
    const t = dict?.Projects || {
        title: "PROJELERİMİZ"
    };

    const projelerDir = path.join(process.cwd(), 'public', 'projeler');
    let groupedProjects: { title: string, images: string[] }[] = [];

    try {
        const entries = fs.readdirSync(projelerDir, { withFileTypes: true });
        
        // Filter out non-directories and process each project directory
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const projectPath = path.join(projelerDir, entry.name);
                const files = fs.readdirSync(projectPath);
                
                // Get image paths for this project
                const images = files
                    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
                    .sort()
                    .map(file => `/projeler/${entry.name}/${file}`);
                
                if (images.length > 0) {
                    groupedProjects.push({
                        title: entry.name,
                        images
                    });
                }
            }
        }
    } catch (e) {
        console.error("Could not read projeler directory", e);
    }

    // Sort projects alphabetically or leave them in fs.readdir order
    groupedProjects.sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div className="min-h-screen bg-[#0d0e0f] pt-[88px] md:pt-[112px] pb-24 tech-bg relative z-10 overflow-hidden">
            {/* Background Scattered Triangles */}
            <svg viewBox="0 0 200 200" className="absolute top-[5%] -left-[10%] w-[1000px] opacity-[0.07] pointer-events-none text-primary drop-shadow-[0_0_20px_rgba(255,110,0,0.3)] rotate-12 -z-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="100,50 135,110 65,110" />
                <polygon points="80,100 115,160 45,160" />
                <polygon points="120,100 155,160 85,160" />
            </svg>
            <svg viewBox="0 0 200 200" className="absolute top-[35%] -right-[15%] w-[1200px] opacity-[0.05] pointer-events-none text-primary drop-shadow-[0_0_20px_rgba(255,110,0,0.3)] -rotate-12 -z-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="100,50 135,110 65,110" />
                <polygon points="80,100 115,160 45,160" />
                <polygon points="120,100 155,160 85,160" />
            </svg>
            <svg viewBox="0 0 200 200" className="absolute top-[65%] left-[5%] w-[800px] opacity-[0.08] pointer-events-none text-primary drop-shadow-[0_0_20px_rgba(255,110,0,0.3)] rotate-45 -z-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="100,50 135,110 65,110" />
                <polygon points="80,100 115,160 45,160" />
                <polygon points="120,100 155,160 85,160" />
            </svg>
            <svg viewBox="0 0 200 200" className="absolute bottom-[5%] -right-[5%] w-[900px] opacity-[0.06] pointer-events-none text-primary drop-shadow-[0_0_20px_rgba(255,110,0,0.3)] -rotate-6 -z-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="100,50 135,110 65,110" />
                <polygon points="80,100 115,160 45,160" />
                <polygon points="120,100 155,160 85,160" />
            </svg>

            <div className="text-center px-4 mb-20 relative z-20 flex flex-col items-center">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-primary mb-6"></div>
                <h1 className="text-headline-lg md:text-display-sm lg:text-[2.5rem] leading-none text-white uppercase font-light tracking-tighter drop-shadow-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                        {t.title}
                    </span>
                    <span className="text-primary text-base md:text-lg align-top block md:inline-block md:-mt-1 md:-ml-1 font-normal">®</span>
                </h1>
                <div className="mt-4 flex items-center gap-4 opacity-70">
                    <span className="w-8 h-[1px] bg-white/30"></span>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-400">Ekols Collection</span>
                    <span className="w-8 h-[1px] bg-white/30"></span>
                </div>
            </div>

            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 relative z-20">
                {groupedProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-20">
                        {groupedProjects.map((project, idx) => (
                            <ProjectSlider key={idx} title={project.title} images={project.images} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-zinc-400 text-4xl mb-4 block">folder_off</span>
                        <p className="text-zinc-500">Proje klasörleri bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
