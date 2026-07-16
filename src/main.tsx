import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, BadgeCheck, CircleAlert, Database, ExternalLink, Route, ShieldCheck, Sparkles } from 'lucide-react';
import './styles.css';

type ToolKey = 'hub' | 'breeding' | 'route' | 'iv' | 'stats' | 'passives' | 'one0' | 'data' | 'privacy' | 'terms';
type Pal = { id: string; displayName: string; aliases: string[]; tags: string[] };
type ResultState = { title: string; body: string; code?: string; severity?: 'ok' | 'warn' | 'error' };

const PALS: Pal[] = [
  { id: 'example-lamball', displayName: 'Example Lamball', aliases: ['Lamball'], tags: ['example_only'] },
  { id: 'example-cattiva', displayName: 'Example Cattiva', aliases: ['Cattiva'], tags: ['example_only'] },
  { id: 'example-anubis', displayName: 'Example Anubis', aliases: ['Anubis'], tags: ['example_only'] },
  { id: 'example-jetragon', displayName: 'Example Jetragon', aliases: ['Jetragon'], tags: ['example_only'] },
];

const dataVersion = {
  label: 'Data version pending',
  game: 'Palworld 1.0 pending verification',
  lastUpdated: 'Source and update workflow pending',
  formula: 'FORMULA_VERSION_PENDING',
};

