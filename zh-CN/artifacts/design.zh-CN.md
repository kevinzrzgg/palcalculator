# PalCalculator 设计源代码和前端切换 v1

项目：pal计算器
阶段：06-设计
市场：美国/英语
状态：[DONE]
日期：2026-07-16
所有者简介：design_bot
主要输入：
- /root/projects/palcalculator/artifacts/prd.md
- /root/projects/palcalculator/artifacts/route-contract.md
- /root/projects/palcalculator/artifacts/compliance.md
- /root/projects/palcalculator/artifacts/copy.md

## 1.设计源码结论

PalCalculator 应该作为文本/数据优先的 Palworld 计算器中心启动，具有路线规划工作站的感觉：首屏快速控件、紧凑的结果面板、可见的数据版本/警告芯片以及原始抽象路线/鸡蛋/节点视觉效果，而不是官方 Palworld 艺术。

设计决策：
- 构建实用的游戏玩家实用程序 UI，而不是通用的 AI SaaS 登陆页面。
- 使用计算器卡、路线图、紧凑表格、状态芯片和源/警告面板作为核心视觉语言。
- 将 SEO 副本保留在计算器 UI 下方，并且切勿让装饰部分将工具推到折叠下方。
- 请勿使用官方 Palworld 徽标、角色艺术、屏幕截图、精灵、提取的图标或官方风格的商业外观。

主要设计承诺：
> 从目标伙伴开始，选择计算器任务，然后在不离开流程的情况下查看下一条路线、警告或相关工具。

## 2. 视觉风格原理

### 选项 A — 通用 AI SaaS 梯度仪表板

说明：
- 白页、紫色/蓝色渐变、抽象发光卡、跨风格排版、大中心英雄、三张功能卡。

优点：
- 易于实施。
- 熟悉的转换模式。

缺点：
- 太接近通用 AI SaaS 视觉语言。
- 不传达游戏实用程序或数据信任。
- 将计算器 UI 隐藏在营销英雄文案背后的风险。
- 违反了项目需要避免默认的 SaaS 外观。

决定：REJECTED。

### 选项 B — 黑暗玩家 wiki / cyber HUD

说明：
- 近乎黑色的背景，霓虹灯口音，游戏般的面板，密集的统计卡，发光的边框。

优点：
- 适合游戏受众。
- 使数据面板和路线图感觉自然。

缺点：
- 深色主题会降低长 SEO/legal 副本的可读性。
- 如果霓虹灯造型与游戏用户界面类似，就会让人感觉不正式，这是有风险的。
- 对比度、焦点状态和表格可读性的可访问性负担更高。

决策：NOT FOR MVP DEFAULT。可以激发紧凑的节点/路线主题，但不是完整的主题。

### 选项 C — 清理现场指南计算器工作区

说明：
- 暖光背景、石板文本、青色实用强调、琥珀色结果/动作突出显示、圆形但不过分柔和的卡片、原始线条图标、路线节点、蛋/分支图。

优点：
- 文本/数据优先且安全合规。
- 可在移动设备和桌面设备上阅读。
- 对初学者友好，同时对高级用户仍然有用。
- 让计算器 UI、结果表和注意事项主导装饰艺术。
- 适用于长期冻结的 SEO 内容和合法副本。

缺点：
- 需要仔细的成分密度，以免变得平淡无奇。
- 需要原有的小图标系统以避免资产依赖。

决定：SELECTED。

最终视觉方向：- “干净的现场指南计算器工作区”：实用性优先、轻松有趣、路线优先。
- 抽象主题：路线、分支路径、鸡蛋、数据库/版本标签、统计栏、无源芯片。
- 语气：乐于助人、透明、警告、粉丝制作。

## 3. 品牌和视觉原则

1.先用计算器
   - 用户必须在每个 P0 工具页面的首屏上方看到可用的计算器入口点。
   - 英雄副本较短；控件出现在故事​​讲述之前。

2. 路由优先区分
   - 主页和路线页面应在视觉上强调从拥有的好友到目标好友的寻路。
   - 使用路线节点和步骤列表作为签名设计元素。

3.信任是看得见的
   - 数据版本、上次更新、公式警告和源链接在输入/结果附近持续存在。
   - 法律/页脚免责声明存在于整个网站中。

4. 文本/数据优先的IP安全
   - 没有官方游戏艺术/徽标/屏幕截图/精灵/提取的资产。
   - 仅使用原始图标和通用轮廓。

5. 移动优先密度
   - 表单在移动设备上清晰堆叠。
   - 结果变成卡片而不是宽桌子。
   - 粘性底部操作只能用于主要计算/复制操作，不能用于广告。

## 4. 设计代币

### 4.1 色彩系统

最多使用三种核心颜色，遵循 60/30/10 规则。

