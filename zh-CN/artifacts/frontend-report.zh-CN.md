# PalCalculator 前端实施报告

项目：pal计算器
阶段：07-前端
所有者简介：frontend_bot
状态： BLOCKED 开启 REPO/WORKTREE SETUP
日期：2026-07-16

## 1. 目前的结论

在此运行中无法执行前端代码实现，因为 `/root/projects/palcalculator` 仅包含规划工件，并且没有应用程序存储库/工作树、`.git` 目录、`package.json` 或 `src` 目录。因此，我为 Cloudflare-first 前端准备了这个实施移交，并且没有在批准的存储库之外发明或构建虚假应用程序。

所需的上游合同可用并如下：
- `/root/projects/palcalculator/artifacts/design.md`
- `/root/projects/palcalculator/artifacts/data-contract.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/copy.md`
- `/root/projects/palcalculator/artifacts/pricing.md`
- `/root/projects/palcalculator/artifacts/compliance.md`

存储库可用性证据：

```text
pwd: /root/.hermes/kanban/boards/palcalculator/workspaces/t_eda7a4a7
/root/projects/palcalculator/.git: missing
/root/projects/palcalculator/package.json: missing
/root/projects/palcalculator/src: missing
```

上游后端/数据切换还指出 `/root/projects/palcalculator` 仅包含规划工件，并且真正的前端/后端实现被阻止，直到 repo/worktree 和经过验证的数据源可用。

## 2. Cloudflare-first 前端推荐

使用静态优先的 Cloudflare Pages 应用程序。回购可用后的首选堆栈：

- 框架：Astro、Next.js 静态导出或 Vite/React 静态构建。如果不存在偏好，请使用 Astro 或 Vite/React 作为轻量级计算器中心。
- 托管：Cloudflare 页面。
- 数据：`/public/data/` 中的版本化静态 JSON 或等效的不可变资产路径。
- 计算：P0 计算器的客户端纯函数。
- Workers：仅当路由求解基准证明客户端求解太慢或添加了批准的短链接存储时才可选。
- 存储：MVP 中没有服务器端拥有的 Pal 列表、保存文件或原始路由请求存储。
- 分析：仅限分桶事件；没有原始拥有的 Pal/保存内容。

数据合约中推荐的静态数据布局：

```text
/public/data/version.json
/public/data/pals.latest.json
/public/data/breeding-pairs.latest.json
/public/data/special-combos.latest.json
/public/data/passives.latest.json
/public/data/stat-formulas.latest.json
/public/data/aliases.latest.json
/public/data/schema-version.json
```

为了缓存安全，稍后应该支持不可变的构建路径：

```text
/data/builds/{datasetVersion}/version.json
/data/builds/{datasetVersion}/pals.json
/data/builds/{datasetVersion}/breeding-pairs.json
/data/builds/{datasetVersion}/special-combos.json
/data/builds/{datasetVersion}/passives.json
/data/builds/{datasetVersion}/stat-formulas.json
```

## 3. 路线实施清单

使用尾部斜杠规范实现这些 P0 路由。 `{CANONICAL_ORIGIN}` 仍在等待所有者/域确认。

|路线 |组件|关键要求|
|---|---|---|
| `/` | `CalculatorHub` | H1：`PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators`；工具选择器和目标 Pal 条目位于折叠上方。 |
| `/breeding-calculator/` | `BreedingCalculator` |配对儿童和目标父母模式、自动完成、结果卡/表格、特殊组合标记、复制/共享。 |
| `/breeding-route-calculator/` | `RouteSolver` |拥有的好友 + 目标好友 -> 最短路线、缺失的好友、替代方案、约束、复制/共享。这是旗舰产品的差异化优势。 |
| `/iv-calculator/` | `IvCalculator` |朋友，水平，观察到的生命值/攻击/防御，修正值，IV 频段和警告。 |
| `/stats-calculator/` | `StatsCalculator` |使用经过验证的公式合约进行统计计算；可见的警告。 |
| `/passive-skill-calculator/` | `PassivePlanner` |如果完全注明，P0 外壳可接受；避免不受支持的确定性/被动赔率主张。 |
| `/palworld-1-0-breeding-calculator/` | `BreedingCalculator` |重复使用具有 1.0 特定标题/H1/副本/规范的育种组件。 |
| `/data-sources/` | `DataSourcesPage` |数据集版本、上次更新、源类别、不支持的域、公式假设、修正路径。 || `/privacy/` | `LegalPage` |分析、本地存储、共享状态、Cloudflare 托管披露。 |
| `/terms/` | `LegalPage` |非官方粉丝网站条款和免责声明。 |

在数据质量和唯一副本准备就绪之前，请勿发送 P1 编程路由，例如 `/breed/{pal-slug}/`、`/iv/{pal-slug}/` 或 `/stats/{pal-slug}/`。 `/share/{result-id}/` 应默认为 `noindex, follow`。

## 4.设计实施清单

设计实施方向：

