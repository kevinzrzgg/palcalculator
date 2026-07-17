import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { childFromParents, dataVersion, estimateStats, parentsForTarget, pals, solveRoute } from './calculators';

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
});
