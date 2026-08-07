# ADR-003: Production Cloud Platform / 生产云平台

## Status / 状态

Accepted with deferred detail.

已接受，细节待定。

## Date / 日期

2026-08-07

## Context / 背景

Production deployment needs to host the public website, staff workspace, Python FastAPI backend, PostgreSQL database, object storage, scheduled jobs, and future file-processing workflows.

生产部署需要承载公开网站、工作人员端、Python FastAPI 后端、PostgreSQL 数据库、对象存储、定时任务和后续文件处理流程。

The deployment provider has been confirmed as Tencent Cloud, while the exact server product has not been selected.

部署服务商已确认为腾讯云，但具体服务器产品尚未选择。

## Decision / 决策

Use Tencent Cloud as the production cloud platform.

生产云平台使用腾讯云。

The first server product remains deferred. Candidate options are Lighthouse, CVM, container service, or serverless.

第一版服务器产品暂不确定。候选包括 Lighthouse、CVM、容器服务或 Serverless。

## Rationale / 理由

- Tencent Cloud matches the confirmed deployment direction.
- Keeping compute, PostgreSQL, object storage, and scheduled jobs in one cloud can reduce operational fragmentation.
- Lighthouse may be enough for a small MVP.
- CVM may be better if the first production version needs more control over Docker, Nginx, frontend/backend processes, and background workers.

- 腾讯云符合已确认的部署方向。
- 将计算、PostgreSQL、对象存储和定时任务尽量放在同一云平台，可以减少运维碎片化。
- 小型 MVP 可能使用 Lighthouse 就足够。
- 如果第一版生产环境需要更强控制力，CVM 可能更适合 Docker、Nginx、前后端进程和后台 worker。

## Consequences / 影响

- Architecture should avoid assuming Vercel, Cloudflare, Supabase Hosting, or another non-Tencent deployment-specific feature.
- Server selection must happen before production deployment planning.
- Deployment documentation should compare operational cost, maintenance burden, scaling path, and background job support.

- 架构不应依赖 Vercel、Cloudflare、Supabase Hosting 或其他非腾讯云部署特有能力。
- 在生产部署规划前，必须先选择服务器类型。
- 部署文档应比较运维成本、维护负担、扩展路径和后台任务支持。

## Related Documents / 相关文档

- `wiki/architecture/technical-architecture-draft.md`
- `wiki/architecture/database-schema-draft.md`
