# Product Scope / 产品范围

## Document Purpose / 文档目的

This document defines the product scope for the DARIA STUDIO website and its future staff-facing management system. It is a product planning document, not a technical implementation plan.

本文档用于定义 DARIA STUDIO 网站及未来工作人员管理端的产品范围。本文档是产品规划文档，不是技术实现方案。

## Product Direction / 产品方向

DARIA STUDIO needs one product with two surfaces:

DARIA STUDIO 需要一套产品，两类使用端：

- Customer-facing website: for visitors and clients who are browsing work, choosing service options, estimating pricing, copying inquiry information, logging in, and later viewing delivered photo assets.
- Staff-facing workspace: for the studio owner and employees who manage website content, service information, client galleries, original photo uploads, and final retouched photo uploads.

- 客户端网站：面向浏览作品、选择服务、估算价格、复制咨询信息、登录账号，以及后续查看照片资产的访客和客户。
- 工作人员端：面向工作室老板和员工，用于管理网站内容、服务信息、客户相册、底片上传和最终精修图上传。

The current public repository remains suitable for product documentation and high-fidelity prototypes. Real application code, authentication, database, storage, backend APIs, and production deployment should be implemented in the private `daria-studio-platform` repository.

当前公开仓库适合存放产品文档和高保真原型。真实应用代码、登录认证、数据库、文件存储、后端 API 和生产部署应放在私有仓库 `daria-studio-platform`。

## Confirmed Product Decisions / 已确认产品决策

- The customer-facing website should remain bilingual in Simplified Chinese and English.
- The staff workspace interface should also be bilingual in Simplified Chinese and English.
- Customer-visible editable content should support both Chinese and English fields.
- Multilingual implementation should use a three-layer model: fixed interface copy, editable business content, and localized formatting or display rules.
- User registration and login should use email.
- Client accounts should be created through client self-registration.
- Pricing pages show estimated pricing and copied inquiry information only.
- Online booking, online payment, and payment workflow are out of scope for now.
- Staff roles are fixed as owner and employee.
- Staff permissions are not configurable in the first product scope.
- The studio owner also acts as the website administrator.
- Employees can handle original photo upload and related client gallery delivery operations.
- Employees can see the full client list with only the minimum client information needed for delivery.
- Employees can edit original photo galleries at any time for delivery operations.
- Employees cannot edit customer-facing website content.
- Final retouched photos should follow the same 3-month download window and storage timing rules as original photos.
- After the 3-month window expires, original photos should be deleted from all product storage locations.
- Gallery set names, including studio shoot display set names, should be editable.
- Logged-in client gallery features should be considered in the product design, but the near-term requirement is only basic login.

- 客户端网站始终保留简体中文和英文双语。
- 工作人员端界面本身也应支持简体中文和英文双语。
- 客户可见的可编辑内容应支持中文和英文字段。
- 多语言实现应使用三层模型：固定界面文案、可编辑业务内容、本地化格式或展示规则。
- 用户注册和登录使用邮箱。
- 客户账号应由客户自主注册创建。
- 价格页目前只展示估价和可复制的咨询信息。
- 暂不做在线预约、在线支付和支付流程。
- 工作人员角色固定为老板和员工。
- 第一阶段暂不做可配置权限。
- 工作室老板同时具备网站管理员身份。
- 员工可以处理底片上传及相关客户相册交付操作。
- 员工可以看到完整客户列表，但只能看到交付所需的最少客户信息。
- 员工可以为了交付工作随时编辑底片相册。
- 员工不可编辑客户可见的网站内容。
- 最终精修图应与底片保持统一的 3 个月下载期和存储计时规则。
- 3 个月期限结束后，底片应从产品内所有存储位置删除。
- 展示集名称，包括棚拍展示集名称，应可自定义。
- 登录客户相册功能需要纳入产品设计，但近期只要求实现基础登录。

## Localization Model / 多语言模型

The product should not duplicate pages for different languages. It should use one page and component structure with language-specific content.

产品不应为不同语言重复制作多套页面，而应使用同一套页面和组件结构，搭配不同语言内容。