const routes: Array<{ key: ToolKey; path: string; label: string; h1: string; description: string }> = [
  { key: 'hub', path: '/', label: 'Home', h1: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', description: 'Unofficial fan-made Palworld 1.0 calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.' },
  { key: 'breeding', path: '/breeding-calculator/', label: 'Breeding', h1: 'Palworld Breeding Calculator', description: 'Check parent pairs, target parents, special-combo caveats, and route-solver handoffs.' },
  { key: 'route', path: '/breeding-route-calculator/', label: 'Route', h1: 'Palworld Breeding Route Calculator', description: 'Plan the shortest route found from owned Pals to a target Pal with visible constraints.' },
  { key: 'iv', path: '/iv-calculator/', label: 'IV', h1: 'Palworld IV Calculator', description: 'Estimate IV ranges from observed stats while showing formula assumptions and unsupported states.' },
  { key: 'stats', path: '/stats-calculator/', label: 'Stats', h1: 'Palworld Stats Calculator', description: 'Preview expected HP, attack, and defense bands once verified stat formulas are available.' },
  { key: 'passives', path: '/passive-skill-calculator/', label: 'Passives', h1: 'Palworld Passive Skill Calculator', description: 'Plan target passives with RNG caveats and no deterministic inheritance promises.' },
  { key: 'one0', path: '/palworld-1-0-breeding-calculator/', label: '1.0 Breeding', h1: 'Palworld 1.0 Breeding Calculator', description: 'A 1.0-focused entry point that shares the breeding calculator and data freshness copy.' },
  { key: 'data', path: '/data-sources/', label: 'Data Sources', h1: 'PalCalculator Data Sources & Update Policy', description: 'Dataset version, source policy, unsupported domains, and correction workflow.' },
  { key: 'privacy', path: '/privacy/', label: 'Privacy', h1: 'Privacy Policy', description: 'How PalCalculator handles local calculator state, share URLs, hosting logs, and analytics.' },
  { key: 'terms', path: '/terms/', label: 'Terms', h1: 'Terms of Use', description: 'Unofficial fan-site terms, caveats, and acceptable use.' },
];

function routeFromPath(): ToolKey {
  const path = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
  return routes.find((r) => r.path === path)?.key ?? 'hub';
}

function useRoute() {
  const [current, setCurrent] = useState<ToolKey>(routeFromPath());
  function navigate(key: ToolKey) {
    const route = routes.find((r) => r.key === key)!;
    window.history.pushState({}, '', route.path);
    document.title = route.h1;
    setCurrent(key);
  }
  React.useEffect(() => {
    const onPop = () => setCurrent(routeFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return { current, navigate };
}

function DataBadge() {
  return <div className="data-badge" title="Calculator results use the selected data version. Patches can change breeding, stats, and passive behavior."><Database size={16}/><span>{dataVersion.game}</span><strong>{dataVersion.label}</strong></div>;
}

function Disclaimer() {
  return <p className="disclaimer">PalCalculator is an unofficial fan-made tool and is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team. Palworld and related names are trademarks or properties of their respective owners.</p>;
}

function Header({ current, navigate }: { current: ToolKey; navigate: (key: ToolKey) => void }) {
  return <header className="site-header"><button className="brand" onClick={() => navigate('hub')}><span className="brand-mark">PC</span><span>PalCalculator</span></button><nav aria-label="Primary navigation">{routes.filter(r => ['breeding','route','iv','stats','passives','data'].includes(r.key)).map(r => <button key={r.key} className={current === r.key ? 'active' : ''} onClick={() => navigate(r.key)}>{r.label}</button>)}</nav></header>;
}

function ToolHero({ route, navigate }: { route: (typeof routes)[number]; navigate: (key: ToolKey) => void }) {
  return <section className="hero"><div><p className="eyebrow">Unofficial fan-made Palworld tool</p><h1>{route.h1}</h1><p className="hero-copy">{route.description}</p><div className="hero-actions"><button className="primary" onClick={() => navigate('route')}>Start with a target Pal <ArrowRight size={18}/></button><button className="secondary" onClick={() => navigate('breeding')}>Calculate breeding</button></div></div><div className="hero-card"><DataBadge/><p>Free for normal player use at MVP. No login or payment required for P0 calculators.</p><ul><li>Calculator UI above the fold</li><li>Copy/share URL state, no account wall</li><li>Visible caveats instead of fabricated certainty</li></ul></div></section>;
}

function PalSelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label className="field"><span>{label}</span><input list="pal-options" value={value} placeholder="Example: Anubis, Jetragon, Orserk" onChange={(e) => onChange(e.target.value)} /><datalist id="pal-options">{PALS.flatMap(p => [p.displayName, ...p.aliases]).map(name => <option key={name} value={name}/>)}</datalist></label>;
}

function findPal(input: string) {
  const n = input.trim().toLowerCase();
  return PALS.find(p => p.displayName.toLowerCase() === n || p.aliases.some(a => a.toLowerCase() === n));
}

function ResultBox({ result }: { result: ResultState }) {
  return <div className={`result ${result.severity ?? 'warn'}`} role="status"><div className="result-title">{result.severity === 'ok' ? <BadgeCheck/> : <CircleAlert/>}<strong>{result.title}</strong></div><p>{result.body}</p>{result.code && <code>{result.code}</code>}</div>;
}

function BreedingCalculator({ one0=false }: { one0?: boolean }) {
  const [mode, setMode] = useState<'pair'|'target'>('pair');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [target, setTarget] = useState('');
  const result = useMemo<ResultState>(() => {
    if (mode === 'pair') {
      if (!a || !b) return { title: 'Try a parent pair', body: 'Type two Pal names. Example seed data is present only to exercise UI states; production Palworld breeding data is pending.', code: 'EMPTY_PAIR_INPUT' };
      const pa = findPal(a), pb = findPal(b);
      if (!pa || !pb) return { title: 'Pal name needs review', body: 'We could not match one or both names. Choose a suggestion or wait for the verified alias file.', code: 'INVALID_PAL', severity: 'error' };
      return { title: 'Breeding data unavailable', body: `${pa.displayName} + ${pb.displayName} cannot be calculated yet because verified production breeding data is not installed. This is the contract-safe state required by the data policy.`, code: 'DATASET_VERSION_PENDING' };
    }
    if (!target) return { title: 'Choose a target Pal', body: 'Enter the child Pal you want. The production parent-pair table is pending and will replace this unavailable state.', code: 'EMPTY_TARGET' };
    const pt = findPal(target);
    if (!pt) return { title: 'Target needs review', body: 'No exact Pal match in the current alias seed. Suggestions should not silently calculate.', code: 'INVALID_TARGET', severity: 'error' };
    return { title: 'Parent pairs unavailable', body: `Target ${pt.displayName} is recognized in the UI seed, but verified parent-pair data is pending. Link this result to the route solver after data import.`, code: 'BREEDING_DATA_PENDING' };
  }, [mode,a,b,target]);
  return <ToolPanel title={one0 ? 'Palworld 1.0 breeding workspace' : 'Breeding workspace'} icon={<Sparkles/>}><div className="segmented"><button className={mode==='pair'?'selected':''} onClick={() => setMode('pair')}>Pair to child</button><button className={mode==='target'?'selected':''} onClick={() => setMode('target')}>Target to parents</button></div>{mode === 'pair' ? <div className="grid two"><PalSelect label="Parent A" value={a} onChange={setA}/><PalSelect label="Parent B" value={b} onChange={setB}/></div> : <PalSelect label="Target child" value={target} onChange={setTarget}/>}<ResultBox result={result}/><CaveatList items={["Special-combo marker and all parent-pair results require verified Palworld data.", "Copy/share URLs encode selected names only; no save files or private Palbox data are uploaded.", "Results depend on selected data version and patch changes."]}/></ToolPanel>;
}

function RouteSolver() {
  const [target, setTarget] = useState('');
  const [owned, setOwned] = useState('');
  const [maxGen, setMaxGen] = useState(3);
  const result = useMemo<ResultState>(() => {
    if (!target) return { title: 'Start with a target Pal', body: 'Enter the Pal you want and optionally paste owned Pals. Owned lists remain in the browser UI.', code: 'EMPTY_TARGET' };
    const pt = findPal(target);
    if (!pt) return { title: 'Target not recognized', body: 'Choose from suggestions or wait for verified alias data.', code: 'INVALID_TARGET', severity: 'error' };
    return { title: 'Route solver waiting on verified data', body: `Route steps for ${pt.displayName} from ${owned ? 'your pasted owned list' : 'an empty owned list'} are unavailable until breeding graph data is installed. Current max generations: ${maxGen}.`, code: 'ROUTE_DATA_PENDING' };
  }, [target, owned, maxGen]);
  return <ToolPanel title="Route-first workspace" icon={<Route/>}><div className="grid two"><PalSelect label="Target Pal" value={target} onChange={setTarget}/><label className="field"><span>Max generations</span><input type="number" min={1} max={8} value={maxGen} onChange={(e)=>setMaxGen(Number(e.target.value))}/></label></div><label className="field"><span>Owned Pals (browser-local paste)</span><textarea value={owned} onChange={(e)=>setOwned(e.target.value)} placeholder="Example: Lamball, Cattiva, Anubis" /></label><ResultBox result={result}/><ol className="timeline"><li><span>1</span><p>Choose target Pal</p></li><li><span>2</span><p>Paste owned Pals locally</p></li><li><span>3</span><p>Verified graph returns route steps, missing Pals, and alternatives</p></li></ol></ToolPanel>;
}

function IvStatsTool({ kind }: { kind: 'iv' | 'stats' }) {
  const [pal, setPal] = useState('');
  const [level, setLevel] = useState(50);
  const [hp, setHp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const validNumbers = [hp, attack, defense].every(v => !v || Number(v) >= 0);
  const result: ResultState = !pal ? { title: kind === 'iv' ? 'Enter observed stats' : 'Choose a Pal/build', body: 'Formula support is pending. The UI captures the required contract fields and displays caveats.', code: 'EMPTY_STATS_INPUT' } : !findPal(pal) ? { title: 'Pal not recognized', body: 'No exact match in current alias seed.', code: 'INVALID_PAL', severity: 'error' } : !validNumbers ? { title: 'Impossible stat values', body: 'Observed stats must be positive numbers.', code: 'INVALID_STAT', severity: 'error' } : { title: 'Formula unavailable', body: `${kind === 'iv' ? 'IV ranges' : 'Expected stat bands'} for ${pal} at level ${level} require verified base stats and formula version.`, code: 'FORMULA_VERSION_PENDING' };
  return <ToolPanel title={kind === 'iv' ? 'IV estimate workspace' : 'Stats range workspace'} icon={<BadgeCheck/>}><div className="grid two"><PalSelect label="Pal" value={pal} onChange={setPal}/><label className="field"><span>Level</span><input type="number" min={1} max={60} value={level} onChange={(e)=>setLevel(Number(e.target.value))}/></label></div><div className="grid three"><label className="field"><span>Observed HP</span><input value={hp} onChange={(e)=>setHp(e.target.value)} inputMode="numeric" /></label><label className="field"><span>Observed Attack</span><input value={attack} onChange={(e)=>setAttack(e.target.value)} inputMode="numeric" /></label><label className="field"><span>Observed Defense</span><input value={defense} onChange={(e)=>setDefense(e.target.value)} inputMode="numeric" /></label></div><ResultBox result={result}/><CaveatList items={["Outputs must be ranges when rounding/modifiers create uncertainty.", "Formula assumptions and unsupported modifiers are shown before launch.", "No perfect IV or 100% accuracy claims are used."]}/></ToolPanel>;
}

function PassivePlanner() {
  const [target, setTarget] = useState('');
  const [passives, setPassives] = useState('');
  return <ToolPanel title="Passive planner shell" icon={<ShieldCheck/>}><div className="grid two"><PalSelect label="Target Pal" value={target} onChange={setTarget}/><label className="field"><span>Desired passives</span><input value={passives} onChange={(e)=>setPassives(e.target.value)} placeholder="Example: Artisan, Serious" /></label></div><ResultBox result={{ title: 'Planning guidance only', body: target ? `Passive planning for ${target} is captured, but inheritance candidates and odds are unavailable until verified passive/breeding data exists. RNG caveats remain visible by design.` : 'Choose a target and desired passives. This P0 shell avoids deterministic passive inheritance promises.', code: 'PASSIVE_DATA_PENDING' }}/><CaveatList items={["Passive inheritance can involve RNG.", "Use as planning guidance, not certainty.", "Candidate parents/routes require verified source data."]}/></ToolPanel>;
}

function ToolPanel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <section className="tool-panel"><div className="tool-title">{icon}<h2>{title}</h2></div><DataBadge/>{children}</section>;
}

function CaveatList({ items }: { items: string[] }) { return <ul className="caveats">{items.map(i => <li key={i}>{i}</li>)}</ul>; }

function Hub({ navigate }: { navigate: (key: ToolKey) => void }) {
  return <><div className="cards">{routes.filter(r => ['breeding','route','iv','stats','passives','one0'].includes(r.key)).map(r => <button className="card" key={r.key} onClick={() => navigate(r.key)}><h3>{r.h1}</h3><p>{r.description}</p><span>{r.label} <ArrowRight size={14}/></span></button>)}</div><section className="content"><h2>Why PalCalculator exists</h2><p>Breeding in Palworld gets messy fast when you are checking pairs, routes, IVs, stats, and passive skills in separate tabs. PalCalculator puts the task-first calculators first, then keeps data version, source, formula, and fan-site caveats next to the result.</p><h2>Free MVP posture</h2><p>All P0 calculators are free for normal player use at MVP. There is no login, payment, ad placement above inputs, or server-side save-file upload.</p></section></>;
}

function DataSources() { return <section className="content"><h2>Data source status</h2><p>Current status: production Palworld dataset is pending. This implementation ships the frontend contract and explicit unavailable states rather than fabricated results.</p><dl><dt>Game target</dt><dd>Palworld 1.0 pending verification</dd><dt>Dataset build</dt><dd>DATASET_VERSION_PENDING</dd><dt>Last updated</dt><dd>Pending verified source workflow</dd><dt>Included domains planned</dt><dd>Pals, breeding pairs, special combos, passive skills, stat formulas, aliases.</dd><dt>Unsupported now</dt><dd>Production breeding graph, real IV/stat formulas, deterministic passive odds, save-file import.</dd></dl><p>Calculator results depend on the selected data version and may lag behind new Palworld patches. We show data version and mark unsupported or uncertain data instead of fabricating results.</p></section>; }

function Privacy() { return <section className="content"><h2>Privacy summary</h2><p>PalCalculator is designed as a static, Cloudflare-first calculator hub. MVP inputs such as selected Pals, owned-Pal text, stat fields, and passive choices are handled in the browser UI unless a later owner-approved backend design changes that.</p><ul><li>No account or payment is required for P0 calculators.</li><li>No server-side save-file or raw Palbox upload is implemented in this frontend.</li><li>Share URLs may include selected Pals or settings; do not share a link if you consider that state private.</li><li>Analytics provider is pending. Before production analytics, disclose provider, event names, retention, and cookie/local-storage behavior.</li><li>Hosting may involve standard Cloudflare security and access logs.</li></ul></section>; }

function Terms() { return <section className="content"><h2>Unofficial fan-site terms</h2><p>This site is provided as an independent fan tool. References to Palworld, Pal names, game mechanics, or related terms are for identification and compatibility purposes only. We do not claim ownership of Palworld or related trademarks, logos, characters, artwork, or game assets.</p><ul><li>Do not rely on calculator output as guaranteed, official, always current, or perfectly accurate.</li><li>Results depend on selected data versions, source quality, game patches, formulas, modifiers, and RNG.</li><li>Do not use the site to upload or share private save files unless a future feature explicitly explains how that data is handled.</li></ul></section>; }

function JsonLd() {
  const json = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'PalCalculator', applicationCategory: 'GameApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Unofficial fan-made Palworld calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.' };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function App() {
  const { current, navigate } = useRoute();
  const route = routes.find(r => r.key === current)!;
  return <><JsonLd/><Header current={current} navigate={navigate}/><main><ToolHero route={route} navigate={navigate}/>{current === 'hub' && <Hub navigate={navigate}/>} {current === 'breeding' && <BreedingCalculator/>} {current === 'one0' && <BreedingCalculator one0/>} {current === 'route' && <RouteSolver/>} {current === 'iv' && <IvStatsTool kind="iv"/>} {current === 'stats' && <IvStatsTool kind="stats"/>} {current === 'passives' && <PassivePlanner/>} {current === 'data' && <DataSources/>} {current === 'privacy' && <Privacy/>} {current === 'terms' && <Terms/>}</main><footer><Disclaimer/><div className="footer-links">{routes.filter(r => ['data','privacy','terms'].includes(r.key)).map(r => <button key={r.key} onClick={() => navigate(r.key)}>{r.label}</button>)}<a href="/sitemap.xml">Sitemap <ExternalLink size={12}/></a></div></footer></>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
