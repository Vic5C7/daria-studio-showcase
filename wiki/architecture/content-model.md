# Content Model / 内容模型

## Document Purpose / 文档目的

This document defines the editable content model for the DARIA STUDIO product. It describes what content exists, who can manage it, which fields are bilingual, and which fields are shared across languages.

本文档定义 DARIA STUDIO 产品的可编辑内容模型，说明系统中有哪些内容、谁可以管理、哪些字段需要双语、哪些字段跨语言共享。

This is a product and architecture planning document, not a database schema or implementation plan.

本文档是产品与架构规划文档，不是数据库表结构或技术实现方案。

## Model Boundaries / 模型边界

In scope:

范围内：

- Customer-facing public content.
- Staff-managed editable business content.
- Gallery and pricing content currently represented in the high-fidelity prototype.
- Future client gallery delivery content that must be modeled before production development.
- Bilingual content structure for Simplified Chinese and English.

- 客户可见公开内容。
- 工作人员端管理的可编辑业务内容。
- 当前高保真原型中已有的作品展示和价格套餐内容。
- 后续客户相册交付流程需要提前建模的内容。
- 简体中文和英文双语内容结构。

Out of scope:

当前不做：

- Production database table design.
- File storage implementation.
- Authentication implementation.
- API contract details.
- Payment, booking, deposit, or calendar scheduling content.

- 生产数据库表设计。
- 文件存储实现。
- 登录认证实现。
- API 契约细节。
- 支付、预约、定金或日历排期内容。

## Editing Ownership / 编辑权归属

- Owner can create, edit, delete, reorder, publish, and hide customer-facing website content.
- Employee can manage client gallery delivery content, such as original photo galleries and final retouched photo uploads.
- Employee cannot edit public website content, service content, pricing content, gallery categories, public gallery images, or bilingual business copy.
- Client can create client-entered content only in the client account flow, such as retouch notes.
- Visitor cannot create or edit content.

- 老板可以新增、编辑、删除、排序、发布和隐藏客户可见网站内容。
- 员工可以管理客户相册交付内容，例如底片相册和最终精修图上传。
- 员工不能编辑公开网站内容、服务内容、价格内容、作品分类、公开作品图片或双语业务文案。
- 客户只能在客户账号流程中创建客户输入内容，例如修图备注。
- 访客不能创建或编辑内容。

## Localization Field Rules / 多语言字段规则

The product uses a three-layer localization model:

产品使用三层多语言模型：

- Fixed interface copy: product-controlled UI text such as buttons, labels, validation messages, empty states, and system prompts.
- Editable business content: owner-managed customer-facing content such as gallery names, package names, add-on names, and page copy.
- Localized formatting and display rules: dynamic output such as price labels, countdowns, dates, and generated inquiry summary labels.

- 固定界面文案：由产品控制的 UI 文案，例如按钮、标签、校验提示、空状态和系统提示。
- 可编辑业务内容：由老板管理的客户可见内容，例如作品分类名称、套餐名称、加购项名称和页面文案。
- 本地化格式和展示规则：动态输出，例如价格标签、倒计时、日期和自动生成的咨询信息汇总标签。

Localized fields:

需要双语的字段：

- Customer-facing names.
- Customer-facing descriptions.
- Package details.
- Add-on descriptions.
- Gallery category names.
- Studio shoot display set names.
- Image alt text.
- Public page copy.
- Empty-state copy and helper copy when managed as business content.

- 客户可见名称。
- 客户可见说明。
- 套餐详情。
- 加购项说明。
- 作品分类名称。
- 棚拍展示集名称。
- 图片替代文本。
- 公开页面文案。
- 被作为业务内容管理的空状态和辅助说明。

Shared fields:

跨语言共享字段：

- Price.
- Currency.
- Sort order.
- Availability status.
- Publish status.
- Image reference.
- Gallery category type.
- Service relationship.
- Package relationship.
- Add-on relationship.
- Photo count limits.
- Expiration and countdown rules.

- 价格。
- 货币。
- 排序。
- 可用状态。
- 发布状态。
- 图片引用。
- 作品分类类型。
- 服务关系。
- 套餐关系。
- 加购关系。
- 图片数量限制。
- 过期和倒计时规则。

Validation rules:

校验规则：

