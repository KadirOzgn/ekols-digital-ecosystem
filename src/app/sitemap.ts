import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekols.com.tr'
  const locales = ['tr', 'en']
  const routes = ['', '/hakkimizda', '/projelerimiz', '/urunlerimiz', '/teklif-al']

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  // Add the root path as well, which redirects to default locale
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  })

  return sitemapEntries
}
