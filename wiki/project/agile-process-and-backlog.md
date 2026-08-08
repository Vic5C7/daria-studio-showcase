# Agile Development Process and Backlog Draft / 敏捷开发流程与 Backlog 草案

## Document Purpose / 文档目的

This document defines a lightweight agile development process for the DARIA STUDIO platform and drafts the first implementation backlog. It connects the product scope, MVP roadmap, user stories, acceptance criteria, architecture decisions, API contract, database schema draft, and testing plan into day-to-day development work.

本文档定义 DARIA STUDIO 平台的轻量敏捷开发流程，并草拟第一版实现 Backlog。它把产品范围、MVP 路线图、用户故事、验收标准、架构决策、API 契约、数据库 Schema 草案和测试计划连接到日常开发任务。

This document should guide sprint planning and ticket creation. It is not a fixed contract; backlog priority can change when product understanding changes.

本文档用于指导 Sprint 计划和 ticket 创建。它不是固定合同；当产品理解变化时，Backlog 优先级可以调整。

## Agile Model / 敏捷模型

Recommended model:

推荐模型：

- Use a lightweight Scrum + Kanban hybrid.
- Work in 1-week sprints during early development.
- Keep a visible backlog ordered by product value and dependency.
- Make each sprint demoable, even if the demo is small.
- Keep technical decisions in ADRs when they affect future implementation.
- Keep product scope decisions in product documents when they affect user behavior.
- Avoid carrying large unfinished work across many sprints; split work smaller instead.

- 使用轻量 Scrum + Kanban 混合方式。
- 早期开发使用 1 周一个 Sprint。
- 保持一个按产品价值和依赖排序的可见 Backlog。
- 每个 Sprint 都应可演示，即使演示内容很小。
- 影响未来实现的技术决策写入 ADR。
- 影响用户行为的产品范围决策写入产品文档。
- 避免大任务跨多个 Sprint 长期未完成；应拆小。

## Roles / 角色

These process roles are project roles, not always the same as website roles.

以下是项目流程角色，不一定等同于网站中的用户角色。

| Process Role | Responsibility |
| --- | --- |
| Product Decision Owner | Confirms product behavior, priorities, and tradeoffs |
| Implementation Lead | Designs and implements the application, raises technical risks |
| Reviewer / QA | Checks acceptance criteria, bilingual behavior, permissions, and regressions |
| Studio Owner Representative | Confirms staff workflow and public content needs |
| Client Representative | Confirms client-facing account, gallery, and inquiry experience when available |

| 流程角色 | 职责 |
| --- | --- |
| 产品决策负责人 | 确认产品行为、优先级和取舍 |
| 实现负责人 | 设计并实现应用，提出技术风险 |
| 评审 / QA | 检查验收标准、双语行为、权限和回归 |
| 工作室老板代表 | 确认工作人员流程和公开内容需求 |
| 客户代表 | 在可用时确认客户可见账号、相册和咨询体验 |

For this project, one person may hold multiple process roles in early development.

本项目早期，一个人可以同时承担多个流程角色。

## Core Artifacts / 核心产物

| Artifact | Purpose | Source Location |
| --- | --- | --- |
| Product scope | Product behavior and exclusions | `wiki/product/product-scope.md` |
| MVP roadmap | Release sequence and phase boundaries | `wiki/product/mvp-roadmap.md` |
| User stories | Stable product story identifiers | `wiki/user-stories/stories-by-epic.md` |
| Acceptance criteria | Testable behavior by story | `wiki/acceptance-criteria/criteria-by-story.md` |
| ADRs | Architecture decisions | `wiki/decisions/` |
| API contract | API shape and boundaries | `wiki/architecture/api-contract-draft.md` |
| Database schema draft | Data model implementation direction | `wiki/architecture/database-schema-draft.md` |
| Test plan | Testing strategy and cases | `wiki/testing/` |
| Backlog | Sprint-ready development work | This document or later issue tracker |

| 产物 | 用途 | 来源位置 |
| --- | --- | --- |
| 产品范围 | 产品行为和排除项 | `wiki/product/product-scope.md` |
| MVP 路线图 | 发布顺序和阶段边界 | `wiki/product/mvp-roadmap.md` |
| 用户故事 | 稳定产品故事编号 | `wiki/user-stories/stories-by-epic.md` |
| 验收标准 | 按故事定义可测试行为 | `wiki/acceptance-criteria/criteria-by-story.md` |
| ADR | 架构决策 | `wiki/decisions/` |
| API 契约 | API 形态和边界 | `wiki/architecture/api-contract-draft.md` |
| 数据库 Schema 草案 | 数据模型实现方向 | `wiki/architecture/database-schema-draft.md` |
| 测试计划 | 测试策略和用例 | `wiki/testing/` |
| Backlog | 可进入 Sprint 的开发工作 | 本文档或后续 issue tracker |

