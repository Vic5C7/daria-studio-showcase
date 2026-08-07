# ADR-004: Database Platform / 数据库平台

## Status / 状态

Accepted with deferred detail.

已接受，细节待定。

## Date / 日期

2026-08-07

## Context / 背景

The product data is strongly relational: accounts, roles, public content, pricing catalog, reusable scene types, client galleries, original photos, retouch selections, final photos, download packages, audit logs, and background job records.

产品数据具有明显关系型特征：账号、角色、公开内容、价格目录、可复用场景类型、客户相册、底片、精修选择、最终图、下载压缩包、审计日志和后台任务记录。

The schema draft is PostgreSQL-oriented, but the exact managed PostgreSQL product is not selected.

Schema 草案面向 PostgreSQL，但具体托管 PostgreSQL 产品尚未选择。

## Decision / 决策

Use managed PostgreSQL as the database direction.

数据库方向使用托管 PostgreSQL。

Evaluate TencentDB for PostgreSQL, TDSQL-C for PostgreSQL, or another managed PostgreSQL-compatible option before production.

生产前评估 TencentDB for PostgreSQL、TDSQL-C for PostgreSQL 或其他托管 PostgreSQL 兼容方案。

## Rationale / 理由

- PostgreSQL fits relational data, constraints, lifecycle queries, audit logs, and JSONB bilingual content fields.
- Managed PostgreSQL reduces operational burden compared with running a database directly on the application server.
- PostgreSQL works well with Python FastAPI and SQLAlchemy/SQLModel.

- PostgreSQL 适合关系数据、约束、生命周期查询、审计日志和 JSONB 双语内容字段。
- 托管 PostgreSQL 比直接在应用服务器上自建数据库更能降低运维负担。
- PostgreSQL 与 Python FastAPI、SQLAlchemy/SQLModel 配合成熟。

## Consequences / 影响

- The first private implementation should use PostgreSQL-compatible migrations.
- The exact provider choice affects backups, connection limits, network setup, extensions such as `citext`, and cost.
- The database should store metadata and business state, not photo file bytes.

- 第一版私有实现应使用 PostgreSQL 兼容迁移。
- 具体服务商选择会影响备份、连接数、网络设置、`citext` 等扩展和成本。
- 数据库应存储元数据和业务状态，不存储照片文件二进制内容。

## Related Documents / 相关文档

- `wiki/architecture/database-schema-draft.md`
- `wiki/architecture/technical-architecture-draft.md`
