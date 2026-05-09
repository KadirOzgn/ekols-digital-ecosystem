# Technical Stack & Architecture

## Çekirdek (Core Architecture)
- **Framework:** Next.js (App Router)
  - Performans ve SEO için Server-Side Rendering (SSR) ve Static Site Generation (SSG).
  - Vibe Coding konseptine uyumlu "Decoupled" bileşen yapısı.
- **Styling:** TailwindCSS
  - Özelleştirilmiş temalar (`ekols-app/tailwind.config.ts`), renk paletleri ve grid yapıları.
- **Frontend / Backend İzolasyonu:**
  - Arayüz ile arka uç (business logic) birbirinden tamamen ayrılmıştır (Headless & API-First).
  - İleride eklenebilecek Headless CMS (Strapi / Sanity vs.) yapılarına tamamen hazırdır.

## Mikro-Servis Yapıları (Black Box Modules)
Mimari yaklaşım uyarınca servisler birbirinden bağımsız çalışır. UI (arayüz), servislerin iş mantığına (business logic) müdahale etmez; sadece veriyi tüketir.
1. **Ürün Modülü:** Fiziksel ürün teknik verilerini (3D modeller, glB dosyaları, CNC detayları) yönetir.
2. **Arbitraj Servisi (`arbitrageService.ts`):** USD/EUR/TL dönüşümleri, Etsy ve bölgesel pazar optimizasyonlarını yürütür.
3. **Lojistik Servisi (`logisticsService.ts`):** Navlungo veya global lojistik API'leri üzerinden kargo hesabı ve süreç yönetimi yapar.
4. **Vision AI Servisi (`visionAiService.ts`):** Görüntü işleme ve mekan analizi (gelecek entegrasyon) için rezerv.

## Database & Data Schema
- "Marketing Content" (pazarlama metinleri, görsel içerikler) ile "Product Specs" (mühendislik verileri, kurulum şemaları, dijital ikizler) veritabanı şemasında ayrıştırılır.