## Sprint Cadence / Sprint 节奏

### Sprint Length / Sprint 长度

Use 1-week sprints during Foundation and MVP 0.

Foundation 和 MVP 0 阶段使用 1 周 Sprint。

After MVP 0 is demoable, the team can decide whether to keep 1-week sprints or move to 2-week sprints for larger delivery features.

MVP 0 可演示后，团队可以决定继续使用 1 周 Sprint，还是为较大的交付功能改为 2 周 Sprint。

### Weekly Rhythm / 每周节奏

| Timing | Activity | Output |
| --- | --- | --- |
| Sprint start | Sprint planning | Sprint goal, selected tickets, known risks |
| Mid-sprint | Short progress check | Blockers, scope adjustments |
| End of sprint | Demo and review | Working demo, accepted tickets, feedback |
| End of sprint | Retro | What to keep, change, or stop |
| Between sprints | Backlog refinement | Reordered backlog and clarified tickets |

| 时间 | 活动 | 产出 |
| --- | --- | --- |
| Sprint 开始 | Sprint 计划 | Sprint 目标、选入 ticket、已知风险 |
| Sprint 中段 | 简短进度检查 | 阻塞、范围调整 |
| Sprint 结束 | 演示和评审 | 可运行演示、已验收 ticket、反馈 |
| Sprint 结束 | 复盘 | 保留、改变或停止的做法 |
| Sprint 之间 | Backlog 梳理 | 重新排序的 backlog 和更清晰的 ticket |

## Ticket Status Workflow / Ticket 状态流

Recommended statuses:

推荐状态：

```text
Backlog -> Ready -> In Progress -> Review -> Accepted -> Done
```

Blocked work should stay visible with a blocker note.

被阻塞的工作应保持可见，并写明阻塞原因。

```text
Blocked
```

Status rules:

状态规则：

- `Backlog`: valid idea, not ready for sprint commitment.
- `Ready`: clear enough to start, meets Definition of Ready.
- `In Progress`: actively being implemented.
- `Review`: implementation is complete and awaiting review or QA.
- `Accepted`: product/QA acceptance passed.
- `Done`: accepted, merged, and documentation updated if needed.
- `Blocked`: cannot progress without a decision, dependency, credential, asset, or environment.

- `Backlog`：有效想法，但尚不适合承诺进 Sprint。
- `Ready`：足够清晰，可以开始，满足 Ready 定义。
- `In Progress`：正在实现。
- `Review`：实现已完成，等待评审或 QA。
- `Accepted`：产品/QA 验收通过。
- `Done`：已验收、已合并，并在需要时更新文档。
- `Blocked`：缺少决策、依赖、凭证、素材或环境，无法继续推进。

## Priority and Sizing / 优先级与估算

### Priority / 优先级

| Priority | Meaning |
| --- | --- |
| P0 | Required for the next demo or phase gate |
| P1 | Required for the same MVP phase but can follow P0 |
| P2 | Important hardening, polish, or future phase work |
| P3 | Optional, exploratory, or explicitly deferred |

| 优先级 | 含义 |
| --- | --- |
| P0 | 下一个演示或阶段闸门必需 |
| P1 | 同一 MVP 阶段必需，但可排在 P0 后 |
| P2 | 重要加固、打磨或未来阶段工作 |
| P3 | 可选、探索性或明确延后 |

### Size / 大小

Use simple T-shirt sizing at first.

早期使用简单 T-shirt 估算。

| Size | Guideline |
| --- | --- |
| XS | Less than half a day, low risk |
| S | About one day, clear path |
| M | Two to three days, some integration |
| L | Too large for one ticket unless split is impractical |

| 大小 | 参考 |
| --- | --- |
| XS | 少于半天，风险低 |
| S | 约一天，路径清楚 |
| M | 两到三天，有一定集成 |
| L | 对单个 ticket 过大，除非无法合理拆分 |

Tickets sized `L` should usually be split before entering a sprint.

`L` 大小的 ticket 通常应在进入 Sprint 前拆分。

## Definition of Ready / Ready 定义

A ticket is ready for sprint planning when:

当一个 ticket 满足以下条件时，可以进入 Sprint 计划：

- It belongs to a roadmap phase.
- It has a clear user or technical goal.
- It references related user stories, ADRs, or architecture docs where applicable.
- It lists key acceptance criteria.
- It identifies whether bilingual UI/copy is affected.
- It identifies whether permissions or private data are affected.
- It identifies known dependencies.
- It is small enough to complete inside one sprint, or explicitly accepted as a spike.

