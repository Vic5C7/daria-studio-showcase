# Acceptance Criteria by User Story / 按用户故事整理的验收标准

## Document Purpose / 文档目的

This document defines acceptance criteria for the user stories in `wiki/user-stories/stories-by-epic.md`.

本文档为 `wiki/user-stories/stories-by-epic.md` 中的用户故事定义验收标准。

Each acceptance criterion uses the format `AC-US-xxx-nn`, where `US-xxx` refers to the related user story.

每条验收标准使用 `AC-US-xxx-nn` 格式，其中 `US-xxx` 对应相关用户故事。

## Epic 1: Bilingual Product Experience / Epic 1：双语产品体验

### US-001: Switch Language Without Losing Context / 切换语言且不丢失上下文

- AC-US-001-01: Given a user is on a public or staff page, when the user switches language, then the system keeps the user on the same page.
- AC-US-001-01：当用户位于公开页面或工作人员端页面时，切换语言后，系统应保留用户在同一页面。
- AC-US-001-02: Given the user has selected pricing options or entered notes, when the user switches language, then selections and notes remain unchanged.
- AC-US-001-02：当用户已经选择价格选项或填写备注时，切换语言后，选择项和备注应保持不变。
- AC-US-001-03: Given the user switches language, when the page refreshes displayed text, then fixed copy, business content, and localized dynamic labels use the selected language.
- AC-US-001-03：当用户切换语言并刷新页面展示文本时，固定文案、业务内容和动态本地化标签应使用所选语言。

### US-002: Separate Fixed Copy, Business Content, and Localized Formatting / 区分固定文案、业务内容和本地化格式

- AC-US-002-01: Given a customer-facing text field is editable business content, when the owner edits it, then Chinese and English fields are available.
- AC-US-002-01：当客户可见文本属于可编辑业务内容时，老板编辑该内容时应看到中文和英文字段。
- AC-US-002-02: Given a value is shared business data, when it is edited, then the value is not duplicated by language.
- AC-US-002-02：当某个值属于共享业务数据时，编辑该值时不应按语言重复维护。
- AC-US-002-03: Given the system displays price, dates, countdowns, or generated summary labels, when language changes, then the system formats those values in the selected language without changing the underlying value.
- AC-US-002-03：当系统展示价格、日期、倒计时或自动生成的汇总标签时，切换语言后系统应按所选语言展示格式，同时不改变底层值。

## Epic 2: Public Gallery Browsing / Epic 2：公开作品浏览

### US-003: Browse Public Gallery Categories / 浏览公开作品分类

- AC-US-003-01: Given a visitor is not logged in, when the visitor opens the public gallery, then gallery categories are visible.
- AC-US-003-01：当访客未登录并打开公开作品页时，系统应展示作品分类。
- AC-US-003-02: Given a visitor selects a gallery category, when the category has images, then the system displays images belonging to that category.
- AC-US-003-02：当访客选择某个有图片的作品分类时，系统应展示该分类下的图片。
- AC-US-003-03: Given the visitor browses the public gallery, then login is not required.
- AC-US-003-03：访客浏览公开作品时，不应要求登录。

### US-004: Show Empty State for Empty Normal Gallery Categories / 普通作品分类为空时显示空状态

- AC-US-004-01: Given a normal gallery category has 0 images, when a visitor opens it, then the page displays "No display content yet" or the equivalent selected-language copy.
- AC-US-004-01：当普通作品分类有 0 张图片且访客打开该分类时，页面应显示“暂无展示内容”或所选语言的对应文案。
- AC-US-004-02: Given a normal gallery category has 0 images, when it is displayed, then the system does not show broken images or empty image frames.
- AC-US-004-02：当普通作品分类有 0 张图片时，系统不应显示损坏图片或空图片框。

### US-005: View Studio Shoot Display Sets / 查看棚拍展示集

- AC-US-005-01: Given the selected gallery category is studio shoot, when display sets exist, then the visitor can see custom display set names.
- AC-US-005-01：当选择棚拍分类且存在展示集时，访客应能看到自定义展示集名称。
- AC-US-005-02: Given a studio shoot display set contains 1 to 9 images, when opened, then the modal displays all images in a centered layout.
- AC-US-005-02：当棚拍展示集包含 1 到 9 张图片并被打开时，弹窗应以居中布局展示全部图片。
- AC-US-005-03: Given a studio shoot display set is opened, then the modal layout never exceeds 3 by 3 images.
- AC-US-005-03：当棚拍展示集弹窗打开时，弹窗图片布局最多不超过 3 乘 3。

