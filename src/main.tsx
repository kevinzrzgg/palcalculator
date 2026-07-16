import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, BadgeCheck, CircleAlert, Database, ExternalLink, Route, ShieldCheck, Sparkles } from 'lucide-react';
import { childFromParents, dataVersion, estimateStats, findPal, pals, parentsForTarget, passives, solveRoute } from './calculators';
import './styles.css';

type ToolKey = 'hub' | 'breeding' | 'route' | 'iv' | 'stats' | 'passives' | 'one0' | 'data' | 'privacy' | 'terms';
type ResultState = { title: string; body: string; code?: string; severity?: 'ok' | 'warn' | 'error'; details?: React.ReactNode };

type AnalyticsEventName = 'page_view' | 'tool_success' | 'tool_error' | 'share_copy' | 'share_open';
type SharePayload = Record<string, string | number | boolean | undefined>;
type HighPerformanceAdOptions = { key: string; format: 'iframe'; height: number; width: number; params: Record<string, unknown> };
declare global {
  interface Window {
    palcalculatorEvents?: Array<{ event: AnalyticsEventName; payload: Record<string, unknown>; ts: string }>;
    palcalculatorTrack?: (event: AnalyticsEventName, payload: Record<string, unknown>) => void;
    atOptions?: HighPerformanceAdOptions;
  }
}
function deviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}
function referrerHost() {
  try { return document.referrer ? new URL(document.referrer).hostname : ''; }
  catch { return ''; }
}
function analyticsContext(tool?: ToolKey) {
  const route = routes.find((r) => r.key === (tool ?? routeFromPath())) ?? routes[0];
  return {
    page_path: route.path,
    page_slug: route.key,
    device_type: deviceType(),
    referrer_host: referrerHost(),
    data_version: dataVersion.dataVersion,
  };
}
function trackEvent(event: AnalyticsEventName, payload: Record<string, unknown> = {}) {
  const safePayload = { ...analyticsContext(), ...payload };
  window.palcalculatorEvents = window.palcalculatorEvents ?? [];
  window.palcalculatorEvents.push({ event, payload: safePayload, ts: new Date().toISOString() });
  window.palcalculatorTrack?.(event, safePayload);
}
function trackToolResult(tool: ToolKey, result: ResultState, extra: Record<string, unknown> = {}) {
  trackEvent(result.severity === 'ok' ? 'tool_success' : 'tool_error', {
    ...analyticsContext(tool),
    tool_type: tool,
    result_type: result.severity === 'ok' ? 'calculator_result' : 'calculator_error',
    error_code: result.severity === 'ok' ? undefined : (result.code ?? 'UNKNOWN_ERROR'),
    recoverable: result.severity !== 'ok',
    ...extra,
  });
}
function shareUrl(tool: ToolKey, payload: SharePayload) {
  const route = routes.find((r) => r.key === tool) ?? routes[0];
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) if (value !== undefined && String(value).trim()) params.set(key, String(value));
  const path = `${route.path}${params.toString() ? `?${params.toString()}` : ''}`;
  return `${window.location.origin}${path}`;
}

