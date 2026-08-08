# ADR-008: Authentication Boundary / 认证边界

## Status / 状态

Accepted.

已接受。

## Date / 日期

2026-08-07

## Context / 背景

Clients register by email themselves. Staff accounts are separate from client accounts. Staff roles are fixed as `owner` and `employee`; custom permission configuration is out of scope.

客户通过邮箱自主注册。工作人员账号与客户账号分离。工作人员角色固定为 `owner` 和 `employee`；自定义权限配置不在当前范围。

The authentication implementation is selected separately in ADR-009.

认证实现方式已在 ADR-009 中单独选择。

## Decision / 决策

Use email-based authentication as the product login model.

产品登录模型使用邮箱认证。

Keep authentication identity separate from business profiles:

认证身份与业务资料分开：

- `client_accounts` represents customer profile and client access.
- `staff_accounts` represents staff profile and staff workspace access.
- A client-only account cannot access staff endpoints.
- Staff access requires a staff profile with role `owner` or `employee`.

- `client_accounts` 表示客户资料和客户访问。
- `staff_accounts` 表示工作人员资料和工作人员端访问。
- 仅客户账号不能访问工作人员接口。
- 工作人员访问必须拥有工作人员资料，角色为 `owner` 或 `employee`。

The provider and session transport are decided in ADR-009.

认证服务与会话传输方式已在 ADR-009 中决定。

## Rationale / 理由

- Email registration matches the confirmed customer account requirement.
- Separating identity from profiles prevents accidental staff access for customer accounts.
- Fixed staff roles keep the first version simpler and safer.
- Keeping the boundary decision separate from the implementation decision makes account rules stable even if auth technology changes later.

- 邮箱注册符合已确认的客户账号需求。
- 将认证身份与资料分离，可以避免客户账号意外获得工作人员访问。
- 固定工作人员角色让第一版更简单、更安全。
- 将边界决策与实现决策分开，可以让账号规则保持稳定，即使后续认证技术发生变化。

## Consequences / 影响

- The database needs an internal auth identity reference.
- FastAPI must enforce staff role checks on every staff and owner endpoint.
- Next.js route protection is not enough; backend authorization is required.
- ADR-009 selects FastAPI-managed email/password authentication with server-side cookie sessions.

- 数据库需要内部认证身份引用。
- FastAPI 必须在每个工作人员和老板接口上执行角色校验。
- Next.js 路由保护不够，必须由后端执行授权。
- ADR-009 选择 FastAPI 自建邮箱密码认证，并使用服务端 cookie 会话。

## Related Documents / 相关文档

- `wiki/product/roles-and-permissions.md`
- `wiki/decisions/adr-009-authentication-implementation.md`
- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/database-schema-draft.md`
