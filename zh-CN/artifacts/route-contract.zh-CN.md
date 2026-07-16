# PalCalculator 路由合约 v1

项目：pal计算器
市场：美国/英语
阶段：02 PRD 和路线合同
生成时间：2026-07-16
默认堆栈：Cloudflare-first
规范来源占位符：`{CANONICAL_ORIGIN}`，直到所有者确认域名

## 1. 路由契约原则

1. 使用 PalCalculator 作为品牌，但在每个可索引路线标题/H1/元中明确显示 Palworld。
2. 计算器 UI 出现在所有 P0 工具页面的首屏上方。
3. 每条可索引路由都有一个带有尾部斜杠的规范 URL。
4. 共享/结果状态可共享，但默认无索引。
5. 程序化 Pal 特定路由为 P1，不得以薄重复页面形式发送。
6. 数据版本、更新日期和粉丝站点免责声明必须在每个工具路径中可见或链接。
7. Cloudflare-first：Pages上的静态路由； Workers/D1/KV/R2 仅在需要计算/存储的情况下。

## 2. Canonical URL 计划

最终规范来源正在等待所有者域确认。

在下游合约中使用此占位符：
- `{CANONICAL_ORIGIN}`

如果 `palcalculator.com` 被批准并拥有，则规范来源应变为：
- `https://palcalculator.com`

URL规则：
- 规范页面路径：尾部斜杠，例如`{CANONICAL_ORIGIN}/breeding-calculator/`。
- 没有尾部斜杠的非规范变体应该 301 到尾部斜杠。
- 查询字符串应用程序状态应保持指向基本工具页面的规范，除非明确升级。
- `/share/*` 和不透明结果 URL 默认为 `noindex, follow`。
- 站点地图仅包含可索引的规范路线。

## 3.P0路由表

|路线 |状态 |索引 |规范|页面标题方向| H1 |主要成分|小学 CTA |所需数据|笔记|
|---|---|---|---|---|---|---|---|---|---|
| `/` | P0|是的 | `{CANONICAL_ORIGIN}/` | PalCalculator：Palworld 育种、IV、统计和被动计算器 | PalCalculator：Palworld 育种、IV、统计和被动计算器 |计算器中心 |从目标伙伴开始 | Pal索引、工具链接、数据版本 |必须消除一般 PAL 含义的歧义。 |
| `/breeding-calculator/` | P0|是的 | `{CANONICAL_ORIGIN}/breeding-calculator/` | Palworld 育种计算器 | Palworld 育种计算器 |育种计算器 |计算养殖|伙伴、繁殖配对、特殊组合 |父级->子级和目标->对。 |
| `/breeding-route-calculator/` | P0|是的 | `{CANONICAL_ORIGIN}/breeding-route-calculator/` | Palworld 育种路线计算器 | Palworld 育种路线计算器 |路线求解器 |寻找最短路线 | Pal、BreedingPair、SpecialCombo、RouteResult |旗舰差异化因素。 |
| `/iv-calculator/` | P0|是的 | `{CANONICAL_ORIGIN}/iv-calculator/` | Palworld IV 计算器 | Palworld IV 计算器 |静脉注射计算器 |检查静脉注射 |帕尔，StatFormula |显示范围/警告。 |
| `/stats-calculator/` | P0|是的 | `{CANONICAL_ORIGIN}/stats-calculator/` | Palworld 统计计算器 | Palworld 统计计算器 |统计计算器 |计算统计数据 |帕尔，StatFormula |可能与 IV 共享引擎。 |
| `/passive-skill-calculator/` | P0/P1 |是的 | `{CANONICAL_ORIGIN}/passive-skill-calculator/` | Palworld被动技能计算器| Palworld被动技能计算器|被动规划器 |计划被动|朋友，被动技能，繁殖配对 |如果注明的话，P0 外壳可接受；完整的计划者可以是P1。 || `/palworld-1-0-breeding-calculator/` | P0|是的 | `{CANONICAL_ORIGIN}/palworld-1-0-breeding-calculator/` | Palworld 1.0 育种计算器 | Palworld 1.0 育种计算器 |育种计算器 |使用1.0计算器 |与育种相同|可以重用具有不同副本/规范的组件。 |
| `/data-sources/` | P0|是的 | `{CANONICAL_ORIGIN}/data-sources/` | PalCalculator 数据源和更新政策 | PalCalculator 数据源和更新政策 |数据源页面 |查看最新数据版本 |数据版本，源列表 |信任路线。 |
| `/privacy/` | P0|是的 | `{CANONICAL_ORIGIN}/privacy/` |隐私政策 |隐私政策 |法律页面 |不适用 |分析/进口披露 |在分析/导入启动之前需要。 |
| `/terms/` | P0|是的 | `{CANONICAL_ORIGIN}/terms/` |使用条款 |使用条款 |法律页面 |不适用 |免责声明 |包括非官方粉丝网站通知。 |

