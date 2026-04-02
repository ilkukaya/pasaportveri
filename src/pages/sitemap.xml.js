import passportData from '../data/passport_data.json';

export async function GET() {
  const baseUrl = 'https://pasaportveri.com';
  const countries = passportData.countries;

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/vizesiz-ulkeler', priority: '0.9', changefreq: 'weekly' },
    { url: '/kapida-vize', priority: '0.8', changefreq: 'weekly' },
    { url: '/e-vize', priority: '0.8', changefreq: 'weekly' },
    { url: '/vize-gerekli', priority: '0.7', changefreq: 'weekly' },
    { url: '/pasaport-siralamasi', priority: '0.8', changefreq: 'monthly' },
    { url: '/pasaport-karsilastir', priority: '0.7', changefreq: 'monthly' },
    { url: '/kac-gun-kalabilirim', priority: '0.7', changefreq: 'monthly' },
    { url: '/seyahat-sigortasi', priority: '0.6', changefreq: 'monthly' },
    { url: '/esim-rehberi', priority: '0.6', changefreq: 'monthly' },
    { url: '/hakkimizda', priority: '0.5', changefreq: 'monthly' },
    { url: '/iletisim', priority: '0.5', changefreq: 'monthly' },
  ];

  const countryPages = countries.map(country => ({
    url: `/ulkeler/${country.slug}`,
    priority: '0.6',
    changefreq: 'monthly'
  }));

  const allPages = [...staticPages, ...countryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
