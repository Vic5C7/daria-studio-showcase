# User Stories by Epic / 按 Epic 分组的用户故事

## Document Purpose / 文档目的

This document breaks the DARIA STUDIO product scope into stable user stories. These stories are based on `product-scope.md`, `roles-and-permissions.md`, and `user-journey.md`.

本文档将 DARIA STUDIO 的产品范围拆分为稳定编号的用户故事。这些用户故事基于 `product-scope.md`、`roles-and-permissions.md` 和 `user-journey.md`。

Each story uses a stable `US-xxx` identifier so it can be referenced by acceptance criteria, test cases, prototype tasks, and later development tickets.

每条用户故事使用稳定的 `US-xxx` 编号，便于后续验收标准、测试用例、原型任务和开发任务引用。

## Status Labels / 状态标签

- MVP: needed for the first product phase or current prototype validation.
- Later: planned for the future account-based photo delivery workflow.
- Out of scope: explicitly not planned for the current product scope.

- MVP：第一阶段产品或当前原型验证需要。
- Later：后续基于账号的照片交付流程需要。
- Out of scope：当前产品范围明确不做。

## Epic 1: Bilingual Product Experience / Epic 1：双语产品体验

### US-001: Switch Language Without Losing Context / 切换语言且不丢失上下文

As a visitor, client, employee, or owner, I want to switch between Simplified Chinese and English without losing my current page or current selections, so that I can use the product in my preferred language.

作为访客、客户、员工或老板，我希望可以在简体中文和英文之间切换，并且不丢失当前页面或当前选择，以便使用自己偏好的语言。

Status: MVP

状态：MVP

### US-002: Separate Fixed Copy, Business Content, and Localized Formatting / 区分固定文案、业务内容和本地化格式

As the product owner, I want multilingual content to follow the three-layer localization model, so that interface copy, editable business content, and dynamic formatting can be managed clearly.

作为产品负责人，我希望多语言内容遵循三层多语言模型，以便清晰管理固定界面文案、可编辑业务内容和动态本地化格式。

Status: MVP

状态：MVP

## Epic 2: Public Gallery Browsing / Epic 2：公开作品浏览

### US-003: Browse Public Gallery Categories / 浏览公开作品分类

As a visitor, I want to browse gallery categories without logging in, so that I can understand the studio's work before contacting the studio.

作为访客，我希望无需登录即可浏览作品分类，以便在联系工作室前了解作品风格。

Status: MVP

状态：MVP

### US-004: Show Empty State for Empty Normal Gallery Categories / 普通作品分类为空时显示空状态

As a visitor, I want a normal gallery category with 0 images to show a clear empty state, so that I understand the category exists but has no display content yet.

作为访客，我希望普通作品分类在 0 张图片时显示清晰空状态，以便知道该分类存在但暂时没有展示内容。

Status: MVP

状态：MVP

### US-005: View Studio Shoot Display Sets / 查看棚拍展示集

As a visitor, I want to view studio shoot display sets with custom names and centered modal image layouts, so that I can inspect each studio shoot set clearly.

作为访客，我希望查看带自定义名称的棚拍展示集，并在居中弹窗中查看图片，以便清楚了解每个棚拍展示集。

Status: MVP

状态：MVP

## Epic 3: Pricing and Inquiry Summary / Epic 3：价格选择与咨询信息汇总

### US-006: Select Service Area and Service Type / 选择服务地区和服务类型

As a visitor or logged-in client, I want to choose a service area and service type, so that the pricing flow only shows relevant options.

作为访客或登录客户，我希望选择服务地区和服务类型，以便价格流程只展示相关选项。

Status: MVP

状态：MVP

### US-007: Select Packages, Add-ons, and Notes / 选择套餐、加购项和备注

As a visitor or logged-in client, I want to select packages, add-ons, and optional notes, so that I can describe the service I am interested in.

作为访客或登录客户，我希望选择套餐、加购项并填写可选备注，以便描述自己感兴趣的服务。

Status: MVP

状态：MVP

### US-008: See Estimated Total / 查看估算总价

As a visitor or logged-in client, I want the page to calculate an estimated total from my selections, so that I can understand the likely price before contacting the studio.

作为访客或登录客户，我希望页面根据我的选择计算估算总价，以便联系工作室前了解大致价格。

