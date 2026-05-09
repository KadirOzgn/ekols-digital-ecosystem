import { FeaturedProjects } from "@/components/organisms/FeaturedProjects";
import { getDictionary } from "@/dictionaries";

export default async function UrunlerimizPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const safeLang = (lang === 'en' ? 'en' : 'tr') as 'tr' | 'en';
    const dict = await getDictionary(safeLang);

    return (
        <div className="min-h-screen bg-[#0d0e0f] pt-[88px] md:pt-[112px] pb-16">
            <FeaturedProjects dict={dict} currentLang={safeLang} />
        </div>
    );
}
