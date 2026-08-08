# ADR-009: Authentication Implementation / 认证实现方式

## Status / 状态

Accepted.

已接受。

## Date / 日期

2026-08-08

## Context / 背景

ADR-008 confirms the authentication boundary: client accounts and staff accounts are separate business profiles, staff roles are fixed as `owner` and `employee`, and clients register by email themselves.

ADR-008 已确认认证边界：客户账号和工作人员账号是分开的业务资料，工作人员角色固定为 `owner` 和 `employee`，客户通过邮箱自主注册。

Before this decision, the implementation needed to choose whether authentication would be managed inside the FastAPI backend, delegated to a third-party auth provider, or implemented through a Tencent-compatible external auth service.

在本决策前，实现层需要选择：认证由 FastAPI 后端自建管理，交给第三方认证服务，还是使用腾讯云兼容的外部认证服务。

The confirmed platform direction is:

已确认的平台方向是：

- Frontend: Next.js + React with light TypeScript.
- Backend: Python FastAPI.
- Architecture: front-end/back-end separated.
- Deployment cloud: Tencent Cloud, exact server product still TBD.
- First account milestone: login capability, with photo delivery designed for later implementation.

- 前端：Next.js + React + 轻量 TypeScript。
- 后端：Python FastAPI。
- 架构：前后端分离。
- 部署云：腾讯云，具体服务器产品仍待定。
- 第一阶段账号目标：先实现登录能力，同时为后续照片交付预留设计。

## Decision / 决策

Use first-party email/password authentication managed by the FastAPI backend for the first production implementation.

第一版正式实现使用由 FastAPI 后端管理的自建邮箱密码认证。

Detailed decisions:

具体决策：

- Store authentication identity in first-party auth tables, separate from client and staff business profiles.
- Use `auth_identities` as the internal authentication identity table.
- Link `client_accounts.auth_identity_id` and `staff_accounts.auth_identity_id` to the auth identity.
- Store password hashes only in auth identity records.
- Prefer Argon2id for password hashing. Use bcrypt only as a fallback if Argon2id is unavailable in the final runtime.
- Never store plaintext passwords or reversible encrypted passwords.
- Use backend-managed opaque server-side sessions for browser login.
- Transport the session with a Secure, HTTP-only, SameSite cookie.
- Require CSRF protection for cookie-authenticated state-changing requests.
- Require email verification before clients can access private gallery/download features.
- Require verified email and an active staff profile before staff workspace access.
- Staff accounts are created or enabled by the owner/admin path, not by public self-registration.
- Password reset tokens and email verification tokens must be single-use, time-limited, and stored as hashes.
- The first owner account should be bootstrapped through a one-time deployment/admin operation, then the owner manages employee accounts.

- 认证身份保存在第一方认证表中，并与客户/工作人员业务资料分开。
- 使用 `auth_identities` 作为内部认证身份表。
- `client_accounts.auth_identity_id` 和 `staff_accounts.auth_identity_id` 关联到认证身份。
- 密码哈希只保存在认证身份记录中。
- 密码哈希优先使用 Argon2id。如果最终运行环境无法使用 Argon2id，才使用 bcrypt 作为备选。
- 永远不保存明文密码，也不保存可逆加密密码。
- 浏览器登录使用后端管理的不透明服务端会话。
- 会话通过 Secure、HTTP-only、SameSite cookie 传输。
- 使用 cookie 认证的写操作必须具备 CSRF 防护。
- 客户访问私有相册/下载功能前必须完成邮箱验证。
- 工作人员访问工作人员端前必须完成邮箱验证，并拥有有效工作人员资料。
- 工作人员账号通过老板/管理员路径创建或启用，不开放公开自主注册。
- 密码重置 token 和邮箱验证 token 必须一次性、限时有效，并以哈希形式存储。
- 第一个老板账号通过一次性部署/管理操作初始化，之后由老板管理员工账号。

## Rationale / 理由

- A self-managed FastAPI auth model fits the confirmed Python backend direction and keeps early deployment under the application team's control.
- Opaque server-side sessions reduce the amount of credential material exposed to browser JavaScript.
- Secure HTTP-only cookies match a browser-based website and staff workspace better than storing bearer tokens in frontend state.
- CSRF protection is required because cookie sessions are sent automatically by browsers.
- Keeping auth identity separate from client/staff profiles preserves the confirmed product boundary and prevents client-only accounts from accidentally gaining staff access.
- Argon2id follows current password storage best practice; bcrypt remains a practical fallback where needed.
- Deferring third-party auth avoids early provider lock-in while the platform is still small and Tencent Cloud deployment details are not finalized.