- 它属于某一个路线图阶段。
- 它有清晰的用户目标或技术目标。
- 在适用时引用相关用户故事、ADR 或架构文档。
- 列出关键验收标准。
- 说明是否影响双语 UI/文案。
- 说明是否影响权限或私有数据。
- 说明已知依赖。
- 足够小，可以在一个 Sprint 内完成；或明确作为 spike 接受。

## Definition of Done / Done 定义

A ticket is done when:

当一个 ticket 满足以下条件时，才算 Done：

- Implementation is complete.
- Automated tests are added or updated where appropriate.
- Existing relevant tests pass.
- Bilingual fixed copy is complete for new UI.
- Editable customer-facing content supports Chinese and English fields when required.
- Backend permission checks exist for protected behavior.
- Private file access is not exposed through public URLs.
- Error and empty states are handled.
- Documentation is updated if behavior, API, schema, or decision changed.
- The feature can be demonstrated locally or in the chosen test environment.

- 实现完成。
- 在适用时新增或更新自动化测试。
- 相关已有测试通过。
- 新 UI 的固定双语文案完整。
- 需要时，客户可见可编辑内容支持中文和英文字段。
- 受保护行为具备后端权限校验。
- 私有文件访问不会通过公开 URL 暴露。
- 错误状态和空状态已处理。
- 如果行为、API、Schema 或决策发生变化，文档已更新。
- 功能可以在本地或选定测试环境中演示。

## Ticket Template / Ticket 模板

```md
## Title / 标题

Short verb phrase.

## Phase / 阶段

Foundation / MVP 0 / MVP 1 / MVP 2A / MVP 2B / MVP 2C / Launch Hardening

## Related Stories / 相关用户故事

US-xxx, ADR-xxx, or document references.

## Goal / 目标

What user or technical outcome should exist after this ticket?

## Scope / 范围

What is included?

## Out of Scope / 范围外

What should not be done in this ticket?

## Acceptance Criteria / 验收标准

- Clear, testable outcomes.

## Test Notes / 测试说明

- Unit/integration/e2e/manual checks.

## Dependencies / 依赖

- Required decisions, assets, services, or tickets.
```

## Change Control / 需求变化处理

Agile development expects change, but change still needs routing.

敏捷开发接受变化，但变化仍需要进入合适流程。

- New product behavior goes into the backlog first.
- Urgent production/security issues may interrupt the sprint.
- Non-urgent changes should wait for backlog refinement.
- If a change invalidates an accepted decision, create or update an ADR or product decision document.
- If a sprint ticket grows beyond its original goal, split follow-up work instead of expanding endlessly.

- 新产品行为先进入 Backlog。
- 紧急生产/安全问题可以打断 Sprint。
- 非紧急变化应等待 Backlog 梳理。
- 如果变化推翻已接受决策，应创建或更新 ADR 或产品决策文档。
- 如果 Sprint 中的 ticket 超出原目标，应拆出后续工作，而不是无限扩大。

## Backlog ID Scheme / Backlog 编号规则

| Prefix | Meaning |
| --- | --- |
| `FND` | Foundation |
| `M0` | MVP 0 |
| `M1` | MVP 1 |
| `M2A` | MVP 2A |
| `M2B` | MVP 2B |
| `M2C` | MVP 2C |
| `HARD` | Launch hardening |
| `DOC` | Documentation and planning |
| `SPK` | Spike or research |

| 前缀 | 含义 |
| --- | --- |
| `FND` | 平台基础 |
| `M0` | MVP 0 |
| `M1` | MVP 1 |
| `M2A` | MVP 2A |
| `M2B` | MVP 2B |
| `M2C` | MVP 2C |
| `HARD` | 上线加固 |
| `DOC` | 文档与规划 |
| `SPK` | Spike 或调研 |

## Initial Backlog / 初始 Backlog

The following backlog is a draft. It should be converted into issues or tickets when the implementation workspace is ready.

以下 Backlog 是草案。实现工作区准备好后，应将其转换成 issue 或 ticket。