- 视觉风格：干净的现场指南计算器工作区。
- 语气：乐于助人、透明、警告、粉丝制作。
- 请勿使用官方 Palworld 徽标、角色艺术、屏幕截图、精灵、提取的图标、官方 UI 框架或官方风格的商业外观。
- 在每个 P0 工具路线上将计算器 UI 保持在 SEO 主体副本上方。
- 使数据版本、上次更新日期、公式警告和源链接在输入/结果附近保持不变。
- 全站页脚必须包含粉丝制作的非官方免责声明以及数据源、隐私、条款和联系方式的链接（仅在稍后获得批准的情况下）。

核心代币：

```css
:root {
  --color-bg: #F7F4EA;
  --color-ink: #17212B;
  --color-action: #2A9D8F;
  --color-warn: #B7791F;
  --color-error: #C2413A;
  --color-muted: #687684;
  --color-card: #FFFDF7;
  --color-line: #D8D0C2;
  --container-max: 1180px;
  --content-max: 760px;
  --tool-max: 1040px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --border: 1px solid #D8D0C2;
  --shadow-card: 0 10px 30px rgba(23, 33, 43, 0.08);
  --shadow-focus: 0 0 0 3px rgba(42, 157, 143, 0.28);
}
```

版式：

```css
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
  color: var(--color-ink);
  background: var(--color-bg);
}
```

组件系统创建：

- `AppShell` 带有全球导航和页脚免责声明。
- `CalculatorShell` 所有工具页面的共享布局。
- `DataVersionBadge` 带有工具提示并链接到 `/data-sources/`。
- `CaveatPanel` 用于公式/源/不支持状态的警告。
- `ToolPicker` 用于主页和跨工具导航。
- `PalAutocomplete` 使用别名和经过验证的数据。
- `ResultCard` /响应式桌卡混合。
- `RouteTimeline` 路由步骤的签名组件。
- `CopyShareButton` 具有无索引/规范安全状态处理。
- `EmptyState`、`InvalidPalState`、`NoResultState`、`UnsupportedState`、`LoadingState`、`LongSolveState`。
- `SeoContentSection` 和 `FaqBlock` 具有架构一致性。

响应式要求：

- 移动表单控件堆叠清晰。
- 结果变成卡片而不是宽桌子。
- 触摸目标应至少为 44 像素。
- 避免水平滚动。
- 粘性底部操作仅适用于主要计算/复制操作，不适用于广告。

## 5. 文案、定价和免责声明要求

主要公众定位：

> PalCalculator 是一个非官方的粉丝制作的 Palworld 1.0 计算器中心，用于繁殖路线、IV/统计检查、被动规划和拥有的 Pal 优化。

主要 CTA：

> 从目标伙伴开始

二级 CTA：

- 计算育种
- 找到最短路线
- 检查静脉注射
- 计算统计数据
- 计划被动
- 查看数据源

定价/货币化可见要求：

> 普通玩家免费使用，地址为 MVP。 P0 计算器无需登录或付款。

除非所有者批准以后的范围更改，否则请勿在 MVP 添加定价表、付费计划价格、结账按钮、广告、联属模块或帐户控制副本。

必需的页脚/全站免责声明：

> PalCalculator 是一款非官方的粉丝制作工具，不隶属于 Pocketpair 或 Palworld 团队，也不受其认可、赞助或批准。 Palworld 和相关名称是其各自所有者的商标或财产。

内联简短版本：

> 非官方粉丝制作的 Palworld 工具。结果取决于所选的数据版本。避免诸如官方、认可、批准、合作、保证、始终正确、100%准确、完美 IV、精确被动赔率、确定性被动继承、即时更新、完整数据库、永久免费、无跟踪、匿名或安全上传等产品声明。

## 6.数据与计算器整合方案

在经过验证的 Palworld 生产数据存在之前，前端计算器必须显示阻止/不可用/警告状态而不是虚假结果。

工具的最低行为：

### 育种计算器

输入：
- 父 A 自动完成
- 父B自动完成
- 目标子自动完成
- 模式切换：配对到孩子/目标到父母

结果：
- 父母_a
- 父母_b
- 孩子
- 组合类型：正常 |特别|不可用
- 数据版本
- 注意事项

国家：
- 空：仅在经过验证的数据支持时才显示示例模式，例如 Lamball + Cattiva，否则标记为仅示例。
- 无效的朋友：建议最接近的名字。
- 无结果：解释数据限制并链接数据源。

### 路径求解器

输入：
- 目标好友自动完成
- 拥有的朋友选择器或粘贴文本区域
- 限制：最大世代、排除好友、特殊组合切换

结果：
- 目标伙伴
- 拥有的朋友
- 几代人
- 有序步骤：parent_a、parent_b、child
- 失踪的朋友
- 替代方案
- 限制条件
- 数据版本
- 仅用于分析的持续时间段

国家：
- 空拥有列表：仅当存在经过验证的数据时才显示一般路线指南。
- 已拥有的目标：成功状态表明无需繁殖。
- 无路线：解释约束问题并建议放宽过滤器。
- 长解决：加载/进度状态。

