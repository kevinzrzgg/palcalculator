import palsFile from './data/pals.latest.json';
import passivesFile from './data/passives.latest.json';
import formulasFile from './data/stat-formulas.latest.json';
import versionFile from './data/version.json';

type Caveat = { code: string; severity: 'info' | 'warning' | 'blocking'; message: string };
export type Pal = (typeof palsFile.pals)[number];
export type BreedingPair = { id: string; parentAId: string; parentBId: string; childId: string; comboType: 'normal'; ruleId: string; isOrderSensitive: false; dataVersion: string; sourceRefs: string[]; caveats: Caveat[] };
export type Passive = (typeof passivesFile.passives)[number];
export type PalSummary = { id: string; displayName: string; slug: string; elements: string[]; rarity: number; breedingPower: number };
type RouteStep = ReturnType<typeof step>;
type RouteTreeNode = { pal: PalSummary; source: 'owned' | 'bred' | 'missing'; stepIndex?: number; parents?: RouteTreeNode[] };
type RouteAlternative = { label: string; generations: number; steps: RouteStep[]; routeTree?: RouteTreeNode; caveats: Caveat[] };
type SearchStats = { ownedRecognized: number; availablePals: number; pairScans: number; pairScanLimit: number; maxGenerationCap: number };
type RouteConstraints = { maxGenerations: number; includeSpecialCombos: false };

export const dataVersion = versionFile;
export const pals = palsFile.pals as Pal[];
export const passives = passivesFile.passives as Passive[];
export const statFormula = formulasFile.statFormulas[0];

const MAX_ROUTE_GENERATIONS = 8;
const MAX_ROUTE_ALTERNATIVES = 3;
const byId = new Map(pals.map((p) => [p.id, p]));
const aliases = new Map<string, Pal>();
for (const pal of pals) {
  aliases.set(pal.id, pal);
  aliases.set(pal.slug, pal);
  aliases.set(pal.displayName.toLowerCase(), pal);
  for (const alias of pal.aliases) aliases.set(alias.toLowerCase(), pal);
}

const normalPairs: BreedingPair[] = [];
const pairsByChild = new Map<string, BreedingPair[]>();
const pairByParents = new Map<string, BreedingPair>();
for (let i = 0; i < pals.length; i += 1) for (let j = i; j < pals.length; j += 1) {
  const pair = normalPair(pals[i], pals[j]);
  normalPairs.push(pair);
  pairByParents.set(pairKey(pair.parentAId, pair.parentBId), pair);
  const arr = pairsByChild.get(pair.childId) ?? [];
  arr.push(pair);
  pairsByChild.set(pair.childId, arr);
}
for (const arr of pairsByChild.values()) arr.sort(comparePairs);
normalPairs.sort(comparePairs);

function pairKey(a: string, b: string) {
  return [a, b].sort().join('|');
}
function parentScore(pair: BreedingPair) {
  const a = byId.get(pair.parentAId)?.rarity ?? 99;
  const b = byId.get(pair.parentBId)?.rarity ?? 99;
  return a + b;
}
function comparePairs(a: BreedingPair, b: BreedingPair) {
  return parentScore(a) - parentScore(b) || a.id.localeCompare(b.id);
}
function normalPair(parentA: Pal, parentB: Pal): BreedingPair {
  const avg = (parentA.breedingPower + parentB.breedingPower) / 2;
  let child = pals[0];
  let best = Infinity;
  for (const pal of pals) {
    const score = Math.abs(pal.breedingPower - avg) * 10000 + pal.breedingPower;
    if (score < best) { best = score; child = pal; }
  }
  return { id: `normal-${pairKey(parentA.id, parentB.id)}-${child.id}`, parentAId: parentA.id, parentBId: parentB.id, childId: child.id, comboType: 'normal', ruleId: 'normal-combirank-closest-average', isOrderSensitive: false, dataVersion: dataVersion.dataVersion, sourceRefs: ['palworldgg-breeding-calculator'], caveats: [{ code: 'SPECIAL_COMBO_NOT_APPLIED', severity: 'warning', message: 'Normal CombiRank formula output; verified special-combo override table is not included in this MVP data build.' }] };
}
export function findPal(input: string): Pal | undefined {
  return aliases.get(input.trim().toLowerCase());
}
export function summarize(pal: Pal): PalSummary {
  return { id: pal.id, displayName: pal.displayName, slug: pal.slug, elements: pal.elements, rarity: pal.rarity, breedingPower: pal.breedingPower };
}
function unknown(name: string) {
  return { ok: false as const, error: { code: 'INVALID_PAL', message: `No exact Pal match for "${name}" in data version ${dataVersion.dataVersion}.` } };
}