### Foundation Backlog / Foundation Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| FND-001 | Create private implementation workspace | P0 | S | MVP roadmap | Private repo has agreed structure and local setup notes |
| FND-002 | Set up Next.js route groups | P0 | M | ADR-001 | Public, account, and staff route groups exist |
| FND-003 | Set up FastAPI app shell | P0 | M | ADR-002 | Health check and version endpoint work |
| FND-004 | Add local development orchestration | P0 | S | ADR-002 | Frontend/backend can run together locally |
| FND-005 | Set up PostgreSQL migration base | P0 | M | ADR-004, schema draft | Empty database can migrate |
| FND-006 | Create localization foundation | P0 | M | US-001, US-002 | Fixed copy keys load `zh-CN` and `en` |
| FND-007 | Implement auth schema migration | P0 | M | ADR-009 | Auth identity/session/token tables exist |
| FND-008 | Implement password hashing and session base | P0 | M | ADR-009 | Login session can be created with hashed password |
| FND-009 | Implement CSRF pattern | P0 | S | ADR-009 | Mutating authenticated requests require CSRF |
| FND-010 | Seed first owner account for development | P0 | S | ADR-009 | Owner can log in locally |
| FND-011 | Add baseline test commands | P1 | S | testing plan | Unit/API smoke tests can run locally |
| FND-012 | Document local setup | P1 | S | developer workflow | New developer can run project from README |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| FND-001 | 创建私有实现工作区 | P0 | S | MVP 路线图 | 私有仓库拥有约定结构和本地设置说明 |
| FND-002 | 搭建 Next.js 路由组 | P0 | M | ADR-001 | 公开、账号、工作人员路由组存在 |
| FND-003 | 搭建 FastAPI 应用壳 | P0 | M | ADR-002 | 健康检查和版本接口可用 |
| FND-004 | 增加本地开发编排 | P0 | S | ADR-002 | 前后端可以本地一起运行 |
| FND-005 | 搭建 PostgreSQL 迁移基础 | P0 | M | ADR-004、Schema 草案 | 空数据库可以执行迁移 |
| FND-006 | 创建多语言基础 | P0 | M | US-001、US-002 | 固定文案 key 可加载 `zh-CN` 和 `en` |
| FND-007 | 实现认证 Schema 迁移 | P0 | M | ADR-009 | 认证身份、会话、token 表存在 |
| FND-008 | 实现密码哈希和会话基础 | P0 | M | ADR-009 | 使用哈希密码创建登录会话 |
| FND-009 | 实现 CSRF 模式 | P0 | S | ADR-009 | 认证写请求要求 CSRF |
| FND-010 | 为开发环境种子第一个老板账号 | P0 | S | ADR-009 | 老板可以本地登录 |
| FND-011 | 增加基础测试命令 | P1 | S | 测试计划 | 单元/API 冒烟测试可本地运行 |
| FND-012 | 编写本地设置说明 | P1 | S | 开发流程 | 新开发者可按 README 跑起项目 |

### MVP 0 Backlog / MVP 0 Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| M0-001 | Build public site shell | P0 | M | US-001 | Visitor can open public site |
| M0-002 | Implement language switcher | P0 | S | US-001 | Language changes without losing page state |
| M0-003 | Load public seed content | P0 | M | US-002 | Public pages render seeded bilingual content |
| M0-004 | Display gallery categories | P0 | M | US-003, US-004 | Categories show images or empty state |
| M0-005 | Display studio shoot sets | P0 | M | US-005 | Set modal centers 1 to 9 images in up to 3 by 3 layout |
| M0-006 | Build pricing selection flow | P0 | M | US-006, US-007 | User can select area, service type, package, add-ons |
| M0-007 | Calculate estimated total | P0 | S | US-008 | Estimate updates when selections change |
| M0-008 | Generate read-only inquiry summary | P0 | M | US-009 | Summary updates and cannot be manually edited |
| M0-009 | Add one-action copy for inquiry summary | P0 | S | US-009 | User can copy full summary |
| M0-010 | Implement client registration/login/logout | P0 | M | US-010, US-011 | Client can register, log in, log out |
| M0-011 | Build client account empty state | P1 | S | US-011 | Client sees no-gallery state |
| M0-012 | Implement staff login shell | P0 | M | US-012 | Staff can log in and reach `/staff` shell |
| M0-013 | Enforce staff role gate | P0 | M | US-013 | Client-only account is denied staff access |
| M0-014 | Add MVP 0 e2e smoke tests | P1 | M | testing plan | Public, auth, and staff rejection smoke tests pass |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| M0-001 | 构建公开网站壳 | P0 | M | US-001 | 访客可以打开公开网站 |
| M0-002 | 实现语言切换 | P0 | S | US-001 | 切换语言不丢失页面状态 |
| M0-003 | 加载公开种子内容 | P0 | M | US-002 | 公开页面渲染双语种子内容 |
| M0-004 | 展示作品分类 | P0 | M | US-003、US-004 | 分类展示图片或空状态 |
| M0-005 | 展示棚拍展示集 | P0 | M | US-005 | 展示集弹窗以最多 3 乘 3 居中展示 1 到 9 张图片 |
| M0-006 | 构建价格选择流程 | P0 | M | US-006、US-007 | 用户可选择地区、服务类型、套餐、加购项 |
| M0-007 | 计算估算总价 | P0 | S | US-008 | 选择变化时估价更新 |
| M0-008 | 生成只读咨询信息汇总 | P0 | M | US-009 | 汇总自动更新且不能手动编辑 |
| M0-009 | 增加咨询信息一键复制 | P0 | S | US-009 | 用户可以复制完整汇总 |
| M0-010 | 实现客户注册/登录/退出 | P0 | M | US-010、US-011 | 客户可以注册、登录、退出 |
| M0-011 | 构建客户账号空状态 | P1 | S | US-011 | 客户看到暂无相册状态 |
| M0-012 | 实现工作人员登录壳 | P0 | M | US-012 | 工作人员可登录并进入 `/staff` 壳 |
| M0-013 | 执行工作人员角色闸门 | P0 | M | US-013 | 仅客户账号被拒绝访问工作人员端 |
| M0-014 | 增加 MVP 0 端到端冒烟测试 | P1 | M | 测试计划 | 公开网站、认证和工作人员拒绝测试通过 |