## 4. P1/编程路由表

这些路由必须等到后端/数据质量得到验证并且 copy/SEO 可以保证唯一的页面值。

|路线图|索引默认 |规范模式 |目的|所需的唯一值 |笔记|
|---|---|---|---|---|---|
| `/breed/{pal-slug}/` |是的，完成后 | `{CANONICAL_ORIGIN}/breed/{pal-slug}/` |帕尔特有的繁殖路线/配对 |实际配对/路由计算器状态，示例，该 Pal 的 FAQ |没有薄的重复页面。 |
| `/iv/{pal-slug}/` |是的，完成后 | `{CANONICAL_ORIGIN}/iv/{pal-slug}/` | Pal专用IV计算器| Pal 特定的基本统计数据和计算器预选 | P1。 |
| `/stats/{pal-slug}/` |是的，完成后 | `{CANONICAL_ORIGIN}/stats/{pal-slug}/` | Pal 专用统计计算器 | Pal 特定的统计范围/示例 | P1。 |
| `/best-passives/{pal-slug}/` |是的，完成后 | `{CANONICAL_ORIGIN}/best-passives/{pal-slug}/` |被动规划页面 |角色/用例注意事项和规划者条目|避免不受支持的建议。 |
| `/palworld-1-0/{calculator-topic}/` |也许| `{CANONICAL_ORIGIN}/palworld-1-0/{calculator-topic}/` |更新/新鲜度长尾 | 1.0具体数据及更新说明|不要重复 P0 路线。 |
| `/share/{result-id}/` |没有| `{CANONICAL_ORIGIN}/share/{result-id}/` |共享路线/构建结果 |打开共享状态 | `noindex, follow`；没有私人数据。 |

## 5. 页面级合约

### 5.1 首页 `/`

目的：
- 将 PalCalculator 解释为 Palworld 计算器中心。
- 快速将用户引导至正确的任务。

上折要求：
- H1：PalCalculator：Palworld 育种、IV、统计和被动计算器
- 小标题：粉丝制作的 Palworld 1.0 计算器，用于繁殖路线、IV/统计检查、被动规划和拥有的 Pal 优化。
- 主要目标 Pal 输入或工具选择器。
- 育种、路线、IV、统计、被动卡。
- 数据版本徽章。

内部链接：
- 所有 P0 工具页面。
- 数据来源。
- 页脚中的隐私/条款。

### 5.2 育种计算器 `/breeding-calculator/`

主要任务：
- 父母对 -> 孩子。
- 目标子项 -> 所有父项对。

所需的 UI 模块：
- 模式切换：与孩子配对/以父母为目标。
- 朋友自动完成输入。
- 结果表/卡片。
- 特殊组合标记。
- 链接到带有目标的路径解算器。
- 复制/分享结果。

必填结果字段：
- 父母_a
- 父母_b
- 孩子
- 组合类型：正常 |特别|不可用
- 数据版本
- 注意事项

空/错误状态：
- 空：显示 Lamball + Cattiva 等示例。
- 无效的朋友：建议最接近的名字。
- 无结果：解释数据限制并链接数据源。

### 5.3 路径求解器 `/breeding-route-calculator/`

主要任务：- 拥有的好友 + 目标好友 -> 最短路线。

所需的 UI 模块：
- 目标好友自动完成。
- 拥有 Pal 选择器/粘贴文本区域。
- 限制：最大世代、排除好友、特殊组合切换。
- 逐步路线结果。
- 失踪的好友名单。
- 替代路线。
- 复制/共享路线。

必填结果字段：
- 目标伙伴
- 拥有的朋友
- 几代人
- 步骤：有序parent_a、parent_b、child
- 失踪的朋友
- 替代方案
- 限制条件
- 数据版本
- 持续时间_ms 或持续时间_bucket 仅用于分析

空/错误状态：
- 拥有列表为空：显示一般最短父路线。
- 已拥有的目标：成功状态表明无需繁殖。
- 无路线：解释约束问题并建议放宽过滤器。
- 长解决：加载/进度状态。

### 5.4 IV 计算器 `/iv-calculator/`

主要任务：
- 根据观察到的统计数据估计 IV 范围/分数。

所需的 UI 模块：
- 朋友自动完成。
- 电平输入。
- 观察生命值/攻击/防御输入。
- 修改控制：灵魂、聚光星、被动/信任（如果支持）。
- 结果范围和警告解释。

