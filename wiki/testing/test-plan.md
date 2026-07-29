# Test Plan
# 测试计划

## Purpose
## 目的

Define how the DARIA STUDIO website will be verified as it grows from prototype to production system.
定义 DARIA STUDIO 网站从原型成长为正式系统时应如何验证。

## Test Scope
## 测试范围

- Customer-facing website.
- 客户可见网站。
- Staff admin interface.
- 工作人员后台。
- Public content APIs.
- 公开内容 API。
- Admin content APIs.
- 后台内容 API。
- Authentication and staff sessions.
- 认证和工作人员会话。
- Database-backed content relationships.
- 基于数据库的内容关系。
- Draft, preview, and publish workflow.
- 草稿、预览和发布流程。
- Media and gallery content.
- 媒体和作品展示内容。
- GitHub Pages prototype deployment while the prototype remains active.
- 原型仍有效期间的 GitHub Pages 原型部署。

## Test Types
## 测试类型

- Manual product review for prototype and visual flows.
- 针对原型和视觉流程的人工产品检查。
- Frontend component and page tests.
- 前端组件和页面测试。
- Backend API tests.
- 后端 API 测试。
- Database migration and seed checks.
- 数据库迁移和种子数据检查。
- End-to-end tests for critical customer and staff journeys.
- 针对关键客户和工作人员旅程的端到端测试。
- Deployment and Docker startup checks.
- 部署和 Docker 启动检查。

## Critical Journeys
## 关键旅程

- Customer opens the site and views gallery content.
- 客户打开网站并查看作品展示。
- Customer selects service area, service type, school, scene, package, and add-ons.
- 客户选择服务地区、服务类型、学校、场景、套餐和加购项。
- Customer sees correct estimated pricing.
- 客户看到正确的预计价格。
- Staff logs in.
- 工作人员登录。
- Staff edits service, package, add-on, and media content.
- 工作人员编辑服务、套餐、加购项和媒体内容。
- Staff saves draft changes without changing the public site.
- 工作人员保存草稿，且不影响公开网站。
- Staff previews and publishes content.
- 工作人员预览并发布内容。
- Customer page reads the latest published content.
- 客户页面读取最新发布内容。

## Validation Expectations
## 验证预期

- Every implemented user story should link to acceptance criteria.
- 每个已实现用户故事都应关联验收标准。
- Every acceptance criterion should have at least one planned test case.
- 每条验收标准都应至少有一个计划中的测试用例。
- Behaviour changes should include relevant automated tests when the framework exists.
- 框架确定后，行为变更应包含相关自动化测试。
- Prototype-only changes may use manual verification plus build checks.
- 仅原型变更可以使用人工验证加构建检查。
