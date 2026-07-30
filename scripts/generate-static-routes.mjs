import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const canonicalOrigin = process.env.VITE_CANONICAL_ORIGIN || 'https://palcalculator.com';
const guidePages = JSON.parse(fs.readFileSync(path.resolve('src/guides-data.json'), 'utf8'));
const p11GuidePaths = new Set([
  '/guides/how-to-breed-blazamut-palworld/',
  '/guides/how-to-breed-astegon-palworld/',
  '/guides/how-to-breed-grizzbolt-palworld/',
  '/guides/how-to-breed-lyleen-palworld/',
  '/guides/palworld-breeding-path-finder/',
]);

const routes = [
  { path: '/', h1: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', title: 'PalCalculator: Palworld Breeding & IV Tools', description: 'Fan-made Palworld 1.0 calculator hub for breeding routes, parent pairs, IV/stat estimates, passive planning, and owned-Pal optimization with caveats.', keywords: 'Palworld calculator, Palworld breeding calculator, Palworld IV calculator', ogTitle: 'PalCalculator: Palworld Breeding & IV Tools', ogDescription: 'Fan-made Palworld 1.0 calculator hub for breeding routes, parent pairs, IV/stat estimates, passive planning, and owned-Pal optimization with caveats.', robots: 'index,follow' },
  { path: '/breeding-calculator/', h1: 'Palworld Breeding Calculator', title: 'Palworld Breeding Calculator - Parent Pairs', description: 'Check Palworld parent pairs, target parents, child results, special-combo caveats, and data-version-aware breeding notes in a fan-made calculator.', keywords: 'Palworld breeding calculator, Palworld parent pairs, Palworld breeding combos', ogTitle: 'Palworld Breeding Calculator', ogDescription: 'Check Palworld parent pairs, target parents, child results, special-combo caveats, and data-version-aware breeding notes in a fan-made calculator.', robots: 'index,follow' },
  { path: '/breeding-route-calculator/', h1: 'Palworld Breeding Route Calculator', title: 'Palworld Breeding Route Calculator', description: 'Plan Palworld breeding routes from owned Pals to a target Pal with constraints, missing-parent notes, alternatives, and visible data caveats.', keywords: 'Palworld breeding route calculator, Palworld breeding path, owned Pals route', ogTitle: 'Palworld Breeding Route Calculator', ogDescription: 'Plan Palworld breeding routes from owned Pals to a target Pal with constraints, missing-parent notes, alternatives, and visible data caveats.', robots: 'index,follow' },
  { path: '/iv-calculator/', h1: 'Palworld IV Calculator', title: 'Palworld IV Calculator', description: 'Estimate Palworld IV ranges from observed HP, attack, defense, level, and modifier notes while keeping formula assumptions and data caveats visible.', keywords: 'Palworld IV calculator, Palworld stats, Pal IV checker', ogTitle: 'Palworld IV Calculator', ogDescription: 'Estimate Palworld IV ranges from observed HP, attack, defense, level, and modifier notes while keeping formula assumptions and data caveats visible.', robots: 'index,follow' },
  { path: '/stats-calculator/', h1: 'Palworld Stats Calculator', title: 'Palworld Stats Calculator', description: 'Preview Palworld HP, attack, and defense stat bands by Pal and level, with IV context, formula assumptions, and data-version caveats explained.', keywords: 'Palworld stats calculator, Palworld HP attack defense, Pal stats', ogTitle: 'Palworld Stats Calculator', ogDescription: 'Preview Palworld HP, attack, and defense stat bands by Pal and level, with IV context, formula assumptions, and data-version caveats explained.', robots: 'index,follow' },
  { path: '/passive-skill-calculator/', h1: 'Palworld Passive Skill Calculator', title: 'Palworld Passive Skill Calculator', description: 'Plan Palworld passive skill targets for breeding, compare desired passives, and keep inheritance RNG caveats clear without unsupported probability claims.', keywords: 'Palworld passive skill calculator, Palworld passives, passive breeding planner', ogTitle: 'Palworld Passive Skill Calculator', ogDescription: 'Plan Palworld passive skill targets for breeding, compare desired passives, and keep inheritance RNG caveats clear without unsupported probability claims.', robots: 'index,follow' },
  { path: '/palworld-1-0-breeding-calculator/', h1: 'Palworld 1.0 Breeding Calculator', title: 'Palworld 1.0 Breeding Calculator', description: 'Use the Palworld 1.0 breeding calculator entry point for updated parent pairs, route planning, data freshness notes, and version-specific caveats.', keywords: 'Palworld 1.0 breeding calculator, Palworld 1.0 combos, Palworld breeding', ogTitle: 'Palworld 1.0 Breeding Calculator', ogDescription: 'Use the Palworld 1.0 breeding calculator entry point for updated parent pairs, route planning, data freshness notes, and version-specific caveats.', robots: 'index,follow' },
  { path: '/data-sources/', h1: 'PalCalculator Data Sources & Update Policy', title: 'PalCalculator Data Sources & Update Policy', description: 'Review PalCalculator dataset status, source categories, update policy, formula assumptions, unsupported Palworld data, and correction workflow details.', keywords: 'PalCalculator data sources, Palworld data version, Palworld calculator policy', ogTitle: 'PalCalculator Data Sources & Update Policy', ogDescription: 'Review PalCalculator dataset status, source categories, update policy, formula assumptions, unsupported Palworld data, and correction workflow details.', robots: 'index,follow' },
  { path: '/privacy/', h1: 'Privacy Policy', title: 'Privacy Policy | PalCalculator', description: 'Read how PalCalculator handles browser-local calculator state, share URLs, hosting logs, analytics, ads, and privacy choices for fan-made Palworld tools.', keywords: 'PalCalculator privacy policy', ogTitle: 'PalCalculator Privacy Policy', ogDescription: 'Read how PalCalculator handles browser-local calculator state, share URLs, hosting logs, analytics, ads, and privacy choices for fan-made Palworld tools.', robots: 'index,follow' },
  { path: '/terms/', h1: 'Terms of Use', title: 'Terms of Use | PalCalculator', description: 'Read PalCalculator terms for unofficial fan-site status, Palworld trademark references, data accuracy caveats, user responsibility, and acceptable use.', keywords: 'PalCalculator terms of use', ogTitle: 'PalCalculator Terms of Use', ogDescription: 'Read PalCalculator terms for unofficial fan-site status, Palworld trademark references, data accuracy caveats, user responsibility, and acceptable use.', robots: 'index,follow' },
  ...guidePages.map((guide) => ({ path: guide.path, h1: guide.h1, title: guide.title, description: guide.description, keywords: guide.keywords, ogTitle: guide.title, ogDescription: guide.ogDescription, robots: 'index,follow', guide })),
];

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function canonicalFor(routePath) {
  return `${canonicalOrigin}${routePath}`;
}

function paragraphs(values) {
  return values.map((value) => `<p>${esc(value)}</p>`).join('');
}

function guideStructuredData(route) {
  if (!route.guide) return '';
  const article = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: route.guide.h1, description: route.guide.description, url: canonicalFor(route.guide.path), isPartOf: { '@type': 'WebSite', name: 'PalCalculator', url: canonicalOrigin } };
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: route.guide.faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
  const safeJson = (value) => JSON.stringify(value).replaceAll('</script', '<\\/script');
  return `<script type="application/ld+json">${safeJson(article)}</script><script type="application/ld+json">${safeJson(faq)}</script>`;
}

