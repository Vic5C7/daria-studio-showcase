# ADR-002: Backend Stack and Separation / 后端技术栈与前后端分离

## Status / 状态

Accepted.

已接受。

## Date / 日期

2026-08-07

## Context / 背景

The product needs backend-owned business rules for authentication, fixed role permissions, owner-only public content management, staff client gallery delivery, private file upload/download, retouch selection locking, 7-day selection expiry, 3-month storage deletion, zip package generation, and audit logging.

产品需要由后端负责的业务规则，包括认证、固定角色权限、仅老板可管理公开内容、员工客户相册交付、私有文件上传/下载、精修选择锁定、7 天选片过期、3 个月存储删除、压缩包生成和审计日志。

Python is preferred for backend readability, file processing, scheduled jobs, and future operational tasks.

Python 更适合后端可读性、文件处理、定时任务和后续运维任务。

## Decision / 决策

Use Python FastAPI as the backend and use a front-end/back-end separated architecture.

后端使用 Python FastAPI，并采用前后端分离架构。

## Rationale / 理由

- FastAPI is suitable for resource-oriented JSON APIs.
- Python is strong for zip generation, file workflows, cleanup jobs, and later image-adjacent processing.
- Separating frontend and backend keeps permission, lifecycle, and file access rules centralized.
- The architecture can still be deployed simply on Tencent Cloud in the first version.

- FastAPI 适合面向资源的 JSON API。
- Python 适合压缩包生成、文件流程、清理任务和后续图片相关处理。
- 前后端分离可以让权限、生命周期和文件访问规则集中在后端。
- 第一版仍可在腾讯云上保持相对简单的部署方式。

## Consequences / 影响

- API contracts between Next.js and FastAPI must be maintained intentionally.
- Authentication session handling between frontend and backend needs a clear design.
- Deployment will include at least a frontend runtime/build and a FastAPI service.
- Backend tests must cover permissions, lifecycle transitions, upload/download authorization, and deletion jobs.

- Next.js 与 FastAPI 之间的 API 契约需要被认真维护。
- 前后端之间的认证会话处理需要清晰设计。
- 部署至少包含前端运行时/构建产物和 FastAPI 服务。
- 后端测试必须覆盖权限、生命周期转换、上传/下载授权和删除任务。

## Related Documents / 相关文档

- `wiki/architecture/technical-architecture-draft.md`
- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/database-schema-draft.md`