### MVP 1 Backlog / MVP 1 Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| M1-001 | Build owner content dashboard shell | P0 | M | US-013, US-017 | Owner sees content management sections |
| M1-002 | Implement gallery category CRUD and reorder | P0 | M | US-014 | Owner can add/edit/delete/reorder categories |
| M1-003 | Implement public gallery image management | P0 | M | US-014 | Owner can manage 0 to 20 images per normal category |
| M1-004 | Implement studio shoot set management | P0 | M | US-015 | Owner can manage sets and 1 to 9 images |
| M1-005 | Implement service area/type management | P0 | M | US-016 | Owner can add/edit/delete/reorder areas and types |
| M1-006 | Implement package and add-on management | P0 | L | US-016 | Owner can manage packages, prices, add-ons |
| M1-007 | Implement bilingual editable field validation | P0 | M | US-017 | Missing translations are shown before publish |
| M1-008 | Add employee denial for content edits | P0 | S | US-013 | Employee cannot mutate public content |
| M1-009 | Add owner content audit events | P1 | M | security | Content changes record actor and timestamp |
| M1-010 | Add MVP 1 management tests | P1 | M | testing plan | Owner edit and employee denial tests pass |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| M1-001 | 构建老板内容管理仪表盘壳 | P0 | M | US-013、US-017 | 老板看到内容管理分区 |
| M1-002 | 实现作品分类增删改和排序 | P0 | M | US-014 | 老板可添加/编辑/删除/排序分类 |
| M1-003 | 实现公开作品图片管理 | P0 | M | US-014 | 老板可管理普通分类 0 到 20 张图片 |
| M1-004 | 实现棚拍展示集管理 | P0 | M | US-015 | 老板可管理展示集和 1 到 9 张图片 |
| M1-005 | 实现服务地区/服务类型管理 | P0 | M | US-016 | 老板可添加/编辑/删除/排序地区和类型 |
| M1-006 | 实现套餐和加购项管理 | P0 | L | US-016 | 老板可管理套餐、价格、加购项 |
| M1-007 | 实现双语可编辑字段校验 | P0 | M | US-017 | 发布前显示缺失翻译 |
| M1-008 | 增加员工内容编辑拒绝 | P0 | S | US-013 | 员工不能修改公开内容 |
| M1-009 | 增加老板内容审计事件 | P1 | M | 安全 | 内容变更记录操作者和时间 |
| M1-010 | 增加 MVP 1 管理测试 | P1 | M | 测试计划 | 老板编辑和员工拒绝测试通过 |

