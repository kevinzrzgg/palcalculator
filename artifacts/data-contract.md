# PalCalculator Backend Data Contract v1

Project: palcalculator
Stage: 08-backend-data
Market: US / English
Generated: 2026-07-16
Owner profile: backend_bot
Status: CONTRACT COMPLETE / IMPLEMENTATION BLOCKED UNTIL REPO + DATA SOURCE ARE AVAILABLE

## 1. Scope and decision

This contract defines the frontend-consumable calculator schema, static seed/API options, source policy, validation/error states, and implementation plan for PalCalculator.

Primary implementation decision:
- P0 should be static/client-first on Cloudflare Pages.
- Ship versioned JSON data files and pure calculator functions first.
- Add Cloudflare Workers only if route solving benchmarks prove client-side solving is too slow or if future short-link storage is approved.
- Do not persist owned-Pal lists, save files, or raw route requests in MVP.

Implementation status:
- `/root/projects/palcalculator` currently contains planning artifacts only; no application repo/worktree/package manifest was found.
- Real backend/frontend implementation is therefore blocked.
- This artifact is the implementation-ready data contract and plan; it intentionally does not claim production Palworld data exists yet.

Inputs read:
- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/copy.md`
- `/root/projects/palcalculator/artifacts/compliance.md`
- `/root/projects/palcalculator/artifacts/pricing.md`

## 2. Non-negotiable data policies

1. Show data version and last updated date on every calculator page and every result.
2. Treat Palworld data as versioned content, not hidden app constants.
3. Missing or uncertain data must produce unavailable/caveat states, not guessed results.
4. competitor pages must not be the sole source of truth.
5. Do not call data official unless an official source/license is documented.
6. Do not store raw owned-Pal lists or save-file contents server-side in MVP.
7. Share URLs may encode selected Pals/settings, but must not include uploaded save files or sensitive private content.
8. Result/share URLs default to noindex and canonicalize to the base tool route unless intentionally promoted later.
9. Analytics events use buckets and error codes; no raw Palbox/save data, no secrets.
10. Passive inheritance and IV/stat outputs must carry explicit caveats where formulas, modifiers, rounding, or RNG create uncertainty.

Minimum data-source page requirements:
- Current Palworld game/data target, e.g. `Palworld 1.0` once verified.
- Internal dataset version ID.
- Last updated date.
- Source categories used.
- Included domains: Pals, breeding pairs, special combos, passive skills, stat formulas.
- Unsupported/uncertain data list.
- Formula assumptions.
- Correction/contact path.
- Patch-response/update cadence.
- Statement that competitor pages are not the sole source of truth.

## 3. Recommended file layout for static P0

Serve these from the public/static bundle or an equivalent immutable asset path:

```text
/data/version.json
/data/pals.latest.json
/data/breeding-pairs.latest.json
/data/special-combos.latest.json
/data/passives.latest.json
/data/stat-formulas.latest.json
/data/aliases.latest.json          optional but recommended
/data/schema-version.json          optional contract metadata
```

Recommended immutable build paths for cache safety:

```text
/data/builds/{datasetVersion}/version.json
/data/builds/{datasetVersion}/pals.json
/data/builds/{datasetVersion}/breeding-pairs.json
/data/builds/{datasetVersion}/special-combos.json
/data/builds/{datasetVersion}/passives.json
/data/builds/{datasetVersion}/stat-formulas.json
```

`*.latest.json` may redirect or duplicate the current build for simple client loading, but calculator result objects should preserve the exact `dataVersion` used.

Cache policy:
- Immutable build files: `Cache-Control: public, max-age=31536000, immutable`.
- `latest` pointers and `version.json`: short TTL, e.g. `public, max-age=300`.
- Do not cache personalized API requests unless the request body is public-safe and normalized.

## 4. Global schema conventions

All IDs are lowercase stable strings. Slugs are URL-safe lowercase kebab-case.

Common fields:

```ts
type DataVersionId = string; // e.g. "palworld-1-0_2026-07-16_r1" once verified
type PalId = string;         // e.g. "anubis"; stable internal ID, not display label
type PalSlug = string;       // e.g. "anubis"; URL-safe; may equal ID in MVP
type PassiveId = string;     // e.g. "artisan"
type SourceRefId = string;