## Epic 3: Pricing and Inquiry Summary / Epic 3：价格选择与咨询信息汇总

### US-006: Select Service Area and Service Type / 选择服务地区和服务类型

- AC-US-006-01: Given the pricing page opens, then service area options are displayed before service-specific package options.
- AC-US-006-01：当价格页打开时，系统应先展示服务地区选项，再展示具体服务套餐选项。
- AC-US-006-02: Given a user selects a service area, when service types are available for that area, then only relevant service types are displayed.
- AC-US-006-02：当用户选择服务地区且该地区有可用服务类型时，系统应只展示相关服务类型。
- AC-US-006-03: Given a service type is unavailable, then the user can see that it is unavailable or coming soon.
- AC-US-006-03：当某个服务类型不可用时，用户应能看到不可用或暂未开放状态。

### US-007: Select Packages, Add-ons, and Notes / 选择套餐、加购项和备注

- AC-US-007-01: Given the user selects a service type, when additional required selections apply, then the system shows the next relevant selection step.
- AC-US-007-01：当用户选择服务类型且后续有必选项时，系统应展示下一步相关选择。
- AC-US-007-02: Given add-ons are available, when the user selects or unselects add-ons, then selected add-ons are reflected in the pricing state.
- AC-US-007-02：当加购项可用且用户选择或取消选择加购项时，系统应在价格状态中反映已选加购项。
- AC-US-007-03: Given notes are available, when the user enters notes, then the notes are preserved as entered and are not automatically translated.
- AC-US-007-03：当备注可用且用户填写备注时，备注应保留原文，不自动翻译。

### US-008: See Estimated Total / 查看估算总价

- AC-US-008-01: Given a package or fixed package price is selected, when add-ons or applicable rules change, then the estimated total updates automatically.
- AC-US-008-01：当套餐或固定套餐价格已确定，且加购项或适用规则发生变化时，估算总价应自动更新。
- AC-US-008-02: Given a required package selection has not been completed, then the total area indicates that a package should be chosen or that pricing is pending.
- AC-US-008-02：当必需的套餐选择尚未完成时，总价区域应提示需要选择套餐或价格待确认。
- AC-US-008-03: Given a total is shown, then the amount uses AUD.
- AC-US-008-03：当显示总价时，金额应使用 AUD。

### US-009: Copy Read-only Inquiry Summary / 复制只读咨询信息汇总

- AC-US-009-01: Given the user changes selected options or notes, then the inquiry summary updates automatically.
- AC-US-009-01：当用户修改选择项或备注时，咨询信息汇总应自动更新。
- AC-US-009-02: Given the inquiry summary is displayed, then the user cannot manually edit its text.
- AC-US-009-02：当咨询信息汇总展示时，用户不能手动修改其中的文本。
- AC-US-009-03: Given the user triggers copy, then the system copies the full current inquiry summary.
- AC-US-009-03：当用户触发复制时，系统应复制当前完整咨询信息汇总。
- AC-US-009-04: Given language is switched, then summary labels use the selected language while user-entered notes remain unchanged.
- AC-US-009-04：当语言切换后，汇总标签应使用所选语言，同时用户填写的备注保持不变。

## Epic 4: Client Account Access / Epic 4：客户账号访问

### US-010: Self-register Client Account by Email / 邮箱自主注册客户账号

- AC-US-010-01: Given a visitor chooses registration, then the system provides an email-based client registration flow.
- AC-US-010-01：当访客选择注册时，系统应提供基于邮箱的客户注册流程。
- AC-US-010-02: Given a client account is created, then it does not grant staff workspace access.
- AC-US-010-02：当客户账号创建后，该账号不应获得工作人员端访问权限。

### US-011: Log In and See Client Account State / 登录并看到客户账号状态

- AC-US-011-01: Given a registered client logs in successfully, then the system shows a logged-in account state.
- AC-US-011-01：当已注册客户成功登录后，系统应显示已登录账号状态。
- AC-US-011-02: Given a logged-in client has no galleries, then the system shows an appropriate empty state.
- AC-US-011-02：当登录客户暂无相册时，系统应显示合适的空状态。
- AC-US-011-03: Given a logged-in client browses public pages, then public browsing and inquiry-copy features remain available.
- AC-US-011-03：当登录客户浏览公开页面时，公开浏览和咨询信息复制功能仍应可用。

## Epic 5: Staff Access and Role Boundaries / Epic 5：工作人员访问与角色边界

### US-012: Log In to Staff Workspace / 登录工作人员端

