# API Contract Draft
# API 契约草案

This is a conceptual contract for the private production platform. It is not an implementation commitment.
这是私有正式平台的概念契约，不是实现承诺。

## Public read APIs
## 公开读取 API

```text
GET /api/v1/site-content
GET /api/v1/service-areas
GET /api/v1/service-types?area={areaId}
GET /api/v1/pricing/options?serviceType={serviceTypeId}
POST /api/v1/price-estimates
```

## Authenticated client APIs
## 已认证客户 API

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/me
GET  /api/v1/me/albums
GET  /api/v1/albums/{albumId}
GET  /api/v1/albums/{albumId}/download
POST /api/v1/bookings
POST /api/v1/bookings/{bookingId}/notes
```

## Admin APIs
## 管理员 API

```text
GET   /api/v1/admin/customers
GET   /api/v1/admin/customers/{customerId}/albums
PATCH /api/v1/admin/site-content
PATCH /api/v1/admin/pricing-configurations/{configurationId}
POST  /api/v1/admin/albums
PATCH /api/v1/admin/albums/{albumId}
```

## Contract rules
## 契约规则

- All protected endpoints require server-side authorization.
  所有受保护接口都需要服务端授权。
- Error responses use one documented envelope with a stable machine-readable code.
  错误响应使用统一文档化结构，并包含稳定的机器可读代码。
- Price estimates return the configuration version and itemized components.
  价格估算返回配置版本和逐项价格组成。
- Album downloads must respect ownership, expiry, and rate-limit rules once confirmed.
  相册下载在规则确认后必须执行归属、有效期和频率限制。
