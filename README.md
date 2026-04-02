# pasaportveri.com

Türk pasaportu sahipleri için kapsamlı vize ve seyahat bilgi platformu.

## 🌐 Özellikler

- **233 ülke** için güncel vize bilgileri
- **Henley Passport Index** pasaport güç sıralaması
- **Vizesiz / Kapıda Vize / E-Vize / Vize Gerekli** filtreleme
- **Schengen 90/180** hesaplama aracı
- **Pasaport karşılaştırma** aracı
- **SEO optimize** edilmiş ülke sayfaları
- **Mobil uyumlu** responsive tasarım
- **Haftalık otomatik veri güncelleme** (GitHub Actions)

## 🛠️ Stack

- **Astro 4.x** - Static Site Generation
- **Tailwind CSS** - Styling
- **Vanilla JS** - Interaktif bileşenler
- **GitHub Actions** - Otomatik veri güncelleme
- **Netlify** - Deployment

## 🚀 Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview
```

## 📁 Proje Yapısı

```
pasaportveri/
├── .github/workflows/     # GitHub Actions (haftalık veri güncelleme)
├── public/                # Statik dosyalar (favicon, og-image)
├── src/
│   ├── components/        # Astro bileşenleri
│   ├── data/              # JSON veri dosyaları
│   ├── layouts/           # Sayfa layoutları
│   ├── pages/             # Astro sayfaları
│   ├── scripts/           # Python veri güncelleme scriptleri
│   ├── styles/            # Global CSS
│   └── utils/             # Yardımcı fonksiyonlar
├── astro.config.mjs
├── tailwind.config.mjs
├── netlify.toml
└── package.json
```

## 🔄 Veri Güncelleme

Veriler `.github/workflows/update-data.yml` ile her Pazartesi 06:00 UTC'de otomatik güncellenir. Manuel tetiklemek için GitHub Actions sekmesinden "Run workflow" butonunu kullanın.

## ⚙️ Yapılandırma

### AdSense
`src/components/AdSenseSlot.astro` ve `src/components/SEOHead.astro` dosyalarındaki `ca-pub-ADSENSE_PUB_ID` placeholder'ını kendi AdSense Publisher ID'nizle değiştirin.

### Affiliate Linkleri
`src/data/countries_meta.json` ve `src/components/AffiliateBanner.astro` dosyalarındaki `REFID` ve `MARKER` placeholder'larını kendi affiliate ID'lerinizle değiştirin:
- SafetyWing: `referenceID=REFID`
- Airalo: `ref.airalo.com/REFID`
- Travelpayouts: `shmarker=MARKER`

### Analitik
`src/components/SEOHead.astro` dosyasındaki Plausible/Cloudflare token'larını güncelleyin.

## 📊 Veri Kaynakları

- Henley Passport Index
- Passport Index
- İlgili ülke büyükelçilikleri
- IATA Travel Centre

## 📝 Lisans

MIT