60% 主要/背景：
- 标记：--color-bg
- 值：#F7F4EA
- 使用：页面背景、大空白、SEO/合法内容区域。
- 理由：温暖的现场引导纸色调；比纯白色更柔和并且对游戏安全。

30% 二级/结构：
- 标记：--color-ink
- 值：#17212B
- 使用：正文、标题、导航、卡片边框（强时）、路线对比。
- 理由：高可读性和接地气的实用感。

10% 重音/动作：
- 标记：--颜色动作
- 值：#2A9D8F
- 使用：主要 CTA、活动选项卡、选定的路线节点、成功/结果突出显示、焦点环。
- 理由：青色表示计算/确认，而不像通用人工智能紫色。

小语义扩展，而不是品牌颜色：
- --color-warn: #B7791F 警告、丢失数据、不受支持的状态。
- --color-error: #C2413A 无效输入和不可能的统计数据。
- --color-muted: #687684 用于辅助文本。
- --color-card: #FFFDF7 用于卡片/表格。
- --color-line: #D8D0C2 用于边框/分隔线。

无障碍要求：
- 背景正文：#17212B on #F7F4EA。
- 操作文本/按钮必须通过 WCAG AA；当需要对比度时，在#227C73 上使用白色文本。
- 切勿单独使用颜色来表示稀有、警告、无效或不受支持的状态；与图标/​​文本配对。

### 4.2 版式

主要字体堆栈：
- 字体系列：“微软雅黑”、“微软雅黑”、Arial、sans-serif；

如果前端想要更多本机 Web 渲染，则使用英语后备选项：
- 字体系列：system-ui、-apple-system、BlinkMacSystemFont、“Segoe UI”、“微软雅黑”、Arial、sans-serif；

类型规模：
- Hero H1桌面：48px / 1.08 / 700
- Hero H1 手机：34px / 1.12 / 700
- H1页面桌面：40px / 1.12 / 700
- H2：28像素/1.2/700
- H3/卡片标题：20px / 1.25 / 700
- 身体：16px / 1.65 / 400
- 小/元：13px / 1.45 / 500
- 按钮：15px / 1 / 700
- 表/结果编号：20px / 1.2 / 700

### 4.3 间距基础间距单位：4px。
- --space-1: 4px
- --space-2: 8px
- --space-3: 12px
- --space-4: 16px
- --space-5: 20px
- --space-6: 24px
- --space-8: 32px
- --space-10: 40px
- --space-12: 48px
- --space-16: 64px

布局宽度：
- --容器最大：1180px
- --content-max: 760px 对于 SEO/法律散文
- --tool-max：计算器工作区为 1040px

### 4.4 半径、阴影、边框

- --radius-sm：输入/芯片8px。
- --radius-md：卡片的 14px。
- --radius-lg：英雄/工具工作空间为 22px。
- --边框：1px实线#D8D0C2。
- --shadow-card: 0 10px 30px rgba(23, 33, 43, 0.08)。
- --阴影焦点：0 0 0 3px rgba(42, 157, 143, 0.28)。

谨慎使用阴影。默认边框+背景；阴影仅适用于主计算器外壳、活动结果和模态/弹出窗口叠加层。

### 4.5 图标和插图风格

允许：
- 原始线路图标：计算器、路线节点、鸡蛋、统计栏、数据库圆柱体、屏蔽/警告、复制/共享。
- 简单的几何 Pal 占位符剪影仅适用于原创和通用。
- 使用圆圈、标签、连接线的路线图。

不允许：
- Palworld 官方标志。
- 官方角色、好友、屏幕截图、精灵、提取的项目图标、UI 框架或复制的艺术品。
- 暗示官方产品所有权的视觉风格。

## 5.信息架构

### 5.1 全局导航

桌面导航：
- 标志/文字标记：PalCalculator
- 育种
- 路线
- 四号
- 统计数据
- 被动
- 数据来源
- 紧凑徽章：非官方粉丝制作

手机导航：
- 标题：PalCalculator 文字标记 + 菜单按钮。
- 菜单抽屉链接：育种、路线、IV、统计、被动、数据源、隐私、条款。
- 保持主 CTA 在页面英雄/工具中可见，而不是在拥挤的导航中。

页脚：
- 简短的免责声明：“PalCalculator 是一款非官方的粉丝制作工具，不隶属于 Pocketpair 或 Palworld 团队，也不由其认可、赞助或批准。Palworld 和相关名称是其各自所有者的商标或财产。”
- 链接：数据源、隐私、条款、联系方式（如果稍后批准）。
- 数据版本链接。

### 5.2 路线 IA