- AC-US-012-01: Given a staff user opens the staff workspace, then login is required.
- AC-US-012-01：当工作人员打开工作人员端时，系统应要求登录。
- AC-US-012-02: Given a staff user logs in, then the system identifies the role as employee or owner.
- AC-US-012-02：当工作人员登录后，系统应识别角色为员工或老板。
- AC-US-012-03: Given a client account attempts to access the staff workspace, then access is denied.
- AC-US-012-03：当客户账号尝试访问工作人员端时，系统应拒绝访问。

### US-013: Enforce Fixed Employee and Owner Permissions / 执行固定员工与老板权限

- AC-US-013-01: Given the user is an employee, then website content management areas are not available.
- AC-US-013-01：当用户是员工时，系统不应向其开放网站内容管理区域。
- AC-US-013-02: Given the user is the owner, then website content management and employee account management areas are available.
- AC-US-013-02：当用户是老板时，系统应开放网站内容管理和员工账号管理区域。
- AC-US-013-03: Given the first product scope, then custom permission configuration is not available.
- AC-US-013-03：在第一阶段产品范围内，系统不提供自定义权限配置。

## Epic 6: Owner Website Content Management / Epic 6：老板网站内容管理

### US-014: Manage Gallery Categories and Public Images / 管理作品分类和公开作品图片

- AC-US-014-01: Given the owner manages gallery categories, then the owner can add, edit, delete, reorder, publish, and hide categories.
- AC-US-014-01：当老板管理作品分类时，老板可以新增、编辑、删除、排序、发布和隐藏分类。
- AC-US-014-02: Given the owner manages a normal gallery category, then the category supports 0 to 20 images.
- AC-US-014-02：当老板管理普通作品分类时，该分类支持 0 到 20 张图片。
- AC-US-014-03: Given an employee accesses staff workspace, then the employee cannot manage public gallery categories or public gallery images.
- AC-US-014-03：当员工访问工作人员端时，员工不能管理公开作品分类或公开作品图片。

### US-015: Manage Studio Shoot Display Sets / 管理棚拍展示集

- AC-US-015-01: Given the owner manages studio shoot content, then the owner can add, edit, delete, reorder, publish, and hide display sets.
- AC-US-015-01：当老板管理棚拍内容时，老板可以新增、编辑、删除、排序、发布和隐藏展示集。
- AC-US-015-02: Given a studio shoot display set is created, then it requires a custom name.
- AC-US-015-02：当创建棚拍展示集时，该展示集需要自定义名称。
- AC-US-015-03: Given a studio shoot display set is published, then it contains 1 to 9 images.
- AC-US-015-03：当棚拍展示集发布时，该展示集应包含 1 到 9 张图片。

### US-016: Manage Services, Packages, Add-ons, and Prices / 管理服务、套餐、加购项和价格

- AC-US-016-01: Given the owner manages service areas or service types, then the owner can add, edit, delete, and reorder them.
- AC-US-016-01：当老板管理服务地区或服务类型时，老板可以新增、编辑、删除和排序。
- AC-US-016-02: Given the owner manages packages or add-ons, then the owner can edit names, details, prices, availability, and sort order.
- AC-US-016-02：当老板管理套餐或加购项时，老板可以编辑名称、详情、价格、可用状态和排序。
- AC-US-016-03: Given an employee accesses the staff workspace, then the employee cannot manage packages, add-ons, or prices.
- AC-US-016-03：当员工访问工作人员端时，员工不能管理套餐、加购项或价格。

### US-017: Manage Bilingual Customer-facing Content / 管理客户可见双语内容

- AC-US-017-01: Given required customer-facing text is edited, then Chinese and English fields are available.
- AC-US-017-01：当编辑必填客户可见文本时，系统应提供中文和英文字段。
- AC-US-017-02: Given required customer-facing text is missing one language, then the system shows a missing translation warning before publishing.
- AC-US-017-02：当必填客户可见文本缺少其中一种语言时，系统应在发布前显示缺失翻译提醒。
- AC-US-017-03: Given shared business values are edited, then values such as price, sort order, availability, and image reference are shared across languages.
- AC-US-017-03：当编辑共享业务值时，价格、排序、可用状态和图片引用等值应在不同语言间共享。

## Epic 7: Employee Client Gallery Delivery / Epic 7：员工客户相册交付

### US-018: View Full Client List with Minimum Delivery Information / 查看完整客户列表但只显示最少交付信息