- Required customer-facing names should have both Chinese and English values before publishing.
- Optional descriptions may be empty, but if only one language is filled, the staff workspace should show a missing translation warning.
- Client-entered notes should never be automatically translated.
- Language switching should preserve selected options and client-entered text.

- 客户可见必填名称在发布前应同时具备中文和英文。
- 可选说明可以为空，但如果只填写一种语言，工作人员端应显示缺失翻译提醒。
- 客户填写的备注绝不应自动翻译。
- 切换语言时应保留已选选项和客户输入文本。

## Common Content Fields / 通用内容字段

Most editable content types should share a consistent set of fields.

大多数可编辑内容类型应共享一组一致字段。

| Field | Meaning | Localized? |
| --- | --- | --- |
| ID | Stable internal identifier | No |
| Name | Customer-facing or staff-facing title | Usually yes |
| Description | Optional explanatory copy | Usually yes |
| Sort order | Display order | No |
| Status | Draft, published, hidden, or deleted | No |
| Availability | Available, unavailable, coming soon, or archived | No |
| Created timestamp | Creation time | No |
| Updated timestamp | Last update time | No |

| 字段 | 含义 | 是否双语 |
| --- | --- | --- |
| ID | 稳定内部标识 | 否 |
| 名称 | 客户可见或工作人员可见标题 | 通常是 |
| 说明 | 可选说明文案 | 通常是 |
| 排序 | 展示顺序 | 否 |
| 状态 | 草稿、已发布、隐藏或已删除 | 否 |
| 可用状态 | 可用、不可用、暂未开放或已归档 | 否 |
| 创建时间 | 创建时间 | 否 |
| 更新时间 | 最近更新时间 | 否 |

## Public Site Content / 公开网站内容

### Brand Content / 品牌内容

Purpose:

用途：

- Controls the main customer-facing brand presentation.
- 控制客户可见的主要品牌展示。

Fields:

字段：

- Brand name.
- Tagline.
- Intro copy.
- Primary call-to-action labels when managed as business content.

- 品牌名称。
- 标语。
- 简介文案。
- 被作为业务内容管理的主按钮文案。

Rules:

规则：

- Brand name may be shared across languages if the same spelling is used.
- Tagline and intro copy should be localized.
- Owner can edit brand content.
- Employee cannot edit brand content.

- 如果品牌名称在两种语言中写法相同，可以跨语言共享。
- 标语和简介文案应双语。
- 老板可以编辑品牌内容。
- 员工不能编辑品牌内容。

### Page Copy / 页面文案

Purpose:

用途：

- Stores owner-managed public page copy outside fixed interface copy.
- 存储由老板管理、且不属于固定界面文案的公开页面文案。

Examples:

示例：

- Gallery section headings.
- Pricing page introduction.
- Policy copy related to retouch selection, download, and deletion windows.
- Helper copy around customer choices.

- 作品展示区标题。
- 价格页介绍。
- 与精修选择、下载和删除期限相关的政策文案。
- 围绕客户选择的辅助说明。

Rules:

规则：

- Page copy should support Chinese and English.
- Missing translations should warn before publishing.
- Fixed system text should remain in the fixed interface copy layer, not in page copy.

- 页面文案应支持中文和英文。
- 发布前缺失翻译应显示提醒。
- 固定系统文案应留在固定界面文案层，不应混入页面文案。

## Gallery Content / 作品展示内容

### Gallery Category / 作品分类

Purpose:

用途：

- Groups public gallery content by service or display type.
- 按服务或展示类型组织公开作品内容。

Fields:

字段：

- Category name.
- Category type: normal or studio shoot.
- Sort order.
- Publish status.
- Availability or visibility status.
- Empty-state copy if customized.

- 分类名称。
- 分类类型：普通分类或棚拍分类。
- 排序。
- 发布状态。
- 可用或可见状态。
- 自定义空状态文案。

Rules:

规则：

- Owner can add, edit, delete, reorder, publish, and hide gallery categories.
- Employee cannot edit gallery categories.
- A normal gallery category can contain 0 to 20 images.
- A normal gallery category with 0 images displays the empty state.
- The studio shoot category uses display sets instead of a flat 0 to 20 image limit.

- 老板可以新增、编辑、删除、排序、发布和隐藏作品分类。
- 员工不能编辑作品分类。
- 普通作品分类可包含 0 到 20 张图片。
- 普通作品分类 0 张图片时显示空状态。
- 棚拍分类使用展示集结构，而不是普通分类的 0 到 20 张图片限制。