Status: MVP

状态：MVP

### US-009: Copy Read-only Inquiry Summary / 复制只读咨询信息汇总

As a visitor or logged-in client, I want a read-only inquiry summary that updates automatically and can be copied with one action, so that I can send the studio a complete service request.

作为访客或登录客户，我希望有一个自动更新且一键复制的只读咨询信息汇总，以便向工作室发送完整服务需求。

Status: MVP

状态：MVP

## Epic 4: Client Account Access / Epic 4：客户账号访问

### US-010: Self-register Client Account by Email / 邮箱自主注册客户账号

As a visitor, I want to register a client account by email, so that I can later access account-based photo delivery features.

作为访客，我希望通过邮箱自主注册客户账号，以便后续访问基于账号的照片交付功能。

Status: MVP

状态：MVP

### US-011: Log In and See Client Account State / 登录并看到客户账号状态

As a registered client, I want to log in and see my account state, so that I know whether photo galleries are available for me.

作为已注册客户，我希望登录并看到自己的账号状态，以便知道是否已有可用相册。

Status: MVP

状态：MVP

## Epic 5: Staff Access and Role Boundaries / Epic 5：工作人员访问与角色边界

### US-012: Log In to Staff Workspace / 登录工作人员端

As an employee or owner, I want to log in to the staff workspace with a staff account, so that I can access staff-only workflows.

作为员工或老板，我希望使用工作人员账号登录工作人员端，以便访问工作人员专属流程。

Status: MVP

状态：MVP

### US-013: Enforce Fixed Employee and Owner Permissions / 执行固定员工与老板权限

As the studio, I want employee and owner permissions to be fixed in the first product scope, so that staff access remains clear and simple.

作为工作室，我希望第一阶段员工和老板权限固定，以便工作人员访问边界清晰简单。

Status: MVP

状态：MVP

## Epic 6: Owner Website Content Management / Epic 6：老板网站内容管理

### US-014: Manage Gallery Categories and Public Images / 管理作品分类和公开作品图片

As the owner, I want to add, edit, delete, reorder, publish, and hide gallery categories and public gallery images, so that the public gallery can stay up to date.

作为老板，我希望新增、编辑、删除、排序、发布和隐藏作品分类及公开作品图片，以便公开作品展示保持更新。

Status: MVP

状态：MVP

### US-015: Manage Studio Shoot Display Sets / 管理棚拍展示集

As the owner, I want to manage studio shoot display sets and their images, so that studio shoot examples can be organized into custom sets.

作为老板，我希望管理棚拍展示集及其图片，以便将棚拍样片组织为自定义展示集。

Status: MVP

状态：MVP

### US-016: Manage Services, Packages, Add-ons, and Prices / 管理服务、套餐、加购项和价格

As the owner, I want to manage service areas, service types, schools, scene types, packages, add-ons, prices, availability, and sort order, so that the pricing page reflects current studio offerings.

作为老板，我希望管理服务地区、服务类型、学校、场景类型、套餐、加购项、价格、可用状态和排序，以便价格页反映当前服务内容。

Status: MVP

状态：MVP

### US-017: Manage Bilingual Customer-facing Content / 管理客户可见双语内容

As the owner, I want customer-facing editable content to have Chinese and English fields with missing translation warnings, so that both language versions are complete before publishing.

作为老板，我希望客户可见的可编辑内容提供中文和英文字段，并显示缺失翻译提醒，以便发布前保证双语内容完整。

Status: MVP

状态：MVP

## Epic 7: Employee Client Gallery Delivery / Epic 7：员工客户相册交付

### US-018: View Full Client List with Minimum Delivery Information / 查看完整客户列表但只显示最少交付信息

As an employee, I want to see the full client list with only the information needed for delivery, so that I can find client galleries without seeing unnecessary private information.

作为员工，我希望看到完整客户列表，但只显示交付所需信息，以便找到客户相册，同时避免看到不必要的隐私信息。

Status: Later

状态：Later

### US-019: Upload and Edit Original Photo Galleries / 上传并编辑底片相册

As an employee, I want to upload and edit original photo galleries at any time for delivery operations, so that client galleries can be corrected and maintained.

作为员工，我希望为了交付工作随时上传和编辑底片相册，以便修正和维护客户相册。

