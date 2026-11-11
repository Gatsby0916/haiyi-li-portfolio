import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readPortfolioData } from './generate.mjs';

const [html, robots, sitemap, { personalInfo, publications, education }] = await Promise.all([
  readFile(new URL('../dist/index.html', import.meta.url), 'utf8'),
  readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8'),
  readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8'),
  readPortfolioData(),
]);
const decodeHtml = (value) => value.replace(/&(amp|lt|gt|quot|#39);/g, (_, entity) => ({
  amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'",
})[entity]);
const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
assert.ok(head, 'Missing HTML head');
const meta = (key) => {
  const matches = [...head.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"\s*\/?>/gi)]
    .filter((match) => match[1] === key);
  assert.equal(matches.length, 1, `Expected one ${key} meta tag`);
  return decodeHtml(matches[0][2]);
};
const canonicalLinks = [...head.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/gi)];
assert.equal(canonicalLinks.length, 1, 'Expected one canonical link');
const canonical = canonicalLinks[0][1];
assert.equal(canonical, 'https://gatsby0916.github.io/haiyi-li-portfolio/');
const description = meta('description');
assert.ok(description.length > 0 && description.length <= 160, 'Description must be 1-160 characters');
for (const subject of ['3DGS', 'human-AI interaction', 'clinical text extraction', 'applied mathematics']) {
  assert.ok(description.includes(subject), `Missing research direction: ${subject}`);
}
const title = decodeHtml(head.match(/<title>([^<]+)<\/title>/i)[1]);
assert.equal(meta('og:type'), 'profile');
assert.equal(meta('og:title'), title);
assert.equal(meta('og:url'), canonical);
assert.equal(meta('og:description'), description);
assert.equal(meta('twitter:card'), 'summary');
assert.equal(meta('twitter:title'), title);
assert.equal(meta('twitter:description'), description);
console.log(`PASS metadata: description ${description.length}/160 characters; canonical, Open Graph, Twitter summary`);

const scripts = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
assert.equal(scripts.length, 1, 'Expected exactly one JSON-LD script');
const structuredData = JSON.parse(scripts[0][1]);
assert.equal(structuredData['@context'], 'https://schema.org');
const people = structuredData['@graph'].filter((node) => node['@type'] === 'Person');
assert.equal(people.length, 1, 'Expected one main Person');
const person = people[0];
assert.equal(person.name, personalInfo.name);
assert.deepEqual(person.alternateName, ['Gatsby Li', '李海毅']);
assert.equal(person.url, canonical);
assert.deepEqual(new Set(person.sameAs), new Set([
  personalInfo.github, personalInfo.googleScholar, personalInfo.orcid,
  personalInfo.linkedin, personalInfo.huggingface,
]));
assert.equal(person.sameAs.length, 5);
for (const hostname of ['github.com', 'scholar.google.com', 'orcid.org', 'www.linkedin.com', 'huggingface.co']) {
  assert.ok(person.sameAs.some((url) => new URL(url).hostname === hostname), `Missing platform: ${hostname}`);
}
assert.match(person.description, /Incoming.*Fall 2027.*Harvard/s);
assert.ok(!person.affiliation, 'Do not infer a current Harvard affiliation');
assert.ok(person.knowsAbout.includes('3D Gaussian Splatting'));
assert.ok(person.alumniOf.length > 0);
for (const alumnus of person.alumniOf) {
  const record = education.find(({ institution }) => institution === alumnus.name);
  assert.ok(record, 'alumniOf must come from education');
  assert.doesNotMatch(record.period, /present|→/i, 'An ongoing/incoming degree is not completed');
  assert.notEqual(record.id, 'harvard');
}
console.log('PASS JSON-LD: valid JSON; 1 Person; all 5 identity platforms; incoming Harvard wording');
console.log(`PASS alumniOf: ${person.alumniOf.map(({ name }) => name).join(', ')}`);

const articles = structuredData['@graph'].filter((node) => node['@type'] === 'ScholarlyArticle');
assert.equal(articles.length, publications.length);
for (const publication of publications) {
  const article = articles.find(({ headline }) => headline === publication.title);
  assert.ok(article, `Missing article: ${publication.title}`);
  assert.deepEqual(article.author.map(({ name }) => name), publication.authors);
  assert.equal(article.author.find(({ name }) => name === personalInfo.name)['@id'], person['@id']);
  assert.equal(article.datePublished, publication.year);
  assert.equal(article.isPartOf.name, publication.venue);
  assert.ok(article.sameAs.includes(article.url));
  assert.ok(article.sameAs.some((url) => /^https:\/\/(?:arxiv\.org\/abs\/\d|[^/]+\/.*10\.\d{4,9}\/)/.test(url)),
    `Missing DOI/arXiv identifier: ${publication.title}`);
  for (const key of ['doi', 'arxiv']) {
    if (publication.links?.[key]) assert.ok(article.sameAs.includes(publication.links[key]), 'Source links must take precedence');
  }
}
console.log(`PASS articles: ${articles.length}/${publications.length}; titles, authors, years, venues match data.ts; each has DOI/arXiv`);

const fallbackBlocks = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/gi)];
assert.equal(fallbackBlocks.length, 1);
const fallback = fallbackBlocks[0][1];
assert.doesNotMatch(fallback, /\s(?:hidden|style|class|aria-hidden)\s*=/i, 'Fallback must not use hidden elements');
const items = [...fallback.matchAll(/<li>([\s\S]*?)<\/li>/gi)];
assert.equal(items.length, publications.length);
publications.forEach((publication, index) => {
  const text = decodeHtml(items[index][1]);
  assert.ok(text.includes(publication.title));
  assert.ok(text.includes(publication.authors.join(', ')));
  assert.ok(text.includes(publication.venue));
  assert.ok(text.includes(publication.year));
  const links = [...items[index][1].matchAll(/href="([^"]+)"/g)].map((match) => decodeHtml(match[1]));
  const expected = [publication.links?.doi, publication.showArxiv && publication.links?.arxiv,
    publication.links?.pdf, publication.links?.code].filter(Boolean);
  assert.deepEqual(links, expected, 'noscript must preserve the visible publication-link policy');
});
console.log(`PASS noscript: ${items.length} complete publication entries; source link visibility preserved`);

assert.match(robots, /^User-agent: \*\r?$/m);
assert.match(robots, /^Allow: \/\r?$/m);
assert.doesNotMatch(robots, /^Disallow:\s*\S/m);
assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
assert.match(sitemap, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locations, [canonical]);
console.log('PASS robots.txt + sitemap.xml: present; crawling allowed; single URL matches canonical');
console.log('SEO validation passed.');