const routes: Array<{ key: ToolKey; path: string; label: string; h1: string; description: string }> = [
  { key: 'hub', path: '/', label: 'Home', h1: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', description: 'Unofficial fan-made Palworld 1.0 calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.' },
  { key: 'breeding', path: '/breeding-calculator/', label: 'Breeding', h1: 'Palworld Breeding Calculator', description: 'Check real parent pairs, target parents, caveats, and route-solver handoffs.' },
  { key: 'route', path: '/breeding-route-calculator/', label: 'Route', h1: 'Palworld Breeding Route Calculator', description: 'Plan the shortest route found from owned Pals to a target Pal with visible constraints.' },
  { key: 'iv', path: '/iv-calculator/', label: 'IV', h1: 'Palworld IV Calculator', description: 'Estimate IV ranges from observed stats while showing formula assumptions and unsupported modifiers.' },
  { key: 'stats', path: '/stats-calculator/', label: 'Stats', h1: 'Palworld Stats Calculator', description: 'Preview expected HP, attack, and defense bands from selected base stat data.' },
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
    trackEvent('page_view', { ...analyticsContext(key), page_path: route.path, page_slug: key });
  }
  React.useEffect(() => { trackEvent('page_view', { ...analyticsContext(current), page_path: window.location.pathname, page_slug: current }); }, []);
  React.useEffect(() => { const onPop = () => { const next = routeFromPath(); setCurrent(next); trackEvent('page_view', { ...analyticsContext(next), page_slug: next }); }; window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  return { current, navigate };
}
function DataBadge() { return <div className="data-badge"><Database size={16}/><span>{dataVersion.gameVersionLabel}</span><strong>{dataVersion.dataVersion}</strong></div>; }
function Disclaimer() { return <p className="disclaimer">PalCalculator is an unofficial fan-made tool and is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team. Palworld and related names are trademarks or properties of their respective owners.</p>; }
function Header({ current, navigate }: { current: ToolKey; navigate: (key: ToolKey) => void }) { return <header className="site-header"><a className="brand" href="/" onClick={(e) => { e.preventDefault(); navigate('hub'); }}><span className="brand-mark">PC</span><span>PalCalculator</span></a><nav aria-label="Primary navigation">{routes.filter(r => ['breeding','route','iv','stats','passives','data'].includes(r.key)).map(r => <a key={r.key} href={r.path} className={current === r.key ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate(r.key); }}>{r.label}</a>)}</nav></header>; }
function ToolHero({ route, navigate }: { route: (typeof routes)[number]; navigate: (key: ToolKey) => void }) { return <section className="hero"><div><p className="eyebrow">Unofficial fan-made Palworld tool</p><h1>{route.h1}</h1><p className="hero-copy">{route.description}</p><div className="hero-actions"><button className="primary" onClick={() => navigate('route')}>Start with a target Pal <ArrowRight size={18}/></button><button className="secondary" onClick={() => navigate('breeding')}>Calculate breeding</button></div></div><div className="hero-card"><DataBadge/><p>{pals.length} Pal records and real normal-formula breeding pairs are installed. Special combo overrides remain caveated until separately verified.</p><ul><li>Calculator UI above the fold</li><li>Copy/share URL state, no account wall</li><li>Visible caveats instead of fabricated certainty</li></ul></div></section>; }
function PalSelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) { return <label className="field"><span>{label}</span><input list="pal-options" value={value} placeholder="Example: Anubis, Jetragon, Orserk" onChange={(e) => onChange(e.target.value)} /><datalist id="pal-options">{pals.map(p => <option key={p.id} value={p.displayName}/>)}</datalist></label>; }
function ResultBox({ result }: { result: ResultState }) { return <div className={`result ${result.severity ?? 'warn'}`} role="status"><div className="result-title">{result.severity === 'ok' ? <BadgeCheck/> : <CircleAlert/>}<strong>{result.title}</strong></div><p>{result.body}</p>{result.code && <code>{result.code}</code>}{result.details}</div>; }
function ToolPanel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) { return <section className="tool-panel"><div className="tool-title">{icon}<h2>{title}</h2></div><DataBadge/>{children}</section>; }
function CaveatList({ items }: { items: string[] }) { return <ul className="caveats">{items.map(i => <li key={i}>{i}</li>)}</ul>; }
function ShareControls({ tool, payload, resultTitle }: { tool: ToolKey; payload: SharePayload; resultTitle: string }) {
  const [status, setStatus] = useState('');
  const url = shareUrl(tool, payload);
  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(url);
      trackEvent('share_copy', { ...analyticsContext(tool), tool_type: tool, result_type: resultTitle, copy_status: 'success' });
      setStatus('Share URL copied.');
    }
    catch {
      trackEvent('share_copy', { ...analyticsContext(tool), tool_type: tool, result_type: resultTitle, copy_status: 'fallback' });
      setStatus(url);
    }
  }
  return <div className="share-controls"><button className="secondary" onClick={copyShareUrl}>Copy/share result URL</button><a href={url} onClick={() => trackEvent('share_open', { ...analyticsContext(tool), tool_type: tool, result_type: resultTitle, source: 'button' })}>Open share URL</a>{status && <small>{status}</small>}</div>;
}