### Public Gallery Image / 公开作品图片

Purpose:

用途：

- Represents a customer-facing image in a normal gallery category or studio shoot display set.
- 表示普通作品分类或棚拍展示集中的客户可见图片。

Fields:

字段：

- Image reference.
- Alt text in Chinese and English.
- Sort order.
- Publish status.
- Optional caption if later needed.

- 图片引用。
- 中文和英文替代文本。
- 排序。
- 发布状态。
- 后续如需要可增加图片说明。

Rules:

规则：

- Image binary storage is a technical detail and should be decided later.
- Public gallery images are shared across languages.
- Alt text should support Chinese and English.
- Owner can manage public gallery images.
- Employee cannot manage public gallery images.

- 图片二进制存储属于技术细节，后续再决定。
- 公开作品图片在不同语言间共享。
- 图片替代文本应支持中文和英文。
- 老板可以管理公开作品图片。
- 员工不能管理公开作品图片。

### Studio Shoot Display Set / 棚拍展示集

Purpose:

用途：

- Groups studio shoot sample photos into named display sets.
- 将棚拍样片组织成带名称的展示集。

Fields:

字段：

- Display set name.
- Image list.
- Sort order.
- Publish status.

- 展示集名称。
- 图片列表。
- 排序。
- 发布状态。

Rules:

规则：

- Studio shoot display set names are editable and bilingual.
- Each published studio shoot display set contains 1 to 9 images.
- The modal layout displays up to 3 by 3 images.
- Modal content should remain centered regardless of image count.
- Owner can manage studio shoot display sets.
- Employee cannot manage studio shoot display sets.

- 棚拍展示集名称可编辑且支持双语。
- 每个已发布棚拍展示集包含 1 到 9 张图片。
- 弹窗布局最多展示 3 乘 3 图片。
- 无论图片数量多少，弹窗内容都应居中。
- 老板可以管理棚拍展示集。
- 员工不能管理棚拍展示集。

## Pricing Content / 价格与服务内容

### Service Area / 服务地区

Purpose:

用途：

- Defines where services are offered.
- 定义服务可提供的地区。

Fields:

字段：

- Area name.
- Sort order.
- Availability status.

- 地区名称。
- 排序。
- 可用状态。

Rules:

规则：

- Owner can add, edit, delete, and reorder service areas.
- Service area name should be bilingual.
- Service area can contain 0 or more service types.

- 老板可以新增、编辑、删除和排序服务地区。
- 服务地区名称应双语。
- 一个服务地区可以包含 0 个或多个服务类型。

### Service Type / 服务类型

Purpose:

用途：

- Defines the type of photography service available in a service area.
- 定义某个服务地区下可选择的摄影服务类型。

Fields:

字段：

- Service type name.
- Service area relationship.
- Availability status.
- Sort order.
- Optional description.

- 服务类型名称。
- 所属服务地区关系。
- 可用状态。
- 排序。
- 可选说明。

Rules:

规则：

- Owner can add, edit, delete, and reorder service types.
- Service type name should be bilingual.
- Unavailable service types should be visibly marked as unavailable or coming soon.

- 老板可以新增、编辑、删除和排序服务类型。
- 服务类型名称应双语。
- 不可用服务类型应明确显示不可用或暂未开放。

### School / 学校

Purpose:

用途：

- Supports graduation photography selection flows.
- 支持毕业照选择流程。

Fields:

字段：

- School name.
- Sort order.
- Availability status.

- 学校名称。
- 排序。
- 可用状态。

Rules:

规则：

- School names should be bilingual.
- Schools can be related to reusable scene types.
- Owner can manage schools.

- 学校名称应双语。
- 学校可关联可复用的场景类型。
- 老板可以管理学校。

### Scene Type / 场景类型

Purpose:

用途：

- Defines graduation photography scene options, such as campus, campus plus Carlton Garden, or studio shoot.
- 定义毕业照场景选项，例如校园、校园加 Carlton Garden、棚拍等。

Fields:

字段：

- Scene type name.
- Description.
- Preview image.
- Related school.
- Sort order.
- Availability status.

- 场景类型名称。
- 说明。
- 预览图。
- 关联学校。
- 排序。
- 可用状态。

Rules:

规则：

