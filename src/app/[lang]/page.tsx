import { Hero } from "@/components/organisms/Hero";
import { TechnicalStats } from "@/components/organisms/TechnicalStats";
import { FeaturedProjects } from "@/components/organisms/FeaturedProjects";
import { MediaGallery } from "@/components/organisms/MediaGallery";
import { CtaSection } from "@/components/organisms/CtaSection";
import { Footer } from "@/components/organisms/Footer";
import { getDictionary } from "@/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const safeLang = (lang === 'en' ? 'en' : 'tr') as 'tr' | 'en';
  const dict = await getDictionary(safeLang);

  return (
    <>
      <main className="relative">
        <Hero dict={dict} currentLang={safeLang} />
        <TechnicalStats dict={dict} currentLang={safeLang} />
        <FeaturedProjects dict={dict} currentLang={safeLang} />
        <MediaGallery dict={dict} currentLang={safeLang} />
        <CtaSection dict={dict} currentLang={safeLang} />
      </main>
    </>
  );
}