The bilingual model has three layers. Each layer has a different source of truth, editing owner, and validation rule:

双语模型分为三层。每一层都有不同的信息来源、编辑负责人和校验规则：

- Fixed interface copy: navigation, buttons, labels, validation messages, empty states, helper text, and system prompts.
- Editable business content: service areas, service types, gallery category names, studio shoot display set names, package names, package details, add-on names, add-on descriptions, and customer-facing page copy.
- Localized formatting and display rules: dates, deadlines, currencies, counts, download-window copy, and other language-specific presentation details.

- 固定界面文案：导航、按钮、标签、校验提示、空状态、辅助说明和系统提示。
- 可编辑业务内容：服务地区、服务类型、作品分类名称、棚拍展示集名称、套餐名称、套餐详情、加购项名称、加购项说明和客户可见页面文案。
- 本地化格式和展示规则：日期、截止时间、货币、数量、下载期限文案，以及其他与语言相关的展示细节。

For customer-visible editable content, the staff workspace should provide Chinese and English fields. Missing translations should be visible to staff before publishing.

对于客户可见的可编辑内容，工作人员端应提供中文和英文字段。发布前，缺失翻译应对工作人员可见。

### Layer 1: Fixed Interface Copy / 第一层：固定界面文案

Fixed interface copy means reusable product UI text that is not specific to one service, package, gallery category, or client gallery.

固定界面文案是指可复用的产品 UI 文案，不属于某一个具体服务、套餐、作品分类或客户相册。

Scope:

范围：

- Navigation labels, page titles, section labels, buttons, tabs, filters, form labels, placeholders, validation messages, empty states, status labels, confirmation messages, and copy/download action labels.
- Login, registration, account, staff workspace, upload, retouch selection, and download workflow text.
- Read-only inquiry summary labels, such as selected area, selected service type, selected package, add-ons, notes, and estimated total.

- 导航、页面标题、分区标签、按钮、标签页、筛选项、表单标签、占位提示、校验提示、空状态、状态标签、确认提示、复制和下载操作文案。
- 登录、注册、账号、工作人员端、上传、选精修和下载流程中的系统文案。
- 只读咨询信息汇总中的标签，例如已选地区、已选服务类型、已选套餐、加购项、备注和预估总价。

Design rules:

设计规则：

- Fixed interface copy should use stable translation keys instead of duplicating whole pages for each language.
- Every fixed interface key must have Simplified Chinese and English text before release.
- Missing fixed interface translations should block release or be treated as a QA failure.
- Fixed interface copy should not contain business-specific content such as package names, package details, add-on names, prices, or gallery set names.
- Language switching should preserve the current page, current selections, and user-entered notes.

- 固定界面文案应使用稳定的翻译键，而不是为每种语言复制整套页面。
- 每一个固定界面文案键在发布前都必须同时具备简体中文和英文。
- 固定界面文案缺少翻译时，应阻止发布或视为 QA 不通过。
- 固定界面文案不应包含套餐名称、套餐详情、加购项名称、价格或展示集名称等业务内容。
- 切换语言时，应保留当前页面、当前选择项和用户已经填写的备注。

### Layer 2: Editable Business Content / 第二层：可编辑业务内容

Editable business content means customer-visible content that the studio owner manages through the staff workspace.

可编辑业务内容是指由工作室老板通过工作人员端管理、并展示给客户看的内容。

Scope:

范围：

- Brand copy, page copy, gallery category names, normal gallery images, studio shoot display set names, studio shoot display set images, service areas, service types, schools, scene types, packages, package details, add-on groups, add-on items, add-on descriptions, availability labels, helper copy, and empty-state copy.
- Image alt text for customer-facing images.
- Customer-visible policy copy related to free retouch selection, original photo download, final retouched photo download, and storage windows.

- 品牌文案、页面文案、作品分类名称、普通作品图片、棚拍展示集名称、棚拍展示集图片、服务地区、服务类型、学校、场景类型、套餐、套餐详情、加购分组、加购项、加购项说明、可用状态说明、辅助说明和空状态文案。
- 客户可见图片的替代文本。
- 与免费精修选择、底片下载、最终精修图下载和存储期限相关的客户可见政策文案。

