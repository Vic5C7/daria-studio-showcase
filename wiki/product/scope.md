# DARIA STUDIO Product Scope
# DARIA STUDIO 产品范围

## Document status
## 文档状态

**Status:** Draft — awaiting manual review.
**状态：** 草案——等待人工审阅。

This document is the first product Wiki document. It defines the production scope by using the customer-reviewed high-fidelity prototype as the primary product reference.
这是第一份产品 Wiki 文档。它以客户已经审阅的高保真原型作为主要产品依据，定义正式网站的范围。

## Scope rule
## 范围原则

Every user-visible page, control, interaction, state, and workflow shown in `wiki/prototype/high-fidelity/` is included in the real website scope.
`wiki/prototype/high-fidelity/` 中展示的所有用户可见页面、控件、交互、状态和流程，都属于真实网站范围。

The production website must preserve the prototype's approved visual design and user-facing behavior. A prototype implementation detail may be replaced, but the user-visible capability must not be silently removed.
正式网站必须保持原型已经确认的视觉设计和用户可见行为。原型的底层实现方式可以替换，但不能擅自删除用户可见功能。

## Product goal
## 产品目标

DARIA STUDIO will provide a bilingual photography website that presents the studio's work, explains available services and pricing, supports customer accounts, provides staff administration, and delivers customer albums.
DARIA STUDIO 将提供一个双语摄影网站，用于展示工作室作品、说明服务和价格、支持客户账户、提供工作人员管理能力，并向客户交付相册。

## In-scope capabilities
## 已确认包含的能力

The following capabilities are included because they are presented or operated by the current prototype.
以下能力因为在当前原型中被展示或操作，所以属于正式网站范围。

| Area | Prototype-visible capability | Production expectation |
|---|---|---|
| Public website | Gallery, studio introduction, navigation, bilingual copy, language switching. | Content is served from production data while matching the approved visual design. |
| Pricing | Area, service type, school or scene, package, add-ons, estimated total, unavailable states, pending-price states. | Pricing and availability are stored as data and calculated authoritatively by the backend. |
| Pricing notes | Add, delete, and limit notes; registry extra-location notes and related pricing behavior. | Notes and pricing effects are validated and persisted by the backend. |
| Account | Registration, login, logout, user session, role-aware navigation, and visible account actions. | Real authentication uses a database and secure server-side sessions or equivalent secure tokens. |
| Admin content | Edit gallery content, bilingual copy, visibility, ordering, and public flow sections. | Changes are persisted, permission-checked, and auditable. |
| Admin pricing | Edit pricing-related content and configuration exposed by the prototype. | Pricing configuration is data-driven and cannot be changed only by editing frontend code. |
| Customer management | View the customer list and open a selected customer album. | Admin-only API authorization is enforced on the server. |
| Client album | View the customer's album, browse images, manage visible notes, and download images. | Album ownership and downloads are protected; images are stored through the production storage design. |

## Production implementation boundary
## 正式实现边界

The visible capabilities remain the same, but the production implementation must replace prototype-only mechanisms:
用户可见能力保持一致，但正式实现必须替换原型专用机制：

- Browser local storage becomes server-side persistence.
  浏览器本地存储改为服务端持久化。
- Demo authentication becomes real authentication and authorization.
  演示认证改为真实认证和授权。
- Hard-coded pricing becomes database-backed configuration and server-side calculation.
  硬编码价格改为数据库配置，并由服务端计算。
- Static demo album data becomes customer-owned album records and image objects.
  静态演示相册改为属于客户的相册记录和图片对象。
- Frontend-only route hiding becomes server-enforced permissions.
  仅由前端隐藏路由改为服务端强制执行权限。
- Prototype image assets become production-managed website assets or customer-delivery objects.
  原型图片资源改为正式网站资源或客户交付对象。

## Repository and deployment boundary
## 仓库与部署边界

The high-fidelity prototype remains in this public showcase repository for demonstration and visual reference. The real website, staff backend, API, database, authentication, and deployment implementation belong in the private production repository `daria-studio-platform`.
高保真原型继续保留在本公开展示仓库中，用于演示和视觉参考。真实网站、工作人员后台、API、数据库、认证和部署实现属于私有正式仓库 `daria-studio-platform`。

The production website is intended to be deployed on Tencent Cloud. The final Tencent Cloud architecture will be documented separately after the production technical choices are confirmed.
正式网站计划部署到腾讯云。具体腾讯云架构将在正式技术方案确认后单独记录。

## Not yet specified
## 尚未明确的范围

The following items are not excluded. They are not sufficiently defined by the current prototype and must be confirmed before implementation if they are required:
以下项目不是被排除的功能，但当前原型没有充分定义。如果需要实现，必须在开发前确认：

- Full booking submission and booking status management.
  完整预约提交和预约状态管理。
- Online payment, invoicing, refunds, and cancellation rules.
  在线支付、发票、退款和取消规则。
- Email, SMS, or other notification channels.
  邮件、短信或其他通知渠道。
- Password reset and account recovery details.
  密码重置和账户找回细节。
- Album expiry, download expiry, watermark, and sharing rules.
  相册有效期、下载有效期、水印和分享规则。
- Final service catalogue, pricing values, and operational policies.
  最终服务目录、具体价格和运营政策。

These items must not be silently invented or silently removed. They remain open decisions until confirmed.
这些项目不能被擅自臆造，也不能被擅自删除。在确认之前，它们保持为待决事项。

## Success criteria
## 成功标准

The production implementation satisfies this scope when:
当正式实现满足以下条件时，视为满足本范围：

1. Every prototype-visible capability has a corresponding production implementation or an explicitly confirmed replacement.
   原型中每项可见能力都有正式实现，或有明确确认的替代方案。
2. The completed production frontend must look and behave exactly like the approved prototype from the user's perspective, including page structure, layout, colors, typography, spacing, components, states, responsive presentation, and interactions. No visual deviation is allowed unless it is explicitly reviewed and confirmed.
   正式开发完成的网站前端从用户视角看必须与已确认原型一模一样，包括页面结构、布局、颜色、字体、间距、组件、状态、响应式表现和交互行为。除非经过明确审阅和确认，否则不允许出现视觉偏离。
3. Data, authentication, permissions, pricing, and albums are persisted and enforced by the production backend.
   数据、认证、权限、价格和相册由正式后端持久化并强制执行。
4. The website can be deployed and operated on Tencent Cloud without relying on prototype local storage or demo data.
   网站可以部署并运行在腾讯云上，不依赖原型本地存储或演示数据。

## Sources
## 来源

- Customer instruction: every function shown by the prototype must be implemented.
  客户指示：原型展示的每项功能都必须实现。
- `wiki/prototype/README.md` and `wiki/prototype/AGENTS.md`.
  `wiki/prototype/README.md` 和 `wiki/prototype/AGENTS.md`。
- Current high-fidelity prototype under `wiki/prototype/high-fidelity/`.
  `wiki/prototype/high-fidelity/` 下的当前高保真原型。
- Repository root `AGENTS.md` for public/private repository boundaries.
  仓库根目录 `AGENTS.md` 中关于公开仓库和私有仓库边界的规定。