export function childFromParents(parentAInput: string, parentBInput: string) {
  const parentA = findPal(parentAInput);
  if (!parentA) return unknown(parentAInput);
  const parentB = findPal(parentBInput);
  if (!parentB) return unknown(parentBInput);
  const pair = pairByParents.get(pairKey(parentA.id, parentB.id)) ?? normalPair(parentA, parentB);
  const child = byId.get(pair.childId)!;
  return { ok: true as const, mode: 'parent_to_child', parentA: summarize(parentA), parentB: summarize(parentB), child: summarize(child), comboType: pair.comboType, ruleId: pair.ruleId, dataVersion: dataVersion.dataVersion, caveats: pair.caveats as Caveat[] };
}

export function parentsForTarget(targetInput: string, limit = 12) {
  const target = findPal(targetInput);
  if (!target) return unknown(targetInput);
  const pairs = (pairsByChild.get(target.id) ?? []).slice(0, limit).map((pair) => ({ parentA: summarize(byId.get(pair.parentAId)!), parentB: summarize(byId.get(pair.parentBId)!), comboType: pair.comboType, caveats: pair.caveats as Caveat[] }));
  if (!pairs.length) return { ok: false as const, error: { code: 'NO_PARENT_PAIRS', message: 'No parent pairs found in this data build.' }, dataVersion: dataVersion.dataVersion };
  return { ok: true as const, mode: 'target_to_parents', target: summarize(target), pairs, resultCount: pairsByChild.get(target.id)?.length ?? 0, filtersApplied: { limit }, dataVersion: dataVersion.dataVersion, caveats: dataVersion.caveats as Caveat[] };
}