Design rules:

设计规则：

- Customer-visible editable text should provide side-by-side Simplified Chinese and English fields.
- Shared business fields should not be duplicated by language. Examples include price, sort order, availability status, image reference, package relationship, service relationship, and expiration rule.
- Required customer-visible names should need both Chinese and English values before publishing.
- Optional descriptions can be empty, but if only one language is filled, the staff workspace should show a visible translation warning.
- The owner can create, edit, delete, reorder, publish, and hide customer-facing business content.
- Employees cannot edit customer-facing business content.
- Gallery images are shared across languages, but customer-facing alt text should support Chinese and English.
- Sort order should be shared across languages so the Chinese and English versions show the same content structure.

- 客户可见的可编辑文本应提供并排的简体中文和英文字段。
- 共享业务字段不应按语言重复维护，例如价格、排序、可用状态、图片引用、套餐关系、服务关系和过期规则。
- 客户可见的必填名称在发布前应同时填写中文和英文。
- 可选说明可以为空，但如果只填写了一种语言，工作人员端应显示明显的翻译提醒。
- 老板可以新增、编辑、删除、排序、发布和隐藏客户可见业务内容。
- 员工不可编辑客户可见业务内容。
- 作品图片本身在不同语言间共享，但客户可见的图片替代文本应支持中文和英文。
- 排序应在不同语言间共享，保证中文和英文版本展示相同的内容结构。

### Layer 3: Localized Formatting and Display Rules / 第三层：本地化格式和展示规则

Localized formatting means dynamic values that are generated by the system from shared business data and then displayed differently by language.

本地化格式是指系统根据共享业务数据生成，并按语言以不同方式展示的动态内容。

Scope:

范围：

- Currency display, date display, time and deadline display, countdown wording, photo counts, selected option counts, package totals, storage-window copy, download-window copy, and generated inquiry summary text.
- Status presentation for client gallery delivery, such as original photos uploaded, retouch selection open, retouch selection expired, retouch submitted, final retouched photos uploaded, and storage expired.

- 货币显示、日期显示、时间和截止时间显示、倒计时文案、照片数量、已选项目数量、套餐总价、存储期限文案、下载期限文案和自动生成的咨询信息汇总。
- 客户相册交付状态展示，例如底片已上传、精修选择开放中、精修选择已过期、精修已提交、最终精修图已上传和存储已过期。

Design rules:

设计规则：

- Business rules should use one canonical value, then display it through the selected language. For example, the 7-day free retouch selection window and 3-month download window should be stored as one rule, not as translated text.
- Currency should use AUD as the product currency. The number should be shared, while surrounding labels can change by language.
- Dates and deadlines should be calculated from real workflow timestamps, such as the original photo upload time, not from manually written copy.
- Original photos and final retouched photos should use the same 3-month download and storage timing rule.
- The read-only inquiry summary should be generated from selected business content, selected add-ons, notes, and formatted total price.
- Customer-entered notes should not be translated automatically. They should be preserved exactly as entered when switching languages or copying the inquiry summary.
- If the user changes language, dynamic totals, counts, deadlines, and generated summary labels should refresh to the selected language while preserving the selected business options.

- 业务规则应使用同一个标准值，再根据当前语言展示。例如 7 天免费精修选择期和 3 个月下载期应作为同一套规则保存，而不是写成两份翻译文本。
- 产品货币使用 AUD。金额数字应共享，金额周围的标签可以按语言变化。
- 日期和截止时间应从真实流程时间计算，例如底片上传时间，而不是从手写文案中推导。
- 底片和最终精修图应使用同一套 3 个月下载和存储计时规则。
- 只读咨询信息汇总应根据已选业务内容、已选加购项、备注和格式化后的总价自动生成。
- 客户填写的备注不应自动翻译。切换语言或复制咨询信息时，应保留客户原文。
- 用户切换语言时，动态总价、数量、截止时间和自动生成汇总标签应刷新为所选语言，同时保留已选业务选项。