P0航线：
- / — 计算器中心和工具选择器。
- /breeding-calculator/ — 父母与孩子配对并以父母为目标。
- /breeding-route-calculator/ — 旗舰路线求解器。
- /iv-calculator/ — IV 范围估计器。
- /stats-calculator/ — 预期统计范围。
- /passive-skill-calculator/ — 带有 RNG 警告的被动规划。
- /palworld-1-0-breeding-calculator/ — 1.0 重点育种计算器变体。
- /data-sources/ — 数据/版本/源/更新策略。
- /privacy/ — 隐私政策外壳在生产前需要所有者详细信息。
- /terms/ — 使用条款外壳要求在生产前进行所有者/法律审查。

P1 路线仍处于设计准备状态，但在 MVP 上未进行视觉优先级处理：
- /breed/{pal-slug}/
- /iv/{pal-slug}/
- /stats/{pal-slug}/
- /best-passives/{pal-slug}/
- /share/{result-id}/ 默认情况下没有索引。

## 6. 页面蓝图和线框图

### 6.1 所有工具页面共享页面结构

桌面顺序：
1. 标题/导航。
2.紧凑信任眉：非官方同人制作Palworld 1.0计算器·数据：{DATA_VERSION}·更新{LAST_UPDATED}
3. 复制冻结中的 H1 和副标题。4. 折叠上方的主要计算器外壳。
5. 输入或结果标题下的数据版本/警告行。
6. 结果面板。
7.相关计算器操作。
8. SEO 复制冻结的 H2 部分。
9. 如果发出 FAQ 模式，则可见 FAQ。
10. 带有免责声明/法律链接的页脚。

手机下单：
1. 标题。
2.信任眉毛和H1。
3. 工具选项卡/模式开关。
4. 计算器输入。
5. 仅在用户输入数据后才进行粘性计算/共享操作。
6. 结果卡。
7. 警告/源手风琴。
8.相关行动。
9. SEO 部分/FAQ。
10.页脚。

共享桌面线框图：

```
+--------------------------------------------------------------------------------+
| Header: PalCalculator | Breeding | Route | IV | Stats | Passives | Data Sources |
+--------------------------------------------------------------------------------+
| Eyebrow: Unofficial fan-made Palworld 1.0 calculator · Data: v...               |
| H1: [route-specific H1]                                                         |
| Subhead: [copy freeze subhead]                                                  |
|                                                                                |
| +--------------------------- Calculator Shell --------------------------------+ |
| | Mode tabs / task selector                                                    | |
| | +-------------------- inputs --------------------+ +---- trust/caveat ----+ | |
| | | labels, autocomplete, filters, data version    | | Data badge, source   | | |
| | | primary button + secondary action              | | formula caveats     | | |
| | +------------------------------------------------+ +----------------------+ | |
| | +---------------------------- result area -------------------------------+ | |
| | | empty/loading/success/no-result/invalid state                           | | |
| | +-----------------------------------------------------------------------+ | |
| +----------------------------------------------------------------------------+ |
| Related tools                                                                  |
| SEO sections / FAQ                                                             |
| Footer disclaimer and legal links                                              |
+--------------------------------------------------------------------------------+
```

共享移动线框图：

```
+--------------------------------+
| PalCalculator            Menu  |
+--------------------------------+
| Unofficial · Data v...         |
| H1                             |
| Short subhead                  |
| [Mode tabs scroll if needed]   |
| +----------------------------+ |
| | Input label                | |
| | Autocomplete/input         | |
| | Filters                    | |
| | Primary CTA                | |
| +----------------------------+ |
| [Data/caveat accordion]        |
| [Result card stack]            |
| [Copy / Share / Related action]|
| [SEO H2 sections]              |
| [FAQ accordion]                |
| [Footer]                       |
+--------------------------------+
```

### 6.2 主页 `/`

设计意图：
- 将广泛的“Palworld 计算器”用户转换为特定的工具任务。
- 签名组件：带有工具卡的目标优先集线器。

桌面布局：
- 两列英雄：
  - 左：H1、副标题、信任线、目标 Pal 输入。
  - 右：路线预览卡显示目标伙伴 -> 繁殖 -> 路线 -> IV/统计 -> 被动。
- 英雄下方的工具选择卡：育种、路线、IV、统计、被动。
- 数据信任条：数据版本、来源策略、无需登录、粉丝自制。
- SEO 下面的 H2 部分。

桌面主页线框图：

```
[Header]
[Hero grid]
  Left:
    Eyebrow: Unofficial fan-made Palworld 1.0 calculator hub
    H1: PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators
    Subhead
    + Target Pal autocomplete -------------------------------------+
    | Type a Pal name to start. Example: Anubis, Jetragon, Orserk |
    | [Start with a target Pal] [Choose a calculator]              |
    +--------------------------------------------------------------+
    Trust: Free MVP tools · No login required · Data-version notes
  Right:
    Route preview card with node diagram
[Tool cards: Breeding | Route | IV | Stats | Passives]
[Data trust strip]
[SEO sections]
[FAQ]
[Footer]
```

