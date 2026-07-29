# API Contract Draft
# API 契约草案

This document will capture draft API boundaries for the production system.
本文档用于记录正式系统的 API 边界草案。

The API shape should be finalized after the database model and authentication approach are decided.
API 形态应在数据库模型和认证方式确定后再最终确认。

Expected API areas:
预期 API 区域：

- Public content APIs for customer-facing pages.
- 面向客户页面的公开内容 API。
- Admin content APIs for staff editing.
- 面向工作人员编辑的后台内容 API。
- Authentication and staff session APIs.
- 认证和工作人员会话 API。
- Draft, preview, and publish APIs.
- 草稿、预览和发布 API。
- Media upload or media management APIs.
- 媒体上传或媒体管理 API。

Current rule:
当前规则：

- Do not implement production APIs until the backend framework, database schema, and auth model are confirmed.
- 在后端框架、数据库结构和认证模型确认前，不实现正式 API。
