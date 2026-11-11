import { readFile } from 'node:fs/promises';
import { transformWithEsbuild } from 'vite';

// Load only the public content module. Its optional phone field must not cause
// this build-time loader to read .env.local or expose environment values.
export async function readPortfolioData() {
  const source = await readFile(new URL('../data.ts', import.meta.url), 'utf8');
  const { code } = await transformWithEsbuild(source, 'data.ts', {
    loader: 'ts',
    tsconfigRaw: '{}',
    define: { 'import.meta.env': '{}' },
  });
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

// User-supplied DOI missing from data.ts. Only JSON-LD uses this fallback;
// data.ts takes precedence and the page's publication-link policy stays intact.
const supplementalLinks = {
  'endoextract-2026': { doi: 'https://doi.org/10.1145/3786579.3804934' },
};

/** @returns {import('vite').Plugin} */
export default function portfolioSeo() {
  return {
    name: 'portfolio-seo',
    async transformIndexHtml(html) {
      const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
      if (!canonical) throw new Error('SEO generation requires a canonical URL in index.html.');

      const { personalInfo, publications, education } = await readPortfolioData();
      const personId = `${canonical}#person`;
      const person = {
        '@type': 'Person',
        '@id': personId,
        name: personalInfo.name,
        alternateName: ['Gatsby Li', '李海毅'],
        url: canonical,
        description: `${personalInfo.title} at ${personalInfo.institution}. ${personalInfo.about}`,
        // Only records with an explicit, past end year qualify. "Present" and
        // "Fall 2027 →" do not establish graduation; no current affiliation is inferred.
        alumniOf: education.filter(({ period }) => {
          const endYear = period.match(/[-–—]\s*[^–—-]*?\b(\d{4})\s*$/)?.[1];
          return endYear && Number(endYear) <= new Date().getUTCFullYear();
        }).map(({ institution }) => ({ '@type': 'CollegeOrUniversity', name: institution })),
        knowsAbout: [...new Set([
          'Applied Mathematics', 'Human-AI Interaction', 'Clinical Text Extraction',
          ...publications.flatMap(({ tags }) => tags),
        ])],
        sameAs: [
          personalInfo.github, personalInfo.googleScholar, personalInfo.orcid,
          personalInfo.linkedin, personalInfo.huggingface,
        ],
      };

      const articles = publications.map((publication) => {
        const links = { ...supplementalLinks[publication.id], ...publication.links };
        const sameAs = [links.doi, links.arxiv].filter(Boolean);
        if (!sameAs.length) throw new Error(`Publication ${publication.id} needs a DOI or arXiv URL.`);
        return {
          '@type': 'ScholarlyArticle',
          '@id': `${canonical}#publication-${encodeURIComponent(publication.id)}`,
          headline: publication.title,
          author: publication.authors.map((name) => ({
            '@type': 'Person', name,
            ...(name === personalInfo.name ? { '@id': personId } : {}),
          })),
          // Preserve the source's year precision instead of inventing a month/day.
          datePublished: publication.year,
          isPartOf: { '@type': 'CreativeWork', name: publication.venue },
          description: publication.description,
          url: sameAs[0],
          sameAs,
        };
      });

      const publicationList = publications.map((publication) => {
        const links = [
          ['Paper', publication.links?.doi],
          ['arXiv', publication.showArxiv && publication.links?.arxiv],
          ['PDF', publication.links?.pdf],
          ['Code', publication.links?.code],
        ].filter(([, url]) => url).map(([label, url]) =>
          `<a href="${escapeHtml(url)}">${label}</a>`).join(' · ');
        return `<li><h2>${escapeHtml(publication.title)}</h2>`
          + `<p>${escapeHtml(publication.authors.join(', '))}</p>`
          + `<p>${escapeHtml(publication.venue)} (${escapeHtml(publication.year)})</p>`
          + `<p>${links}</p></li>`;
      }).join('\n');

      return [
        {
          tag: 'script', attrs: { type: 'application/ld+json' }, injectTo: 'head',
          // Escaping '<' prevents source text containing </script> from ending this block.
          children: JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, ...articles] })
            .replace(/</g, '\\u003c'),
        },
        {
          tag: 'noscript', injectTo: 'body',
          children: `<section aria-label="Publications"><h1>${escapeHtml(personalInfo.name)} — Publications</h1>`
            + `<ol>${publicationList}</ol></section>`,
        },
      ];
    },
  };
}
