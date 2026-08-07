# ADR-001: Frontend Stack / 前端技术栈

## Status / 状态

Accepted.

已接受。

## Date / 日期

2026-08-07

## Context / 背景

DARIA STUDIO needs a customer-facing public website, a logged-in client account area, and a staff workspace. The frontend must support bilingual UI, gallery browsing, pricing selection, read-only inquiry summary copying, future client gallery viewing, live countdown display, and staff management workflows.

DARIA STUDIO 需要客户可见公开网站、登录客户账号区和工作人员端。前端必须支持双语界面、作品浏览、价格选择、只读咨询信息复制、后续客户相册查看、实时倒计时展示和工作人员管理流程。

The project owner is not expected to edit code to manage business content. Business content should be managed through the staff workspace.

项目所有者不应通过改代码来维护业务内容。业务内容应通过工作人员端管理。

## Decision / 决策

Use Next.js + React with light TypeScript for the frontend.

前端使用 Next.js + React + 轻量 TypeScript。

## Rationale / 理由

- React fits component-heavy UI such as gallery modals, pricing controls, account pages, and staff forms.
- Next.js provides a mature structure for routing, page rendering, build output, and frontend application organization.
- Light TypeScript helps prevent mistakes in roles, statuses, package data, bilingual fields, and API payloads.
- The project should avoid advanced TypeScript patterns that make the code hard to read.

- React 适合组件密集型界面，例如作品弹窗、价格控件、账号页面和工作人员表单。
- Next.js 提供成熟的路由、页面渲染、构建产物和前端应用组织方式。
- 轻量 TypeScript 有助于减少角色、状态、套餐数据、双语字段和 API 数据结构错误。
- 项目应避免难读的高级 TypeScript 写法。

## Consequences / 影响

- Frontend implementation will live in the private `daria-studio-platform` repository.
- Frontend code will call Python FastAPI endpoints for authenticated data and mutations.
- UI-level checks can improve user experience, but final permission and expiry decisions remain backend responsibilities.
- Business users should use the staff workspace instead of editing source code.

- 前端实现将放在私有仓库 `daria-studio-platform` 中。
- 前端代码将调用 Python FastAPI 接口获取认证数据并执行写操作。
- UI 层校验可以改善体验，但最终权限和过期判断仍由后端负责。
- 业务用户应通过工作人员端操作，而不是编辑源码。

## Related Documents / 相关文档

- `wiki/architecture/technical-architecture-draft.md`
- `wiki/architecture/api-contract-draft.md`
