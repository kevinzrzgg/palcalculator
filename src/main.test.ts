import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { childFromParents, dataVersion, estimateStats, parentsForTarget, pals, solveRoute } from './calculators';
import guidePages from './guides-data.json';

describe('production Palworld data contract', () => {
  it('replaces pending/example-only public data with a versioned Palworld data build', () => {
    const schema = fs.readFileSync('public/data/schema-version.json', 'utf8');
    const palsJson = fs.readFileSync('public/data/pals.latest.json', 'utf8');
    expect(schema).not.toContain('DATASET_VERSION_PENDING');
    expect(palsJson).not.toContain('example_only');
    expect(dataVersion.dataVersion).toMatch(/^palworld-1-0_/);
    expect(pals.length).toBeGreaterThan(200);
    expect(pals.some((p) => p.displayName === 'Anubis' && p.breedingPower > 0)).toBe(true);
  });

  it('can calculate child from parents and reverse parent pairs', () => {
    const direct = childFromParents('Penking', 'Bushi');
    expect(direct.ok).toBe(true);
    if (direct.ok) {
      expect(direct.child.displayName).toBeTruthy();
      expect(direct.dataVersion).toBe(dataVersion.dataVersion);
    }
    const reverse = parentsForTarget('Anubis', 5);
    expect(reverse.ok).toBe(true);
    if (reverse.ok) {
      expect(reverse.resultCount).toBeGreaterThan(0);
      expect(reverse.pairs.length).toBeGreaterThan(0);
    }
  });

  it('returns route states for owned, empty-owned fallback, no-route, and alternatives', () => {
    const owned = solveRoute('Anubis', 'Anubis', 3);
    expect(owned.ok && owned.targetAlreadyOwned).toBe(true);
    const fallback = solveRoute('Anubis', '', 3);
    expect(fallback.ok).toBe(true);
    if (fallback.ok) {
      expect(fallback.steps.length).toBeGreaterThan(0);
      expect(fallback.missingPals.length).toBeGreaterThan(0);
      expect(fallback.alternatives.length).toBeGreaterThan(0);
    }
    const noRoute = solveRoute('NotAPal', '', 3);
    expect(noRoute.ok).toBe(false);
  });

  it('returns caveated IV/stat bands instead of exact unsupported claims', () => {
    const estimate = estimateStats('Anubis', 50, { hp: 500, attack: 130, defense: 100 });
    expect(estimate.ok).toBe(true);
    if (estimate.ok) {
      expect(estimate.confidence).toBe('caveated_range');
      expect(estimate.caveats.some((c) => c.code === 'EXACT_FORMULA_UNSUPPORTED')).toBe(true);
    }
  });
});