移动布局：
- 首先输入H1和目标Pal。
- 工具卡变成带有一行解释的垂直任务列表。
- 路线预览变成简单的水平滚动节点卡，或者如果空间紧张，则隐藏在工具列表之后。

关键部件：
- 计算器中心
- Pal自动完成
- 工具选择卡
- 数据版本徽章
- 信任条

### 6.3 育种计算器 `/breeding-calculator/`

设计意图：
- 明确两种模式：与孩子配对和针对父母。
- 保持特殊组合和路线链接的可见性。

桌面布局：
- H1 和精简版。
- 带模式选项卡的主外壳。
- 配对模式：亲友A，亲友B，包括特殊组合，数据版本，计算育种。
- 目标模式：目标子伙伴、过滤器、查找父对。
- 结果：子卡或父对表。
- 每个结果行包括路线链接和复制结果。

线框：

```
[H1: Palworld Breeding Calculator]
[Shell]
  Tabs: Pair to child | Target to parents
  Pair mode:
    [Parent Pal A autocomplete] [Parent Pal B autocomplete]
    [Include special combos toggle] [Data version select/badge]
    [Calculate breeding]
  Result success:
    Child Pal card
    Combo type chip: normal/special
    Caveat line
    [Open breeding route] [Copy this result] [Share]
  Target mode result:
    Parent pair table: Parent A | Parent B | Combo type | Caveat | Route
```

手机：
- 选项卡全宽。
- 输入堆叠。
- 家长对结果以卡片形式呈现，而不是表格形式。

### 6.4 繁殖路线计算器 `/breeding-route-calculator/`

设计意图：
- 这是旗舰页面；让路线解决感觉像是核心产品。
- 在桌面上并排显示拥有的 Pal 输入和目标输入。

桌面布局：
顶壳分裂：
  - 左面板：目标好友、拥有的好友、粘贴拥有的好友列表、约束。
  - 右面板：路线预览/结果。
- 结果成功包括路线节点和步骤表。
- 失踪的伙伴和替代品显示为辅助卡。

线框：

```
[H1: Palworld Breeding Route Calculator]
[Shell: two-column]
  Left controls:
    [Target Pal]
    [Owned Pals selector]
    [Paste owned Pal list textarea]
    [Max generations] [Exclude Pals] [Include special combos]
    [Find shortest route]
  Right result:
    Empty: Try with example Pals
    Loading: Searching route options...
    Success:
      Route found · 3 generations · Data v...
      Node diagram: Owned A + Owned B -> Child -> Target
      Step cards/table
      Missing Pals
      Alternative routes
      [Copy route] [Share route]
```

手机：
- 首先控制。
- 路线结果使用垂直时间线卡。
- 步骤卡：一代、父母 A、父母 B、儿童、警告。
- 丢失的 Pals 芯片包裹在结果标题下。

标志性视觉组件：
- RouteTimeline：由 #2A9D8F 粗线连接的圆圈用于当前路线，#D8D0C2 用于替代路线。

### 6.5 IV 计算器 `/iv-calculator/`

设计意图：
- 让不确定性/范围让人感觉有意且值得信赖。

桌面布局：
- 左侧表格：好友、等级、观察到的统计数据、修饰符。- 结果右侧：生命值、攻击力、防御力的三个统计范围栏。
- 结果下的公式警告面板。

线框：

```
[Inputs]
  Pal | Level
  Observed HP | Attack | Defense
  Souls / enhancements | Condenser stars | Passive modifiers
  [Check IV ranges]
[Result]
  HP IV range: [---- range bar ----]
  Attack IV range: [---- range bar ----]
  Defense IV range: [---- range bar ----]
  Confidence note
  Formula version
  [See formula caveats]
```

手机：
- 数字输入使用大触摸目标。
- 结果栏垂直堆叠。
- 不可能的统计验证位于字段下方。

### 6.6 统计计算器 `/stats-calculator/`

设计意图：
- 与 IV 类似，但专注于预期的统计输出。

桌面布局：
- 左侧输入：Pal、级别、IV 输入、修改器、数据版本。
- 结果右侧：预期生命值、攻击、防御卡、统计带图表。
- 相关行动：添加IV输入/开放繁殖路线。

手机：
- 1 列堆栈中的统计卡。
- 可折叠部分内的可选 IV 输入。

### 6.7 被动技能计算器 `/passive-skill-calculator/`

设计意图：
- 使警告不容错过；绝不意味着确定性继承。

桌面布局：
- 目标好友自动完成。
- 所需的被动技能可以通过选定的筹码进行多选。
- 可选拥有的父母字段。
- 结果：候选父级/路由注释、不支持的标志、RNG 警告、下一步操作。

