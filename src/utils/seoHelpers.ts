import type { Country } from './visaHelpers';

export interface SEOMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: string;
}

export function generateIndexMeta(): SEOMeta {
  return {
    title: 'Türk Pasaportuyla Vizesiz Ülkeler 2026 | Pasaport Veri',
    description: 'Türk pasaportuyla kaç ülkeye vizesiz gidebilirsiniz? Güncel vize bilgileri, pasaport güç sıralaması ve seyahat hesaplama araçları.',
    canonical: 'https://pasaportveri.com/',
    ogImage: 'https://pasaportveri.com/og-image.png',
    ogType: 'website'
  };
}

export function generateCountryMeta(country: Country): SEOMeta {
  const statusText: Record<string, string> = {
    visa_free: `vizesiz girilebilir (${country.max_stay_days || 'belirtilmemiş'} güne kadar)`,
    visa_on_arrival: `kapıda vize ile girilebilir`,
    e_visa: `e-vize ile girilebilir`,
    visa_required: `vize gereklidir`,
    no_admission: `giriş yapılamaz`
  };

  return {
    title: `Türk Pasaportuyla ${country.name_tr} Vize Bilgisi 2026 | Pasaport Veri`,
    description: `Türk pasaportuyla ${country.name_tr}'a ${statusText[country.visa_status] || 'bilgi yok'}. ${country.name_tr} vize şartları, başvuru süreci ve seyahat ipuçları.`,
    canonical: `https://pasaportveri.com/ulkeler/${country.slug}`,
    ogImage: 'https://pasaportveri.com/og-image.png',
    ogType: 'article'
  };
}

export function generateCategoryMeta(type: string): SEOMeta {
  const metaMap: Record<string, SEOMeta> = {
    'vizesiz-ulkeler': {
      title: 'Türk Pasaportuyla Vizesiz Gidilebilen Ülkeler 2026 | Pasaport Veri',
      description: 'Türk pasaportuyla vizesiz gidilebilen ülkelerin tam listesi. Kalış süreleri, kıtalara göre filtreleme ve güncel vize bilgileri.',
      canonical: 'https://pasaportveri.com/vizesiz-ulkeler',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'kapida-vize': {
      title: 'Türk Pasaportuyla Kapıda Vize Alınabilen Ülkeler 2026 | Pasaport Veri',
      description: 'Kapıda vize ile girilebilen ülkeler. Ücretler, kalış süreleri ve pratik bilgiler.',
      canonical: 'https://pasaportveri.com/kapida-vize',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'e-vize': {
      title: 'Türk Pasaportuyla E-Vize Alınabilen Ülkeler 2026 | Pasaport Veri',
      description: 'Online e-vize başvurusu yapılabilen ülkeler. Başvuru linkleri, ücretler ve işlem süreleri.',
      canonical: 'https://pasaportveri.com/e-vize',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'vize-gerekli': {
      title: 'Türk Pasaportuyla Vize Gerekli Ülkeler 2026 | Pasaport Veri',
      description: 'Türk vatandaşlarının vize alması gereken ülkeler. Vize türleri, ücretler ve başvuru bilgileri.',
      canonical: 'https://pasaportveri.com/vize-gerekli',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'pasaport-siralamasi': {
      title: 'Dünya Pasaport Güç Sıralaması 2026 | Henley Passport Index | Pasaport Veri',
      description: 'Henley Passport Index 2026 sıralaması. Türk pasaportunun dünya sıralamasındaki yeri ve karşılaştırmalı analiz.',
      canonical: 'https://pasaportveri.com/pasaport-siralamasi',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'pasaport-karsilastir': {
      title: 'Pasaport Karşılaştır - Hangi Pasaport Daha Güçlü? | Pasaport Veri',
      description: 'İki pasaportu yan yana karşılaştırın. Vizesiz ülke sayısı, sıralama ve ortak destinasyonlar.',
      canonical: 'https://pasaportveri.com/pasaport-karsilastir',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'kac-gun-kalabilirim': {
      title: 'Kaç Gün Kalabilirim? Schengen Hesaplama Aracı | Pasaport Veri',
      description: 'Schengen 90/180 kuralı hesaplama aracı. Kaç gün daha kalabileceğinizi öğrenin.',
      canonical: 'https://pasaportveri.com/kac-gun-kalabilirim',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'seyahat-sigortasi': {
      title: 'Seyahat Sigortası Rehberi 2026 | Pasaport Veri',
      description: 'Yurt dışı seyahat sigortası neden gerekli? En uygun seyahat sigortası seçenekleri ve karşılaştırma.',
      canonical: 'https://pasaportveri.com/seyahat-sigortasi',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'esim-rehberi': {
      title: 'Yurt Dışında eSIM Rehberi 2026 | Pasaport Veri',
      description: 'Yurt dışında internet için eSIM rehberi. En uygun eSIM planları, kurulum ve karşılaştırma.',
      canonical: 'https://pasaportveri.com/esim-rehberi',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'hakkimizda': {
      title: 'Hakkımızda | Pasaport Veri',
      description: 'Pasaport Veri hakkında bilgi. Amacımız, vizyonumuz ve iletişim bilgilerimiz.',
      canonical: 'https://pasaportveri.com/hakkimizda',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    },
    'iletisim': {
      title: 'İletişim | Pasaport Veri',
      description: 'Pasaport Veri ile iletişime geçin. Sorularınız, önerileriniz ve iş birliği talepleriniz için.',
      canonical: 'https://pasaportveri.com/iletisim',
      ogImage: 'https://pasaportveri.com/og-image.png',
      ogType: 'website'
    }
  };

  return metaMap[type] || {
    title: 'Pasaport Veri',
    description: 'Türk pasaportu vize bilgileri',
    canonical: 'https://pasaportveri.com/',
    ogImage: 'https://pasaportveri.com/og-image.png',
    ogType: 'website'
  };
}

export function generateCountrySchema(country: Country): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Türk Pasaportuyla ${country.name_tr} - Vize Bilgisi 2026`,
    "description": `Türk pasaportuyla ${country.name_tr}'a ${country.visa_status_tr.toLowerCase()} giriş bilgileri.`,
    "datePublished": country.last_verified,
    "dateModified": country.last_verified,
    "author": {
      "@type": "Organization",
      "name": "pasaportveri.com",
      "url": "https://pasaportveri.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pasaport Veri",
      "url": "https://pasaportveri.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pasaportveri.com/ulkeler/${country.slug}`
    }
  });
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });
}

export function generateWebsiteSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pasaport Veri",
    "url": "https://pasaportveri.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pasaportveri.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
}
