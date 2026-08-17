# Domain Model
# 领域模型

The following model is a planning baseline. It is intentionally independent of the prototype's in-memory TypeScript structures.
以下模型是规划基线，有意与原型中的内存 TypeScript 结构解耦。

## Core entities
## 核心实体

| Entity | Responsibility | 责任 |
|---|---|---|
| User | Login identity and role. | 登录身份和角色。 |
| CustomerProfile | Customer contact and communication details. | 客户联系和沟通信息。 |
| ServiceArea | Location where services are offered. | 提供服务的地区。 |
| ServiceType | Type of photography service. | 摄影服务类型。 |
| Package | Base service price and included deliverables. | 基础服务价格和包含内容。 |
| AddOn | Optional priced service or item. | 可选的加购服务或项目。 |
| PricingConfiguration | Versioned rules used to calculate an estimate. | 用于计算报价的版本化规则。 |
| Booking | Customer request and selected service configuration. | 客户请求和服务选择。 |
| Album | Delivered image collection linked to a customer or booking. | 与客户或预约关联的交付图片集合。 |
| AlbumImage | One image in an album with ordering and download metadata. | 相册中的图片及其排序和下载信息。 |
| Note | Customer or staff communication attached to a relevant context. | 附加在相关上下文中的客户或工作人员沟通内容。 |

## Relationships
## 关系

- One user may have one customer profile.
  一个用户可以有一个客户资料。
- A booking belongs to a customer and references a selected package and add-ons.
  一个预约属于一个客户，并引用所选套餐和加购项。
- An album belongs to a customer and may be linked to a booking.
  一个相册属于一个客户，也可以关联一个预约。
- A pricing configuration contains effective-dated package and add-on rules.
  一个价格配置包含带生效时间的套餐和加购规则。
- Notes must include author, timestamp, and owning context in production.
  正式系统中的备注必须包含作者、时间和所属上下文。

## Modeling rules
## 建模规则

Pricing and availability should be data-driven. Display labels may be localized, but stable IDs must remain language-independent. Historical bookings must retain the price snapshot used at confirmation.
价格和可用性应数据驱动。展示标签可以本地化，但稳定 ID 必须与语言无关。历史预约必须保留确认时使用的价格快照。