type Caveat = {
  code: string;
  severity: "info" | "warning" | "blocking";
  message: string;
  docsPath?: string;         // e.g. "/data-sources/#stat-formulas"
};

type SourceRef = {
  id: SourceRefId;
  label: string;
  category: "official_patch_notes" | "manual_verification" | "community_report" | "public_game_data" | "formula_research" | "owner_supplied" | "other";
  url?: string;
  retrievedAt?: string;      // ISO date/datetime when applicable
  notes?: string;
};
```

Do not expose secrets or internal credentials in any JSON file.

## 5. Version metadata contract

`/data/version.json`

```json
{
  "schemaVersion": "1.0.0",
  "dataVersion": "DATASET_VERSION_PENDING",
  "gameVersionLabel": "Palworld 1.0 pending verification",
  "lastUpdated": null,
  "status": "pending_source_verification",
  "includedDomains": ["pals", "breeding", "special_combos", "passives", "stat_formulas"],
  "unsupportedDomains": ["server-side save upload", "guaranteed passive odds"],
  "sourcePolicyPath": "/data-sources/",
  "correctionPath": "/data-sources/#corrections",
  "build": {
    "generatedAt": null,
    "generatorVersion": "DATA_PIPELINE_PENDING",
    "checksum": null
  },
  "caveats": [
    {
      "code": "DATA_SOURCE_PENDING",
      "severity": "blocking",
      "message": "Production calculator data must not be published until source, version, and update date are verified.",
      "docsPath": "/data-sources/"
    }
  ]
}
```

Production requirement:
- Replace `DATASET_VERSION_PENDING`, `lastUpdated`, `generatorVersion`, and checksum before launch.
- If any domain remains unverified, tools depending on it must show unavailable/caveat states.

## 6. Pal entity contract

`/data/pals.latest.json`

```ts
type Pal = {
  id: PalId;
  slug: PalSlug;
  displayName: string;
  aliases: string[];
  elements: string[];
  rarity?: number | null;
  breedability: {
    canBreedAsParent: boolean;
    canBeBredAsChild: boolean;
    notes?: string;
  };
  stats?: {
    hp?: number;
    attack?: number;
    defense?: number;
    workSpeed?: number;
    stamina?: number;
  };
  tags?: string[];
  dataVersion: DataVersionId;
  sourceRefs: SourceRefId[];
  caveats: Caveat[];
};

type PalDataFile = {
  schemaVersion: "1.0.0";
  dataVersion: DataVersionId;
  generatedAt: string | null;
  pals: Pal[];
};
```

Illustrative non-production example:

```json
{
  "id": "example-pal",
  "slug": "example-pal",
  "displayName": "Example Pal",
  "aliases": ["Example"],
  "elements": ["neutral"],
  "rarity": null,
  "breedability": {
    "canBreedAsParent": true,
    "canBeBredAsChild": true,
    "notes": "Example only; replace with verified Palworld data."
  },
  "stats": { "hp": 0, "attack": 0, "defense": 0 },
  "tags": ["example_only"],
  "dataVersion": "DATASET_VERSION_PENDING",
  "sourceRefs": [],
  "caveats": [
    { "code": "EXAMPLE_ONLY", "severity": "blocking", "message": "This is not production Palworld data." }
  ]
}
```

Validation rules:
- `id` and `slug` must be unique.
- `displayName` is required.
- `aliases` may be empty but must exist.
- `elements` must use a controlled vocabulary decided by the data build.
- Breedability flags must be explicit; absence is not allowed.

## 7. Alias and autocomplete contract

Autocomplete should normalize user input without hiding uncertainty.

```ts
type AliasRecord = {
  normalized: string;        // lowercase trimmed search key
  palId: PalId;
  kind: "display_name" | "slug" | "alias" | "common_misspelling";
  confidence: "exact" | "high" | "suggestion";
};
```

Frontend behavior:
- Exact match selects directly.
- High-confidence alias may select but should still display the canonical Pal name.
- Suggestions should not silently calculate; ask user to choose.
- Unknown names return `INVALID_PAL` with close suggestions when available.

## 8. Breeding data contract

`/data/breeding-pairs.latest.json`

```ts
type ComboType = "normal" | "special" | "unavailable";