线框：

```
[Target Pal]
[Desired passive skills multi-select]
[Optional owned parents]
[Plan passive route]
[Result]
  Candidate notes
  Desired passives chips
  Unsupported flags
  RNG caveat panel
  Next action: Open breeding route
```

手机：
- 无源芯片是可选择的药丸按钮。
- 如果选择了太多被动，则显示内联警告并解释限制。

### 6.8 Palworld 1.0 繁殖计算器 `/palworld-1-0-breeding-calculator/`

设计意图：
- 重用 BreedingCalculator 组件，但强调新鲜度/更新说明。

与 `/breeding-calculator/` 的区别：
- 数据/版本面板更大，并立即出现在英雄下方。
- CTA：使用1.0计算器。
- 如果后端/数据提供内容，请添加“更改/不支持的内容”警告链接。

### 6.9 数据来源 `/data-sources/`

设计意图：
- 信任具有可扫描源块的文档。

桌面布局：
- H1 和简介。
- 当前数据版本汇总表。
- 来源类别卡。
- 包含/不支持的两列列表。
- 公式假设。
- 修正路径。
- 更新政策。

手机：
- 版本摘要卡堆栈。
- 表格成为定义列表。

除非所有者批准，否则请勿发布未解决的生产占位符：
- 数据集版本。
- 最后更新日期。
- 公式版本。
- 联系/修正路径。

### 6.10 隐私 `/privacy/` 和条款 `/terms/`

设计意图：
- 简单的法律页面，可读，没有分散注意力的游戏样式。

布局：
- 窄散文宽度：760px。
- 顶部的摘要框显示要点。
- 带有锚链接的章节标题。
- 页脚链接。

生产警告：
- 启动前必须更换所有者/实体、联系电子邮件、分析提供商、保留期和最终域名占位符。

## 7. 组件系统

### 7.1 标题

道具：
- 当前路线
- 数据版本可选
- 导航链接

国家：
- 默认桌面
- 手机崩溃了
- 移动式开放式抽屉
- 主动路线

辅助功能：
- 菜单按钮具有 aria-expand 和 aria-controls。
- 活动链接使用 aria-current="page"。

### 7.2 数据版本徽章

内容：
- “数据：Palworld {版本}·更新{LAST_UPDATED}”
- 链接：“查看数据源和注意事项”
- 复制冻结的工具提示文本。

国家：
- 当前
- 待定/未设置：“数据版本待定 - 在设置源和更新日期之前不要发布。”
- 如果后端提供标志，则已过时/警告。

### 7.3 计算器外壳

道具：
- 标题
- 模式选项卡
- 输入区域
- 结果区域- 警告槽
- 相关行动

视觉效果：
- 卡片背景#FFFDF7。
- 边框#D8D0C2。
- 半径 22 像素。
- 桌面内边距 28-32px；移动设备内边距 16px。

### 7.4 Pal自动完成

要求：
- 标签始终可见。
- 占位符示例：Anubis、Jetragon、Orserk。
- 如果数据支持，则显示带有别名的建议。
- 无效状态建议最接近的名称。
- 键盘可导航。

国家：
- 空
- 专注
- 建议开放
- 已选择
- 无效/不匹配
- 已禁用/数据不可用

### 7.5 模式选项卡

使用者：
- 育种计算器配对/目标模式。
- 如果前端使用选项卡作为主页，则工具选择器。

要求：
- 按钮语义或选项卡语义。
- 允许移动水平滚动，但活动选项卡必须完全可见。

### 7.6 结果面板

共享结果指出：
- 空
- 加载
- 成功
- 没有结果
- 无效输入
- 数据不可用
- 部分/警告

始终包括：
- 数据版本
- 警告线
- 相关的复制/分享操作
- 相关下一步

### 7.7 路线时间线

使用者：
- 路线求解器。
- 主页视觉预览。
- 育种结果路线链接预览。

要素：
- 路线步骤节点
- 父对连接器
- 子节点
- 缺少 Pal 芯片
- 代数
- 替代路线切换

国家：
- 空/示例
- 加载/进度
- 成功之路
- 没有路线
- 已拥有的目标
- 可用的替代方案

### 7.8 统计范围栏

使用者：
- IV 计算器。
- 统计计算器。

视觉效果：
- 带有最小/最大标签的水平范围栏。
- 数值/范围文本从不隐藏。
- 警告状态使用图标+文本，而不是单独的颜色。

### 7.9 警告标注

类型：
- 数据
- 公式
- 隐私
- RNG/被动
- 不支持
- 法律/粉丝网站

内容规则：
- 使用 copy.md 中的安全副本。
- 切勿仅将警告隐藏在工具提示后面；显示简短的可见文本和链接。

### 7.10 工具选择卡

由主页和相关工具使用。

