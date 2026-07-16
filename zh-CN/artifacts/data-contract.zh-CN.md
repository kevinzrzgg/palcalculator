# PalCalculator 后端数据合约 v1

项目：pal计算器
阶段：08-后端-数据
市场：美国/英语
生成时间：2026-07-16
所有者简介：backend_bot
状态： CONTRACT COMPLETE / IMPLEMENTATION BLOCKED UNTIL REPO + DATA SOURCE ARE AVAILABLE

## 1. 范围和决定

该合同定义了 PalCalculator 的前端消耗型计算器架构、静态种子/API 选项、源策略、验证/错误状态和实施计划。

主要实施决策：
- Cloudflare 页面上的 P0 应是静态/客户端优先。
- 首先发布版本化的 JSON 数据文件和纯计算器功能。
- 仅当路由解决基准证明客户端解决速度太慢或未来的短链接存储获得批准时，才添加 Cloudflare Workers。
- 不要在 MVP 中保留拥有的 Pal 列表、保存文件或原始路由请求。

实施情况：
- `/root/projects/palcalculator` 当前仅包含规划工件；找不到应用程序存储库/工作树/包清单。
- 因此，真正的后端/前端实现被阻止。
- 该工件是可实施的数据合同和计划；它故意不声称生产 Palworld 数据还存在。

