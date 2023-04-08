const fs = require('fs')
const path = require('path')

const SITEMAP_FILE = path.join(__dirname, '..', 'src', 'sitemap.xml')
const PAGES = [
  {
    loc: 'https://colors.apps.pawcode.de/',
    changeFreq: 'monthly',
    priority: 1.0,
  },
]

const date = new Date().toISOString().substring(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${PAGES.map(
    (page) => `<url>
    <loc>${page.loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority.toFixed(2)}</priority>
  </url>`
  ).join('\n')}
</urlset>`

fs.promises
  .writeFile(SITEMAP_FILE, sitemap)
  .then(() => {
    console.info('SITEMAP_UPDATER: Update complete')
    process.exit(0)
  })
  .catch((err) => {
    console.error('SITEMAP_UPDATER: Error while updating', err)
    process.exit(1)
  })