领域：
- 工具名称
- 一行任务
- 主要行动
- 路线链接
- 图标

视觉效果：
- 带有图标、任务和箭头的卡片。
- 活动/主路由卡具有微妙的 #2A9D8F 边框。

## 8. 状态设计矩阵

### 8.1 共享状态要求

|状态|视觉图案|复制来源|前端行为 |
|---|---|---|---|
|空 |带有示例输入的轻型占位卡 | copy.md 空状态 |不要禁用页面；显示示例 |
|正在加载 |受控制的内联骨架/结果旋转器 | “正在检查当前数据集...”|不要屏蔽整页|
|长解决|结果区域中的进度条 | “搜索路线选项。拥有的大型好友列表可能需要更长的时间。” |显示路线是否解决 >500ms |
|成功|带有数据徽章和操作的结果卡/表格 |特定于路线的结果标签 |显示复制/共享及相关工具 |
|没有结果 |警告标注+建议| “没有找到结果...” |建议拼写/过滤器/来源注释 |
|输入无效 |字段 | 下的内联错误“我们无法匹配...” |焦点无效字段；无需重新加载页面 |
|数据不可用 |琥珀色不受支持的标注 | “此计算器没有足够的验证数据......” |请勿捏造结果 |
|部分/警告 |成功加警告芯片/面板|特定于工具的警告|区分部分和失败||目标已拥有 |成功/信息卡 | PRD 路径求解器边缘情况 |提供 IV/统计/被动下一步行动 |
|不支持的被动组合 |不支持的标志 + 下一步操作 |被动警告副本 |提供路线/数据源链接 |
|分享警告 |分享操作附近的隐私标注 |分享 URL 复制 |警告 URL 可以包含选定状态 |

### 8.2 错误严重性标记

- 信息：数据/版本/一般警告。
- 警告：数据缺失、IV 范围宽、没有受约束的路线。
- 错误：无效的 Pal、不可能的统计值、不支持的路线计算失败。
- 法律/隐私：分享URL/私人状态，粉丝制作的免责声明。

## 9. 内容适合矩阵

|路线 |首屏内容 |计算器 UI 放置 | SEO/正文内容处理 | FAQ/架构适合 |警告/信托安置 |
|---|---|---|---|---|---|
| `/` |眉毛、H1、副标题、目标输入、信任线 |英雄离开，立即可见 |工具选择器下方的 H2 部分；允许 700-1,000 字 | SEO 部分之后的 FAQ |工具卡和页脚下方的信任条 |
| `/breeding-calculator/` | H1、短副标题、模式选项卡 |折叠第一张主卡 | H2 复制以下结果；配对/目标示例可以作为旁注 | FAQ H2 复制后可见 | shell 内的数据徽章和结果 |
| `/breeding-route-calculator/` | H1，路线优先小标题，目标/拥有的控件|旗舰壳立即下英雄|将教育置于结果之下；控件前没有 SEO 墙 |替代方案解释后的 FAQ |数据徽章、浏览器优先的隐私说明、警告面板 |
| `/iv-calculator/` | H1，公式警告小标题，统计表格 |折叠上方的主表格 |结果栏下方的说明；公式注释链接|公式部分之后的 FAQ |公式版本和结果附近的置信度注释 |
| `/stats-calculator/` | H1，预期统计小标题，统计表格 |折叠上方的主表格 |比较构建副本下面的结果 | FAQ 统计解释后 |接近结果的公式版本 |
| `/passive-skill-calculator/` | H1，RNG 警告小标题，被动形式 |折叠上方的主表格 |结果下方的被动警告副本；避免确定性| FAQ 高度可见，因为警告很重要 | RNG 警告内部结果和附近 CTA |
| `/palworld-1-0-breeding-calculator/` | H1、1.0数据新鲜度文案 |养殖壳上方折叠|下面的更新/新鲜度 H2 部分 | FAQ 新鲜度副本后 |结果之前的更大数据版本/更新面板 |
| `/data-sources/` | H1，源码介绍，当前版本总结 |没有计算器|版本/源/更新部分； 800-1,200 字 | FAQ 如果使用架构则可见 |版本表位于顶部；不支持列表清除 |
| `/privacy/` | H1，法律摘要|没有计算器|狭义的法律散文；锚点导航|除非可见/法律批准，否则没有 FAQ |隐私摘要框 |
| `/terms/` | H1，条款摘要 |没有计算器|狭义的法律散文；锚点导航|除非可见/法律批准，否则没有 FAQ |粉丝网站免责声明突出 |

## 10.响应式布局规范

### 10.1 断点

- 手机：0-639px
- 平板电脑：640-899 像素
- 桌面：900px+
- 宽桌面：1200px+

### 10.2 桌面布局标题：
- 72 像素高度。
- 容器最大 1180 像素。
- 导航可见。