- Scene type name and description should be bilingual.
- Preview image is shared across languages.
- Scene type is a reusable general content type.
- Owner can edit the specific information for each scene type.
- Scene type can have one or more packages, unless it uses a fixed package.

- 场景类型名称和说明应双语。
- 预览图跨语言共享。
- 场景类型是可复用的通用内容类型。
- 老板可以编辑每个场景类型的具体信息。
- 场景类型可以有一个或多个套餐，除非使用固定套餐。

### Package / 套餐

Purpose:

用途：

- Defines a purchasable or selectable photography package in the pricing flow.
- 定义价格流程中可选择的摄影套餐。

Fields:

字段：

- Package name.
- Related service type or scene type.
- Price in AUD.
- Package details.
- Included original photo count as a numeric value if applicable.
- Included retouched photo count if applicable.
- Sort order.
- Availability status.

- 套餐名称。
- 关联服务类型或场景类型。
- AUD 价格。
- 套餐详情。
- 如适用，以数字记录包含底片数量。
- 如适用，包含精修数量。
- 排序。
- 可用状态。

Rules:

规则：

- Package name and details should be bilingual.
- Price is shared across languages.
- Included original photo count should be modeled as a numeric shared field when applicable.
- Included retouch count should be modeled as a shared rule so client selection limits can be calculated later.
- Owner can manage packages.
- Employee cannot manage packages.

- 套餐名称和详情应双语。
- 价格跨语言共享。
- 如适用，套餐包含底片数量应建模为数字型共享字段。
- 套餐包含精修数量应建模为共享规则，方便后续计算客户选片上限。
- 老板可以管理套餐。
- 员工不能管理套餐。

### Add-on Group / 加购分组

Purpose:

用途：

- Groups add-on items such as clothing, props, makeup, styling, or extra services.
- 组织加购项，例如服装、道具、妆造或额外服务。

Fields:

字段：

- Group name.
- Related service type or package context.
- Sort order.
- Availability status.

- 分组名称。
- 关联服务类型或套餐上下文。
- 排序。
- 可用状态。

Rules:

规则：

- Add-on group name should be bilingual.
- Owner can manage add-on groups.
- Employee cannot manage add-on groups.

- 加购分组名称应双语。
- 老板可以管理加购分组。
- 员工不能管理加购分组。

### Add-on Item / 加购项

Purpose:

用途：

- Defines optional services or items that can be selected in the pricing flow.
- 定义价格流程中可选的额外服务或项目。

Fields:

字段：

- Add-on name.
- Description.
- Price in AUD.
- Related add-on group.
- Preview image if applicable.
- Optional additional retouched photo count if automatic quota changes are needed.
- Sort order.
- Availability status.

- 加购项名称。
- 说明。
- AUD 价格。
- 所属加购分组。
- 如适用，预览图。
- 如需自动改变精修额度，可选记录额外精修数量。
- 排序。
- 可用状态。

Rules:

规则：

- Add-on name and description should be bilingual.
- Price is shared across languages.
- Preview image is shared across languages.
- Add-ons can affect the estimated total.
- Add-ons do not always need a numeric retouch count.
- Add-ons can affect included retouch count only if explicitly modeled.

- 加购项名称和说明应双语。
- 价格跨语言共享。
- 预览图跨语言共享。
- 加购项可以影响估算总价。
- 加购项不强制始终记录数字型精修数量。
- 只有在明确建模时，加购项才影响包含精修数量。

## Inquiry Summary Content / 咨询信息汇总内容

Purpose:

用途：

- Generates a read-only summary of user selections and notes.
- 自动生成用户选择和备注的只读汇总。

Inputs:

输入：

- Selected language.
- Service area.
- Service type.
- School if applicable.
- Scene type if applicable.
- Package.
- Add-ons.
- Extra location notes if applicable.
- General notes.
- Estimated total.

- 当前语言。
- 服务地区。
- 服务类型。
- 如适用，学校。
- 如适用，场景类型。
- 套餐。
- 加购项。
- 如适用，额外地点备注。
- 一般备注。
- 估算总价。

Rules:

规则：

- Summary text is generated by the system.
- User cannot manually edit summary text.
- Summary labels follow selected language.
- User-entered notes remain exactly as entered.
- Summary updates when selections or notes change.

- 汇总文本由系统生成。
- 用户不能手动编辑汇总文本。
- 汇总标签跟随当前语言。
- 用户填写备注保持原文。
- 选择项或备注变化时，汇总自动更新。