- AC-US-018-01: Given an employee opens the client list, then all clients are visible.
- AC-US-018-01：当员工打开客户列表时，应能看到全部客户。
- AC-US-018-02: Given the client list is displayed to an employee, then only minimum delivery-needed information is shown.
- AC-US-018-02：当客户列表展示给员工时，只应显示交付所需的最少信息。
- AC-US-018-03: Given information is unrelated to delivery work, then it is hidden from employees.
- AC-US-018-03：当信息与交付工作无关时，应对员工隐藏。

### US-019: Upload and Edit Original Photo Galleries / 上传并编辑底片相册

- AC-US-019-01: Given an employee opens a client gallery, then the employee can upload original photos for delivery.
- AC-US-019-01：当员工打开客户相册时，员工可以为了交付上传底片。
- AC-US-019-02: Given an original photo gallery exists, then the employee can add, replace, remove, and reorder original photos.
- AC-US-019-02：当底片相册存在时，员工可以新增、替换、移除和调整底片顺序。
- AC-US-019-03: Given an employee edits original photos, then the edit does not grant the employee access to public website content editing.
- AC-US-019-03：当员工编辑底片时，该操作不应授予员工公开网站内容编辑权限。

### US-020: Confirm Original Gallery Edits After Client Submission / 客户提交后编辑底片相册需确认

- AC-US-020-01: Given a client has submitted retouch selections, when an employee attempts to edit the original photo gallery, then the system shows a confirmation message before applying the change.
- AC-US-020-01：当客户已提交精修选择且员工尝试编辑底片相册时，系统应在应用修改前显示确认提示消息。
- AC-US-020-02: Given the confirmation message is shown, when the employee cancels, then no gallery edit is applied.
- AC-US-020-02：当确认提示显示且员工取消时，系统不应应用相册修改。
- AC-US-020-03: Given the confirmation message is shown, when the employee confirms, then the system applies the gallery edit.
- AC-US-020-03：当确认提示显示且员工确认时，系统应应用相册修改。

### US-021: Review Client Retouch Selections and Upload Finals / 查看客户精修选择并上传最终精修图

- AC-US-021-01: Given a client has submitted retouch selections, then employees can view selected originals and per-photo notes for delivery work.
- AC-US-021-01：当客户已提交精修选择后，员工可以为了交付工作查看已选底片和每张照片备注。
- AC-US-021-02: Given final retouched photos are ready, then employees can upload final retouched photos corresponding to selected originals.
- AC-US-021-02：当最终精修图准备好后，员工可以上传与已选底片对应的最终精修图。
- AC-US-021-03: Given retouch selections are submitted, then employees cannot unlock or edit the client's submitted selections.
- AC-US-021-03：当精修选择已提交后，员工不能解锁或修改客户已提交选择。

## Epic 8: Client Photo Delivery / Epic 8：客户照片交付

### US-022: View Own Client Gallery / 查看自己的客户相册

- AC-US-022-01: Given a logged-in client has a gallery, then the client can view that own gallery.
- AC-US-022-01：当登录客户拥有相册时，客户可以查看自己的相册。
- AC-US-022-02: Given a client attempts to access another client's gallery, then access is denied.
- AC-US-022-02：当客户尝试访问其他客户相册时，系统应拒绝访问。
- AC-US-022-03: Given a logged-in client has no galleries, then an empty state is shown.
- AC-US-022-03：当登录客户没有相册时，系统应显示空状态。

### US-023: Download Original and Final Photo Packages / 下载底片和最终精修图压缩包

- AC-US-023-01: Given original photos are available and within the valid window, then the client can download originals as a compressed package.
- AC-US-023-01：当底片可用且仍在有效期内时，客户可以下载底片压缩包。
- AC-US-023-02: Given final retouched photos are available and within the valid window, then the client can download finals as a compressed package.
- AC-US-023-02：当最终精修图可用且仍在有效期内时，客户可以下载最终精修图压缩包。
- AC-US-023-03: Given the 3-month window has expired, then download access is unavailable.
- AC-US-023-03：当 3 个月期限结束后，下载权限应不可用。

### US-024: Select Included Free Retouched Photos / 选择套餐包含的免费精修照片

- AC-US-024-01: Given original photos are uploaded, then the 7-day free retouch selection window starts.
- AC-US-024-01：当底片上传后，7 天免费精修选择期开始计算。
- AC-US-024-02: Given the 7-day window is active, then the client can select included free retouched photos up to the package limit.
- AC-US-024-02：当 7 天窗口有效时，客户可以在套餐数量限制内选择免费精修照片。
- AC-US-024-03: Given the 7-day window has expired without submission, then the included free retouch selection right is lost.
- AC-US-024-03：当 7 天窗口结束且客户未提交时，套餐包含的免费精修选择权失效。