function routeFailure(code: string, message: string, target: Pal | undefined, owned: Pal[], maxGenerations: number, fallbackState: string, missingPals: PalSummary[] = [], missingPalExplanations: string[] = [], pairScans = 0) {
  return { ok: false as const, error: { code, message }, mode: 'route_solve', target: target ? summarize(target) : undefined, ownedPals: owned.map(summarize), fallbackState, missingPals, missingPalExplanations, constraints: routeConstraints(maxGenerations), searchStats: searchStats(owned.length, owned.length, pairScans, maxGenerations), dataVersion: dataVersion.dataVersion, caveats: dataVersion.caveats as Caveat[] };
}
function routeConstraints(maxGenerations: number): RouteConstraints {
  return { maxGenerations, includeSpecialCombos: false };
}
function searchStats(ownedRecognized: number, availablePals: number, pairScans: number, maxGenerations: number): SearchStats {
  return { ownedRecognized, availablePals, pairScans, pairScanLimit: normalPairs.length * Math.min(Math.max(maxGenerations, 0), MAX_ROUTE_GENERATIONS), maxGenerationCap: MAX_ROUTE_GENERATIONS };
}
function parseOwned(ownedInput: string) {
  return [...new Map(ownedInput.split(/[\n,]+/).map((v) => findPal(v)).filter((p): p is Pal => Boolean(p)).map((p) => [p.id, p])).values()];
}
function caveatsFromSteps(steps: RouteStep[]) {
  const seen = new Set<string>();
  const caveats: Caveat[] = [];
  for (const caveat of steps.flatMap((routeStep) => routeStep.caveats)) {
    const key = `${caveat.code}:${caveat.message}`;
    if (!seen.has(key)) { seen.add(key); caveats.push(caveat); }
  }
  return caveats.length ? caveats : dataVersion.caveats as Caveat[];
}
function missingExplanations(targetPairs: BreedingPair[], ownedIds: Set<string>, limit = 3) {
  return targetPairs.slice(0, limit).map((pair) => {
    const missing = [pair.parentAId, pair.parentBId].filter((id) => !ownedIds.has(id)).map((id) => byId.get(id)!.displayName);
    return missing.length ? `${byId.get(pair.childId)!.displayName} candidate pair needs ${missing.join(' + ')} before this route can start or finish.` : `${byId.get(pair.childId)!.displayName} candidate pair was not reachable inside the generation cap.`;
  });
}
function routeTreeFor(palId: string, producedBy: Map<string, BreedingPair>, stepIndexes: Map<string, number>, ownedIds: Set<string>): RouteTreeNode {
  const pal = byId.get(palId)!;
  const pair = producedBy.get(palId);
  if (!pair) return { pal: summarize(pal), source: ownedIds.has(palId) ? 'owned' : 'missing' };
  return { pal: summarize(pal), source: 'bred', stepIndex: stepIndexes.get(palId), parents: [routeTreeFor(pair.parentAId, producedBy, stepIndexes, ownedIds), routeTreeFor(pair.parentBId, producedBy, stepIndexes, ownedIds)] };
}
function reconstructRoute(targetId: string, producedBy: Map<string, BreedingPair>, producedGeneration: Map<string, number>, ownedIds: Set<string>) {
  const ordered: BreedingPair[] = [];
  const seen = new Set<string>();
  function visit(id: string) {
    const pair = producedBy.get(id);
    if (!pair) return;
    visit(pair.parentAId);
    visit(pair.parentBId);
    if (!seen.has(pair.childId)) { seen.add(pair.childId); ordered.push(pair); }
  }
  visit(targetId);
  const steps = ordered.map((pair, index) => step(pair, index, ownedIds, producedGeneration.get(pair.childId) ?? 1));
  const stepIndexes = new Map(steps.map((routeStep) => [routeStep.child.id, routeStep.stepIndex]));
  return { steps, routeTree: routeTreeFor(targetId, producedBy, stepIndexes, ownedIds), generations: Math.max(0, ...steps.map((routeStep) => routeStep.generation)) };
}
function buildAlternatives(targetId: string, targetPairs: BreedingPair[], mainPair: BreedingPair | undefined, producedBy: Map<string, BreedingPair>, producedGeneration: Map<string, number>, ownedIds: Set<string>, maxGenerations: number): RouteAlternative[] {
  const alternatives: RouteAlternative[] = [];
  for (const pair of targetPairs) {
    if (pair === mainPair || pair.id === mainPair?.id) continue;
    const parentAGen = producedGeneration.get(pair.parentAId);
    const parentBGen = producedGeneration.get(pair.parentBId);
    if (parentAGen === undefined || parentBGen === undefined) continue;
    const targetGeneration = Math.max(parentAGen, parentBGen) + 1;
    if (targetGeneration > maxGenerations) continue;
    const altProducedBy = new Map(producedBy);
    const altProducedGeneration = new Map(producedGeneration);
    altProducedBy.set(targetId, pair);
    altProducedGeneration.set(targetId, targetGeneration);
    const route = reconstructRoute(targetId, altProducedBy, altProducedGeneration, ownedIds);
    alternatives.push({ label: `Alternative ${alternatives.length + 1}`, generations: route.generations, steps: route.steps, routeTree: route.routeTree, caveats: caveatsFromSteps(route.steps) });
    if (alternatives.length >= MAX_ROUTE_ALTERNATIVES) break;
  }
  return alternatives;
}

