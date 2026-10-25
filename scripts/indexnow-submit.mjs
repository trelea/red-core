const SITE_URL = (process.env.SITE_URL || 'https://redcoreconcrete.com').replace(/\/$/, '');
const KEY = process.env.INDEXNOW_KEY;
if (!KEY) {
  console.error('INDEXNOW_KEY is not set');
  process.exit(1);
}

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
  'https://search.seznam.cz/indexnow',
  'https://searchadvisor.naver.com/indexnow',
  'https://indexnow.yep.com/indexnow',
  'https://internetarchive.indexnow.org/indexnow',
  'https://indexnow.amazonbot.amazon/indexnow',
];

async function collectUrls(sitemapUrl, seen = new Set(), depth = 0) {
  if (seen.has(sitemapUrl) || depth > 5) return [];
  seen.add(sitemapUrl);
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Failed to fetch ${sitemapUrl}: ${res.status}`);
  const xml = await res.text();

  const sitemapMatches = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>\s*(.*?)\s*<\/loc>[\s\S]*?<\/sitemap>/g)]
    .map((m) => m[1].trim());
  if (sitemapMatches.length) {
    const nested = await Promise.all(sitemapMatches.map((u) => collectUrls(u, seen, depth + 1)));
    return nested.flat();
  }

  return [...xml.matchAll(/<url>[\s\S]*?<loc>\s*(.*?)\s*<\/loc>[\s\S]*?<\/url>/g)]
    .map((m) => m[1].trim());
}

const urls = [...new Set(await collectUrls(`${SITE_URL}/sitemap.xml`))];
console.log(`Found ${urls.length} unique URLs in sitemap`);
urls.forEach((u) => console.log(' -', u));

const host = new URL(SITE_URL).hostname;
const keyLocation = `${SITE_URL}/${KEY}.txt`;
const body = { host, key: KEY, keyLocation, urlList: urls };

let failures = 0;
for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    console.log(`${endpoint} -> ${res.status} ${res.statusText} ${text.slice(0, 300)}`);
    if (!res.ok) failures++;
  } catch (err) {
    console.error(`${endpoint} -> ERROR: ${err.message}`);
    failures++;
  }
}

if (failures === ENDPOINTS.length) {
  console.error('All endpoints failed');
  process.exit(1);
}
console.log(`Done. ${ENDPOINTS.length - failures}/${ENDPOINTS.length} endpoints accepted.`);