## Client Gallery Delivery Content / 客户相册交付内容

### Client Account Content / 客户账号内容

Purpose:

用途：

- Supports client login and access to client-owned galleries.
- 支持客户登录和访问自己的客户相册。

Fields:

字段：

- Email.
- Display name or identifier.
- Account status.
- Linked client galleries.

- 邮箱。
- 显示名称或识别信息。
- 账号状态。
- 关联客户相册。

Rules:

规则：

- Client accounts are self-registered by email.
- Client accounts do not grant staff workspace access.
- Client can only access own galleries.

- 客户账号通过邮箱自主注册。
- 客户账号不授予工作人员端访问权限。
- 客户只能访问自己的相册。

### Client Gallery / 客户相册

Purpose:

用途：

- Groups original photos, retouch selections, final retouched photos, countdowns, and download access for one client delivery context.
- 在一次客户交付上下文中组织底片、精修选择、最终精修图、倒计时和下载权限。

Fields:

字段：

- Client account relationship.
- Internal gallery identifier.
- Package or retouch quota relationship.
- Original photo upload timestamp.
- Retouch selection deadline.
- Download and deletion deadline.
- Delivery status.

- 关联客户账号。
- 内部相册识别信息。
- 套餐或精修数量关系。
- 底片上传时间。
- 精修选择截止时间。
- 下载和删除截止时间。
- 交付状态。

Rules:

规则：

- Employees can see the full client list but only minimum delivery-needed client information.
- Employees can access client galleries for delivery work.
- Employees can edit original photo galleries at any time.
- Owner can view and manage all client galleries.
- Client can only view own galleries.
- Client gallery title does not need to be displayed to the client.
- 7-day retouch selection countdown starts when original photos are uploaded.
- 3-month download and deletion countdown starts when original photos are uploaded.

- 员工可以看到完整客户列表，但只能看到交付所需的最少客户信息。
- 员工可以为了交付工作访问客户相册。
- 员工可以随时编辑底片相册。
- 老板可以查看和管理全部客户相册。
- 客户只能查看自己的相册。
- 客户相册不需要向客户显示标题。
- 7 天精修选择倒计时从底片上传时开始。
- 3 个月下载和删除倒计时从底片上传时开始。

### Original Photo / 底片

Purpose:

用途：

- Represents an uploaded original photo in a client gallery.
- 表示客户相册中上传的一张底片。

Fields:

字段：

- File reference.
- Sort order.
- Upload timestamp.
- Visibility status.
- Relationship to client gallery.

- 文件引用。
- 排序。
- 上传时间。
- 可见状态。
- 关联客户相册。

Rules:

规则：

- Employees can add, replace, remove, and reorder original photos at any time.
- If client retouch selections are already submitted, employee edits require a confirmation message before applying changes.
- Original photo files and generated original-photo packages are deleted after the 3-month window expires.

- 员工可以随时新增、替换、移除和调整底片顺序。
- 如果客户已提交精修选择，员工编辑底片相册时应先显示确认提示消息。
- 底片文件和已生成的底片压缩包在 3 个月期限结束后删除。

### Retouch Selection / 精修选择

Purpose:

用途：

- Stores the client's selected original photos for free retouching.
- 存储客户为免费精修选择的底片。

Fields:

字段：

- Client gallery relationship.
- Selected original photo references.
- Submission timestamp.
- Lock status.
- Retouch quota used.

- 关联客户相册。
- 已选底片引用。
- 提交时间。
- 锁定状态。
- 已使用精修数量。

Rules:

规则：

- Client can submit retouch selection once.
- Retouch selection must respect included retouch quota.
- Retouch selection locks after submission.
- Client, employee, and owner cannot unlock submitted selections through the normal product flow.
- If client does not submit within 7 days, included free retouch right is lost.

- 客户只能提交一次精修选择。
- 精修选择必须遵守套餐包含精修数量。
- 精修选择提交后锁定。
- 客户、员工和老板都不能通过正常产品流程解锁已提交选择。
- 客户 7 天内未提交时，套餐包含免费精修权利失效。

### Retouch Note / 修图备注

Purpose:

用途：

- Stores the client's retouching preference for one selected original photo.
- 存储客户对某张已选底片的修图意愿。

Fields:

