import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { childFromParents, dataVersion, estimateStats, findPal, parentsForTarget, pals, passives, solveRoute } from './calculators';
import guidePages from './guides-data.json';

function expectAitdkDescriptionLength(path: string, description: string) {
  expect(description.length, `${path} meta description should be at least 140 characters`).toBeGreaterThanOrEqual(140);
  expect(description.length, `${path} meta description should be at most 160 characters`).toBeLessThanOrEqual(160);
}

function extractRouteDescriptions(source: string) {
  return [...source.matchAll(/\{(?: key: '[^']+',)? path: '([^']+)'[^\n]+description: '([^']+)'/g)].map((match) => ({ path: match[1], description: match[2] }));
}

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

  it('keeps alias data resolvable by the calculator lookup map', () => {
    const aliasesJson = JSON.parse(fs.readFileSync('src/data/aliases.latest.json', 'utf8')) as { aliases: { normalized: string; palId: string }[] };
    const palIds = new Set(pals.map((pal) => pal.id));

    expect(aliasesJson.aliases.length).toBeGreaterThanOrEqual(pals.length * 2);
    for (const alias of aliasesJson.aliases) {
      expect(palIds.has(alias.palId), `${alias.normalized} should point at an existing Pal`).toBe(true);
      expect(findPal(alias.normalized)?.id, `${alias.normalized} should resolve through findPal`).toBe(alias.palId);
    }
  });

  it('keeps generated breeding-pair data internally valid and aligned with normal formula output', () => {
    const breedingJson = JSON.parse(fs.readFileSync('src/data/breeding-pairs.latest.json', 'utf8')) as { pairs: { parentAId: string; parentBId: string; childId: string; comboType: string; ruleId: string; isOrderSensitive: boolean; dataVersion: string; caveats: { code: string }[] }[] };
    const palIds = new Set(pals.map((pal) => pal.id));
    const unorderedParentKeys = new Set<string>();

    expect(breedingJson.pairs.length).toBe((pals.length * (pals.length + 1)) / 2);
    for (const pair of breedingJson.pairs) {
      if (!palIds.has(pair.parentAId) || !palIds.has(pair.parentBId) || !palIds.has(pair.childId)) throw new Error(`Unknown Pal id in pair ${pair.parentAId}+${pair.parentBId}->${pair.childId}`);
      if (pair.comboType !== 'normal' || pair.ruleId !== 'normal-combirank-closest-average' || pair.isOrderSensitive || pair.dataVersion !== dataVersion.dataVersion) throw new Error(`Unexpected pair metadata for ${pair.parentAId}+${pair.parentBId}`);
      if (!pair.caveats.some((c) => c.code === 'SPECIAL_COMBO_NOT_APPLIED')) throw new Error(`Missing special-combo caveat for ${pair.parentAId}+${pair.parentBId}`);
      const parentKey = [pair.parentAId, pair.parentBId].sort().join('|');
      if (unorderedParentKeys.has(parentKey)) throw new Error(`${parentKey} should appear once`);
      unorderedParentKeys.add(parentKey);
    }

    const sampledPairs = [breedingJson.pairs[0], breedingJson.pairs[Math.floor(breedingJson.pairs.length / 2)], breedingJson.pairs[breedingJson.pairs.length - 1]];
    for (const pair of sampledPairs) {
      const generated = childFromParents(pair.parentAId, pair.parentBId);
      expect(generated.ok).toBe(true);
      if (generated.ok) expect(generated.child.id).toBe(pair.childId);
    }
  });

  it('keeps special-combo and passive seed limits explicit until datasets are expanded', () => {
    const specialCombos = JSON.parse(fs.readFileSync('src/data/special-combos.latest.json', 'utf8')) as { combos: unknown[]; caveats: { code: string; severity: string }[] };
    const passiveIds = new Set<string>();

    expect(specialCombos.combos).toHaveLength(0);
    expect(specialCombos.caveats.some((c) => c.code === 'SPECIAL_COMBO_TABLE_PENDING' && c.severity === 'blocking')).toBe(true);
    expect(dataVersion.unsupportedDomains).toContain('verified special combo override table');
    expect(passives.length).toBe(3);
    for (const passive of passives) {
      expect(passiveIds.has(passive.id)).toBe(false);
      passiveIds.add(passive.id);
      expect(passive.effects.length).toBeGreaterThan(0);
      expect(passive.caveats.some((c) => c.code === 'PASSIVE_SEED')).toBe(true);
    }
  });

  it('handles route and stat unsupported edge cases without implying exact support', () => {
    const tooShallow = solveRoute('Anubis', 'Penking, Bushi', 0);
    expect(tooShallow.ok).toBe(false);
    if (!tooShallow.ok) expect(tooShallow.error.code).toBe('MAX_GENERATIONS_TOO_LOW');

    const alreadyOwned = solveRoute('Anubis', 'Anubis', 0);
    expect(alreadyOwned.ok && alreadyOwned.targetAlreadyOwned && alreadyOwned.generations === 0).toBe(true);

    const unsupportedStats = estimateStats('Aegidron', 50, { hp: 500, attack: 100, defense: 100 });
    expect(unsupportedStats.ok).toBe(true);
    if (unsupportedStats.ok) {
      expect(Object.keys(unsupportedStats.expectedStats)).toHaveLength(0);
      expect(Object.keys(unsupportedStats.ivRangeByStat)).toHaveLength(0);
      expect(unsupportedStats.caveats.some((c) => c.code === 'BASE_STATS_PARTIAL' && c.message.includes('hp, attack, defense'))).toBe(true);
      expect(unsupportedStats.confidence).toBe('caveated_range');
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
    const brandIcon = app.match(/<img[^>]+className="brand-mark"[^>]+src="\/brand-icon\.svg"[^>]*\/>/)?.[0] ?? '';
    expect(brandIcon).toContain('alt="PalCalculator logo"');
    expect(brandIcon).not.toContain('alt=""');
    expect(brandIcon).not.toContain('aria-hidden="true"');
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

  it('adds browser-local owned Pal helper without raw owned-Pal analytics', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const styles = fs.readFileSync('src/styles.css', 'utf8');

    expect(app).toContain("ownedPalStorageKey = 'palcalculator:owned-pals:v1'");
    expect(app).toContain('window.localStorage.getItem(ownedPalStorageKey)');
    expect(app).toContain('window.localStorage.setItem(ownedPalStorageKey, JSON.stringify(ids))');
    expect(app).toContain('Browser-local owned Pal helper');
    expect(app).toContain('Stored only in this browser with localStorage');
    expect(app).toContain('No account, upload, backend sync, cookie identity, or raw owned-Pal analytics is added');
    expect(app).toContain('localStorage is unavailable, so the helper works only for this open page. The route text box still works.');
    expect(app).toContain('Use local list in route');
    expect(app).toContain('Clear local list');
    expect(app).toContain('data-owned-pal-helper="browser-local-list"');
    expect(app).toContain('owned_list_add');
    expect(app).toContain('owned_list_remove');
    expect(app).toContain('owned_list_clear');
    expect(app).toContain('owned_list_apply');
    expect(app).toContain('owned_count_bucket');
    expect(app).toContain("storage_scope: 'browser_local'");
    expect(app).not.toContain('owned_pals: owned');
    expect(app).not.toContain('owned_list: owned');
    expect(styles).toContain('.owned-pal-helper');
    expect(styles).toContain('.owned-pal-chip');
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
    expect(app).toContain('Optional. Paste names you already have, separated by commas or new lines, or apply the browser-local helper above. This text is not sent in analytics events.');
    expect(app).toContain('This means...');
    expect(app).toContain('Next step...');
    expect(app).toContain('Caveat...');
    expect(app).toContain('beginner_example_click');
    expect(app).toContain('result_explainer_view');
    expect(app).not.toContain('data-palcalculator-' + 'ad-key');
    expect(styles).toContain('.examples-row');
    expect(styles).toContain('.result-explainer');
  });

  it('keeps passive examples supported and treats zero recognized passives as recoverable unsupported input', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const supportedPassiveNames = new Set(passives.flatMap((passive) => [passive.id.toLowerCase(), passive.displayName.toLowerCase()]));
    const passiveExampleInputs = [...app.matchAll(/setDesired\('([^']+)'\)/g)].map((match) => match[1]);

    expect(passiveExampleInputs.length).toBeGreaterThan(0);
    for (const input of passiveExampleInputs) {
      const recognized = input.split(',').map((name) => name.trim().toLowerCase()).filter((name) => supportedPassiveNames.has(name));
      expect(recognized.length, `${input} should recognize at least one supported passive`).toBeGreaterThan(0);
    }
    expect(app).toContain('No desired passives recognized');
    expect(app).toContain("severity: targetPal && recognizedCount > 0 ? 'ok' : 'error'");
    expect(app).toContain('Use supported passive names from this data version');
  });

  it('keeps sitemap unchanged while adding beginner guide CTAs', () => {
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

    expect((sitemap.match(/<loc>/g) ?? []).length).toBe(24);
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
      '/guides/palworld-breeding-faq/',
      '/guides/how-to-breed-orserk-palworld/',
      '/guides/how-to-breed-shadowbeak-palworld/',
      '/guides/palworld-breeding-with-owned-pals/',
      '/guides/best-palworld-breeding-combos/',
      '/guides/palworld-base-worker-passives/',
    ]);
    expect((sitemap.match(/<loc>/g) ?? []).length).toBe(24);
    expect(sitemap).not.toContain('/share/');
    expect(generator).toContain('src/guides-data.json');
    expect(generator).toContain('FAQPage');
    expect(app).toContain('function GuidePage');
    expect(guidePages.some((page) => page.key === 'guideIvExplained')).toBe(true);
    expect(app).toContain('<GuideLinks navigate={navigate}/>');
    for (const page of guidePages) {
      expect(page.title.length).toBeLessThanOrEqual(60);
      expectAitdkDescriptionLength(page.path, page.description);
      expect(page.faqs.length).toBeGreaterThanOrEqual(7);
      expect(page.sections.length).toBeGreaterThanOrEqual(6);
      expect(sitemap).toContain(`https://palcalculator.com${page.path}`);
      expect(page.intro.join(' ')).toContain('unofficial fan-made');
      expect(page.links.some((link) => link.href === '/data-sources/')).toBe(true);
    }
  });

  it('implements P5 SEO guide pages with route, sitemap, metadata, and caveat guardrails', () => {
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
    const p5Paths = [
      '/guides/palworld-breeding-faq/',
      '/guides/how-to-breed-orserk-palworld/',
      '/guides/how-to-breed-shadowbeak-palworld/',
      '/guides/palworld-breeding-with-owned-pals/',
      '/guides/best-palworld-breeding-combos/',
      '/guides/palworld-base-worker-passives/',
    ];
    const blockedClaims = /official Palworld source|guarantees passive|guaranteed passive outcome|promises perfect IV|claims a universal best build|claims complete special-combo coverage|100% accurate/i;

    for (const route of p5Paths) {
      const page = guidePages.find((entry) => entry.path === route);
      expect(page, `${route} should be in guide data`).toBeTruthy();
      expect(sitemap).toContain(`https://palcalculator.com${route}`);
      expect(page?.title.length).toBeLessThanOrEqual(60);
      expectAitdkDescriptionLength(route, page?.description ?? '');
      expect(page?.intro.join(' ')).toContain('unofficial fan-made');
      expect(JSON.stringify(page)).toContain('/data-sources/');
      expect(page?.faqs.length).toBeGreaterThanOrEqual(7);
      expect(page?.sections.length).toBeGreaterThanOrEqual(5);
      expect(JSON.stringify(page)).not.toMatch(blockedClaims);
    }

    const combos = guidePages.find((entry) => entry.path === '/guides/palworld-breeding-combos/');
    expect(combos?.sections.some((section) => section.heading === 'Current data limits before you follow a combo')).toBe(true);
    expect(JSON.stringify(combos)).toContain('/guides/best-palworld-breeding-combos/');
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
      expectAitdkDescriptionLength(route, page?.description ?? '');
      expect(page?.primaryCta.href.startsWith('/')).toBe(true);
      expect(page?.secondaryCta.href.startsWith('/')).toBe(true);
      expect(page?.links.length).toBeGreaterThanOrEqual(6);
      expect(sitemap).toContain(`https://palcalculator.com${route}`);
      expect(JSON.stringify(page)).not.toMatch(/ad-slot|native-ad|data-palcalculator-ad-key/i);
    }
  });

  it('keeps every indexable route meta description in the AITDK 140-160 character range', () => {
    const shell = fs.readFileSync('index.html', 'utf8');
    const generator = fs.readFileSync('scripts/generate-static-routes.mjs', 'utf8');
    const app = fs.readFileSync('src/main.tsx', 'utf8');
    const shellDescription = shell.match(/<meta name="description" content="([^"]+)"\/>/)?.[1] ?? '';
    const spaRoutes = extractRouteDescriptions(app).filter((route) => !route.path.startsWith('/guides/'));
    const staticRoutes = extractRouteDescriptions(generator).filter((route) => !route.path.startsWith('/guides/'));
    const staticByPath = new Map(staticRoutes.map((route) => [route.path, route.description]));

    expect(spaRoutes.map((route) => route.path)).toEqual([
      '/',
      '/breeding-calculator/',
      '/breeding-route-calculator/',
      '/iv-calculator/',
      '/stats-calculator/',
      '/passive-skill-calculator/',
      '/palworld-1-0-breeding-calculator/',
      '/data-sources/',
      '/privacy/',
      '/terms/',
    ]);
    expect(staticRoutes.map((route) => route.path)).toEqual(spaRoutes.map((route) => route.path));
    expect(shellDescription).toBe(spaRoutes[0].description);

    for (const route of spaRoutes) {
      expect(staticByPath.get(route.path), `${route.path} static generator description should match SPA metadata`).toBe(route.description);
      expectAitdkDescriptionLength(route.path, route.description);
    }
    for (const page of guidePages) expectAitdkDescriptionLength(page.path, page.description);
  });
});