### MVP 2A Backlog / MVP 2A Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| M2A-001 | Build staff client list | P0 | M | US-018 | Staff sees full client list with minimum fields |
| M2A-002 | Add client lookup by email | P0 | S | US-018 | Staff can find existing client account |
| M2A-003 | Create client gallery | P0 | M | US-019 | Staff can create gallery linked to client |
| M2A-004 | Implement private upload intent | P0 | M | US-019 | Staff gets scoped upload path/link |
| M2A-005 | Store original photo metadata | P0 | M | US-019 | Uploaded originals appear in gallery |
| M2A-006 | Reorder/delete/replace originals | P0 | M | US-019, US-020 | Staff can manage originals |
| M2A-007 | Start delivery timers on original availability | P0 | M | US-027 | 7-day and 3-month timestamps are created |
| M2A-008 | Build client original gallery view | P1 | M | US-022 | Client can see own originals |
| M2A-009 | Generate original photo package | P1 | M | US-023 | Client can request originals zip within window |
| M2A-010 | Add private file access tests | P0 | M | security | Unauthorized or expired access is denied |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| M2A-001 | 构建工作人员客户列表 | P0 | M | US-018 | 工作人员看到完整客户列表和最少字段 |
| M2A-002 | 增加按邮箱查找客户 | P0 | S | US-018 | 工作人员可以找到已有客户账号 |
| M2A-003 | 创建客户相册 | P0 | M | US-019 | 工作人员可以创建关联客户的相册 |
| M2A-004 | 实现私有上传意图 | P0 | M | US-019 | 工作人员获得受限上传路径/链接 |
| M2A-005 | 保存底片元数据 | P0 | M | US-019 | 已上传底片出现在相册中 |
| M2A-006 | 底片排序/删除/替换 | P0 | M | US-019、US-020 | 工作人员可以管理底片 |
| M2A-007 | 底片可用时开始交付计时 | P0 | M | US-027 | 创建 7 天和 3 个月时间戳 |
| M2A-008 | 构建客户底片相册视图 | P1 | M | US-022 | 客户可以看到自己的底片 |
| M2A-009 | 生成底片压缩包 | P1 | M | US-023 | 客户可在窗口内请求底片 zip |
| M2A-010 | 增加私有文件访问测试 | P0 | M | 安全 | 未授权或过期访问被拒绝 |

### MVP 2B Backlog / MVP 2B Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| M2B-001 | Display retouch quota | P0 | S | US-024 | Client sees selectable limit |
| M2B-002 | Build retouch selection UI | P0 | M | US-024 | Client can select included photos |
| M2B-003 | Add per-photo note input | P0 | M | US-025 | Note exists per selected photo |
| M2B-004 | Validate 500-character mixed text notes | P0 | S | US-025 | Invalid notes are rejected |
| M2B-005 | Submit and lock retouch selection | P0 | M | US-026 | Submitted selection cannot be edited |
| M2B-006 | Enforce 7-day expiry and loss of right | P0 | M | US-027, US-028 | Expired clients cannot submit |
| M2B-007 | Staff review submitted selection | P0 | M | US-021 | Staff can read selected originals and notes |
| M2B-008 | Add retouch selection tests | P1 | M | testing plan | Quota, notes, lock, expiry tests pass |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| M2B-001 | 展示精修额度 | P0 | S | US-024 | 客户看到可选择上限 |
| M2B-002 | 构建精修选择 UI | P0 | M | US-024 | 客户可以选择包含的精修照片 |
| M2B-003 | 增加每张照片备注输入 | P0 | M | US-025 | 每张已选照片有备注 |
| M2B-004 | 校验 500 字混合文本备注 | P0 | S | US-025 | 无效备注被拒绝 |
| M2B-005 | 提交并锁定精修选择 | P0 | M | US-026 | 已提交选择不能编辑 |
| M2B-006 | 执行 7 天过期和权利失效 | P0 | M | US-027、US-028 | 过期客户不能提交 |
| M2B-007 | 工作人员查看已提交选择 | P0 | M | US-021 | 工作人员可读取已选底片和备注 |
| M2B-008 | 增加精修选择测试 | P1 | M | 测试计划 | 额度、备注、锁定、过期测试通过 |

### MVP 2C Backlog / MVP 2C Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| M2C-001 | Upload final retouched photos | P0 | M | US-021 | Staff maps finals to selected originals |
| M2C-002 | Display final retouched photos to client | P0 | M | US-023 | Client sees valid finals |
| M2C-003 | Generate final photo package | P0 | M | US-023 | Client can download finals zip |
| M2C-004 | Refuse downloads after 3-month expiry | P0 | M | US-027, US-029 | Expired files get no download links |
| M2C-005 | Implement scheduled deletion job | P0 | L | US-029 | Originals, finals, and packages are deleted together |
| M2C-006 | Add deletion audit and retry records | P1 | M | security | Failed deletions are visible |
| M2C-007 | Add final delivery lifecycle tests | P1 | M | testing plan | Final upload, download, expiry, deletion tests pass |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| M2C-001 | 上传最终精修图 | P0 | M | US-021 | 工作人员将最终图映射到已选底片 |
| M2C-002 | 向客户展示最终精修图 | P0 | M | US-023 | 客户看到有效最终图 |
| M2C-003 | 生成最终图压缩包 | P0 | M | US-023 | 客户可以下载最终图 zip |
| M2C-004 | 3 个月过期后拒绝下载 | P0 | M | US-027、US-029 | 过期文件不生成下载链接 |
| M2C-005 | 实现定时删除任务 | P0 | L | US-029 | 底片、最终图和压缩包一起删除 |
| M2C-006 | 增加删除审计和重试记录 | P1 | M | 安全 | 删除失败可见 |
| M2C-007 | 增加最终交付生命周期测试 | P1 | M | 测试计划 | 最终图上传、下载、过期、删除测试通过 |

