# Acceptance Criteria
# 验收标准

## Public experience
## 公开体验

### AC-001 Gallery

- Given a visitor opens the home page, the gallery and studio introduction are visible.
  当访客打开首页时，可以看到作品和工作室介绍。
- Given the visitor changes language, visible supported copy changes without navigating away.
  当访客切换语言时，已支持的文案切换且不离开当前页面。
- Given an image is unavailable or hidden, it is not presented as an available public item.
  当图片不可用或被隐藏时，不应作为可用公开内容展示。

### AC-002 Pricing

- Given a valid area, service type, and package are selected, the estimated total is calculated from the configured price components.
  当选择有效地区、服务类型和套餐后，预计总价根据配置的价格组成计算。
- Given a service is unavailable, the UI clearly communicates that it cannot currently be selected.
  当服务不可用时，界面明确说明当前不能选择。
- Given a price is pending confirmation, the UI does not present a false final price.
  当价格待确认时，界面不能展示虚假的最终价格。
- Given a user adds notes, blank notes are ignored and the configured per-section limit is enforced.
  当用户添加备注时，空备注被忽略，并执行每栏备注数量限制。

## Authentication and permissions
## 认证和权限

### AC-003 Roles

- Given a signed-out visitor, admin-only routes are not accessible.
  当用户未登录时，不能访问管理员专属路由。
- Given a client signs in, the client can access only the client experience and own album.
  当客户登录后，只能访问客户体验和自己的相册。
- Given an admin signs in, customer management and content management are available.
  当管理员登录后，可以使用客户管理和内容管理能力。
- Production authorization is enforced by the server, not only by frontend route visibility.
  正式授权必须由服务端执行，不能只依赖前端路由隐藏。

## Albums
## 相册

### AC-004 Album access

- Given a client opens an album, only the album associated with that client is returned.
  当客户打开相册时，只返回与该客户关联的相册。
- Given an admin opens a customer album, the selected customer context is visible and correct.
  当管理员打开客户相册时，客户上下文正确且清晰可见。
- Given an album has no images, the empty state explains what happens next.
  当相册没有图片时，空状态说明下一步如何处理。
- Given image download is requested, the system reports success or failure clearly.
  当用户请求下载图片时，系统明确报告成功或失败。
