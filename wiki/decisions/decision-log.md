# Decision Log / 决策记录索引

## Document Purpose / 文档目的

This document indexes architecture decision records for the DARIA STUDIO platform planning work.

本文档索引 DARIA STUDIO 平台规划阶段的架构决策记录。

ADR status values:

ADR 状态值：

- Accepted: the decision is confirmed and should guide implementation.
- Accepted with deferred detail: the main direction is confirmed, but one or more implementation details remain open.
- Proposed: a recommended direction exists, but it still needs explicit confirmation.
- Superseded: the decision has been replaced by a later ADR.

- Accepted：决策已确认，应指导后续实现。
- Accepted with deferred detail：主要方向已确认，但仍有一个或多个实现细节待定。
- Proposed：已有推荐方向，但仍需明确确认。
- Superseded：该决策已被后续 ADR 替代。

## Architecture Decisions / 架构决策

| ADR | Title | Status | Date |
| --- | --- | --- | --- |
| [ADR-001](adr-001-frontend-stack.md) | Frontend Stack | Accepted | 2026-08-07 |
| [ADR-002](adr-002-backend-stack.md) | Backend Stack and Separation | Accepted | 2026-08-07 |
| [ADR-003](adr-003-production-cloud-platform.md) | Production Cloud Platform | Accepted with deferred detail | 2026-08-07 |
| [ADR-004](adr-004-database-platform.md) | Database Platform | Accepted with deferred detail | 2026-08-07 |
| [ADR-005](adr-005-object-storage.md) | Object Storage for Photo Assets | Accepted with deferred detail | 2026-08-07 |
| [ADR-006](adr-006-localization-data-storage.md) | Localization and Data Storage | Accepted with deferred detail | 2026-08-07 |
| [ADR-007](adr-007-api-style.md) | API Style | Accepted | 2026-08-07 |
| [ADR-008](adr-008-authentication-boundary.md) | Authentication Boundary | Accepted | 2026-08-07 |
| [ADR-009](adr-009-authentication-implementation.md) | Authentication Implementation | Accepted | 2026-08-08 |

| ADR | 标题 | 状态 | 日期 |
| --- | --- | --- | --- |
| [ADR-001](adr-001-frontend-stack.md) | 前端技术栈 | Accepted | 2026-08-07 |
| [ADR-002](adr-002-backend-stack.md) | 后端技术栈与前后端分离 | Accepted | 2026-08-07 |
| [ADR-003](adr-003-production-cloud-platform.md) | 生产云平台 | Accepted with deferred detail | 2026-08-07 |
| [ADR-004](adr-004-database-platform.md) | 数据库平台 | Accepted with deferred detail | 2026-08-07 |
| [ADR-005](adr-005-object-storage.md) | 照片资产对象存储 | Accepted with deferred detail | 2026-08-07 |
| [ADR-006](adr-006-localization-data-storage.md) | 多语言与数据存储 | Accepted with deferred detail | 2026-08-07 |
| [ADR-007](adr-007-api-style.md) | API 风格 | Accepted | 2026-08-07 |
| [ADR-008](adr-008-authentication-boundary.md) | 认证边界 | Accepted | 2026-08-07 |
| [ADR-009](adr-009-authentication-implementation.md) | 认证实现方式 | Accepted | 2026-08-08 |

## Remaining Decision Work / 剩余决策工作

The following details still need later confirmation:

以下细节后续仍需确认：

- Tencent Cloud server product: Lighthouse, CVM, container service, or serverless.
- Concrete managed PostgreSQL product: TencentDB for PostgreSQL, TDSQL-C for PostgreSQL, or another managed PostgreSQL option.
- Email delivery provider for account verification and password reset.
- Exact upload file types and file size limits.
- Zip package generation strategy.
- Public content publishing workflow: save-and-publish or draft-review-publish.

- 腾讯云服务器产品：Lighthouse、CVM、容器服务或 Serverless。
- 具体托管 PostgreSQL 产品：TencentDB for PostgreSQL、TDSQL-C for PostgreSQL，或其他托管 PostgreSQL 方案。
- 用于账号验证和密码重置的邮件发送服务商。
- 准确上传文件类型和文件大小限制。
- 压缩包生成策略。
- 公开内容发布流程：保存即发布，或草稿-复核-发布。
