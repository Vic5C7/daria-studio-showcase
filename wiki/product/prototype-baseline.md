# Prototype Baseline
# 原型基线

The high-fidelity prototype in `wiki/prototype/high-fidelity/` is the approved visual and interaction baseline for the next implementation discussion.
`wiki/prototype/high-fidelity/` 中的高保真原型是下一阶段正式实现讨论的视觉和交互基线。

## Visible routes
## 可见路由

| Route | Purpose | 用途 |
|---|---|---|
| `/` | Public gallery and studio introduction. | 公开作品和工作室介绍。 |
| `/pricing` | Service and pricing exploration. | 服务和价格套餐浏览。 |
| `/auth` | Login and registration presentation. | 登录和注册展示。 |
| `/customers` | Admin customer list. | 管理员客户列表。 |
| `/album` | Client or admin album view. | 客户或管理员相册视图。 |

## Observed interaction baseline
## 已观察到的交互基线

- Chinese and English are available across the main experience.
  主流程支持中文和英文。
- The public navigation exposes Gallery, Pricing, language switching, and account access.
  公开导航包含作品、价格、语言切换和账户入口。
- Admin users can manage gallery content, flow sections, visibility, ordering, and bilingual copy.
  管理员可以管理作品内容、流程栏、可见性、排序和双语文案。
- Pricing is driven by selectable area, service type, school or scene, package, and add-ons.
  价格流程由地区、服务类型、学校或场景、套餐和加购项组成。
- Registry coverage supports extra location notes with an additional price and retouched-photo rule.
  注册/求婚跟拍支持额外地点备注，并有额外价格和精修数量规则。
- Client albums support gallery viewing, notes, and ZIP download behavior.
  客户相册支持浏览、备注和 ZIP 下载。

## Prototype-only behavior
## 仅属于原型的行为

The current prototype uses in-browser state and local storage for demonstration. Demo authentication, default content, and demo albums are not production requirements.
当前原型使用浏览器状态和本地存储进行演示。演示认证、默认内容和演示相册不属于正式需求。

## Visual invariants
## 视觉不变量

The production frontend should preserve layout hierarchy, typography, color direction, bilingual labels, pricing flow order, gallery presentation, and primary empty or unavailable states unless an explicit product decision changes them.
正式前端应保持布局层级、字体方向、颜色方向、双语标签、价格流程顺序、作品展示方式以及主要空状态或不可用状态，除非经过明确产品决策变更。

## Items requiring confirmation
## 需要确认的项目

- Final mobile and tablet behavior.
  最终移动端和平板端行为。
- Whether booking, payment, and invoicing are part of the first release.
  预约、支付和发票是否属于第一版。
- Final album permissions and download expiry rules.
  相册权限和下载有效期规则。