### Launch Hardening Backlog / 上线加固 Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| HARD-001 | Confirm production secure cookie settings | P0 | S | ADR-009 | Domain/SameSite settings documented and tested |
| HARD-002 | Add auth and file-access rate limiting | P0 | M | security | Sensitive endpoints are rate-limited |
| HARD-003 | Select and integrate email delivery provider | P0 | M | auth roadmap | Verification/reset emails send in production-like env |
| HARD-004 | Write first owner bootstrap runbook | P0 | S | ADR-009 | Owner setup has safe documented path |
| HARD-005 | Add background job monitoring | P1 | M | MVP 2C | Failed jobs are visible |
| HARD-006 | Add backup and restore runbook | P1 | M | operations | Metadata restore path is documented |
| HARD-007 | Review employee-visible client data | P0 | S | privacy | Staff list shows only minimum fields |
| HARD-008 | Review public image authorization | P0 | S | launch | Public samples have approval record |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| HARD-001 | 确认生产安全 cookie 设置 | P0 | S | ADR-009 | Domain/SameSite 设置已记录并测试 |
| HARD-002 | 增加认证和文件访问限流 | P0 | M | 安全 | 敏感接口已限流 |
| HARD-003 | 选择并集成邮件发送服务商 | P0 | M | 认证路线 | 类生产环境可发送验证/重置邮件 |
| HARD-004 | 编写第一个老板账号初始化手册 | P0 | S | ADR-009 | 老板设置有安全文档路径 |
| HARD-005 | 增加后台任务监控 | P1 | M | MVP 2C | 失败任务可见 |
| HARD-006 | 增加备份和恢复手册 | P1 | M | 运维 | 元数据恢复路径已记录 |
| HARD-007 | 复核员工可见客户数据 | P0 | S | 隐私 | 员工列表只显示最少字段 |
| HARD-008 | 复核公开图片授权 | P0 | S | 上线 | 公开样片有授权记录 |

### Documentation and Planning Backlog / 文档与规划 Backlog

| ID | Title | Priority | Size | Related | Done Signal |
| --- | --- | --- | --- | --- | --- |
| DOC-001 | Keep backlog synchronized with MVP roadmap | P0 | S | roadmap | New scope maps to roadmap phase |
| DOC-002 | Update API contract when implementation changes endpoints | P1 | S | API contract | API docs match implemented route behavior |
| DOC-003 | Update schema draft after first migrations | P1 | S | schema draft | Schema doc reflects real table choices |
| DOC-004 | Convert accepted backlog tickets into issue tracker | P1 | M | agile process | Tickets exist in chosen tracker |

| ID | 标题 | 优先级 | 大小 | 相关 | 完成信号 |
| --- | --- | --- | --- | --- | --- |
| DOC-001 | 保持 Backlog 与 MVP 路线图同步 | P0 | S | 路线图 | 新范围映射到路线图阶段 |
| DOC-002 | 实现端点变化时更新 API 契约 | P1 | S | API 契约 | API 文档匹配已实现路由行为 |
| DOC-003 | 第一批迁移后更新 Schema 草案 | P1 | S | Schema 草案 | Schema 文档反映真实表选择 |
| DOC-004 | 将已接受 Backlog 转成 issue tracker | P1 | M | 敏捷流程 | ticket 存在于选定 tracker |

## Suggested First Sprints / 建议前几个 Sprint

These are starting recommendations, not commitments.

以下是启动建议，不是承诺排期。

### Sprint 0: Project Setup and Backlog Readiness / Sprint 0：项目设置与 Backlog 准备

Goal:

目标：

- Make the private implementation workspace ready enough for real development.
- 让私有实现工作区达到可以正式开发的状态。

Candidate tickets:

候选 ticket：

- FND-001
- FND-002
- FND-003
- FND-004
- FND-012

Demo:

演示：

- Frontend and backend both run locally.
- Basic public, account, and staff routes exist.
- FastAPI health check responds.

- 前端和后端都可以本地运行。
- 基础公开、账号、工作人员路由存在。
- FastAPI 健康检查有响应。

### Sprint 1: Database, Localization, and Auth Base / Sprint 1：数据库、多语言与认证基础

Goal:

目标：

- Establish the data and authentication foundation.
- 建立数据和认证基础。

Candidate tickets:

候选 ticket：

