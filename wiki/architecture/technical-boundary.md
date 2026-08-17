# Technical Boundary
# 技术边界

## Public showcase repository
## 公开展示仓库

This repository contains the approved high-fidelity prototype, public sample assets, and product Wiki. It is suitable for GitHub Pages demonstration and product discussion.
本仓库包含已确认的高保真原型、公开样片素材和产品 Wiki，适合 GitHub Pages 展示和产品讨论。

## Private production repository
## 私有正式仓库

The future `daria-studio-platform` repository should contain the production frontend, backend API, CMS, database, authentication, authorization, storage integration, and deployment configuration.
未来的 `daria-studio-platform` 仓库应包含正式前端、后端 API、CMS、数据库、认证、授权、存储集成和部署配置。

## Proposed production boundaries
## 建议的正式边界

```text
Public browser
    -> Production frontend
    -> Backend API
       -> Authentication and authorization
       -> Domain services and price calculation
       -> Database
       -> Object storage for album images
```

公开浏览器 → 正式前端 → 后端 API → 认证授权、领域服务和价格计算、数据库、相册对象存储。

The frontend owns presentation and interaction. The backend owns authoritative data, permissions, pricing calculations, and audit-relevant changes.
前端负责展示和交互；后端负责权威数据、权限、价格计算以及需要审计的变更。

## Design constraints
## 设计约束

- Do not migrate prototype local storage directly into production.
  不要把原型本地存储直接迁移到正式系统。
- Do not allow the browser to be the authority for price or album permissions.
  不允许浏览器成为价格或相册权限的权威来源。
- Keep public customer experience, staff administration, and API permissions separate.
  保持客户体验、工作人员后台和 API 权限边界分离。
- Final framework, database, hosting, and authentication choices require explicit ADRs before production implementation.
  正式实现前，框架、数据库、托管和认证选择必须通过明确 ADR 确认。
