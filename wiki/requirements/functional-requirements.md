# Functional Requirements
# 功能需求

## Requirement status
## 需求状态

These requirements are extracted from the approved prototype and are a starting baseline for production design. A requirement is not considered implementation-ready until its unresolved business rules are answered.
以下需求从已确认原型中提取，是正式设计的起点。未解决的业务规则明确之前，需求不视为可以直接开发。

| ID | Requirement | 需求 | Priority |
|---|---|---|---|
| FR-001 | Visitors can browse a bilingual gallery. | 访客可以浏览双语作品。 | Must |
| FR-002 | Visitors can switch language without losing the current page context. | 访客切换语言时不丢失当前页面上下文。 | Must |
| FR-003 | Visitors can inspect available and unavailable service areas and service types. | 访客可以查看可用和暂不可用的地区及服务类型。 | Must |
| FR-004 | Visitors can calculate an estimated package total from valid selections. | 访客可以根据有效选择计算预计总价。 | Must |
| FR-005 | Pricing supports package-specific add-ons and notes. | 价格流程支持套餐相关加购项和备注。 | Must |
| FR-006 | The system shows a clear pending-price state when pricing is not confirmed. | 价格未确认时显示明确的待确认状态。 | Must |
| FR-007 | Clients can register, log in, log out, and access role-appropriate navigation. | 客户可以注册、登录、退出并看到对应角色导航。 | Must |
| FR-008 | Admins can manage visible gallery content and ordering. | 管理员可以管理作品的可见性和排序。 | Should |
| FR-009 | Admins can manage bilingual public copy and pricing configuration. | 管理员可以管理双语公开文案和价格配置。 | Should |
| FR-010 | Admins can find customers and open a customer album. | 管理员可以查找客户并打开客户相册。 | Must |
| FR-011 | Clients can view their own delivered album and download selected images. | 客户可以查看自己的交付相册并下载图片。 | Must |
| FR-012 | Client and admin album permissions are enforced server-side in production. | 正式系统在服务端执行客户和管理员相册权限。 | Must |

## Non-functional baseline
## 非功能基线

- The production frontend must reproduce the approved visual hierarchy responsively.
  正式前端必须响应式复现已确认的视觉层级。
- All customer-facing copy must support Chinese and English where the prototype provides both.
  原型提供双语的客户文案必须支持中文和英文。
- Production persistence, authentication, and authorization must not depend on browser local storage.
  正式持久化、认证和授权不能依赖浏览器本地存储。
- Price calculation must be deterministic, auditable, and covered by automated tests.
  价格计算必须可确定、可审计，并有自动化测试覆盖。