- FND-005
- FND-006
- FND-007
- FND-008
- FND-009
- FND-010

Demo:

演示：

- Database migrates from empty state.
- Fixed copy loads in Chinese and English.
- Seeded owner can log in locally.

- 数据库可以从空状态迁移。
- 固定文案可以加载中文和英文。
- 种子老板可以本地登录。

### Sprint 2: Public Website Skeleton / Sprint 2：公开网站骨架

Goal:

目标：

- Make the first public customer-facing experience visible.
- 让第一版客户可见公开体验跑起来。

Candidate tickets:

候选 ticket：

- M0-001
- M0-002
- M0-003
- M0-004
- M0-005

Demo:

演示：

- Visitor browses seeded bilingual public gallery content.
- Studio shoot display set modal works.

- 访客浏览种子双语公开作品内容。
- 棚拍展示集弹窗可用。

### Sprint 3: Pricing and Inquiry Copy / Sprint 3：价格与咨询复制

Goal:

目标：

- Complete the core no-login inquiry workflow.
- 完成无需登录的核心咨询流程。

Candidate tickets:

候选 ticket：

- M0-006
- M0-007
- M0-008
- M0-009

Demo:

演示：

- Visitor chooses pricing options, sees estimate, and copies read-only summary.
- 访客选择价格选项、看到估算总价，并复制只读汇总。

### Sprint 4: Basic Login and Staff Boundary / Sprint 4：基础登录与工作人员边界

Goal:

目标：

- Complete MVP 0 account boundary.
- 完成 MVP 0 账号边界。

Candidate tickets:

候选 ticket：

- M0-010
- M0-011
- M0-012
- M0-013
- M0-014

Demo:

演示：

- Client can register and log in.
- Staff can log in.
- Client-only account is blocked from staff workspace.

- 客户可以注册并登录。
- 工作人员可以登录。
- 仅客户账号被工作人员端阻止。

## Risk Register / 风险登记

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Scope grows during MVP 0 | Public launch gets delayed | Put new ideas into backlog unless they block current phase |
| Auth/session implementation becomes larger than expected | Foundation slips | Keep login minimal first, defer optional account settings |
| Bilingual copy becomes inconsistent | Customer-facing quality drops | Treat missing fixed copy as QA failure |
| Owner editor becomes too broad | MVP 1 expands | Build gallery/pricing first, defer rare content blocks |
| Photo delivery combines too many concerns | MVP 2 stalls | Keep MVP 2A, 2B, and 2C separate |
| File expiry/deletion bugs | Privacy and trust risk | Test shortened expiry windows before production |

| 风险 | 影响 | 缓解方式 |
| --- | --- | --- |
| MVP 0 期间范围膨胀 | 公开上线延迟 | 除非阻塞当前阶段，新想法先进 Backlog |
| 认证/会话实现超出预期 | Foundation 延迟 | 先保持登录最小化，延后可选账号设置 |
| 双语文案不一致 | 客户可见质量下降 | 缺失固定文案视为 QA 失败 |
| 老板编辑器范围过大 | MVP 1 膨胀 | 先做作品/价格，少见内容块延后 |
| 照片交付混合太多关注点 | MVP 2 停滞 | 保持 MVP 2A、2B、2C 分离 |
| 文件过期/删除 bug | 隐私和信任风险 | 生产前用缩短过期窗口测试 |

## Backlog Refinement Checklist / Backlog 梳理清单

Use this checklist before moving work into a sprint.

将工作移入 Sprint 前，使用此清单。

- Does this ticket belong to the next phase gate?
- Is the user or technical outcome clear?
- Is the ticket small enough?
- Are permissions affected?
- Is bilingual copy affected?
- Is private client data affected?
- Are API or schema changes needed?
- Are tests or manual QA steps clear?
- Does this ticket need a product decision first?
- Does this ticket need an ADR first?

- 这个 ticket 是否属于下一个阶段闸门？
- 用户目标或技术目标是否清楚？
- ticket 是否足够小？
- 是否影响权限？
- 是否影响双语文案？
- 是否影响客户私有数据？
- 是否需要 API 或 Schema 变化？
- 测试或手动 QA 步骤是否清楚？
- 是否需要先做产品决策？
- 是否需要先做 ADR？

## Related Documents / 相关文档

- `wiki/product/product-scope.md`
- `wiki/product/mvp-roadmap.md`
- `wiki/user-stories/stories-by-epic.md`
- `wiki/acceptance-criteria/criteria-by-story.md`
- `wiki/architecture/technical-architecture-draft.md`
- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/database-schema-draft.md`
- `wiki/decisions/decision-log.md`
- `wiki/testing/test-plan.md`