必填结果字段：
- 朋友
- 级别
- 观察统计数据
- 修饰符
- iv_range_by_stat
- 信心/警告
- 数据版本
- 公式版本

错误状态：
- 不可能的统计值。
- 缺少修饰符警告。
- 不支持的 Pal/data 版本。

### 5.5 统计计算器 `/stats-calculator/`

主要任务：
- 计算伙伴/构建的预期统计范围。

所需的 UI 模块：
- 朋友自动完成。
- 等级/调节器/被动控制。
- 预期的HP/攻击/防御输出。
- 提供 IV 输入时的比较注释。

必填结果字段：
- 朋友
- 级别
- 修饰符
- 预期统计数据
- 统计带
- 公式版本
- 注意事项

### 5.6 被动技能计算器 `/passive-skill-calculator/`

主要任务：
- 为目标伙伴计划所需的被动。

所需的 UI 模块：
- 目标好友自动完成。
- 被动多选。
- 可选拥有的父母。
- 路线/候选注释。
- RNG/继承警告。

必填结果字段：
- 目标伙伴
- 期望的被动
- 候选人父母/路线（支持时）
- 不支持或不确定标志
- 注意事项
- 数据版本

验收注意事项：
- 如果完整的被动路线逻辑尚未准备好，则 MVP 可以提供具有透明限制的规划器 shell，前提是它仍然可以帮助用户移动到繁殖路线或数据页面。不要捏造被动概率。

### 5.7 数据来源 `/data-sources/`

所需内容：
- 当前 Palworld 数据版本。
- 最后更新日期。
- 来源类别和更新方法。
- 公式假设和不支持的数据列表。
- 联系/更正路径（如果有）。
- 声明竞争对手页面不是唯一的事实来源。

### 5.8 合法路线 `/privacy/`, `/terms/`

隐私要求主题：
- 分析事件和非秘密属性。
- 本地/共享 URL 状态。
- Palbox/进口处理（如果添加）。
- 除非策略更改，否则 MVP 中不会上传服务器端保存文件。

条款所需主题：
- 非官方粉丝制作的网站。
- Pocketpair 没有隶属关系/认可。
- 数据准确性警告。
- 用户对使用结果的责任。

## 6. 组件合约

|组件|使用者 |输入 |输出/事件 |笔记|
|---|---|---|---|---||计算器中心 | `/` |工具列表，data_version |工具单击，目标开始 |主页任务路由器。 |
| Pal 自动完成 |所有工具|好友列表、别名 |选定的好友 ID/slug |必须优雅地处理拼写错误。 |
|育种计算器 |育种，1.0 页面，程序化品种页面 |父 ID 或目标 ID |儿童或配对列表 |纯函数优先。 |
|路线求解器 |路线页面、品种页面 |拥有的 ID、目标 ID、约束 |路线结果 |客户端（如果性能良好）；允许工人后备。 |
|静脉注射计算器 | IV 页，Pal IV 页 |朋友、等级、观察到的统计数据、修正值 | IV 范围 |需要公式注意事项。 |
|统计计算器 |统计页面，Pal 统计页面 |伙伴、级别、修饰符、可选 IV |预期统计带 |共享公式数据。 |
|被动规划器 |被动页面，最佳被动页面|目标、所需被动、可选拥有的伙伴 |候选人/警告|没有确定性的过度主张。 |
|数据版本徽章 |所有工具页面 |数据版本、更新时间 |点击数据源 |信任组件。 |
|结果分享 |所有结果页面 |序列化安全状态|分享 URL/复制活动 |没有私人保存数据。 |

## 7. Data/API 合约草案

P0 首选静态 JSON 资产：
- `/data/pals.latest.json`
- `/data/breeding-pairs.latest.json`
- `/data/special-combos.latest.json`
- `/data/passives.latest.json`
- `/data/stat-formulas.latest.json`
- `/data/version.json`

如果需要 Worker API，请使用以下逻辑端点：

|端点|方法|目的|请求 |回应 |缓存|
|---|---|---|---|---|---|
| `/api/breeding/child` | POST |父对 -> 子 | `{parentA, parentB, dataVersion?}` | `{child, comboType, caveats, dataVersion}` |如果安全的话，按主体哈希进行缓存 |
| `/api/breeding/parents` | POST |目标 -> 父对 | `{target, filters?, dataVersion?}` | `{pairs, resultCount, caveats, dataVersion}` |缓存|
| `/api/route/solve` | POST |拥有列表->路线| `{target, ownedPals, constraints?, dataVersion?}` | `{route, alternatives, missingPals, caveats, dataVersion}` |仅当没有存储私有数据时才缓存 |
| `/api/iv/calculate` | POST | IV估计| `{pal, level, observedStats, modifiers?, dataVersion?}` | `{ivRanges, confidence, caveats, formulaVersion, dataVersion}` |缓存可选 |
| `/api/stats/calculate` | POST |预期统计数据 | `{pal, level, modifiers?, ivs?, dataVersion?}` | `{expectedStats, bands, caveats, formulaVersion, dataVersion}` |缓存可选 |