## Primary Roles / 主要角色

### Visitor / 访客

A visitor can browse the public website without registering or logging in.

访客无需注册或登录即可浏览公开网站。

In scope:

范围内：

- View the gallery and gallery categories.
- View service areas, service types, packages, add-ons, and estimated pricing.
- Select service options and optional notes.
- Copy a read-only summary of all selected information.

- 查看作品展示和作品分类。
- 查看服务地区、服务类型、套餐、加购项和估算价格。
- 选择服务选项并填写可选备注。
- 复制只读的所选信息汇总。

### Logged-in Client / 登录客户

A logged-in client can use account-based features. For the near-term MVP, the client only needs to be able to register and log in. Photo delivery features are planned for a later phase.

登录客户可以使用账号相关功能。近期 MVP 中，客户只需要能够注册和登录；照片交付功能规划到后续阶段。

Future scope:

后续范围：

- View uploaded original photos.
- Download original photos as a compressed package.
- Select included free retouched photos within 7 days after originals are uploaded.
- Add one locked retouching note per selected photo, up to 500 characters.
- Submit retouch selections once; submitted selections cannot be edited or unlocked.
- Download final retouched photos as a compressed package after staff upload them.

- 查看工作人员上传的底片。
- 一键下载底片压缩包。
- 在底片上传后 7 天内选择套餐包含的免费精修照片。
- 为每张已选底片填写一条锁定的修图备注，最多 500 字。
- 提交选片后不可修改，也不可由工作人员解锁。
- 工作人员上传最终精修图后，一键下载最终精修图压缩包。

### Employee / 员工

An employee is a fixed staff role. Employees can handle original photo upload and related client gallery delivery operations, but they cannot edit customer-facing website content. Permissions are not configurable in the first product scope.

员工是固定工作人员角色。员工可以处理底片上传及相关客户相册交付操作，但不可编辑客户可见的网站内容。第一阶段不做权限配置。

In scope:

范围内：

- Use the staff workspace.
- Manage client galleries for photo delivery.
- Upload original photos for clients.
- View client retouch selections and notes.
- Upload final retouched photos.

- 使用工作人员端。
- 管理客户相册交付流程。
- 为客户上传底片。
- 查看客户提交的精修选择和修图备注。
- 上传最终精修图。

### Owner / 老板

The owner is the studio owner and website administrator.

老板是工作室负责人，同时也是网站管理员。

In scope:

范围内：

- Use all staff workspace features.
- Manage customer-facing website content.
- Manage gallery categories and gallery images.
- Manage pricing content and service options.
- Manage employee accounts.

- 使用所有工作人员端功能。
- 管理客户可见的网站内容。
- 管理作品分类和展示图片。
- 管理价格内容和服务选项。
- 管理员工账号。

## MVP Scope / 第一阶段范围

The MVP should validate the public customer journey and prepare the system for future account-based delivery workflows.

第一阶段 MVP 应验证公开客户流程，并为后续基于账号的照片交付流程做准备。

### Customer Website / 客户端网站

In scope:

范围内：

- Bilingual public website in Chinese and English.
- Gallery page with editable gallery category structure in the product model.
- Normal gallery categories with 0 to 20 images.
- Empty gallery category state: show "No display content yet" when there are 0 images.
- Special studio shoot gallery category with editable display sets.
- Studio shoot display sets with custom names.
- Each studio shoot display set can contain 1 to 9 images.
- Studio shoot photo modal layout supports up to 3 by 3 images.
- Studio shoot modal content remains centered regardless of image count.
- Pricing page with service area selection.
- Service type selection by service area.
- Package and add-on selection based on the current prototype logic.
- Optional notes.
- Estimated total price.
- Read-only summary text box at the bottom of the pricing flow.
- Summary text updates automatically based on selected options and notes.
- Summary text cannot be manually edited and can only be copied.
- Email registration and login entry point.