Status: Later

状态：Later

### US-020: Confirm Original Gallery Edits After Client Submission / 客户提交后编辑底片相册需确认

As an employee, I want the system to show a confirmation message before applying original gallery edits after the client has submitted retouch selections, so that I understand the edit may affect delivery references.

作为员工，我希望在客户已提交精修选择后编辑底片相册时，系统在应用修改前显示确认提示，以便知道该修改可能影响交付引用。

Status: Later

状态：Later

### US-021: Review Client Retouch Selections and Upload Finals / 查看客户精修选择并上传最终精修图

As an employee, I want to view submitted retouch selections and per-photo notes, then upload corresponding final retouched photos, so that the client can receive final deliverables.

作为员工，我希望查看客户提交的精修选择和每张照片备注，并上传对应最终精修图，以便客户收到最终交付内容。

Status: Later

状态：Later

## Epic 8: Client Photo Delivery / Epic 8：客户照片交付

### US-022: View Own Client Gallery / 查看自己的客户相册

As a logged-in client, I want to view only my own client galleries, so that my photos remain private.

作为登录客户，我希望只查看自己的客户相册，以便照片保持私密。

Status: Later

状态：Later

### US-023: Download Original and Final Photo Packages / 下载底片和最终精修图压缩包

As a logged-in client, I want to download my original photos and final retouched photos as compressed packages during the valid window, so that I can save my delivered files.

作为登录客户，我希望在有效期内一键下载底片和最终精修图压缩包，以便保存交付文件。

Status: Later

状态：Later

### US-024: Select Included Free Retouched Photos / 选择套餐包含的免费精修照片

As a logged-in client, I want to select the package-included free retouched photos within 7 days after original photos are uploaded, so that I can choose which photos should be retouched.

作为登录客户，我希望在底片上传后 7 天内选择套餐包含的免费精修照片，以便决定哪些照片需要精修。

Status: Later

状态：Later

### US-025: Submit Per-photo Retouch Notes / 提交每张照片的修图备注

As a logged-in client, I want to add one retouching note per selected photo with a 500-character limit, so that I can tell the studio my retouching preferences.

作为登录客户，我希望为每张已选照片填写一条不超过 500 字的修图备注，以便告诉工作室我的修图意愿。

Status: Later

状态：Later

### US-026: Lock Retouch Selection After Submission / 提交后锁定精修选择

As a logged-in client, I want my retouch selections to lock after submission, so that the studio has a stable delivery reference.

作为登录客户，我希望精修选择提交后锁定，以便工作室有稳定的交付依据。

Status: Later

状态：Later

### US-027: See Live Retouch and Storage Countdowns / 查看精修选择与存储实时倒计时

As a logged-in client, I want to see live countdowns for the 7-day retouch selection window and the 3-month download/deletion window, so that I understand the remaining time.

作为登录客户，我希望看到 7 天精修选择期和 3 个月下载/删除期的实时倒计时，以便了解剩余时间。

Status: Later

状态：Later

### US-028: Lose Free Retouch Right After 7 Days / 7 天后失去免费精修权利

As the studio, I want the included free retouch selection right to expire if the client does not submit within 7 days, so that delivery rules are clear.

作为工作室，我希望客户 7 天内未提交时失去套餐包含的免费精修选择权，以便交付规则清晰。

Status: Later

状态：Later

### US-029: Delete Photo Assets After 3 Months / 3 个月后删除照片资产

As the studio, I want original photos, final retouched photos, and generated download packages to be deleted after the 3-month window, so that storage rules are enforced.

作为工作室，我希望 3 个月期限结束后删除底片、最终精修图和已生成下载压缩包，以便执行存储规则。

Status: Later

状态：Later

## Epic 9: Explicitly Excluded Flows / Epic 9：明确不做的流程

### US-030: Exclude Booking and Payment from Current Scope / 当前范围不做预约和支付

As the product owner, I want booking, payment, deposit, calendar scheduling, retouch revision, submitted-selection unlock, and configurable employee permissions to remain out of scope, so that the first product phase stays focused.

作为产品负责人，我希望在线预约、支付、定金、日历排期、精修返修、已提交精修选择解锁和可配置员工权限保持在当前范围之外，以便第一阶段保持聚焦。

Status: Out of scope

状态：Out of scope