type BreedingPair = {
  id: string;                // stable pair id, e.g. hash of sorted parents + child + version
  parentAId: PalId;
  parentBId: PalId;
  childId: PalId;
  comboType: ComboType;
  ruleId?: string;
  isOrderSensitive: boolean;
  dataVersion: DataVersionId;
  sourceRefs: SourceRefId[];
  caveats: Caveat[];
};

type BreedingPairDataFile = {
  schemaVersion: "1.0.0";
  dataVersion: DataVersionId;
  generatedAt: string | null;
  pairs: BreedingPair[];
};
```

Calculator behavior:
- Parent pair lookup should normalize parent order if `isOrderSensitive=false`.
- Special combos override normal formula if verified and applicable.
- Same-parent breeding must be allowed or rejected according to verified data, not UI assumptions.
- If no pair exists, return a no-result response with caveats.

Parent pair result shape:

```ts
type BreedingChildResult = {
  ok: true;
  mode: "parent_to_child";
  parentA: PalSummary;
  parentB: PalSummary;
  child: PalSummary;
  comboType: ComboType;
  ruleId?: string;
  dataVersion: DataVersionId;
  caveats: Caveat[];
};
```

Reverse target search result shape:

```ts
type BreedingParentsResult = {
  ok: true;
  mode: "target_to_parents";
  target: PalSummary;
  pairs: Array<{
    parentA: PalSummary;
    parentB: PalSummary;
    comboType: ComboType;
    sortScore?: number;
    caveats: Caveat[];
  }>;
  resultCount: number;
  filtersApplied: Record<string, unknown>;
  dataVersion: DataVersionId;
  caveats: Caveat[];
};
```

## 9. Special combo contract

`/data/special-combos.latest.json`

```ts
type SpecialCombo = {
  id: string;
  parentConstraints: Array<{
    slot: "parentA" | "parentB" | "either";
    palId?: PalId;
    tag?: string;
  }>;
  childId: PalId;
  explanation: string;
  priority: number;
  dataVersion: DataVersionId;
  sourceRefs: SourceRefId[];
  caveats: Caveat[];
};
```

Validation rules:
- `childId` must exist in Pal file.
- Parent constraints must resolve to at least one valid Pal or documented tag.
- If multiple special combos match, highest `priority` wins; ties are validation errors unless explicitly resolved.

## 10. Route solver contract

Route solver purpose:
- Given owned Pals, target Pal, breeding graph, and constraints, return the shortest route found for the current dataset and constraints.
- Use “shortest route found” language unless algorithm and complete data prove true shortest path.

Request shape:

```ts
type RouteSolveRequest = {
  target: PalId | PalSlug;
  ownedPals: Array<PalId | PalSlug>;
  constraints?: {
    maxGenerations?: number;
    excludePalIds?: PalId[];
    includeSpecialCombos?: boolean;
    allowMissingPals?: boolean;
    tieBreak?: "fewest_generations" | "fewest_missing" | "lowest_rarity" | "alphabetical";
  };
  dataVersion?: DataVersionId;
};
```

Response shape:

```ts
type RouteResult = {
  ok: true;
  mode: "route_solve";
  target: PalSummary;
  ownedPals: PalSummary[];
  targetAlreadyOwned: boolean;
  generations: number;
  steps: RouteStep[];
  missingPals: PalSummary[];
  alternatives: RouteAlternative[];
  constraints: Required<RouteConstraintsForDisplay>;
  tieBreakRule: string;
  dataVersion: DataVersionId;
  durationBucket?: "lt_100ms" | "100_500ms" | "500_1000ms" | "1_3s" | "gt_3s";
  caveats: Caveat[];
};

