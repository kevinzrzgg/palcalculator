import palsFile from './data/pals.latest.json';
import passivesFile from './data/passives.latest.json';
import formulasFile from './data/stat-formulas.latest.json';
import versionFile from './data/version.json';

type Caveat = { code: string; severity: 'info' | 'warning' | 'blocking'; message: string };
export type Pal = (typeof palsFile.pals)[number];
export type BreedingPair = { id: string; parentAId: string; parentBId: string; childId: string; comboType: 'normal'; ruleId: string; isOrderSensitive: false; dataVersion: string; sourceRefs: string[]; caveats: Caveat[] };
export type Passive = (typeof passivesFile.passives)[number];
export type PalSummary = { id: string; displayName: string; slug: string; elements: string[]; rarity: number; breedingPower: number };

export const dataVersion = versionFile;
export const pals = palsFile.pals as Pal[];
export const passives = passivesFile.passives as Passive[];
export const statFormula = formulasFile.statFormulas[0];

const byId = new Map(pals.map((p) => [p.id, p]));
const aliases = new Map<string, Pal>();
for (const pal of pals) {
  aliases.set(pal.id, pal);
  aliases.set(pal.slug, pal);
  aliases.set(pal.displayName.toLowerCase(), pal);
  for (const alias of pal.aliases) aliases.set(alias.toLowerCase(), pal);
}

const pairsByChild = new Map<string, BreedingPair[]>();
for (let i = 0; i < pals.length; i += 1) for (let j = i; j < pals.length; j += 1) {
  const pair = normalPair(pals[i], pals[j]);
  const arr = pairsByChild.get(pair.childId) ?? [];
  arr.push(pair);
  pairsByChild.set(pair.childId, arr);
}
for (const arr of pairsByChild.values()) arr.sort((a, b) => parentScore(a) - parentScore(b));

function pairKey(a: string, b: string) {
  return [a, b].sort().join('|');
}
function parentScore(pair: BreedingPair) {
  const a = byId.get(pair.parentAId)?.rarity ?? 99;
  const b = byId.get(pair.parentBId)?.rarity ?? 99;
  return a + b;
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
  const pair = normalPair(parentA, parentB);
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

export function solveRoute(targetInput: string, ownedInput: string, maxGenerations = 3) {
  const target = findPal(targetInput);
  if (!target) return unknown(targetInput);
  const owned = ownedInput.split(/[\n,]+/).map((v) => findPal(v)).filter((p): p is Pal => Boolean(p));
  const ownedIds = new Set(owned.map((p) => p.id));
  if (ownedIds.has(target.id)) {
    return { ok: true as const, mode: 'route_solve', target: summarize(target), ownedPals: owned.map(summarize), targetAlreadyOwned: true, generations: 0, steps: [], missingPals: [], alternatives: [], constraints: { maxGenerations, includeSpecialCombos: false }, tieBreakRule: 'target-owned shortcut', dataVersion: dataVersion.dataVersion, caveats: [] as Caveat[] };
  }
  const targetPairs = pairsByChild.get(target.id) ?? [];
  if (!owned.length) {
    const pair = targetPairs[0];
    if (!pair) return { ok: false as const, error: { code: 'NO_ROUTE', message: 'No route exists for this target in the current graph.' }, dataVersion: dataVersion.dataVersion };
    return { ok: true as const, mode: 'route_solve', target: summarize(target), ownedPals: [], targetAlreadyOwned: false, generations: 1, steps: [step(pair, 0, ownedIds)], missingPals: [summarize(byId.get(pair.parentAId)!), summarize(byId.get(pair.parentBId)!)], alternatives: targetPairs.slice(1, 4).map((p, i) => ({ label: `Alternative ${i + 1}`, generations: 1, steps: [step(p, 0, ownedIds)], caveats: p.caveats })), constraints: { maxGenerations, includeSpecialCombos: false }, tieBreakRule: 'fewest generations, then lowest parent rarity sum', dataVersion: dataVersion.dataVersion, caveats: dataVersion.caveats as Caveat[] };
  }
  const direct = targetPairs.find((p) => ownedIds.has(p.parentAId) && ownedIds.has(p.parentBId));
  if (direct) {
    const alternatives = targetPairs.filter((p) => p !== direct && ownedIds.has(p.parentAId) && ownedIds.has(p.parentBId)).slice(0, 3).map((p, i) => ({ label: `Owned alternative ${i + 1}`, generations: 1, steps: [step(p, 0, ownedIds)], caveats: p.caveats }));
    return { ok: true as const, mode: 'route_solve', target: summarize(target), ownedPals: owned.map(summarize), targetAlreadyOwned: false, generations: 1, steps: [step(direct, 0, ownedIds)], missingPals: [], alternatives, constraints: { maxGenerations, includeSpecialCombos: false }, tieBreakRule: 'fewest missing parents, then parent rarity', dataVersion: dataVersion.dataVersion, caveats: direct.caveats as Caveat[] };
  }
  const fallback = targetPairs[0];
  if (fallback) {
    return { ok: true as const, mode: 'route_solve', target: summarize(target), ownedPals: owned.map(summarize), targetAlreadyOwned: false, generations: 1, steps: [step(fallback, 0, ownedIds)], missingPals: [fallback.parentAId, fallback.parentBId].filter((id) => !ownedIds.has(id)).map((id) => summarize(byId.get(id)!)), alternatives: targetPairs.slice(1, 4).map((p, i) => ({ label: `Alternative ${i + 1}`, generations: 1, steps: [step(p, 0, ownedIds)], caveats: p.caveats })), constraints: { maxGenerations, includeSpecialCombos: false }, tieBreakRule: 'empty/partial-owned fallback to simplest target pair', dataVersion: dataVersion.dataVersion, caveats: dataVersion.caveats as Caveat[] };
  }
  return { ok: false as const, error: { code: 'NO_ROUTE', message: 'No route exists in the current graph; target may be unbreedable or excluded.' }, dataVersion: dataVersion.dataVersion };
}
function step(pair: BreedingPair, i: number, ownedIds: Set<string>) {
  return { stepIndex: i + 1, generation: 1, parentA: summarize(byId.get(pair.parentAId)!), parentB: summarize(byId.get(pair.parentBId)!), child: summarize(byId.get(pair.childId)!), comboType: pair.comboType, usesOwnedParentA: ownedIds.has(pair.parentAId), usesOwnedParentB: ownedIds.has(pair.parentBId), sourcePairId: pair.id, caveats: pair.caveats as Caveat[] };
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
