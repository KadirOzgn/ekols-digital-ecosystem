# System Patterns & Design Rules (Sistem Prensipleri)

## Fiziksel Tasarım & Üretim Kuralları
1. **Malzeme Standardı:** 30mm Huş MDF kullanılacaktır. Malzemenin en saf hali ve doğallığı korunarak estetikle harmanlanır.
2. **Akıllı Bağlantı Teknolojisi:** Vida ve alet gerektirmeyen (tool-less & screw-less) geçmeli (interlocking) CNC teknolojisi kullanılır.
3. **Demonte (Flat-pack) Yapı:** Ürünler, küresel gönderime (mikro-ihracat) ve lojistik standartlarına uygun demonte sistemde kurgulanmalıdır.

## Dijital Arayüz (Atomic Design) Prensipleri
Arayüz bileşenleri "Atomic Design" yapısı ile lego gibi modüler olmalıdır. Bu, mimarların yeni deneyimler kurgulamasını hızlandıracaktır.
- **Renk Paleti:**
  - Koyu, premium ve mimari blueprint estetiği.
  - Siyah & Antrasit Tonları (Surface: `#121414`, `#1a1c1c`).
  - Vurgu (Primary): Altın/Sarı tonları (Örn: `#f2ca50`), Ahşap (Oak) sıcaklığı.
- **Izgara (Grid) Sistemi:**
  - Teknik çizim / plan hissiyatı veren 1px (ghost) çizgiler ve ince hatlar.
  - Keskin köşeler (`border-radius: 0`).
- **Modülerlik:**
  - Sayfa bölümleri modüler (`<Section>` bileşenleri) olmalı, gerektiğinde kolaylıkla farklı sayfalarda kullanılabilmelidir.

## Yazılım Geliştirme Standartları
- "Vibe Coding" kuralları gereği, tüm bileşenler birbiriyle izole (decoupled) çalışmalıdır.
- "Geri" tuşu işlevselliğinin her zaman doğal çalışması hedeflenir. Gerekirse URL Query parametreleri ile (örn: `?modal=surec`) state yönetimi yapılır.