- FastAPI 自建认证符合已确认的 Python 后端方向，也让早期部署更容易由应用团队掌控。
- 不透明服务端会话可以减少暴露给浏览器 JavaScript 的凭证材料。
- 对浏览器网站和工作人员端来说，Secure HTTP-only cookie 比把 bearer token 存在前端状态中更合适。
- 因为 cookie 会被浏览器自动携带，所以必须加入 CSRF 防护。
- 认证身份与客户/工作人员资料分离，可以保持已确认的产品边界，避免仅客户账号意外获得工作人员权限。
- Argon2id 符合当前密码存储最佳实践；bcrypt 在需要时作为现实可用的备选。
- 暂不接入第三方认证，可以避免在平台仍较小时过早绑定服务商，同时等待腾讯云具体部署方案确认。

## Alternatives Considered / 已考虑替代方案

### Third-Party Auth Provider / 第三方认证服务

This can reduce custom auth code and may provide mature account features faster. It is not selected for the first version because it adds provider configuration, pricing, data residency, deployment, and integration dependencies before the product's account flows are stable.

第三方认证服务可以减少自写认证代码，也可能更快提供成熟账号能力。第一版暂不选择，是因为在产品账号流程稳定前，它会增加服务商配置、价格、数据所在地、部署和集成依赖。

### Tencent-Compatible External Auth Service / 腾讯云兼容外部认证服务

This may become attractive if Tencent Cloud deployment later provides a well-matched managed identity product. It is deferred because the exact Tencent Cloud server product and deployment shape are still not selected.

如果后续腾讯云部署方案中有非常匹配的托管身份产品，这个方向可能值得重新考虑。当前暂缓，因为具体腾讯云服务器产品和部署形态仍未选择。

### Browser Bearer Token as Primary Session / 浏览器 bearer token 作为主要会话

This is not selected for the browser product. It makes frontend token storage and XSS exposure harder to reason about for this project. Bearer tokens may still be used later for server-to-server integrations or specialized APIs if needed.

浏览器端第一版不选择这种方式。对本项目来说，前端 token 存储和 XSS 暴露风险更难控制。如果后续需要服务端到服务端集成或特殊 API，仍可单独考虑 bearer token。

## Consequences / 影响

- The database schema should include `auth_identities`, `auth_sessions`, `auth_email_verification_tokens`, and `auth_password_reset_tokens`.
- `client_accounts` and `staff_accounts` should reference `auth_identities` instead of storing an external auth user ID.
- FastAPI owns authentication, session validation, CSRF validation, password reset, email verification, and role enforcement.
- Next.js owns only user-facing session display and route UX; it must not be the final authorization boundary.
- The platform needs an email delivery provider before email verification and password reset can work in production.
- Session expiry, logout, session revocation, login rate limiting, and audit logging must be implemented before production launch.
- A future ADR may replace self-managed auth with a third-party provider if scale, compliance, or operations needs change.

- 数据库 Schema 应包含 `auth_identities`、`auth_sessions`、`auth_email_verification_tokens` 和 `auth_password_reset_tokens`。
- `client_accounts` 和 `staff_accounts` 应引用 `auth_identities`，而不是保存外部认证用户 ID。
- FastAPI 负责认证、会话校验、CSRF 校验、密码重置、邮箱验证和角色执行。
- Next.js 只负责面向用户的会话显示和路由体验，不能成为最终授权边界。
- 生产环境启用邮箱验证和密码重置前，需要选择邮件发送服务商。
- 上线前必须实现会话过期、退出登录、会话撤销、登录频率限制和审计日志。
- 如果未来规模、合规或运维需求改变，可以用后续 ADR 将自建认证替换为第三方认证。

## Related Documents / 相关文档

- `wiki/decisions/adr-008-authentication-boundary.md`
- `wiki/architecture/technical-architecture-draft.md`
- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/database-schema-draft.md`

## External References / 外部参考

- OWASP Password Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP CSRF Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- FastAPI Security documentation: https://fastapi.tiangolo.com/tutorial/security/