export function solveRoute(targetInput: string, ownedInput: string, maxGenerations = 3) {
  const target = findPal(targetInput);
  const owned = parseOwned(ownedInput);
  if (!target) return routeFailure('INVALID_PAL', `No exact Pal match for "${targetInput}" in data version ${dataVersion.dataVersion}.`, undefined, owned, maxGenerations, 'invalid-target');
  const ownedIds = new Set(owned.map((p) => p.id));
  const targetPairs = pairsByChild.get(target.id) ?? [];
  if (ownedIds.has(target.id)) {
    return { ok: true as const, mode: 'route_solve', target: summarize(target), ownedPals: owned.map(summarize), targetAlreadyOwned: true, generations: 0, steps: [] as RouteStep[], routeTree: { pal: summarize(target), source: 'owned' as const }, missingPals: [] as PalSummary[], missingPalExplanations: [] as string[], alternatives: [] as RouteAlternative[], fallbackState: 'target-owned', constraints: routeConstraints(maxGenerations), searchStats: searchStats(owned.length, owned.length, 0, maxGenerations), tieBreakRule: 'target-owned shortcut', dataVersion: dataVersion.dataVersion, caveats: [] as Caveat[] };
  }
  if (maxGenerations < 1) return routeFailure('MAX_GENERATIONS_TOO_LOW', 'Route search needs at least 1 generation unless the target is already owned.', target, owned, maxGenerations, 'constraint-too-low');
  if (maxGenerations > MAX_ROUTE_GENERATIONS) return routeFailure('MAX_GENERATIONS_TOO_HIGH', `Route search is capped at ${MAX_ROUTE_GENERATIONS} generations to keep browser-local solving responsive.`, target, owned, maxGenerations, 'performance-guardrail');
  if (!owned.length) {
    const pair = targetPairs[0];
    if (!pair) return routeFailure('NO_ROUTE', 'No route exists for this target in the current graph.', target, owned, maxGenerations, 'no-parent-pairs');
    const starterStep = step(pair, 0, ownedIds, 1);
    return { ok: true as const, mode: 'route_solve', target: summarize(target), ownedPals: [], targetAlreadyOwned: false, generations: 1, steps: [starterStep], routeTree: { pal: summarize(target), source: 'bred' as const, stepIndex: 1, parents: [{ pal: starterStep.parentA, source: 'missing' as const }, { pal: starterStep.parentB, source: 'missing' as const }] }, missingPals: [summarize(byId.get(pair.parentAId)!), summarize(byId.get(pair.parentBId)!)], missingPalExplanations: missingExplanations(targetPairs, ownedIds), alternatives: targetPairs.slice(1, 4).map((p, i) => ({ label: `Starter pair ${i + 1}`, generations: 1, steps: [step(p, 0, ownedIds, 1)], caveats: p.caveats })), fallbackState: 'starter-pair-guidance', constraints: routeConstraints(maxGenerations), searchStats: searchStats(0, 0, 0, maxGenerations), tieBreakRule: 'no-owned fallback to starter pair guidance', dataVersion: dataVersion.dataVersion, caveats: dataVersion.caveats as Caveat[] };
  }

  const producedBy = new Map<string, BreedingPair>();
  const producedGeneration = new Map<string, number>();
  for (const id of ownedIds) producedGeneration.set(id, 0);
  let pairScans = 0;
  let foundPair: BreedingPair | undefined;
  for (let generation = 1; generation <= maxGenerations; generation += 1) {
    const availableBefore = new Set([...producedGeneration.entries()].filter(([, gen]) => gen < generation).map(([id]) => id));
    const additions: Array<{ childId: string; pair: BreedingPair }> = [];
    for (const pair of normalPairs) {
      pairScans += 1;
      if (!availableBefore.has(pair.parentAId) || !availableBefore.has(pair.parentBId) || availableBefore.has(pair.childId)) continue;
      additions.push({ childId: pair.childId, pair });
    }
    for (const addition of additions) {
      if (producedGeneration.has(addition.childId)) continue;
      producedGeneration.set(addition.childId, generation);
      producedBy.set(addition.childId, addition.pair);
    }
    if (producedGeneration.has(target.id)) {
      foundPair = producedBy.get(target.id);
      break;
    }
  }

  if (!producedGeneration.has(target.id)) {
    const missingIds = [...new Set(targetPairs.slice(0, 3).flatMap((pair) => [pair.parentAId, pair.parentBId]).filter((id) => !producedGeneration.has(id)))];
    return routeFailure('NO_ROUTE_WITHIN_CONSTRAINTS', 'No owned-Pal route reached this target within the current generation cap. Try adding more owned Pals, checking names, or increasing max generations within the browser-local cap.', target, owned, maxGenerations, 'owned-route-not-found', missingIds.map((id) => summarize(byId.get(id)!)), missingExplanations(targetPairs, ownedIds), pairScans);
  }

  const route = reconstructRoute(target.id, producedBy, producedGeneration, ownedIds);
  const alternatives = buildAlternatives(target.id, targetPairs, foundPair, producedBy, producedGeneration, ownedIds, maxGenerations);
  return { ok: true as const, mode: 'route_solve', target: summarize(target), ownedPals: owned.map(summarize), targetAlreadyOwned: false, generations: route.generations, steps: route.steps, routeTree: route.routeTree, missingPals: [] as PalSummary[], missingPalExplanations: [] as string[], alternatives, fallbackState: 'solved-owned-route', constraints: routeConstraints(maxGenerations), searchStats: searchStats(owned.length, producedGeneration.size, pairScans, maxGenerations), tieBreakRule: 'fewest generations, then lowest parent rarity sum, then deterministic pair id', dataVersion: dataVersion.dataVersion, caveats: caveatsFromSteps(route.steps) };
}
function step(pair: BreedingPair, i: number, ownedIds: Set<string>, generation = 1) {
  return { stepIndex: i + 1, generation, parentA: summarize(byId.get(pair.parentAId)!), parentB: summarize(byId.get(pair.parentBId)!), child: summarize(byId.get(pair.childId)!), comboType: pair.comboType, usesOwnedParentA: ownedIds.has(pair.parentAId), usesOwnedParentB: ownedIds.has(pair.parentBId), sourcePairId: pair.id, caveats: pair.caveats as Caveat[] };
}

