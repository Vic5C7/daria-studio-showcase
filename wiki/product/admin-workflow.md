# Admin Workflow
# 后台工作流

This document describes the intended staff workflow for managing DARIA STUDIO website content.
本文档描述工作人员管理 DARIA STUDIO 网站内容的目标流程。

It is a product workflow document, not a final technical design.
它是产品流程文档，不是最终技术设计。

## Purpose
## 目的

The admin workflow should let studio staff update public website content without asking a developer to change code.
后台工作流应允许工作室工作人员无需开发者改代码即可更新公开网站内容。

The workflow should reduce accidental public changes by separating draft editing, preview, and publishing.
该流程应通过区分草稿编辑、预览和发布，降低误改公开内容的风险。

## Staff Roles
## 工作人员角色

Staff member:
工作人员：

- Creates or edits website content.
- 创建或编辑网站内容。
- Saves drafts and previews changes.
- 保存草稿并预览变更。
- Publishes content if the first production version only has one staff role.
- 如果第一版正式系统只有一种工作人员角色，则该角色也可以发布内容。

Studio owner or administrator:
工作室负责人或管理员：

- Reviews important public-facing changes.
- 审核重要的公开内容变更。
- Controls final publishing rules if role separation is added later.
- 如果后续加入角色区分，则负责控制最终发布规则。
- Decides pricing, service availability, and content policy.
- 决定价格、服务可用性和内容策略。

## Editable Content Areas
## 可编辑内容区域

- Service areas, such as Melbourne and Shanghai.
- 服务地区，例如墨尔本和上海。
- Service types, such as graduation photography, registry wedding coverage, ID photos, wedding portraits, and lifestyle portraits.
- 服务类型，例如毕业照、注册结婚跟拍、证件照、婚纱照和日常写真。
- Schools for graduation photography.
- 毕业照相关学校。
- Scene types, such as University of Melbourne single scene or University of Melbourne plus Carlton Garden.
- 场景类型，例如墨尔本大学单场景，或墨尔本大学加 Carlton Garden。
- Packages, including price, currency, included deliverables, and availability.
- 套餐，包括价格、货币、包含内容和可用状态。
- Add-on categories and add-on items, including clothing, props, makeup, styling, and future categories.
- 加购类别和加购项，包括服装、道具、妆造、造型和未来新增类别。
- Gallery and media assets, including category assignment and display order.
- 作品展示和媒体素材，包括分类归属和展示顺序。
- Approved bilingual customer-facing copy.
- 已确认可编辑的客户可见双语文案。

## Primary Admin Flow
## 主要后台流程

1. Staff member opens the admin login page.
1. 工作人员打开后台登录页面。
2. Staff member signs in.
2. 工作人员登录。
3. Staff member chooses a content area to manage.
3. 工作人员选择要管理的内容区域。
4. Staff member selects an existing item or creates a new item.
4. 工作人员选择已有项目或创建新项目。
5. Staff member edits required fields, bilingual copy, prices, availability, and relationships.
5. 工作人员编辑必填字段、双语文案、价格、可用状态和内容关系。
6. System validates required fields and obvious relationship problems.
6. 系统校验必填字段和明显的关系问题。
7. Staff member saves the content as a draft.
7. 工作人员将内容保存为草稿。
8. Staff member previews how the draft will appear on the customer-facing website.
8. 工作人员预览草稿在客户网站上的显示效果。
9. Staff member publishes the approved draft.
9. 工作人员发布已确认草稿。
10. Customer-facing pages read the newly published content.
10. 客户页面读取最新发布内容。

## Draft And Publish States
## 草稿与发布状态

Draft:
草稿：

- Visible to staff in the admin area.
- 在后台对工作人员可见。
- Not visible on the public customer website.
- 不显示在公开客户网站上。
- Can be edited repeatedly before publishing.
- 发布前可以反复编辑。

Preview:
预览：

- Shows staff how draft content will look to customers.
- 向工作人员展示草稿内容对客户的显示效果。
- Must be clearly marked as draft or preview content.
- 必须清楚标记为草稿或预览内容。
- Should not be indexed or treated as a public page.
- 不应被当作公开页面或被索引。

Published:
已发布：

- Visible on the customer-facing website.
- 在客户可见网站上展示。
- Used by public pricing, gallery, and service pages.
- 被公开价格、作品展示和服务页面使用。
- Should preserve enough history to review what changed later, if version history is added.
- 如果后续加入版本历史，应保留足够信息以便回看变更。

## Content Relationship Rules
## 内容关系规则

- A service type should belong to one or more service areas.
- 一个服务类型应属于一个或多个服务地区。
- A school should only appear where graduation photography is available.
- 学校应只在毕业照可用时出现。
- A scene type should belong to the correct school or service context.
- 场景类型应属于正确的学校或服务上下文。
- A package should belong to the relevant scene type or service type.
- 套餐应属于相关场景类型或服务类型。
- Add-ons should have clear availability rules, such as global, service-specific, school-specific, or scene-specific availability.
- 加购项应有清楚的可用性规则，例如全局、按服务、按学校或按场景可用。
- Gallery images should support service, school, scene, or photo spot categories.
- 作品图片应支持服务、学校、场景或打卡点分类。

## Error Prevention
## 防错机制

- Staff should not be able to publish incomplete required fields.
- 工作人员不应能发布缺少必填字段的内容。
- Staff should clearly see whether they are editing draft or published content.
- 工作人员应清楚看到自己正在编辑草稿内容还是已发布内容。
- Price and currency fields should be explicit.
- 价格和货币字段应明确。
- Bilingual customer-facing fields should make missing translation states visible.
- 面向客户的双语字段应清楚显示缺失翻译状态。
- Deleting or unpublishing content should warn staff when public pages depend on it.
- 删除或下架内容时，如果公开页面依赖该内容，应提醒工作人员。

## Out Of Scope For The First Formal Build
## 第一版正式系统暂不包含

- Customer accounts.
- 客户账号。
- Online payment.
- 在线支付。
- Full order management.
- 完整订单管理。
- Complex staff role hierarchy unless the owner explicitly requires it.
- 复杂工作人员角色层级，除非负责人明确要求。
- Fully automated media review unless image upload requirements are confirmed.
- 全自动媒体审核，除非图片上传需求已确认。

## Related Documents
## 相关文档

- `wiki/user-stories/stories-by-epic.md`
- `wiki/user-stories/stories-by-epic.md`
- `wiki/acceptance-criteria/`
- `wiki/acceptance-criteria/`
- `wiki/architecture/content-model.md`
- `wiki/architecture/content-model.md`
- `wiki/architecture/data-model-draft.md`
- `wiki/architecture/data-model-draft.md`
- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/api-contract-draft.md`

## Open Questions
## 待确认问题

- Does the first production version need separate editor and publisher roles?
- 第一版正式系统是否需要区分编辑者和发布者角色？
- Should published content keep full version snapshots or per-item revisions?
- 已发布内容应保存完整版本快照，还是保存单项修订？
- Should media upload include compression, crop guidance, or manual review before publishing?
- 媒体上传在发布前是否需要压缩、裁剪指引或人工审核？
- Should unpublished content remain accessible through direct preview links for customer review?
- 未发布内容是否需要通过直接预览链接供客户确认？