- 中英双语公开网站。
- 作品展示页，产品模型中支持可编辑的作品分类结构。
- 普通作品分类支持 0 到 20 张图片。
- 作品分类 0 张图片时显示“暂无展示内容”。
- 特殊作品分类“棚拍”支持可编辑展示集。
- 棚拍展示集名称可自定义。
- 每个棚拍展示集包含 1 到 9 张展示照片。
- 棚拍照片弹窗最多支持 3 乘 3 排列。
- 无论展示照片数量多少，棚拍弹窗内容都应居中。
- 价格页支持选择服务地区。
- 根据服务地区选择服务类型。
- 基于当前高保真原型逻辑选择套餐和加购项。
- 支持可选备注。
- 显示估算总价。
- 价格流程底部显示只读信息汇总文本框。
- 信息汇总根据选择项和备注自动变化。
- 信息汇总不能手动修改，只能复制。
- 提供邮箱注册和登录入口。

### Staff Workspace / 工作人员端

The first staff-facing scope should cover owner-managed website content and employee-managed client gallery delivery operations.

第一阶段工作人员端应覆盖老板管理的网站内容，以及员工处理的客户相册交付操作。

In scope:

范围内：

- Owner and employee login.
- Fixed owner and employee roles.
- Bilingual staff workspace interface in Simplified Chinese and English.
- Owner can manage gallery categories.
- Owner can manage normal gallery category images.
- Owner can manage studio shoot display sets and their images.
- Owner can add, edit, delete, and reorder service areas.
- Owner can add, edit, delete, and reorder service types.
- Owner can manage package-related content that exists in the current high-fidelity prototype.
- Owner can manage add-on groups and add-on items that exist in the current high-fidelity prototype.
- Owner can manage bilingual customer-visible names, descriptions, details, and empty-state text.
- Employee can upload original photos for client galleries.
- Employee can see the full client list with minimum delivery-needed client information.
- Employee can edit original photo galleries at any time for delivery operations.
- Employee can view client retouch selections and per-photo notes after submission.
- Employee can upload final retouched photos.
- Employee cannot edit customer-facing website content.

- 老板和员工登录。
- 固定老板和员工角色。
- 工作人员端界面支持简体中文和英文双语。
- 老板可以管理作品分类。
- 老板可以管理普通作品分类图片。
- 老板可以管理棚拍展示集及展示集图片。
- 老板可以新增、编辑、删除、排序服务地区。
- 老板可以新增、编辑、删除、排序服务类型。
- 老板可以管理当前高保真原型中已有的套餐相关内容。
- 老板可以管理当前高保真原型中已有的加购分组和加购项。
- 老板可以管理客户可见名称、描述、详情和空状态文案的中英双语内容。
- 员工可以为客户相册上传底片。
- 员工可以看到完整客户列表，但只能看到交付所需的最少客户信息。
- 员工可以为了交付工作随时编辑底片相册。
- 员工可以在客户提交后查看精修选择和每张照片的修图备注。
- 员工可以上传最终精修图。
- 员工不可编辑客户可见的网站内容。

## Later Scope / 后续范围

These features should be planned, but they do not need to be implemented in the first MVP.

以下功能需要纳入规划，但不需要在第一阶段 MVP 中实现。

- Client account dashboard.
- Client gallery page.
- Staff upload of original photos to a client account.
- Original photo storage and download package generation.
- 7-day free retouch selection window after original photos are uploaded.
- Loss of free retouch selection rights after the 7-day window.
- Original photo download availability for 3 months after upload.
- Final retouched photo download availability for the same 3-month window as original photos.
- Deletion of original photos from all product storage locations after the 3-month window expires.
- Client retouch selection and per-photo note submission.
- Retouch note limit of 500 characters.
- Retouch notes supporting Simplified Chinese, Traditional Chinese, English, mixed text, and matching punctuation.
- Locked retouch submission with no unlock or edit flow.
- Staff review of selected originals and client notes.
- Staff upload of final retouched photos corresponding to selected originals.
- Final retouched photo compressed package download.
- Automated expiration handling and storage cleanup rules.