输入读取：
- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/copy.md`
- `/root/projects/palcalculator/artifacts/compliance.md`
- `/root/projects/palcalculator/artifacts/pricing.md`

## 2. 不可协商的数据政策

1. 在每个计算器页面和每个结果上显示数据版本和最后更新日期。
2. 将 Palworld 数据视为版本化内容，而不是隐藏的应用程序常量。
3. 缺失或不确定的数据必须产生不可用/警告状态，而不是猜测结果。
4. 竞争对手页面不得成为唯一的事实来源。
5. 除非记录了官方来源/许可证，否则请勿致电数据官方。
6. 不要将原始拥有的 Pal 列表或服务器端保存文件内容存储在 MVP 中。
7. 共享 URL 可以对选定的好友/设置进行编码，但不得包含上传的保存文件或敏感的私人内容。
8. 结果/共享 URL 默认为 noindex 并规范化为基本工具路由，除非稍后有意升级。
9. 分析事件使用桶和错误代码；没有原始 Palbox/保存数据，没有秘密。
10. 被动继承和 IV/stat 输出必须带有明确的警告，其中公式、修饰符、舍入或 RNG 会产生不确定性。

最低数据源页面要求：
- 当前 Palworld 游戏/数据目标，例如`Palworld 1.0` 一旦验证。
- 内部数据集版本 ID。
- 最后更新日期。
- 使用的源类别。
- 包含的领域：伙伴、繁殖对、特殊组合、被动技能、统计公式。
- 不支持/不确定的数据列表。
- 公式假设。
- 修正/接触路径。
- 补丁响应/更新节奏。
- 声明竞争对手页面不是唯一的事实来源。

## 3.静态P0的推荐文件布局

从公共/静态包或等效的不可变资产路径提供这些服务：

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

为了缓存安全推荐的不可变构建路径：

```text
/data/builds/{datasetVersion}/version.json
/data/builds/{datasetVersion}/pals.json
/data/builds/{datasetVersion}/breeding-pairs.json
/data/builds/{datasetVersion}/special-combos.json
/data/builds/{datasetVersion}/passives.json
/data/builds/{datasetVersion}/stat-formulas.json
```

`*.latest.json` 可能会重定向或复制当前构建以进行简单的客户端加载，但计算器结果对象应保留所使用的确切 `dataVersion`。

缓存策略：- 不可变的构建文件：`Cache-Control: public, max-age=31536000, immutable`。
- `latest` 指针和 `version.json`：短 TTL，例如`public, max-age=300`。
- 不要缓存个性化的 API 请求，除非请求正文是公共安全且标准化的。

## 4. 全局模式约定

所有 ID 都是小写稳定字符串。 Slug 是 URL 安全的小写 kebab-case。

常见字段：

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

不要在任何 JSON 文件中公开机密或内部凭据。

## 5.版本元数据合约

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

生产要求：
- 在启动前替换 `DATASET_VERSION_PENDING`、`lastUpdated`、`generatorVersion` 和校验和。
- 如果任何域仍未验证，则依赖于该域的工具必须显示不可用/警告状态。

## 6. Pal实体合约

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

说明性非生产示例：

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

验证规则：
- `id` 和 `slug` 必须是唯一的。
- 需要 `displayName`。
- `aliases` 可能为空，但必须存在。
- `elements` 必须使用由数据构建决定的受控词汇。
- 育种标志必须明确；不允许缺席。

## 7. 别名和自动完成合约

自动完成应该规范用户输入而不隐藏不确定性。

```ts
type AliasRecord = {
  normalized: string;        // lowercase trimmed search key
  palId: PalId;
  kind: "display_name" | "slug" | "alias" | "common_misspelling";
  confidence: "exact" | "high" | "suggestion";
};
```

前端行为：
- 直接精确匹配选择。
- 可以选择高可信度别名，但仍应显示规范的好友名称。
- 建议不要默默算计；要求用户选择。
- 未知名称返回 `INVALID_PAL`，并在可用时提供接近的建议。

## 8. 育种数据合约

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

计算器行为：
- 如果 `isOrderSensitive=false`，父对查找应标准化父顺序。
- 如果经过验证且适用，特殊组合将覆盖正常公式。
- 同亲育种的允许或拒绝必须根据经过验证的数据，而不是 UI 假设。
- 如果不存在对，则返回带有警告的无结果响应。

父对结果形状：

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

反向目标搜索结果形状：

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

## 9. 特别组合合约

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

验证规则：
- `childId` 必须存在于 Pal 文件中。
- 父约束必须解析为至少一个有效的 Pal 或记录的标签。
- 如果有多个特殊组合匹配，最高的 `priority` 获胜；除非明确解决，否则关系是验证错误。

## 10. 路线求解器合约

路径求解器目的：
- 给定拥有的伙伴、目标伙伴、繁殖图和约束，返回为当前数据集和约束找到的最短路线。
- 使用“找到最短路径”语言，除非算法和完整数据证明真正的最短路径。

要求形状：

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

响应形状：

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

P0的算法推荐：
- 从经过验证的育种对构建有向推导图。
- 从拥有的第 0 代好友开始。
- 对可用的子代使用广度优先搜索或动态规划来找到最少的代。
- 跟踪每个发现的好友的前任对。
- 在将候选步骤排队之前应用约束。
- 使用 `maxGenerations`、最大拥有列表长度和超时保护来限制工作。
- 返回确定性抢七局，以便结果在各个会话中保持稳定。

边缘状态：- 空拥有列表：返回一般父对建议，而不是假装用户拥有成分。
- 已拥有的目标：使用 `targetAlreadyOwned=true` 成功，零步骤。
- 无路线：返回 `NO_ROUTE` 并提供放宽约束的建议。
- 长解决方案：前端显示进度/加载； Worker 回退可能会返回超时错误。

## 11.被动技能契约

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

被动计划者要求：

```ts
type PassivePlanRequest = {
  target: PalId | PalSlug;
  desiredPassives: PassiveId[];
  ownedPals?: Array<PalId | PalSlug>;
  dataVersion?: DataVersionId;
};
```

被动计划者反应：

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

硬性规则：
- 不要输出确定性被动赔率或“保证”被动继承，除非经过验证的公式支持它并且记录了警告。
- P0 可能是一个规划器 shell，它将目标/拥有的选择链接到路线求解并解释 RNG 限制。

## 12. 统计公式/IV合约

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

四、要求：

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

四、反应：

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

统计请求/响应：

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

验证规则：
- 等级必须是经过验证的游戏支持范围内的整数。
- 观察到的统计数据必须是正整数。
- 不可能的值返回 `IMPOSSIBLE_STAT_VALUE` 并带有可恢复的错误。
- 缺失/不受支持的修饰符必须扩大范围或降低置信度，而不是产生虚假精度。

## 13. 共享摘要形状

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

在结果对象内使用摘要以避免强制前端在每次计算后连接显示名称。前端仍应保留可用于详细信息页面/自动完成的完整数据文件。

## 14. 错误合约

所有计算器应使用相同的误差包络线：

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

用户界面映射：
- `INVALID_PAL`：内联验证+建议。
- `NO_RESULT`：无结果状态+数据源链接。
- `NO_ROUTE`：解释约束并显示松弛约束 CTA。
- `DATA_UNAVAILABLE`：阻止结果区域并且不显示虚假输出。
- `UNSUPPORTED_DATA_VERSION`：提示用户切换/最新或显示源注释。
- `REQUEST_TOO_LARGE`：告诉用户减少拥有的列表/约束。
- `TIMEOUT`：建议减少约束或 Worker 回退重试。

## 15. 可选 Worker API 合约

仅当静态/客户端性能不足或未来的短链接存储获得批准时才使用 Worker API。

路由契约的逻辑端点：

```text
POST /api/breeding/child
POST /api/breeding/parents
POST /api/route/solve
POST /api/iv/calculate
POST /api/stats/calculate
```

元数据的附加可选端点：

```text
GET /api/data/version
```

API规则：
- 根据选定的数据版本验证段/ID。
- 使用与客户端函数相同的成功/错误形状。
- 响应中没有秘密令牌。
- 默认情况下不保留原始请求正文。
- 如果端点接受拥有的列表或严格的路由限制，则速率限制滥用。
- 请求正文上限：从 32KB 开始，除非基准测试需要更多。
- 路线求解超时：一般情况下目标为 1 秒以下；使用 `TIMEOUT` 在 3 秒左右硬停止。
- CORS：默认同源；不要在 MVP 中创建公共 API 访问范围。

建议的 Worker 缓存键：
- 对于具有标准化公共参数的父子、目标父和静态统计计算是安全的。
- 避免缓存完整拥有的 Pal 列表路由请求，除非标准化并且没有存储或记录私有状态。

## 16.共享状态合约

首选 MVP 方法：- 使用稳定的段和有用的版本在 URL 查询/哈希中编码小型计算器状态。
- 保持指向基本工具页面的规范。
- 如果存在单独的路由，则为共享/结果状态路由添加机器人 noindex。

共享状态字段示例：

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

隐私副本要求：
- “共享链接可能包括选定的好友或计算器设置。如果您认为该链接属于私人状态，请勿共享链接。”

不包括：
- 上传保存文件。
- 原始保存文件内容。
- 帐户 ID。
- 秘密或令牌。

## 17. 分析事件合约

活动：

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

不记录：
- 完整的拥有好友列表。
- 原始保存文件内容。
- 完整的共享 URL（如果它们对用户选择的状态进行编码）。
- IP 派生身份超出托管/分析提供商默认设置。
- 秘密。

## 18. 种子数据选项

选项 A — 仅用于 UI 开发的占位符种子：
- 使用一个微小的 `example_only` 数据集，其中包含明显虚假的 ID 和 `EXAMPLE_ONLY` 阻止警告。
- 不得在生产或索引页面中使用。
- 适合在经过验证的 Palworld 数据存在之前进行设计/前端组件接线。

选项 B — 所有者提供的经过验证的数据集：
- 如果所有者可以提供许可/允许的 JSON/CSV，则首选 MVP。
- 通过可重复的构建脚本进行转换。
- 发出校验和和验证报告。

选项 C — 手动验证数据集：
- 数据维护者使用允许的源类别编译 Palworld 1.0 事实。
- 存储 sourceRefs 和手动验证注释。
- 比复制竞争对手的页面更慢但更安全。

选项 D — 允许的公共游戏数据：
- 仅在许可/许可/使用经过审查的情况下。
- 保留转换脚本和源参考。

拒绝的选项：
- 抓取/克隆竞争对手汇编的数据作为唯一的事实来源。这不符合合规政策和信任要求。

## 19. 数据构建验证清单

在生产启动之前，运行数据构建来检查：

朋友文件：
- 独特的 `id` 和 `slug`。
- 必需的 `displayName`、`aliases`、`elements`、`breedability` 字段。
- 所有sourceRefs 解析。

育种配对：
- 每个家长/孩子的 ID 都存在。
- 检测到重复对冲突。
- 解决了特殊组合优先级冲突。
- 可以为每个子项生成反向索引。

路线图：
- 图表可以在没有孤立节点的情况下加载。
- BFS/路线求解器返回夹具情况的确定性结果。
- 无路线和目标已拥有的固定装置通过。

被动：
- 独特的 ID/slugs。
- 不支持/不确定的机制被标记。
- 除非经过验证，否则没有确定性概率场。

统计/公式：
- 基本统计 ID 与好友 ID 匹配。
- 存在公式版本。
- 不可能的统计装置会产生错误。
- 缺少修饰符会产生警告/范围。

版本文件：
- 生产中没有 `DATASET_VERSION_PENDING`。
- `lastUpdated` 已设置。
- 校验和存在。
- `/data-sources/` 内容与实际数据文件状态匹配。

## 20. 前端集成顺序

1. 在应用程序启动时加载 `/data/version.json` 并渲染 `DataVersionBadge`。
2. 加载 Pal + 别名数据以在所有计算器页面上自动完成。
3.通过路由延迟加载域文件：
   - 繁殖页面：伙伴、繁殖对、特殊组合。
   - 路线解算器：伙伴、繁殖对、特殊组合。- IV/stat 页面：Pal、stat 公式、被动元素（如果修饰符使用它们）。
   - 被动页面：伙伴、被动、繁殖对（如果支持候选路线）。
4. 对具有相同结果/误差包络的计算器逻辑使用纯函数。
5. 在每个结果旁边给出警告。
6. 仅使用存储桶触发分析事件。
7.无需登录即可生成共享/复制状态。
8. 将每个工具页面链接到 `/data-sources/`、`/privacy/` 和 `/terms/`。

## 21. 回购协议存在后的实施计划

第一阶段——合同脚手架：
- 添加 `src/data/schema.ts` 或与此合约匹配的等效 TypeScript 类型。
- 为数据文件添加 JSON 架构或 zod 验证器。
- 添加用于组件开发的占位符 `example_only` 种子文件，阻止生产版本。

第 2 阶段 — 纯计算器功能：
- `normalizePalInput(input, aliases)`。
- `calculateChild(parentA, parentB, data)`。
- `findParentPairs(target, filters, data)`。
- `solveBreedingRoute(target, ownedPals, constraints, data)`。
- `calculateIvRange(request, formulas)`。
- `calculateStats(request, formulas)`。
- `planPassives(request, data)` 作为已警告的 P0 shell。

第 3 阶段 — 验证装置：
- 有效的父母对孩子的固定装置。
- 修复了无效好友建议的问题。
- 多对反向目标的固定装置。
- 已拥有的目标的固定装置。
- 严格限制下无路线的夹具。
- 修复不可能的 IV/stat 输入。
- 用于不支持的被动组合的夹具。
- 证明分析有效负载中没有出现原始拥有列表的装置。

第 4 阶段 — 可选的 Worker 后备：
- 首先对客户端路由进行基准测试。
- 仅在大型图表/拥有的列表需要时添加工作人员。
- 保留相同的请求/响应信封。
- 添加正文上限、超时、速率限制和无原始请求持久性。

阶段 5 — 生产数据门：
- 选择所有者批准的数据源工作流程。
- 生成真实版本数据文件。
- 发布 `/data-sources/` 以及确切的版本/更新/源注释。
- 从生产中删除或硬阻止仅示例种子。

## 22.验收门自检

数据合约门要求：
- 具体模式/示例：PASS — 定义实体、TypeScript 形状、JSON 示例和结果/错误包络。
- API/seed 结构：PASS — 定义静态 JSON 文件布局、可选 Worker 端点、缓存规则和种子选项。
- 验证/错误状态：PASS — 定义了全局错误信封、UI 映射和数据构建验证检查表。
- 无虚假生产数据声明：PASS — 示例仅供明确说明；生产数据源/版本仍待确定。
- 实施受阻条件：PASS — 存储库/工作树不存在，因此在交付合同/计划时实际实施受阻。

## 23. 下游切换

对于 frontend_bot/design_bot：
- 根据本文档中的结果/错误范围进行构建。
- 将 `DATASET_VERSION_PENDING` 和 `EXAMPLE_ONLY` 视为阻塞生产状态。
- 在所有工具页面上呈现数据版本、源/警告链接和粉丝站点免责声明。

对于数据/后端实现者，一旦存储库存在：
- 启动静态/客户端优先。
- 在 Worker API 之前实现纯计算器函数。
- 仅在基准证据之后添加工人。
- 不要在 MVP 中保留原始拥有的列表/保存数据。

对于 QA_bot：
- 验证没有生产页面可以将仅示例数据显示为真实结果。- 验证分析负载中没有出现原始拥有列表。
- 验证所有计算器错误映射到可见的 UI 状态。
- 启动前验证 `/data-sources/`、`/privacy/`、`/terms/` 和数据版本徽章是否存在。

[DONE]