英雄：
- 主页：2 列网格 52/48。
- 工具页面：1 栏介绍加上全角工具外壳。
- 最大顶部间距 48px；不要塑造一个高大空洞的营销英雄。

计算器外壳：
- 桌面网格可以是 55/45，用于路线/IV/统计页面上的控件/结果。
- 育种表可以在控件后使用全角结果表。
- 保持主 CTA 与输入对齐，不要浮动太远。

SEO 内容：
- 对选定部分使用 `content-max` 760 像素或两列卡片。
- 不要将长文本放入计算器外壳内。

### 10.3 移动布局

标题：
- 56 像素高度。
- 抽屉导航。

英雄/工具：
- 首先是 H1，然后是副标题，然后是输入。
- 英雄文本和计算器之间最大垂直间隙为 24 像素。
- 输入全宽度，最小触摸高度为 44px。
- 如果需要，请使用折叠式过滤器和警告，但默认警告行仍然可见。

结果：
- 桌子变成卡片。
- 路线时间线垂直。
- 复制/共享按钮全宽或 2 列按钮行。
- 除可选的芯片行外，避免水平滚动；没有隐藏的核心控件。

页脚：
- 法律/免责声明文本可以紧凑但可读；没有微小的低对比度法律文本。

## 11. 辅助功能说明

键盘：
- 所有表单、自动完成、选项卡、过滤器、复制/共享操作和手风琴均可使用键盘。
- 聚焦环使用 --shadow-focus 并在浅色/深色卡片背景上保持可见。
- 自动完成支持 ArrowDown/ArrowUp/Enter/Escape。

语义：
- 每页一个 H1。
- 表单控件使用 `<label>` 或带有可见文本的 aria-label。
- 结果更新使用 aria-live="polite" 进行成功/无结果/加载更改。
- 错误摘要应在可行的情况下重点关注或宣布无效字段。

对比：
- 正文、按钮、提示和警告必须符合 WCAG AA。
- 不要仅通过颜色传达特殊组合、稀有性、警告或错误。

运动：
- 路线动画可选；尊重优先于减少运动。
- 加载状态不应使用强烈的闪烁/脉冲。

触摸：
- 按钮、输入、芯片和菜单项的最小 44 像素触摸目标。
- 移动表单应避免使用小于 16px 字体的控件，以防止 iOS 缩放。

## 12. SEO、前端的合规性和复制护栏

必须保存：
- 每条可转位路线上均经过 Palworld 认证的标题/H1/元。
- SEO 正文上方的计算器 UI。
- DataVersionBadge 或每个 P0 工具页面上可见的同等内容。
- 从工具页面链接到 `/data-sources/`。
- 页脚链接到 `/privacy/`、`/terms/` 和 `/data-sources/`。
- 全站简短免责声明。
- 如果发出 FAQ 模式，则可见 FAQ 内容。

不得添加：
- 官方标志/艺术/游戏截图/精灵/图标/提取的资产。
- “官方”、“认可”、“批准”、“授权”、“合作”、“赞助”、“保证”、“100% 准确”、“完美 IV”、“精确被动赔率”、“始终最新”、“即时更新”、“永久免费”、“无跟踪”或所需否定免责声明之外的类似声明。
- 广告、联盟模块、定价表、结帐、帐户墙或付费计划 UI，位于 MVP。- 服务器端保存文件上传 UI，除非后来的隐私/安全设计批准。

## 13. 前端就绪切换清单

### 13.1 所需的前端文件/组件

