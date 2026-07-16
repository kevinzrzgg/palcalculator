import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const canonicalOrigin = process.env.VITE_CANONICAL_ORIGIN || 'https://palcalculator.com';

const routes = [
  { path: '/', h1: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', title: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', description: 'Unofficial fan-made Palworld 1.0 calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.', ogTitle: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', ogDescription: 'Fan-made Palworld breeding, route, IV, stats, and passive calculators with visible data caveats.', robots: 'index,follow' },
  { path: '/breeding-calculator/', h1: 'Palworld Breeding Calculator', title: 'Palworld Breeding Calculator - Parent Pairs, Children & Combos', description: 'Use the Palworld breeding calculator shell for parent pairs, target parents, special-combo caveats, and data-version-aware breeding results.', ogTitle: 'Palworld Breeding Calculator', ogDescription: 'Check Palworld parent pairs, children, and special-combo caveats with transparent data-version status.', robots: 'noindex,follow' },
  { path: '/breeding-route-calculator/', h1: 'Palworld Breeding Route Calculator', title: 'Palworld Breeding Route Calculator - Shortest Path from Owned Pals', description: 'Plan Palworld breeding routes from owned Pals to a target Pal with constraints, missing Pal notes, alternatives, and visible data caveats.', ogTitle: 'Palworld Breeding Route Calculator', ogDescription: 'Find route-solver entry points for Palworld breeding paths from owned Pals to a target Pal.', robots: 'noindex,follow' },
  { path: '/iv-calculator/', h1: 'Palworld IV Calculator', title: 'Palworld IV Calculator - Check HP, Attack & Defense IVs', description: 'Estimate Palworld IV ranges from observed HP, attack, defense, level, and modifiers once verified formulas are available.', ogTitle: 'Palworld IV Calculator', ogDescription: 'Check Palworld IV calculator inputs with formula caveats and transparent pending-data states.', robots: 'noindex,follow' },
  { path: '/stats-calculator/', h1: 'Palworld Stats Calculator', title: 'Palworld Stats Calculator - Estimate Pal Stats by Level', description: 'Estimate Palworld stats by Pal, level, modifiers, and IV context with clear formula and data-version caveats.', ogTitle: 'Palworld Stats Calculator', ogDescription: 'Preview Palworld stat calculator inputs and expected stat-band requirements.', robots: 'noindex,follow' },
  { path: '/passive-skill-calculator/', h1: 'Palworld Passive Skill Calculator', title: 'Palworld Passive Skill Calculator - Plan Breeding Passives', description: 'Plan Palworld passive skills for breeding with RNG caveats, desired passive inputs, and no unsupported probability claims.', ogTitle: 'Palworld Passive Skill Calculator', ogDescription: 'Plan Palworld passive-skill targets with transparent inheritance and data limitations.', robots: 'noindex,follow' },
  { path: '/palworld-1-0-breeding-calculator/', h1: 'Palworld 1.0 Breeding Calculator', title: 'Palworld 1.0 Breeding Calculator - Updated Combos & Routes', description: 'Use the Palworld 1.0 breeding calculator entry point for updated combos, route planning, and version-specific caveats.', ogTitle: 'Palworld 1.0 Breeding Calculator', ogDescription: 'Version-focused Palworld 1.0 breeding calculator shell with data freshness notes.', robots: 'noindex,follow' },
  { path: '/data-sources/', h1: 'PalCalculator Data Sources & Update Policy', title: 'PalCalculator Data Sources & Update Policy', description: 'Review PalCalculator dataset status, source categories, update policy, formula assumptions, unsupported data, and correction workflow.', ogTitle: 'PalCalculator Data Sources & Update Policy', ogDescription: 'PalCalculator data version, source policy, update status, and unsupported-domain notes.', robots: 'index,follow' },
  { path: '/privacy/', h1: 'Privacy Policy', title: 'Privacy Policy', description: 'Read the PalCalculator privacy policy for browser-local calculator state, share URLs, hosting logs, and pending analytics disclosures.', ogTitle: 'PalCalculator Privacy Policy', ogDescription: 'How PalCalculator handles local calculator inputs, share URLs, hosting logs, and analytics choices.', robots: 'index,follow' },
  { path: '/terms/', h1: 'Terms of Use', title: 'Terms of Use', description: 'Read PalCalculator terms covering unofficial fan-site status, data accuracy caveats, user responsibility, and acceptable use.', ogTitle: 'PalCalculator Terms of Use', ogDescription: 'Unofficial fan-site terms, Palworld trademark caveats, data accuracy limits, and usage responsibilities.', robots: 'index,follow' },
];

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function canonicalFor(routePath) {
  return `${canonicalOrigin}${routePath}`;
}

const builtIndex = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const assetTags = [...builtIndex.matchAll(/<(script|link)\b[^>]*(?:src|href)="\/assets\/[^"]+"[^>]*><\/script>|<link\b[^>]*href="\/assets\/[^"]+"[^>]*>/g)].map(m => m[0]).join('');

function htmlFor(route) {
  const canonical = canonicalFor(route.path);
  const initial = `<div class="static-prerender"><p class="eyebrow">Unofficial fan-made Palworld tool</p><h1>${esc(route.h1)}</h1><p>${esc(route.description)}</p><p><a href="/data-sources/">Data sources</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p></div>`;
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>${esc(route.title)}</title><meta name="description" content="${esc(route.description)}"/><link rel="canonical" href="${esc(canonical)}"/><meta property="og:title" content="${esc(route.ogTitle)}"/><meta property="og:description" content="${esc(route.ogDescription)}"/><meta property="og:url" content="${esc(canonical)}"/><meta property="og:type" content="website"/><meta name="robots" content="${esc(route.robots)}"/>${assetTags}</head><body><div id="root">${initial}</div></body></html>\n`;
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

const notFound = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>404 - Page Not Found | PalCalculator</title><meta name="robots" content="noindex,follow"/><meta name="description" content="The requested PalCalculator page was not found."/>${assetTags}</head><body><main class="static-prerender"><h1>404 - Page Not Found</h1><p>This PalCalculator URL does not exist. Return to the <a href="/">PalCalculator homepage</a>.</p></main></body></html>\n`;
fs.writeFileSync(path.join(distDir, '404.html'), notFound);
console.log(`Generated ${routes.length} route-specific HTML files, ${indexableRoutes.length} sitemap URLs, explicit slash redirects, and 404.html.`);