type RouteStep = {
  stepIndex: number;
  generation: number;
  parentA: PalSummary;
  parentB: PalSummary;
  child: PalSummary;
  comboType: ComboType;
  usesOwnedParentA: boolean;
  usesOwnedParentB: boolean;
  sourcePairId?: string;
  caveats: Caveat[];
};

type RouteAlternative = {
  label: string;
  generations: number;
  missingCount: number;
  steps: RouteStep[];
  caveats: Caveat[];
};
```

Algorithm recommendation for P0:
- Build a directed derivation graph from verified breeding pairs.
- Start from owned Pals as generation 0.
- Use breadth-first search or dynamic programming over obtainable children to find fewest generations.
- Track predecessor pair for each discovered Pal.
- Apply constraints before enqueueing candidate steps.
- Limit work with `maxGenerations`, max owned list length, and timeout guard.
- Return deterministic tie-breaks so results are stable across sessions.

Edge states:
- Empty owned list: return general parent pair suggestions instead of pretending user owns ingredients.
- Target already owned: success with `targetAlreadyOwned=true`, zero steps.
- No route: return `NO_ROUTE` with suggestions to relax constraints.
- Long solve: frontend shows progress/loading; Worker fallback may return timeout error.

## 11. Passive skill contract

`/data/passives.latest.json`

```ts
type PassiveSkill = {
  id: PassiveId;
  slug: string;
  name: string;
  category: "positive" | "negative" | "neutral" | "legend" | "unknown";
  effects: Array<{
    statOrMechanic: string;
    modifier: string;
    value?: number | string;
    notes?: string;
  }>;
  compatibilityNotes?: string;
  dataVersion: DataVersionId;
  sourceRefs: SourceRefId[];
  caveats: Caveat[];
};
```

Passive planner request:

```ts
type PassivePlanRequest = {
  target: PalId | PalSlug;
  desiredPassives: PassiveId[];
  ownedPals?: Array<PalId | PalSlug>;
  dataVersion?: DataVersionId;
};
```

Passive planner response:

```ts
type PassivePlanResult = {
  ok: true;
  mode: "passive_plan";
  target: PalSummary;
  desiredPassives: PassiveSkillSummary[];
  candidateParents?: Array<{
    parentA: PalSummary;
    parentB: PalSummary;
    routeHint?: string;
    supportedByData: boolean;
    caveats: Caveat[];
  }>;
  unsupportedOrUncertainFlags: string[];
  recommendedNextAction: "choose_parents" | "open_route_solver" | "verify_data" | "unsupported";
  dataVersion: DataVersionId;
  caveats: Caveat[];
};
```

Hard rule:
- Do not output deterministic passive odds or “guaranteed” passive inheritance unless a verified formula supports it and caveats are documented.
- P0 may be a planner shell that links target/owned choices to route solving and explains RNG limitations.

## 12. Stat formula / IV contract

`/data/stat-formulas.latest.json`

```ts
type StatFormulaFile = {
  schemaVersion: "1.0.0";
  dataVersion: DataVersionId;
  formulaVersion: string;
  generatedAt: string | null;
  supportedStats: Array<"hp" | "attack" | "defense">;
  supportedModifiers: string[];
  palBaseStats: Array<{
    palId: PalId;
    hp?: number;
    attack?: number;
    defense?: number;
    sourceRefs: SourceRefId[];
    caveats: Caveat[];
  }>;
  formulaNotes: string[];
  caveats: Caveat[];
};
```

IV request:

```ts
type IvCalculateRequest = {
  pal: PalId | PalSlug;
  level: number;
  observedStats: {
    hp?: number;
    attack?: number;
    defense?: number;
  };
  modifiers?: {
    souls?: Record<string, number>;
    condenserStars?: number;
    passives?: PassiveId[];
    other?: Record<string, unknown>;
  };
  dataVersion?: DataVersionId;
};
```

IV response:

```ts
type IvCalculateResult = {
  ok: true;
  mode: "iv_calculate";
  pal: PalSummary;
  level: number;
  observedStats: Record<string, number>;
  modifiersApplied: Record<string, unknown>;
  ivRangeByStat: Record<string, { min: number; max: number; confidence: "high" | "medium" | "low" }>;
  formulaVersion: string;
  dataVersion: DataVersionId;
  caveats: Caveat[];
};
```

Stats request/response:

```ts
type StatsCalculateRequest = {
  pal: PalId | PalSlug;
  level: number;
  modifiers?: Record<string, unknown>;
  ivs?: Partial<Record<"hp" | "attack" | "defense", number>>;
  dataVersion?: DataVersionId;
};

