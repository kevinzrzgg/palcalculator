# 项目控制委员会 — palcalculator

项目：pal计算器
需求词：pal计算器
域名：palcalculator.com（所有者已提供；2026-07-16 复核：注册于 Dynadot，当前 NS 为 ns1/ns2.dyna-ns.net，尚未接入 Cloudflare）
目标市场：美式/英语
项目类型：先按推理关键词推断为Palworld计算器/游戏实用计算器（研究阶段验证）
技术栈：Cloudflare-first（Pages + Workers/D1/KV/R2 根据需要）
当前模式：automation_factory
当前状态：SETUP_BLOCKED
事实来源：看板 `palcalculator` + 本目录控制文件

## 学员只需要处理
- [x] 确认是否拥有域名/候选域名：palcalculator.com
- [ ] 允许 GitHub 权限是否创建创建/个体 repo（gh 已登录 kevinzrzgg；候选 repo kevinzrzgg/palcalculator 不存在；仍需所有者创建确认/个体/可见性）
- [ ] Cloudflare Pages/Workers/DNS 权限是否可用（令牌活跃，Pages/KV/D1 可上市；palcalculator.com 区域不存在；DNS 目前 Dynadot）
- [ ] GSC/Bing 登录状态是否可用（未发现 gws/Google/Bing/analytics 环境；上线后仍需确认）
- [ ] 是否允许部署生产/公开发布（上线前必须确认；当前未确认）

## 自动模拟
- 01 研究：research_bot — 关键字/SERP/竞争对手/机会
- 02 PRD：product_bot — PRD + 路由合约 + 用户任务
- 03 定价：pricing_bot — 货币化策略，没有所有者决定则没有最终付款
- 04 合规性：compliance_bot — IP/声明/隐私/条款/源策略
- 05 SEO-copy：copy_bot — title/meta/H1/H2/FAQ/schema 复制冻结
- 06 设计：design_bot — 设计源+前端交接
- 08 backend/data：backend_bot — 数据合约/API/计算器逻辑
- 07 前端：frontend_bot — Cloudflare-first 实现
- 10 SEO：seo_bot — 可索引性/架构/站点地图/规范准备情况
- 02 PM 验收：product_bot — PRD 一致性
- 09 QA：qa_bot — 用户任务/移动/网络/控制台 QA
- 11 启动：ops_bot — 仅在 QA_GO + 所有者权限后部署
- 12 次审核：review_bot — 发布后数据审核计划

## 当前状态
- 运行：03定价（pricing_bot）；04合规性（compliance_bot）
- 等待：05-12 等上游闸门
-受阻：00 设置复核结论已写入 `/root/projects/palcalculator/artifacts/setup-gate.md`；GitHub repo 创建/参数、Cloudflare zone/DNS、GSC/Bing/analytics、生产配置/公开发布权限仍待所有者确认；11 启动依赖所有者权限
- 完成：orchestrator board/DAG 初始化；01 研究；02 PRD / 路由合约