function bodyFor(route) {
  if (!route.guide) {
    const toolLinks = routes.filter((entry) => ['/breeding-calculator/', '/breeding-route-calculator/', '/iv-calculator/', '/stats-calculator/', '/passive-skill-calculator/', '/palworld-1-0-breeding-calculator/'].includes(entry.path)).map((entry) => `<li><a href="${esc(entry.path)}">${esc(entry.h1)}</a></li>`).join('');
    const guideLinks = guidePages.map((guide) => `<li><a href="${esc(guide.path)}">${esc(guide.h1)}</a></li>`).join('');
    return `<p class="eyebrow">Unofficial fan-made Palworld tool</p><h1>${esc(route.h1)}</h1><p>${esc(route.description)}</p><section><h2>PalCalculator tools</h2><ul>${toolLinks}</ul></section><section><h2>Palworld breeding guides</h2><ul>${guideLinks}</ul></section><p><a href="/data-sources/">Data sources</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>`;
  }
  const guide = route.guide;
  const intro = paragraphs(guide.intro);
  const sections = guide.sections.map((section) => `<section><h2>${esc(section.heading)}</h2>${paragraphs(section.paragraphs)}</section>`).join('');
  const links = guide.links.map((link) => `<li><a href="${esc(link.href)}">${esc(link.label)}</a></li>`).join('');
  const faqs = guide.faqs.map((faq) => `<details open><summary>${esc(faq.question)}</summary><p>${esc(faq.answer)}</p></details>`).join('');
  const eyebrow = p11GuidePaths.has(guide.path) ? 'Independent fan-made Palworld guide' : 'Unofficial fan-made Palworld guide';
  return `<p class="eyebrow">${eyebrow}</p><h1>${esc(guide.h1)}</h1><p>${esc(guide.description)}</p>${intro}<p><a href="${esc(guide.primaryCta.href)}">${esc(guide.primaryCta.label)}</a> · <a href="${esc(guide.secondaryCta.href)}">${esc(guide.secondaryCta.label)}</a></p>${sections}<section><h2>Related PalCalculator tools</h2><ul>${links}</ul></section><section><h2>FAQ</h2>${faqs}</section>`;
}