type StatsCalculateResult = {
  ok: true;
  mode: "stats_calculate";
  pal: PalSummary;
  level: number;
  modifiersApplied: Record<string, unknown>;
  expectedStats: Partial<Record<"hp" | "attack" | "defense", number>>;
  statBands: Partial<Record<"hp" | "attack" | "defense", { min: number; max: number }>>;
  formulaVersion: string;
  dataVersion: DataVersionId;
  caveats: Caveat[];
};
```

Validation rules:
- Level must be an integer within the verified game-supported range.
- Observed stats must be positive integers.
- Impossible values return `IMPOSSIBLE_STAT_VALUE` with a recoverable error.
- Missing/unsupported modifiers must widen ranges or lower confidence, not produce fake precision.

## 13. Shared summary shape

```ts
type PalSummary = {
  id: PalId;
  slug: PalSlug;
  displayName: string;
};

type PassiveSkillSummary = {
  id: PassiveId;
  slug: string;
  name: string;
};
```

Use summaries inside result objects to avoid forcing the frontend to join display names after every calculation. The frontend should still keep full data files available for detail pages/autocomplete.

## 14. Error contract

All calculators should use the same error envelope:

```ts
type CalculatorErrorResponse = {
  ok: false;
  error: {
    code:
      | "INVALID_PAL"
      | "INVALID_PASSIVE"
      | "INVALID_LEVEL"
      | "INVALID_STAT"
      | "IMPOSSIBLE_STAT_VALUE"
      | "NO_RESULT"
      | "NO_ROUTE"
      | "DATA_UNAVAILABLE"
      | "UNSUPPORTED_DATA_VERSION"
      | "CONSTRAINT_TOO_STRICT"
      | "REQUEST_TOO_LARGE"
      | "TIMEOUT"
      | "INTERNAL_ERROR";
    message: string;
    field?: string;
    recoverable: boolean;
    suggestions?: Array<{ id: string; displayName: string; slug: string }>;
  };
  dataVersion?: DataVersionId;
  caveats: Caveat[];
};
```

UI mapping:
- `INVALID_PAL`: inline validation + suggestions.
- `NO_RESULT`: no-result state + data-source link.
- `NO_ROUTE`: explain constraints and show relax-constraint CTA.
- `DATA_UNAVAILABLE`: block result area and do not show fake output.
- `UNSUPPORTED_DATA_VERSION`: prompt user to switch/latest or show source notes.
- `REQUEST_TOO_LARGE`: tell user to reduce owned list/constraints.
- `TIMEOUT`: suggest fewer constraints or Worker fallback retry.

## 15. Optional Worker API contract

Use Worker APIs only if static/client-side performance is insufficient or if future short-link storage is approved.

Logical endpoints from route contract:

```text
POST /api/breeding/child
POST /api/breeding/parents
POST /api/route/solve
POST /api/iv/calculate
POST /api/stats/calculate
```

Additional optional endpoint for metadata:

```text
GET /api/data/version
```

API rules:
- Validate slugs/IDs against the selected data version.
- Use the same success/error shapes as client functions.
- No secret tokens in responses.
- Do not persist raw request bodies by default.
- Rate-limit abuse if endpoint accepts owned lists or heavy route constraints.
- Request body cap: start with 32KB unless benchmarks require more.
- Route solve timeout: target under 1s for common cases; hard stop around 3s with `TIMEOUT`.
- CORS: same-origin by default; do not create public API access scope in MVP.

Suggested Worker cache keys:
- Safe for parent-child, target-parent, and static stat calculations with normalized public parameters.
- Avoid caching full owned-Pal list route requests unless normalized and no private state is stored or logged.

## 16. Share state contract

Preferred MVP approach:
- Encode small calculator state in URL query/hash using stable slugs and version where helpful.
- Keep canonical pointing to the base tool page.
- Add robots noindex for share/result-state routes if separate routes exist.

Example share state fields:

```ts
type ShareState = {
  tool: "breeding" | "route" | "iv" | "stats" | "passive";
  dataVersion?: DataVersionId;
  target?: PalSlug;
  parents?: [PalSlug, PalSlug];
  owned?: PalSlug[];          // only if user chooses to share this state
  constraints?: Record<string, unknown>;
};
```

Privacy copy requirement:
- “Share links may include selected Pals or calculator settings. Do not share a link if you consider that state private.”

Do not include:
- Uploaded save files.
- Raw save-file contents.
- Account IDs.
- Secrets or tokens.

## 17. Analytics event contract

Events:

```ts
type AnalyticsEvent =
  | { name: "page_view"; props: { page_slug: string; route_group: string; device_type?: string; referrer?: string } }
  | { name: "tool_start"; props: { tool_type: string; page_slug: string; data_version: string } }
  | { name: "tool_success"; props: { tool_type: string; page_slug: string; result_count_bucket?: string; duration_bucket?: string; data_version: string } }
  | { name: "tool_error"; props: { tool_type: string; page_slug: string; error_code: string; recoverable: boolean; data_version?: string } }
  | { name: "copy_result"; props: { tool_type: string; page_slug: string; result_type: string } }
  | { name: "share_result"; props: { tool_type: string; page_slug: string; result_type: string } }
  | { name: "internal_nav"; props: { from_page: string; to_page: string; link_context: string } };