### IV/统计计算器

输入：
- 朋友自动完成
- 等级
- 观察生命值/攻击力/防御力
- 修饰符：灵魂、聚光星、被动/信任（如果支持）

结果：
- IV 范围和统计范围
- 公式假设
- 四舍五入/修饰符/不确定公式的注意事项

### 被动计划者

如果不支持完整规划器，P0 可以是 shell，但它必须解释 RNG 和不支持的数据限制，并避免有保证的继承声明。

## 7. SEO 和元数据实现清单

对于每条可索引路线：

- 标题和H1必须包含Palworld，而不仅仅是`palcalculator`。
- Canonical URL 使用尾部斜杠。
- 计算器 UI 显示在 SEO 副本上方。
- 数据版本和警告链接可见。
- 页脚包含免责声明/法律链接。
- FAQ 架构必须与可见的 FAQ 副本匹配。
- 站点地图仅包含可索引的规范路线。
- `/share/*` 和查询状态结果页面默认为 `noindex, follow` 并规范化为基本工具路由。
- 在独特的内容/数据质量准备好之前，不要发出薄的编程页面。

存储库存在后建议的元数据结构：

```ts
const routes = [
  { path: '/', title: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', h1: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators' },
  { path: '/breeding-calculator/', title: 'Palworld Breeding Calculator', h1: 'Palworld Breeding Calculator' },
  { path: '/breeding-route-calculator/', title: 'Palworld Breeding Route Calculator', h1: 'Palworld Breeding Route Calculator' },
  { path: '/iv-calculator/', title: 'Palworld IV Calculator', h1: 'Palworld IV Calculator' },
  { path: '/stats-calculator/', title: 'Palworld Stats Calculator', h1: 'Palworld Stats Calculator' },
  { path: '/passive-skill-calculator/', title: 'Palworld Passive Skill Calculator', h1: 'Palworld Passive Skill Calculator' },
  { path: '/palworld-1-0-breeding-calculator/', title: 'Palworld 1.0 Breeding Calculator', h1: 'Palworld 1.0 Breeding Calculator' },
  { path: '/data-sources/', title: 'PalCalculator Data Sources & Update Policy', h1: 'PalCalculator Data Sources & Update Policy' },
  { path: '/privacy/', title: 'Privacy Policy', h1: 'Privacy Policy' },
  { path: '/terms/', title: 'Terms of Use', h1: 'Terms of Use' },
];
```

## 8. 仓库存在后构建/lint/测试计划

最小验证命令应适应实际堆栈，但接受门应包括：

```bash
npm install
npm run lint
npm run typecheck
npm run test -- --run
npm run build
npm run preview
```

手动烟雾检查：

- 所有 P0 路由在本地返回 200。
- 内部导航链接不指向 `#` 或缺少的路线。
- 计算器控件在桌面和移动设备宽度上折叠上方可见。
- 定价/免费/无需登录消息可见。- 页脚免责声明在每条路线上均可见。
- 数据版本徽章/警告链接在每个工具路径上都可见。
- 无效/缺失/不可用状态在 UI 中可见，而不仅仅是控制台。
- 移动视口没有水平溢出。
- 站点地图/机器人/规范/元/架构是一致的。

## 9. 阻碍因素和未清项目

此阶段的 P0 阻断剂：

- 没有可用于实际实施的存储库/工作树/包清单。

公开发布前的 P0 拦截器：

- 已验证的生产 Palworld 数据集源、版本、上次更新日期和更新工作流程仍待处理。
- 最终规范来源/域名正在等待确定。
- 在分析、共享 URL 或导入功能上线之前，隐私/条款/数据源页面必须存在。
- 分析提供商和保留期限待定。
- 合法运营​​商/联系电子邮件正在等待处理。

非阻塞但重要的 P1/P2 决策：

- 浏览器本地导入是否在 MVP 或 P1 中提供。
- 基准测试后，路线求解器是否仍然纯粹是客户端。
- 后来的支持者/候补名单副本是否出现在工具页面下方。

## 10. 建议的下一步行动

下一个推荐的代理/行动：

1. 存储库/安装程序所有者应在 `/root/projects/palcalculator` 下为 PalCalculator 创建或附加应用程序存储库/工作树，或提供正确的存储库路径。
2. 后端/数据实施者应提供经过验证的静态 JSON 数据文件或明确标记的占位符文件，以使计算器在验证之前不可用。
3. frontend_bot 然后可以实现上面的路由/组件并运行本地 lint/build/smokeevidence。
4. QA_bot 应在实施后运行路由、移动、SEO、免责声明和错误状态检查。

## 11. 验收门状态

前端门状态：BLOCKED。

- 路由渲染：不可测试，因为不存在存储库/应用程序。
- 复制/设计/数据合同已实施：已准备好移交，没有回购协议就无法实施代码。
- 定价/免责声明可见：在本报告中指定，如果没有回购协议则无法实施。
- 本地构建/lint 证据：不可用，因为不存在 `package.json` 或应用程序源。

最终状态：[BLOCKED]
