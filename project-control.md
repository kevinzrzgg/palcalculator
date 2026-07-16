# Project Control Board — palcalculator

项目：palcalculator
需求词：palcalculator
域名：palcalculator.com（owner 已提供；2026-07-16 复核：注册于 Dynadot，当前 NS 为 ns1/ns2.dyna-ns.net，尚未接入 Cloudflare）
目标市场：US / English
项目类型：先按关键词意图推断为 Palworld calculator / gaming utility calculator（Research 阶段验证）
技术栈：Cloudflare-first（Pages + Workers/D1/KV/R2 as needed）
当前模式：automation_factory
当前状态：SETUP_BLOCKED
事实源：Kanban board `palcalculator` + 本目录控制文件

## 学员只需要处理
- [x] 确认是否已有域名 / 候选域名：palcalculator.com
- [ ] GitHub 权限是否允许创建/推送 repo（gh 已登录 kevinzrzgg；候选 repo kevinzrzgg/palcalculator 不存在；仍需 owner 确认创建/推送/可见性）
- [ ] Cloudflare Pages/Workers/DNS 权限是否可用（token active，Pages/KV/D1 可列出；palcalculator.com zone 不存在；DNS 仍在 Dynadot）
- [ ] GSC/Bing 登录态是否可用（未发现 gws/Google/Bing/analytics 环境；上线后仍需确认）
- [ ] 是否允许生产部署 / 公开发布（上线前必须确认；当前未确认）

## 自动流水线
- 01 research：research_bot — keyword/SERP/competitors/opportunity
- 02 PRD：product_bot — PRD + route contract + user tasks
- 03 pricing：pricing_bot — monetization strategy, no final payment without owner decision
- 04 compliance：compliance_bot — IP/claims/privacy/terms/source policy
- 05 SEO-copy：copy_bot — title/meta/H1/H2/FAQ/schema copy freeze
- 06 design：design_bot — design source + frontend handoff
- 08 backend/data：backend_bot — data contract / APIs / calculator logic
- 07 frontend：frontend_bot — Cloudflare-first implementation
- 10 SEO：seo_bot — indexability/schema/sitemap/canonical readiness
- 02 PM acceptance：product_bot — PRD conformance
- 09 QA：qa_bot — user-task/mobile/network/console QA
- 11 launch：ops_bot — deploy only after QA_GO + owner permission
- 12 review：review_bot — post-launch data review plan

## 当前状态
- running：03 pricing（pricing_bot）；04 compliance（compliance_bot）
- waiting：05-12 等上游闸门
- blocked：00 setup 复核结论已写入 `/root/projects/palcalculator/artifacts/setup-gate.md`；GitHub repo 创建/推送、Cloudflare zone/DNS、GSC/Bing/analytics、生产部署/公开发布权限仍待 owner 确认；11 launch 依赖 owner 权限
- done：orchestrator board/DAG 初始化；01 research；02 PRD / route contract
