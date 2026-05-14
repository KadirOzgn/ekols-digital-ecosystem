import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/molecules/Header";
import { Footer } from "@/components/organisms/Footer";
import { getDictionary } from "@/dictionaries";
import { UserTracker } from "@/components/analytics/UserTracker";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ekols | Digital Design Ecosystem",
    template: "%s | Ekols"
  },
  description: "Ekols, tasarımın 'Neden'ini mühendislikle sorgulayan, mimari ve dijital tasarımın kesişim noktasında yenilikçi çözümler sunan bir ekosistemdir.",
  keywords: ["ekols", "digital design", "engineering", "architecture", "mühendislik", "mimarlık", "tasarım"],
  authors: [{ name: "Ekols Team" }],
  openGraph: {
    title: "Ekols | Digital Design Ecosystem",
    description: "Tasarımın 'Neden'ini mühendislikle sorguluyoruz.",
    url: "https://ekols.com.tr",
    siteName: "Ekols",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekols | Digital Design Ecosystem",
    description: "Tasarımın 'Neden'ini mühendislikle sorguluyoruz.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const safeLang = (lang === 'en' ? 'en' : 'tr') as 'tr' | 'en';
  const dict = await getDictionary(safeLang);

  return (
    <html
      lang={safeLang}
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body selection:bg-primary selection:text-on-primary tech-bg min-h-full flex flex-col">
        <Header dict={dict} currentLang={lang} />
        <UserTracker />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer dict={dict} currentLang={safeLang} />
      </body>
    </html>
  );
}