```

Do not log:
- Full owned-Pal list.
- Raw save-file contents.
- Full share URLs if they encode user-selected state.
- IP-derived identity beyond hosting/analytics provider defaults.
- Secrets.

## 18. Seed data options

Option A — placeholder seed for UI development only:
- Use a tiny `example_only` dataset with clearly fake IDs and `EXAMPLE_ONLY` blocking caveats.
- Must not be used in production or indexed pages.
- Good for design/frontend component wiring before verified Palworld data exists.

Option B — owner-supplied verified dataset:
- Preferred for MVP if the owner can supply licensed/allowed JSON/CSV.
- Convert through a repeatable build script.
- Emit checksums and validation report.

Option C — manual verification dataset:
- Data maintainer compiles Palworld 1.0 facts using allowed source categories.
- Store sourceRefs and manual verification notes.
- Slower but safer than copying competitor pages.

Option D — public game data where allowed:
- Only if license/permission/use is reviewed.
- Keep transformation script and source references.

Rejected option:
- Scrape/clone competitor compiled data as sole source of truth. This fails compliance policy and trust requirements.

## 19. Data build validation checklist

Before production launch, run a data build that checks:

Pal file:
- Unique `id` and `slug`.
- Required `displayName`, `aliases`, `elements`, `breedability` fields.
- All sourceRefs resolve.

Breeding pairs:
- Every parent/child ID exists.
- Duplicate pair conflicts are detected.
- Special combo priority conflicts are resolved.
- Reverse index can be generated for every child.

Route graph:
- Graph can load without orphan nodes.
- BFS/route solver returns deterministic results for fixture cases.
- No-route and target-already-owned fixtures pass.

Passives:
- Unique IDs/slugs.
- Unsupported/uncertain mechanics are flagged.
- No deterministic probability fields unless verified.

Stats/formulas:
- Base stat IDs match Pal IDs.
- Formula version is present.
- Impossible stat fixtures produce errors.
- Missing modifiers produce caveats/ranges.

Version file:
- No `DATASET_VERSION_PENDING` in production.
- `lastUpdated` is set.
- Checksum exists.
- `/data-sources/` content matches actual data file status.

## 20. Frontend integration sequence

1. Load `/data/version.json` on app start and render `DataVersionBadge`.
2. Load Pal + alias data for autocomplete on all calculator pages.
3. Lazy-load domain files by route:
   - Breeding pages: Pal, breeding pairs, special combos.
   - Route solver: Pal, breeding pairs, special combos.
   - IV/stat pages: Pal, stat formulas, passives if modifiers use them.
   - Passive page: Pal, passives, breeding pairs if candidate routes are supported.
4. Use pure functions for calculator logic with identical result/error envelopes.
5. Render caveats next to every result.
6. Fire analytics events with buckets only.
7. Generate share/copy state without login.
8. Link every tool page to `/data-sources/`, `/privacy/`, and `/terms/`.

## 21. Implementation plan once repo exists

Phase 1 — contract scaffolding:
- Add `src/data/schema.ts` or equivalent TypeScript types matching this contract.
- Add JSON schema or zod validators for data files.
- Add placeholder `example_only` seed files for component development, blocked from production builds.

Phase 2 — pure calculator functions:
- `normalizePalInput(input, aliases)`.
- `calculateChild(parentA, parentB, data)`.
- `findParentPairs(target, filters, data)`.
- `solveBreedingRoute(target, ownedPals, constraints, data)`.
- `calculateIvRange(request, formulas)`.
- `calculateStats(request, formulas)`.
- `planPassives(request, data)` as caveated P0 shell.

Phase 3 — validation fixtures:
- Fixture for valid parent-to-child.
- Fixture for invalid Pal suggestion.
- Fixture for reverse target with multiple pairs.
- Fixture for target already owned.
- Fixture for no route under strict constraints.
- Fixture for impossible IV/stat input.
- Fixture for unsupported passive combination.
- Fixture proving no raw owned list appears in analytics payload.

Phase 4 — optional Worker fallback:
- Benchmark client route solving first.
- Add Worker only if needed for large graphs/owned lists.
- Keep same request/response envelope.
- Add body caps, timeout, rate limiting, and no raw request persistence.

Phase 5 — production data gate:
- Select owner-approved data source workflow.
- Generate real versioned data files.
- Publish `/data-sources/` with exact version/update/source notes.
- Remove or hard-block example-only seed from production.

## 22. Acceptance gate self-check

Data Contract Gate requirements:
- Concrete schema/examples: PASS — entities, TypeScript shapes, JSON examples, and result/error envelopes are defined.
- API/seed structure: PASS — static JSON file layout, optional Worker endpoints, cache rules, and seed options are defined.
- Validation/error states: PASS — global error envelope, UI mappings, and data build validation checklist are defined.
- No fake production data claims: PASS — examples are explicitly illustrative only; production data source/version remains pending.
- Implementation blocked condition: PASS — repo/worktree is absent, so real implementation is blocked while contract/plan is delivered.

## 23. Downstream handoff

For frontend_bot/design_bot:
- Build against the result/error envelopes in this document.
- Treat `DATASET_VERSION_PENDING` and `EXAMPLE_ONLY` as blocking production states.
- Render data version, source/caveat links, and fan-site disclaimer on all tool pages.

For data/backend implementer once repo exists:
- Start static/client-first.
- Implement pure calculator functions before Worker APIs.
- Add Worker only after benchmark evidence.
- Do not persist raw owned lists/save data in MVP.

For QA_bot:
- Verify no production page can show example-only data as real results.
- Verify no raw owned list appears in analytics payloads.
- Verify all calculator errors map to visible UI states.
- Verify `/data-sources/`, `/privacy/`, `/terms/`, and data version badge exist before launch.

[DONE]
