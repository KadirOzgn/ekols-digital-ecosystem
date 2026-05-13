import { Hero } from "@/components/organisms/Hero";
import { TechnicalStats } from "@/components/organisms/TechnicalStats";
import { FeaturedProjects } from "@/components/organisms/FeaturedProjects";
import { CtaSection } from "@/components/organisms/CtaSection";
import { getDictionary } from "@/dictionaries";
import { products } from "@/lib/data";
import fs from "fs";
import path from "path";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const safeLang = (lang === 'en' ? 'en' : 'tr') as 'tr' | 'en';
  const dict = await getDictionary(safeLang);

  // Calculate counts
  let projectCount = 0;
  try {
    const projelerDir = path.join(process.cwd(), 'public', 'projeler');
    if (fs.existsSync(projelerDir)) {
      const entries = fs.readdirSync(projelerDir, { withFileTypes: true });
      projectCount = entries.filter(entry => entry.isDirectory()).length;
    }
  } catch (e) {
    console.error("Error reading project count:", e);
  }
  
  const productCount = products.length;

  return (
    <>
      <main className="relative">
        <Hero dict={dict} currentLang={safeLang} />
        <TechnicalStats dict={dict} currentLang={safeLang} projectCount={projectCount} productCount={productCount} />
        <FeaturedProjects dict={dict} currentLang={safeLang} />
        <CtaSection dict={dict} currentLang={safeLang} />
      </main>
    </>
  );
}