字段：

- Selected original photo relationship.
- Note text.
- Character count.
- Submission timestamp.

- 关联已选底片。
- 备注文本。
- 字数。
- 提交时间。

Rules:

规则：

- One note per selected photo.
- Maximum 500 characters.
- Supports Simplified Chinese, Traditional Chinese, English, mixed text, and matching punctuation.
- Notes are not automatically translated.
- Notes lock with retouch selection submission.

- 每张已选照片一条备注。
- 最多 500 字。
- 支持简体、繁体、英文、混合文本和对应标点符号。
- 备注不自动翻译。
- 备注随精修选择提交一起锁定。

### Final Retouched Photo / 最终精修图

Purpose:

用途：

- Represents a staff-uploaded final retouched photo corresponding to a selected original photo.
- 表示工作人员上传的、与客户已选底片对应的最终精修图。

Fields:

字段：

- File reference.
- Related original photo.
- Related retouch selection.
- Upload timestamp.
- Visibility status.

- 文件引用。
- 关联底片。
- 关联精修选择。
- 上传时间。
- 可见状态。

Rules:

规则：

- Employee can upload final retouched photos.
- Final retouched photos correspond to selected originals.
- Client can download final retouched photos during the valid 3-month window.
- Final retouched photos are deleted at the same time as original photos.

- 员工可以上传最终精修图。
- 最终精修图与客户已选底片对应。
- 客户可以在 3 个月有效期内下载最终精修图。
- 最终精修图与底片同时删除。

### Download Package / 下载压缩包

Purpose:

用途：

- Represents a generated compressed package for original photos or final retouched photos.
- 表示底片或最终精修图的已生成压缩包。

Fields:

字段：

- Package type: originals or finals.
- File reference.
- Related client gallery.
- Generated timestamp.
- Expiration timestamp.

- 压缩包类型：底片或最终精修图。
- 文件引用。
- 关联客户相册。
- 生成时间。
- 过期时间。

Rules:

规则：

- Client can download packages during the valid 3-month window.
- Original-photo and final-photo packages are deleted when the 3-month window expires.

- 客户可以在 3 个月有效期内下载压缩包。
- 底片和最终照片压缩包在 3 个月期限结束后删除。

## Content Statuses / 内容状态

Public content statuses:

公开内容状态：

- Draft: not visible to customers.
- Published: visible to customers.
- Hidden: not visible but retained for future use.
- Deleted: removed from normal management views.

- 草稿：客户不可见。
- 已发布：客户可见。
- 隐藏：客户不可见，但保留供未来使用。
- 已删除：从正常管理视图中移除。

Client gallery statuses:

客户相册状态：

- No gallery yet.
- Originals uploaded.
- Retouch selection open.
- Retouch selection submitted.
- Retouch selection expired.
- Retouching.
- Finals uploaded.
- Expired and deleted.

- 暂无相册。
- 底片已上传。
- 精修选择开放中。
- 精修选择已提交。
- 精修选择已过期。
- 精修中。
- 最终精修图已上传。
- 已过期并删除。

## Open Questions / 待确认问题

- Should owner-managed public content use a draft-review-publish workflow, or is save-and-publish enough?
- Should hidden content remain visible in staff previews?
- Should deleted public content be recoverable by the owner, or treated as final deletion?
- Should final retouched photos have their own independent status, or only inherit the client gallery status?

- 老板管理的公开内容是否需要草稿-复核-发布流程，还是保存并发布即可？
- 隐藏内容是否仍可在工作人员预览中查看？
- 已删除公开内容是否允许老板恢复，还是视为最终删除？
- 最终精修图是否需要独立状态，还是只继承客户相册状态？

## Resolved Decisions / 已确认补充决策

The following content-model items were previously open and are now confirmed:

以下内容此前待确认，现已确认：

- Scene type is a reusable general content type, and the owner can edit its specific information.
- Package included original photo count should be modeled as a numeric value when applicable.
- Add-ons do not always need a numeric retouch count.
- Client gallery title does not need to be displayed to the client.
- Client gallery does not need a completed status.

- 场景类型是可复用的通用内容类型，老板可以编辑其具体信息。
- 如适用，套餐包含底片数量应建模为数字值。
- 加购项不强制始终记录数字型精修数量。
- 客户相册不需要向客户显示标题。
- 客户相册不需要“已完成”状态。