const builtIndex = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const assetTags = [...builtIndex.matchAll(/<(script|link)\b[^>]*(?:src|href)="\/assets\/[^"]+"[^>]*><\/script>|<link\b[^>]*href="\/assets\/[^"]+"[^>]*>/g)].map(m => m[0]).join('');
const faviconTags = '<link rel="icon" href="/favicon.ico" sizes="any"/><link rel="icon" href="/favicon.svg" type="image/svg+xml"/><link rel="apple-touch-icon" href="/apple-touch-icon.png"/><link rel="manifest" href="/site.webmanifest"/>';
const clarityTag = '<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xncq8hrmtz");</script>';
const googleAnalyticsTag = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-8G78ED7TNS"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-8G78ED7TNS");</script>';
const googleAdsenseTag = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8075999128078609" crossorigin="anonymous"></script>';

function htmlFor(route) {
  const canonical = canonicalFor(route.path);
  const initial = `<div class="static-prerender">${bodyFor(route)}</div>`;
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>${esc(route.title)}</title><meta name="description" content="${esc(route.description)}"/><meta name="keywords" content="${esc(route.keywords)}"/><link rel="canonical" href="${esc(canonical)}"/>${faviconTags}<meta property="og:title" content="${esc(route.ogTitle)}"/><meta property="og:description" content="${esc(route.ogDescription)}"/><meta property="og:url" content="${esc(canonical)}"/><meta property="og:type" content="website"/><meta name="robots" content="${esc(route.robots)}"/>${guideStructuredData(route)}${clarityTag}${googleAnalyticsTag}${googleAdsenseTag}${assetTags}</head><body><div id="root">${initial}</div></body></html>
`;
}

for (const route of routes) {
  const file = route.path === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, htmlFor(route));
}

const indexableRoutes = routes.filter(r => r.robots === 'index,follow');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexableRoutes.map(r => `  <url><loc>${canonicalFor(r.path)}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);

const redirects = routes.filter(r => r.path !== '/').map(r => `${r.path.slice(0, -1)} ${r.path} 301`).join('\n') + '\n';
fs.writeFileSync(path.join(distDir, '_redirects'), redirects);

const notFound = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>404 - Page Not Found | PalCalculator</title><meta name="robots" content="noindex,follow"/><meta name="description" content="The requested PalCalculator page was not found."/>${faviconTags}${clarityTag}${googleAnalyticsTag}${googleAdsenseTag}${assetTags}</head><body><main class="static-prerender"><h1>404 - Page Not Found</h1><p>This PalCalculator URL does not exist. Return to the <a href="/">PalCalculator homepage</a>.</p></main></body></html>
`;
fs.writeFileSync(path.join(distDir, '404.html'), notFound);
console.log(`Generated ${routes.length} route-specific HTML files, ${indexableRoutes.length} sitemap URLs, explicit slash redirects, and 404.html.`);