describe('static frontend contract', () => {
  it('ships sitemap, robots, and source-policy pages', () => {
    expect(fs.existsSync('public/sitemap.xml')).toBe(true);
    expect(fs.readFileSync('public/robots.txt', 'utf8')).toContain('Disallow: /share/');
    expect(fs.existsSync('public/data/version.json')).toBe(true);
    expect(fs.existsSync('public/data/breeding-pairs.latest.json')).toBe(true);
    expect(fs.existsSync('public/favicon.ico')).toBe(true);
    expect(fs.existsSync('public/favicon.svg')).toBe(true);
    expect(fs.existsSync('public/apple-touch-icon.png')).toBe(true);
  });
  it('keeps disclaimer and pricing posture in rendered source', () => {
    const source = fs.readFileSync('src/main.tsx', 'utf8');
    expect(source).toContain('unofficial fan-made tool');
    expect(source).toContain('No account or payment is required');
    expect(source).toContain('Special combo overrides remain caveated');
  });

  it('implements share/copy URL state and first-party analytics event hooks', () => {
    const source = fs.readFileSync('src/main.tsx', 'utf8');
    expect(source).toContain('URLSearchParams');
    expect(source).toContain('navigator.clipboard.writeText');
    expect(source).toContain('Copy/share result URL');
    expect(source).toContain('palcalculatorEvents');
    expect(source).toContain('palcalculatorTrack');
    expect(source).toContain('page_slug');
    expect(source).toContain('tool_type');
    expect(source).toContain('referrer_host');
    expect(source).toContain('tool_success');
    expect(source).toContain('tool_error');
    expect(source).toContain('share_copy');
    expect(source).toContain('share_open');
  });

  it('uses the Cloudflare-equivalent static preview server instead of SPA preview fallback', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    expect(pkg.scripts.preview).toContain('scripts/preview-static.mjs');
    expect(fs.existsSync('scripts/preview-static.mjs')).toBe(true);
  });

  it('keeps homepage title short and syncs route head metadata in static and SPA paths', () => {
    const shell = fs.readFileSync('index.html', 'utf8');
    const generator = fs.readFileSync('scripts/generate-static-routes.mjs', 'utf8');
    const app = fs.readFileSync('src/main.tsx', 'utf8');

    expect(shell).toContain('<title>PalCalculator: Palworld Breeding & IV Tools</title>');
    expect('PalCalculator: Palworld Breeding & IV Tools'.length).toBeLessThanOrEqual(60);
    expect(shell).toContain('<link rel="canonical" href="https://palcalculator.com/"/>');
    expect(shell).toContain('<link rel="icon" href="/favicon.ico" sizes="any"/>');
    expect(shell).toContain('<meta name="robots" content="index,follow"/>');

    expect(generator).toContain("title: 'PalCalculator: Palworld Breeding & IV Tools'");
    expect(generator).toContain("<meta name=\"keywords\" content=\"${esc(route.keywords)}\"/>");
    expect(generator).toContain("<link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\"/>");
    expect(generator).toContain("canonicalFor(route.path)");

    expect(app).toContain('function updateHead(route: RouteMeta)');
    expect(app).toContain('document.title = route.title');
    expect(app).toContain("canonical.setAttribute('href', `${canonicalOrigin}${route.path}`)");
    expect(app).toContain("upsertMeta('meta[name=\"description\"]'");
    expect(app).toContain("upsertMeta('meta[name=\"robots\"]'");
  });

  it('uses the new brand icon asset in the header and route HTML icon links', () => {
    const shell = fs.readFileSync('index.html', 'utf8');
    const generator = fs.readFileSync('scripts/generate-static-routes.mjs', 'utf8');
    const app = fs.readFileSync('src/main.tsx', 'utf8');

    expect(fs.existsSync('public/brand-icon.svg')).toBe(true);
    expect(fs.existsSync('public/icon-192.png')).toBe(true);
    expect(fs.existsSync('public/icon-512.png')).toBe(true);
    expect(app).toContain('src="/brand-icon.svg"');
    expect(app).toContain('className="brand-mark"');
    expect(app).not.toContain('<span className="brand-mark">PC</span>');
    for (const html of [shell, generator]) {
      expect(html).toContain('rel="icon" href="/favicon.ico" sizes="any"');
      expect(html).toContain('rel="icon" href="/favicon.svg" type="image/svg+xml"');
      expect(html).toContain('rel="apple-touch-icon" href="/apple-touch-icon.png"');
      expect(html).toContain('rel="manifest" href="/site.webmanifest"');
    }
  });

  it('clarifies homepage and route-specific breeding CTA behavior', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');

    expect(app).toContain('Plan a breeding route');
    expect(app).toContain('Check parent pairs');
    expect(app).toContain('Route planning starts from a target + owned Pals');
    expect(app).toContain('Choose target Pal below');
    expect(app).toContain('inputMarker="route-target"');
    expect(app).toContain('inputMarker="breeding-parent-a"');
    expect(app).toContain('focusHeroInput');
    expect(app).not.toContain('Start with a target Pal');
    expect(app).not.toContain('Calculate breeding</button>');
  });

  it('keeps the mobile header and data badge constrained to the viewport', () => {
    const styles = fs.readFileSync('src/styles.css', 'utf8');

    expect(styles).toContain('html,body,#root{max-width:100%;overflow-x:clip}');
    expect(styles).toContain('.site-header{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;gap:1rem;width:100%;min-width:0');
    expect(styles).toContain('nav{display:flex;gap:.35rem;min-width:0;max-width:100%;flex-wrap:wrap');
    expect(styles).toContain('.hero>*{min-width:0}');
    expect(styles).toContain('.data-badge{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;max-width:100%;min-width:0');
    expect(styles).toContain('.data-badge strong{color:var(--color-warn);overflow-wrap:anywhere}');
    expect(styles).toContain('@media (max-width:850px){.site-header{align-items:flex-start;flex-direction:column}.site-header nav{width:100%;justify-content:flex-start}');
  });

  it('does not ship third-party ad mounts or reserved slot styles', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const styles = fs.readFileSync('src/styles.css', 'utf8');
    const blockedAppTerms = [
      'effective' + 'cpmnetwork',
      'high' + 'performanceformat',
      'container' + '-',
      'at' + 'Options',
      'data-palcalculator-' + 'ad-key',
      'Native' + 'Ad',
      'HighPerformance' + 'Ad',
      'Advert' + 'isement',
    ];

    for (const term of blockedAppTerms) expect(app).not.toContain(term);
    for (const term of ['ad' + '-slot', 'native' + '-ad', 'iframe' + '-ad', 'iframe' + '-ad-grid', 'iframe' + '-ad-mount']) expect(styles).not.toContain(term);
  });

  it('implements P4 beginner examples, helper copy, and result explainers without adding ads', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const styles = fs.readFileSync('src/styles.css', 'utf8');

    expect(app).toContain('How to use PalCalculator');
    expect(app).toContain('Choose your goal');
    expect(app).toContain('Try an example');
    expect(app).toContain('Read what it means');
    expect(app).toContain('Try: Anubis parent lookup');
    expect(app).toContain('Try: route to Anubis from Penking + Bushi');
    expect(app).toContain('Try: level 50 Anubis IV bands');
    expect(app).toContain('Try: Anubis expected stats');
    expect(app).toContain('Try: Artisan + Serious passive plan');
    expect(app).toContain('Type one Pal you own or want to test, e.g. Penking.');
    expect(app).toContain('Optional. Paste names you already have, separated by commas or new lines. This stays browser-local in the MVP.');
    expect(app).toContain('This means...');
    expect(app).toContain('Next step...');
    expect(app).toContain('Caveat...');
    expect(app).toContain('beginner_example_click');
    expect(app).toContain('result_explainer_view');
    expect(app).not.toContain('data-palcalculator-' + 'ad-key');
    expect(styles).toContain('.examples-row');
    expect(styles).toContain('.result-explainer');
  });

  it('keeps sitemap unchanged while adding beginner guide CTAs', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

    expect((sitemap.match(/<loc>/g) ?? []).length).toBe(18);
    expect(sitemap).not.toContain('/share/');
    expect(app).toContain('Try this in PalCalculator');
    expect(app).toContain('Check a combo in the calculator');
    expect(app).toContain('Plan a route instead of one combo');
    expect(app).toContain('Try an IV estimate with caveats visible');
    expect(app).toContain('Plan passives without hiding RNG');
  });

  it('defines SEO guide routes with safe metadata and sitemap entries', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const generator = fs.readFileSync('scripts/generate-static-routes.mjs', 'utf8');
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

    expect(guidePages.map((page) => page.path)).toEqual([
      '/guides/palworld-breeding-combos/',
      '/guides/palworld-breeding-tree/',
      '/guides/palworld-1-0-breeding-guide/',
      '/guides/palworld-iv-explained/',
      '/guides/best-passive-skills-for-breeding-palworld/',
      '/guides/how-to-breed-anubis-palworld/',
      '/guides/how-to-breed-jetragon-palworld/',
      '/guides/palworld-breeding-route-examples/',
    ]);
    expect((sitemap.match(/<loc>/g) ?? []).length).toBe(18);
    expect(sitemap).not.toContain('/share/');
    expect(generator).toContain('src/guides-data.json');
    expect(generator).toContain('FAQPage');
    expect(app).toContain('function GuidePage');
    expect(app).toContain("'guideIvExplained'");
    expect(app).toContain('<GuideLinks navigate={navigate}/>');
    for (const page of guidePages) {
      expect(page.title.length).toBeLessThanOrEqual(60);
      expect(page.description.length).toBeLessThanOrEqual(160);
      expect(page.faqs.length).toBeGreaterThanOrEqual(7);
      expect(page.sections.length).toBeGreaterThanOrEqual(6);
      expect(sitemap).toContain(`https://palcalculator.com${page.path}`);
      expect(page.intro.join(' ')).toContain('unofficial fan-made');
      expect(page.links.some((link) => link.href === '/data-sources/')).toBe(true);
    }
  });

  it('keeps P2 guide metadata, internal links, and ad exclusions aligned', () => {
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
    const p2Paths = [
      '/guides/palworld-iv-explained/',
      '/guides/best-passive-skills-for-breeding-palworld/',
      '/guides/how-to-breed-anubis-palworld/',
      '/guides/how-to-breed-jetragon-palworld/',
      '/guides/palworld-breeding-route-examples/',
    ];
    for (const route of p2Paths) {
      const page = guidePages.find((entry) => entry.path === route);
      expect(page).toBeTruthy();
      expect(page?.title.length).toBeLessThanOrEqual(60);
      expect(page?.description.length).toBeLessThanOrEqual(160);
      expect(page?.primaryCta.href.startsWith('/')).toBe(true);
      expect(page?.secondaryCta.href.startsWith('/')).toBe(true);
      expect(page?.links.length).toBeGreaterThanOrEqual(6);
      expect(sitemap).toContain(`https://palcalculator.com${route}`);
      expect(JSON.stringify(page)).not.toMatch(/ad-slot|native-ad|data-palcalculator-ad-key/i);
    }
  });
});