- 客户账号主页。
- 客户相册页。
- 工作人员向客户账号上传底片。
- 底片存储和压缩包下载生成。
- 底片上传后 7 天免费精修选择期。
- 7 天过期后失去免费精修选择权。
- 底片上传后 3 个月内可下载。
- 最终精修图与底片保持同一套 3 个月下载期。
- 3 个月期限结束后，底片从产品内所有存储位置删除。
- 客户选择精修底片并填写每张照片的修图备注。
- 修图备注不超过 500 字。
- 修图备注支持简体、繁体、英文、混合文本和对应标点符号。
- 精修选择提交后锁定，不提供解锁或修改流程。
- 工作人员查看客户选择的底片和备注。
- 工作人员为已选底片一一上传最终精修图。
- 最终精修图压缩包下载。
- 自动过期处理和存储清理规则。

## Out of Scope for Now / 当前不做

- Online booking.
- Online payment.
- Deposit collection.
- Calendar scheduling.
- Configurable staff permission system.
- Employee editing of customer-facing website content.
- Client retouch revision requests.
- Unlocking or editing submitted retouch selections.
- Public implementation of production authentication, database, backend APIs, or file storage in this repository.
- Moving prototype code directly into the production application.

- 在线预约。
- 在线支付。
- 定金收取。
- 日历排期。
- 可配置员工权限系统。
- 员工编辑客户可见网站内容。
- 客户精修返修请求。
- 解锁或修改已提交的精修选择。
- 在本公开仓库中实现生产级登录认证、数据库、后端 API 或文件存储。
- 将原型代码直接迁移为正式应用代码。

## Content Areas to Model / 需要建模的内容范围

The product should eventually model the following editable content instead of hard-coding it:

产品后续应将以下内容建模为可编辑内容，而不是继续硬编码：

- Brand content and customer-facing page copy.
- Gallery categories.
- Gallery images.
- Studio shoot display sets.
- Service areas.
- Service types.
- Schools.
- Scene types.
- Packages.
- Package details.
- Add-on groups.
- Add-on items.
- Prices.
- Availability status.
- Sort order.
- Empty states and helper text.
- Customer accounts.
- Staff accounts.
- Client galleries.
- Original photos.
- Retouch selections.
- Final retouched photos.
- Download packages.
- Expiration timestamps.

- 品牌内容和客户可见页面文案。
- 作品分类。
- 作品图片。
- 棚拍展示集。
- 服务地区。
- 服务类型。
- 学校。
- 场景类型。
- 套餐。
- 套餐详情。
- 加购分组。
- 加购项。
- 价格。
- 可用状态。
- 排序。
- 空状态和提示文案。
- 客户账号。
- 工作人员账号。
- 客户相册。
- 底片。
- 精修选择。
- 最终精修图。
- 下载压缩包。
- 过期时间。

## Resolved Decisions / 已确认补充决策

The following items were previously open questions and are now confirmed:

以下内容此前是待确认问题，现已确认：

- The staff workspace should be bilingual in Simplified Chinese and English.
- The product should use the three-layer localization model described above.
- Employees can handle original photo upload and related client gallery delivery operations.
- Employees can see the full client list with minimum delivery-needed client information.
- Employees can edit original photo galleries at any time for delivery operations.
- Employees cannot edit customer-facing website content.
- Final retouched photos use the same 3-month download and storage timing rule as original photos.
- Original photos are deleted from all product storage locations after the 3-month window expires.
- Client accounts are created through client self-registration.

- 工作人员端应支持简体中文和英文双语。
- 产品应使用上文所述的三层多语言模型。
- 员工可以处理底片上传及相关客户相册交付操作。
- 员工可以看到完整客户列表，但只能看到交付所需的最少客户信息。
- 员工可以为了交付工作随时编辑底片相册。
- 员工不可编辑客户可见的网站内容。
- 最终精修图与底片使用相同的 3 个月下载和存储计时规则。
- 3 个月期限结束后，底片从产品内所有存储位置删除。
- 客户账号由客户自主注册创建。
