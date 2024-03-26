const fs = require('fs');
const path = require('path');

const PAGES = [
  { url: '', changeFreq: 'monthly', priority: 1.0 },
  { url: 'imprint', changeFreq: 'yearly', priority: 0.1 }
];

const sitemapFile = '../src/sitemap.xml';
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (page) => `
  <url>
    <loc>https://rainbow-palette.app/${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority.toFixed(2)}</priority>
  </url>
`
).join('')}
</urlset>`;

try {
  fs.writeFileSync(path.resolve(__dirname, sitemapFile), sitemap);
  console.info('Sitemap updated');
} catch (err) {
  console.error('Error writing sitemap.xml', err);
}