建议的组件库存：
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/trust/DataVersionBadge.tsx`
- `components/trust/CaveatCallout.tsx`
- `components/tools/CalculatorShell.tsx`
- `components/tools/PalAutocomplete.tsx`
- `components/tools/ModeTabs.tsx`
- `components/tools/ToolPickerCard.tsx`
- `components/tools/ResultPanel.tsx`
- `components/route/RouteTimeline.tsx`
- `components/stats/StatRangeBar.tsx`
- `components/legal/LegalPageLayout.tsx`

建议的 CSS 代币：
```css
:root {
  --color-bg: #F7F4EA;
  --color-card: #FFFDF7;
  --color-ink: #17212B;
  --color-muted: #687684;
  --color-line: #D8D0C2;
  --color-action: #2A9D8F;
  --color-action-strong: #227C73;
  --color-warn: #B7791F;
  --color-error: #C2413A;

  --font-sans: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --container-max: 1180px;
  --content-max: 760px;
  --tool-max: 1040px;
}
```

### 13.2 实施清单

- [ ] 在页面特定样式之前实现全局标记。
- [ ] 构建带有法律/免责声明链接的页眉/页脚。
- [ ] 首先构建 DataVersionBadge 和 CaveatCallout，因为每个工具页面都使用它们。
- [ ] 将 CalculatorShell 构建为共享布局。
- [ ] 构建主页CalculatorHub和ToolPickerCard。
- [ ] 构建具有配对子模式和目标父母模式的育种计算器。
- [ ] 使用垂直移动时间轴和桌面两列 shell 构建 RouteSolver 布局。
- [ ] 构建 IV/Stats 共享统计表格和 StatRangeBar 模式。
- [ ] 使用可见的 RNG 警告和不受支持的标志构建 PassivePlanner。
- [ ] 构建 DataSourcesPage 和合法的页面布局。
- [ ] 添加所有空/正在加载/成功/无结果/无效/数据不可用状态。
- [ ] 添加针对移动设备/平板电脑/桌面设备的响应行为。
- [ ] 添加辅助功能标签、焦点状态、aria-live 结果更新和键盘自动完成行为。
- [ ] 仅当存在可见副本时添加元数据/规范/模式。
- [ ] 如果实施，默认 `/share/*` 结果状态页为 noindex。

### 13.3 设计实施的质量检查清单

桌面：
- [ ] 主页在首屏显示目标输入和工具卡，分辨率为 1440x900。
- [ ] 每个 P0 工具页面均在 1440x900 分辨率下的 SEO 副本上方显示计算器控件。
- [ ] 路线求解器结果可以显示路线步骤、缺少的伙伴、替代方案以及复制/共享操作，而不会中断布局。
- [ ] 长 H1/元派生的复制换行而不溢出。

手机：
- [ ] 每个 P0 任务都可以在 390x844 下完成，无需水平滚动。
- [ ] 表格变成卡片。
- [ ] 路线时间轴变为垂直。
- [ ] 点击目标至少为 44 像素。
- [ ] 页脚法律免责声明仍然可读。

国家：
- [ ] 实现了空、加载、长求解、成功、无结果、无效输入、数据不可用和部分/已删除状态。
- [ ] 无效的朋友和不可能的统计错误是内联的且可聚焦的。
- [ ] 数据不可用决不会伪造结果。
- [ ] 被动规划器始终显示 RNG/继承警告。

合规性：
- [ ] 没有官方 Palworld 艺术/徽标/屏幕截图/资产。
- [ ] 全站粉丝制作的免责声明。
- [ ] 存在数据源/隐私/条款链接。
- [ ] 禁止索赔扫描通行证。

## 14.资产计划

仅创建原始资产：
- 文字标记：纯文本“PalCalculator”，带有路线节点点作为可选的原始标记。
- 图标：SVG 计算器、路线、鸡蛋、统计栏、无源芯片、数据库、警告、复制、共享的线条图标。
- OG图像：带有PalCalculator字标和“非官方Palworld计算器中心”文本的原始抽象路线图；没有官方艺术。- 占位符视觉效果：通用节点/芯片/表格，没有类似于受版权保护的 Pals 的角色轮廓。

资产来源日志要求：
- 如果使用任何第三方图标集，请根据需要记录许可和归属。
- 更喜欢自行创作的内联 SVG 以避免许可证歧义。

## 15. 未清项目 /待确认

这些不会阻碍设计源，但必须在生产启动前解决：
- 最终规范来源/域。
- 数据集版本、上次更新日期、公式版本和确切的源/更新工作流程。
- 分析提供商和保留期。
- 合法运营​​商/实体和联系人/隐私电子邮件。
- 浏览器本地导入是否在 MVP 或 P1 中提供。
- 是否存在任何联系表格/新闻通讯/Discord 链接。
- 最终后端决策：静态 JSON/客户端路由解决与 Worker 后备。

## 16. 下游切换总结

状态：[DONE]

一行结论：
PalCalculator 应使用干净的现场指南计算器工作区设计：暖光背景、板岩结构、青色动作强调、计算器优先布局、路线时间线作为签名组件，以及每个工具页面上的可见数据/合规性警告。

可交付成果：
- /root/projects/palcalculator/artifacts/design.md

frontend_bot 必读：
- /root/projects/palcalculator/artifacts/design.md
- /root/projects/palcalculator/artifacts/copy.md
- /root/projects/palcalculator/artifacts/route-contract.md
- /root/projects/palcalculator/artifacts/compliance.md

前端不得假设：
- 可以使用官方资产。
- 最终域名已确认。
- 数据版本和更新日期可用。
- 分析提供商/保留获得批准。
- 服务器端保存文件或拥有的 Pal 存储已获得批准。
- MVP 批准付费/帐户/广告/附属功能。

下一个推荐代理：
- frontend_bot 实现设计源和路由页面。
- 如果数据集/模式/路径求解尚未准备好，则并行后端/data_bot。
- 实施响应式、可访问性、SEO/模式、合规性和禁止声明验证后的 QA_bot。

[DONE]