export function estimateStats(palInput: string, level: number, observed: { hp?: number; attack?: number; defense?: number }) {
  const pal = findPal(palInput);
  if (!pal) return unknown(palInput);
  const statMap = pal.stats as Partial<Record<'hp' | 'attack' | 'defense', number>>;
  const missingBase = (['hp', 'attack', 'defense'] as const).filter((k) => !(k in statMap));
  const caveats: Caveat[] = [...(statFormula.caveats as Caveat[])];
  if (missingBase.length) caveats.unshift({ code: 'BASE_STATS_PARTIAL', severity: 'warning', message: `Base stat fields missing for ${missingBase.join(', ')}; bands use available fields only.` });
  const bands: Record<string, { low: number; mid: number; high: number }> = {};
  for (const stat of ['hp', 'attack', 'defense'] as const) {
    const base = statMap[stat];
    if (typeof base === 'number') {
      const mid = Math.round(base * (1 + Math.max(1, level) / 50));
      bands[stat] = { low: Math.round(mid * 0.85), mid, high: Math.round(mid * 1.15) };
    }
  }
  const ivRangeByStat: Record<string, string> = {};
  for (const [stat, value] of Object.entries(observed)) {
    const band = bands[stat];
    if (!band || typeof value !== 'number' || Number.isNaN(value)) continue;
    ivRangeByStat[stat] = value < band.low ? 'below expected / check modifiers' : value > band.high ? 'high band / check modifiers' : 'mid expected band';
  }
  return { ok: true as const, mode: 'stat_estimate', pal: summarize(pal), level, observedStats: observed, expectedStats: bands, ivRangeByStat, confidence: 'caveated_range', formulaVersion: formulasFile.formulaVersion, dataVersion: dataVersion.dataVersion, caveats };
}