function BreedingCalculator({ one0=false }: { one0?: boolean }) {
  const [mode, setMode] = useState<'pair'|'target'>('pair'); const [a, setA] = useState('Penking'); const [b, setB] = useState('Bushi'); const [target, setTarget] = useState('Anubis');
  const result = useMemo<ResultState>(() => {
    if (mode === 'pair') { const r = childFromParents(a, b); if (!r.ok) return { title: 'Pair unavailable', body: r.error.message, code: r.error.code, severity: 'error' }; return { title: `${r.parentA.displayName} + ${r.parentB.displayName} → ${r.child.displayName}`, body: `Normal formula output for ${r.dataVersion}. Combo type: ${r.comboType}.`, code: r.ruleId, severity: 'ok', details: <CaveatList items={r.caveats.map(c => c.message)}/> }; }
    const r = parentsForTarget(target, 10); if (!r.ok) return { title: 'Target unavailable', body: r.error.message, code: r.error.code, severity: 'error' };
    return { title: `${r.resultCount} parent pairs found for ${r.target.displayName}`, body: `Showing the first ${r.pairs.length} sorted pairs.`, severity: 'ok', details: <ol className="pairs">{r.pairs.map((p, i) => <li key={i}>{p.parentA.displayName} + {p.parentB.displayName}</li>)}</ol> };
  }, [mode, a, b, target]);
  React.useEffect(() => { trackToolResult(one0 ? 'one0' : 'breeding', result, { mode, code: result.code ?? '' }); }, [result.title, result.severity, result.code, mode, one0]);
  return <ToolPanel title={one0 ? 'Palworld 1.0 breeding workspace' : 'Breeding workspace'} icon={<Sparkles/>}><div className="segmented"><button className={mode==='pair'?'selected':''} onClick={() => setMode('pair')}>Pair to child</button><button className={mode==='target'?'selected':''} onClick={() => setMode('target')}>Target to parents</button></div>{mode === 'pair' ? <div className="grid two"><PalSelect label="Parent A" value={a} onChange={setA}/><PalSelect label="Parent B" value={b} onChange={setB}/></div> : <PalSelect label="Target child" value={target} onChange={setTarget}/>}<ResultBox result={result}/><ShareControls tool={one0 ? 'one0' : 'breeding'} payload={{ mode, a, b, target }} resultTitle={result.title}/><CaveatList items={["Normal breeding outputs use public CombiRank values and source caveats.", "Verified special-combo override data is not claimed in this build.", "Results depend on selected data version and patch changes."]}/></ToolPanel>;
}
function RouteSolver() {
  const [target, setTarget] = useState('Anubis'); const [owned, setOwned] = useState('Penking, Bushi'); const [maxGen, setMaxGen] = useState(3);
  const result = useMemo<ResultState>(() => { const r = solveRoute(target, owned, maxGen); if (!r.ok) return { title: 'Route unavailable', body: r.error.message, code: r.error.code, severity: 'error' }; return { title: r.targetAlreadyOwned ? `${r.target.displayName} already owned` : `Route found to ${r.target.displayName}`, body: `${r.generations} generation(s), ${r.missingPals.length} missing Pal(s), ${r.alternatives.length} alternative(s). Tie rule: ${r.tieBreakRule}.`, severity: 'ok', details: <ol className="timeline">{r.steps.map(s => <li key={s.stepIndex}><span>{s.stepIndex}</span><p>{s.parentA.displayName} + {s.parentB.displayName} → {s.child.displayName}</p></li>)}</ol> }; }, [target, owned, maxGen]);
  React.useEffect(() => { trackToolResult('route', result, { code: result.code ?? '' }); }, [result.title, result.severity, result.code]);
  return <ToolPanel title="Route-first workspace" icon={<Route/>}><div className="grid two"><PalSelect label="Target Pal" value={target} onChange={setTarget}/><label className="field"><span>Max generations</span><input type="number" min={1} max={8} value={maxGen} onChange={(e)=>setMaxGen(Number(e.target.value))}/></label></div><label className="field"><span>Owned Pals (browser-local paste)</span><textarea value={owned} onChange={(e)=>setOwned(e.target.value)} placeholder="Example: Penking, Bushi" /></label><ResultBox result={result}/><ShareControls tool="route" payload={{ target, owned, maxGen }} resultTitle={result.title}/></ToolPanel>;
}
function IvStatsTool({ kind }: { kind: 'iv' | 'stats' }) {
  const [pal, setPal] = useState('Anubis'); const [level, setLevel] = useState(50); const [hp, setHp] = useState('500'); const [attack, setAttack] = useState('130'); const [defense, setDefense] = useState('100');
  const result = useMemo<ResultState>(() => { const r = estimateStats(pal, level, { hp: Number(hp), attack: Number(attack), defense: Number(defense) }); if (!r.ok) return { title: 'Stat estimate unavailable', body: r.error.message, code: r.error.code, severity: 'error' }; return { title: kind === 'iv' ? 'Caveated IV bands calculated' : 'Expected stat bands calculated', body: `${r.pal.displayName} level ${r.level}. Confidence: ${r.confidence}.`, code: r.formulaVersion, severity: 'ok', details: <pre>{JSON.stringify(kind === 'iv' ? r.ivRangeByStat : r.expectedStats, null, 2)}</pre> }; }, [pal, level, hp, attack, defense, kind]);
  React.useEffect(() => { trackToolResult(kind, result, { code: result.code ?? '' }); }, [result.title, result.severity, result.code, kind]);
  return <ToolPanel title={kind === 'iv' ? 'IV estimate workspace' : 'Stats range workspace'} icon={<BadgeCheck/>}><div className="grid two"><PalSelect label="Pal" value={pal} onChange={setPal}/><label className="field"><span>Level</span><input type="number" min={1} max={60} value={level} onChange={(e)=>setLevel(Number(e.target.value))}/></label></div><div className="grid three"><label className="field"><span>Observed HP</span><input value={hp} onChange={(e)=>setHp(e.target.value)} inputMode="numeric" /></label><label className="field"><span>Observed Attack</span><input value={attack} onChange={(e)=>setAttack(e.target.value)} inputMode="numeric" /></label><label className="field"><span>Observed Defense</span><input value={defense} onChange={(e)=>setDefense(e.target.value)} inputMode="numeric" /></label></div><ResultBox result={result}/><ShareControls tool={kind} payload={{ pal, level, hp, attack, defense }} resultTitle={result.title}/><CaveatList items={["Outputs are broad ranges when rounding/modifiers create uncertainty.", "Exact Palworld reverse-engineering with all modifiers is unsupported in this build.", "No perfect IV or 100% accuracy claims are used."]}/></ToolPanel>;
}
function PassivePlanner() { const [target, setTarget] = useState('Anubis'); const [desired, setDesired] = useState('Artisan, Serious'); const valid = desired.split(',').map(s => s.trim().toLowerCase()).filter(Boolean).map(x => passives.find(p => p.displayName.toLowerCase() === x || p.id === x)); const result: ResultState = { title: findPal(target) ? 'Passive plan captured' : 'Target needs review', body: `${valid.filter(Boolean).length} desired passive(s) recognized. Candidate route logic stays caveated because inheritance odds are not claimed.`, code: 'PASSIVE_RNG_CAVEATED', severity: findPal(target) ? 'ok' : 'error' }; React.useEffect(() => { trackToolResult('passives', result, { code: result.code ?? '' }); }, [result.title, result.severity, result.code]); return <ToolPanel title="Passive planner shell" icon={<ShieldCheck/>}><div className="grid two"><PalSelect label="Target Pal" value={target} onChange={setTarget}/><label className="field"><span>Desired passives</span><input value={desired} onChange={(e)=>setDesired(e.target.value)} placeholder="Example: Artisan, Serious" /></label></div><ResultBox result={result}/><ShareControls tool="passives" payload={{ target, desired }} resultTitle={result.title}/><CaveatList items={["Passive inheritance can involve RNG.", "Use as planning guidance, not certainty.", "Candidate parents/routes use the breeding route calculator plus caveats."]}/></ToolPanel>; }
function Hub({ navigate }: { navigate: (key: ToolKey) => void }) { return <><div className="cards">{routes.filter(r => ['breeding','route','iv','stats','passives','one0'].includes(r.key)).map(r => <button className="card" key={r.key} onClick={() => navigate(r.key)}><h3>{r.h1}</h3><p>{r.description}</p><span>{r.label} <ArrowRight size={14}/></span></button>)}</div><section className="content"><h2>Production data status</h2><p>This build replaces example-only data with a Palworld 1.0 public-web dataset: {pals.length} Pals, normal formula breeding pairs, aliases, passive seed data, selected base stats, and caveated stat formulas.</p></section></>; }
function DataSources() { return <section className="content"><h2>Data source status</h2><dl><dt>Game target</dt><dd>{dataVersion.gameVersionLabel}</dd><dt>Dataset build</dt><dd>{dataVersion.dataVersion}</dd><dt>Last updated</dt><dd>{dataVersion.lastUpdated}</dd><dt>Included domains</dt><dd>{dataVersion.includedDomains.join(', ')}.</dd><dt>Unsupported now</dt><dd>{dataVersion.unsupportedDomains.join(', ')}.</dd><dt>Correction path</dt><dd id="corrections">Use the owner support/contact path before launch; corrections should include Pal name, game version, source link, and reproduction notes.</dd></dl><h3>Sources</h3><ul>{dataVersion.sourceRefs.map((s) => <li key={s.id}><a href={s.url}>{s.label}</a> — {s.category}. {s.notes}</li>)}</ul><p>Competitor/community pages are not treated as official; outputs carry source/version caveats and unsupported domains are stated instead of guessed.</p></section>; }
function Privacy() { return <section className="content"><h2>Privacy summary</h2><p>PalCalculator is a static, Cloudflare-first calculator hub. MVP inputs such as selected Pals, owned-Pal text, stat fields, and passive choices are handled in the browser UI unless a later owner-approved backend design changes that.</p><ul><li>No account or payment is required for P0 calculators.</li><li>No server-side save-file or raw Palbox upload is implemented.</li><li>Share URLs may include selected Pals or settings; do not share private state.</li><li>Analytics may use Cloudflare Web Analytics for aggregate page views and first-party calculator events for diagnostics; event payloads avoid raw inputs, share URLs, emails, IP addresses, tokens, and save data.</li></ul></section>; }
function Terms() { return <section className="content"><h2>Unofficial fan-site terms</h2><p>This site is provided as an independent fan tool. References to Palworld, Pal names, game mechanics, or related terms are for identification and compatibility purposes only.</p><ul><li>Do not rely on calculator output as guaranteed, official, always current, or perfectly accurate.</li><li>Results depend on selected data versions, source quality, game patches, formulas, modifiers, and RNG.</li></ul></section>; }
function JsonLd() { const json = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'PalCalculator', applicationCategory: 'GameApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Unofficial fan-made Palworld calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.' }; return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />; }
function NativeAdSlot({ slotId, src }: { slotId: string; src: string }) {
  React.useEffect(() => {
    const scriptId = `effectivecpmnetwork-${slotId}`;
    if (document.getElementById(scriptId)) return;
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = src;
    document.body.appendChild(script);
  }, [slotId, src]);
  return <section className="ad-slot native-ad" aria-label="Advertisement"><span>Advertisement</span><div id={`container-${slotId}`} /></section>;
}
function NativeAds() {
  return <><NativeAdSlot slotId="7cab5da197166bf6297bc9b36ce941d5" src="https://pl30389185.effectivecpmnetwork.com/7cab5da197166bf6297bc9b36ce941d5/invoke.js"/><NativeAdSlot slotId="65a8adc79e2c11e5010db2c10551984d" src="https://pl30244826.effectivecpmnetwork.com/65a8adc79e2c11e5010db2c10551984d/invoke.js"/></>;
}
function HighPerformanceAd({ adKey, width, height, className }: { adKey: string; width: number; height: number; className?: string }) {
  const mountRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    mount.innerHTML = '';
    window.atOptions = { key: adKey, format: 'iframe', height, width, params: {} };
    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = false;
    script.setAttribute('data-palcalculator-ad-key', adKey);
    mount.appendChild(script);
  }, [adKey, width, height]);
  return <section className={`ad-slot iframe-ad ${className ?? ''}`} aria-label="Advertisement" style={{ maxWidth: `${width}px` }}><span>Advertisement</span><div ref={mountRef} className="iframe-ad-mount" style={{ width: `${width}px`, minHeight: `${height}px` }} /></section>;
}
function HighPerformanceAds() {
  return <div className="iframe-ad-grid"><HighPerformanceAd adKey="4b8893caea5904557bdffe2f2e21ecd1" width={728} height={90} className="desktop-leaderboard"/><HighPerformanceAd adKey="656c670af2a512e3fed20ecd019f9a94" width={320} height={50} className="mobile-banner"/><HighPerformanceAd adKey="b6e34a762ff85ca4762aaa954460ff0b" width={300} height={250} className="rectangle-ad"/><HighPerformanceAd adKey="7b662a721b8b7aa4e2b87b1667d9e25e" width={300} height={250} className="rectangle-ad"/></div>;
}
function App() { const { current, navigate } = useRoute(); const route = routes.find(r => r.key === current)!; return <><JsonLd/><Header current={current} navigate={navigate}/><main><ToolHero route={route} navigate={navigate}/><NativeAds/><HighPerformanceAds/>{current === 'hub' && <Hub navigate={navigate}/>} {current === 'breeding' && <BreedingCalculator/>} {current === 'one0' && <BreedingCalculator one0/>} {current === 'route' && <RouteSolver/>} {current === 'iv' && <IvStatsTool kind="iv"/>} {current === 'stats' && <IvStatsTool kind="stats"/>} {current === 'passives' && <PassivePlanner/>} {current === 'data' && <DataSources/>} {current === 'privacy' && <Privacy/>} {current === 'terms' && <Terms/>}</main><footer><Disclaimer/><div className="footer-links">{routes.filter(r => ['data','privacy','terms'].includes(r.key)).map(r => <a key={r.key} href={r.path} onClick={(e) => { e.preventDefault(); navigate(r.key); }}>{r.label}</a>)}<a href="/sitemap.xml">Sitemap <ExternalLink size={12}/></a></div></footer></>; }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