API规则：
- 验证 Pal slugs 服务器/客户端。
- 返回结构化的警告，而不是无声的失败。
- 响应中没有秘密令牌。
- 除非明确批准，否则不要保留拥有的 Pal 列表或保存/导入内容。
- 错误响应形状：`{error: {code, message, field?, recoverable}, dataVersion?}`。

## 8. SEO 元数据合约

每个可索引工具页面必须包括：
- `<title>` 与 Palworld + 任务。
- 承诺特定计算器任务的元描述。
- 规范链接。
- 打开图表标题/描述。
- H1匹配用户任务。
- FAQ 内容仅在页面上可见时。
- 实际工具的软件应用程序架构。

初始标题方向：
- `/`：PalCalculator：Palworld 育种、IV、统计和被动计算器
- `/breeding-calculator/`：Palworld 育种计算器 - 父母对、孩子和组合
- `/breeding-route-calculator/`：Palworld 繁殖路线计算器 - 来自拥有的朋友的最短路径
- `/iv-calculator/`：Palworld IV 计算器 - 检查 HP、攻击和防御 IV
- `/stats-calculator/`：Palworld 统计计算器 - 按级别估算 Pal 统计数据
- `/passive-skill-calculator/`：Palworld 被动技能计算器 - 计划培育被动技能- `/palworld-1-0-breeding-calculator/`：Palworld 1.0 育种计算器 - 更新的组合和路线

复制冻结警告：
- 由于上游 Tavily 401 回退，建议在最终 SEO 副本冻结之前进行手动实时 Google SERP 审查。

## 9. 分析事件合约

事件必须避免原始私人数据。

|活动 |当 |属性 |
|---|---|---|
| `page_view` |路线负载| page_slug、route_group、device_type、referrer |
| `tool_start` |用户开始计算 |工具类型、页面slug、数据版本|
| `tool_success` |显示有效结果 | tool_type、page_slug、result_count_bucket、duration_bucket、data_version |
| `tool_error` |验证/无路由/系统错误 | tool_type、page_slug、error_code、可恢复、data_version |
| `copy_result` |复制点击|工具_类型、页面_slug、结果_类型 |
| `share_result` |分享 URL 创建 |工具_类型、页面_slug、结果_类型 |
| `internal_nav` |点击相关工具 | from_page、to_page、link_context |

不记录：
- 原始保存文件内容。
- 完全拥有的 Pal 列表（如果可以被视为用户提供的私有状态）。
- IP 派生身份超出标准分析提供商处理范围。

## 10. 航线合同验收测试

1、表中每条P0路由都会渲染一个非404页面。
2. 每个可索引路由都有一个带有尾部斜杠的自引用规范 URL。
3. `/share/{result-id}/` 或等效结果 URL 默认为 noindex。
4.主页和工具页面在首屏提到Palworld。
5. 计算器组件公开空、加载、成功、无效输入和无结果状态。
6. 工具页面链接到相关的 `/data-sources/`、`/privacy/` 和 `/terms/`。
7. 每个P0工具路线上都有数据版本徽章。
8. Sitemap 包括 P0 可索引路由，不包括共享/结果状态路由。
9. Route/API 合约避免了 MVP 中的保存文件上传和原始私有数据持久化。
10. 程序化 Pal 路由保持禁用/无索引状态，直到它们提供唯一的计算器值。

## 11. 下游实施说明

对于后端/数据代理：
- 决定路由求解是否可以在客户端针对静态 JSON 运行或需要 Worker。
- 为所有伙伴/被动者提供稳定的子弹模式。
- 为 IV/stat 输出提供公式警告。
- 提供版本化数据文件和更新策略。

对于设计/前端代理：
- 在首屏上构建移动优先的工具控件。
- 将 SEO 副本保留在主要任务 UI 下方。
- 使用文本/数据优先的用户界面；不要依赖官方游戏艺术。
- 使复制/共享在结果中可见。

对于 SEO/复制代理：
- 使用 Palworld 限定的短语，而不是通用的 `palcalculator`。
- 在最终 SEO 副本冻结之前重新检查实时 Google SERP。
- 避免以编程方式生成页面，直到存在唯一的数据/工具值。

[DONE]
