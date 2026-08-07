# ADR-007: API Style / API 风格

## Status / 状态

Accepted.

已接受。

## Date / 日期

2026-08-07

## Context / 背景

The frontend and backend are separated. The Next.js frontend needs a stable contract with the Python FastAPI backend for public content, pricing, authentication, client galleries, staff delivery workflows, owner content management, storage, and internal jobs.

前后端已经分离。Next.js 前端需要与 Python FastAPI 后端有稳定契约，用于公开内容、价格、认证、客户相册、工作人员交付流程、老板内容管理、文件存储和内部任务。

## Decision / 决策

Use REST-style JSON APIs under a versioned base path:

使用版本化基础路径下的 REST 风格 JSON API：

```text
/api/v1
```

Use `camelCase` JSON fields for frontend friendliness. The Python backend may map these fields to internal `snake_case` models.

JSON 字段使用 `camelCase`，方便前端使用。Python 后端可以映射到内部 `snake_case` 模型。

## Rationale / 理由

- REST-style endpoints are understandable for the product's resource model.
- Versioning gives room for future API changes.
- JSON payloads are sufficient for current flows, while upload/download endpoints can issue signed URLs or tokens.
- `camelCase` keeps TypeScript frontend payloads natural.

- REST 风格接口适合当前产品的资源模型。
- 版本化给未来 API 变更留出空间。
- JSON 数据足以覆盖当前流程，上传/下载接口可以签发签名 URL 或 token。
- `camelCase` 更贴近 TypeScript 前端使用方式。

## Consequences / 影响

- API contract documentation must be kept in sync with FastAPI implementation.
- Backend should return consistent error shapes and status codes.
- Public read APIs may be cached; authenticated and staff endpoints should not be publicly cached.
- Upload/download flows need explicit token or signed URL contracts.

- API 契约文档必须与 FastAPI 实现保持同步。
- 后端应返回统一错误结构和状态码。
- 公开读取 API 可以缓存；认证和工作人员接口不应公开缓存。
- 上传/下载流程需要明确 token 或签名 URL 契约。

## Related Documents / 相关文档

- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/technical-architecture-draft.md`
