# ADR-008: Authentication Boundary / 认证边界

## Status / 状态

Accepted with deferred detail.

已接受，细节待定。

## Date / 日期

2026-08-07

## Context / 背景

Clients register by email themselves. Staff accounts are separate from client accounts. Staff roles are fixed as `owner` and `employee`; custom permission configuration is out of scope.

客户通过邮箱自主注册。工作人员账号与客户账号分离。工作人员角色固定为 `owner` 和 `employee`；自定义权限配置不在当前范围。

The exact authentication provider and session transport have not been selected.

具体认证服务商和会话传输方式尚未选择。

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

The exact provider and session transport remain deferred.

具体认证服务商和会话传输方式仍待定。

## Rationale / 理由

- Email registration matches the confirmed customer account requirement.
- Separating identity from profiles prevents accidental staff access for customer accounts.
- Fixed staff roles keep the first version simpler and safer.
- Deferring provider choice allows the team to compare self-managed FastAPI auth, a third-party auth provider, and Tencent-compatible options.

- 邮箱注册符合已确认的客户账号需求。
- 将认证身份与资料分离，可以避免客户账号意外获得工作人员访问。
- 固定工作人员角色让第一版更简单、更安全。
- 暂缓服务商选择，可以比较 FastAPI 自建认证、第三方认证和腾讯云兼容方案。

## Consequences / 影响

- The database needs `external_auth_user_id` or an equivalent identity reference.
- FastAPI must enforce staff role checks on every staff and owner endpoint.
- Next.js route protection is not enough; backend authorization is required.
- A later decision must choose session transport, such as secure HTTP-only cookies, bearer tokens, or a hybrid approach.

- 数据库需要 `external_auth_user_id` 或等价身份引用。
- FastAPI 必须在每个工作人员和老板接口上执行角色校验。
- Next.js 路由保护不够，必须由后端执行授权。
- 后续必须选择会话传输方式，例如安全 HTTP-only cookie、bearer token 或混合方式。

## Related Documents / 相关文档

- `wiki/product/roles-and-permissions.md`
- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/database-schema-draft.md`