### US-025: Submit Per-photo Retouch Notes / 提交每张照片的修图备注

- AC-US-025-01: Given the client selects a photo for retouching, then the client can enter one note for that photo.
- AC-US-025-01：当客户选择某张照片精修时，客户可以为该照片填写一条备注。
- AC-US-025-02: Given a note exceeds 500 characters, then the system prevents submission or shows validation feedback.
- AC-US-025-02：当备注超过 500 字时，系统应阻止提交或显示校验反馈。
- AC-US-025-03: Given the note contains Simplified Chinese, Traditional Chinese, English, mixed text, or matching punctuation, then the note is accepted within the character limit.
- AC-US-025-03：当备注包含简体、繁体、英文、混合文本或对应标点符号，且未超过字数限制时，系统应接受该备注。

### US-026: Lock Retouch Selection After Submission / 提交后锁定精修选择

- AC-US-026-01: Given the client submits retouch selections, then the submitted selections and notes become locked.
- AC-US-026-01：当客户提交精修选择后，已提交选择和备注应进入锁定状态。
- AC-US-026-02: Given selections are locked, then the client cannot edit them.
- AC-US-026-02：当选择已锁定后，客户不能修改。
- AC-US-026-03: Given selections are locked, then employees and owner cannot unlock them through the normal product flow.
- AC-US-026-03：当选择已锁定后，员工和老板不能通过正常产品流程解锁。

### US-027: See Live Retouch and Storage Countdowns / 查看精修选择与存储实时倒计时

- AC-US-027-01: Given the retouch selection window is open, then the website shows a live 7-day retouch selection countdown.
- AC-US-027-01：当精修选择窗口开放时，网站应实时显示 7 天精修选择倒计时。
- AC-US-027-02: Given the client submits retouch selections, then the 7-day retouch selection countdown disappears.
- AC-US-027-02：当客户提交精修选择后，7 天精修选择倒计时应消失。
- AC-US-027-03: Given the gallery is within the 3-month window, then the website shows a live 3-month download and deletion countdown.
- AC-US-027-03：当相册仍在 3 个月有效期内时，网站应实时显示 3 个月下载和删除倒计时。

### US-028: Lose Free Retouch Right After 7 Days / 7 天后失去免费精修权利

- AC-US-028-01: Given 7 days pass after original upload and the client has not submitted retouch selections, then the included free retouch right is marked as lost.
- AC-US-028-01：当底片上传后 7 天已过且客户未提交精修选择时，系统应标记套餐包含的免费精修权利失效。
- AC-US-028-02: Given the free retouch right is lost, then the client can no longer submit included free retouch selections through the normal flow.
- AC-US-028-02：当免费精修权利失效后，客户不能再通过正常流程提交套餐包含的免费精修选择。

### US-029: Delete Photo Assets After 3 Months / 3 个月后删除照片资产

- AC-US-029-01: Given the 3-month window expires, then original photos are deleted from all product storage locations.
- AC-US-029-01：当 3 个月期限结束后，底片应从产品内所有存储位置删除。
- AC-US-029-02: Given the 3-month window expires, then final retouched photos are deleted at the same time as original photos.
- AC-US-029-02：当 3 个月期限结束后，最终精修图应与底片同时删除。
- AC-US-029-03: Given generated download packages exist, then original-photo and final-photo compressed packages are deleted after the 3-month window expires.
- AC-US-029-03：当已生成下载压缩包时，3 个月期限结束后应删除底片和最终照片压缩包。
- AC-US-029-04: Given the 3-month window has expired, then normal owner-only manual archive access to expired original photos is not retained.
- AC-US-029-04：当 3 个月期限结束后，正常产品流程不保留仅老板可用的过期底片人工归档访问。

## Epic 9: Explicitly Excluded Flows / Epic 9：明确不做的流程

### US-030: Exclude Booking and Payment from Current Scope / 当前范围不做预约和支付

- AC-US-030-01: Given the current product scope, then online booking, payment, deposit, and calendar scheduling flows are not required.
- AC-US-030-01：在当前产品范围内，不要求实现在线预约、支付、定金和日历排期流程。
- AC-US-030-02: Given the current product scope, then retouch revision and submitted-selection unlock flows are not required.
- AC-US-030-02：在当前产品范围内，不要求实现精修返修和已提交精修选择解锁流程。
- AC-US-030-03: Given the current product scope, then configurable employee permissions are not required.
- AC-US-030-03：在当前产品范围内，不要求实现可配置员工权限。
