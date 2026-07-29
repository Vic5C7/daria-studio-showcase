# User Stories By Epic
# 按 Epic 分类的用户故事

This document records the current DARIA STUDIO requirements as user stories.
本文档以用户故事形式记录 DARIA STUDIO 当前需求。

The goal is to preserve product intent before the production frontend, backend, database, and staff admin are designed.
目标是在正式前端、后端、数据库和工作人员后台设计前，保留清晰的产品意图。

## Scope Notes
## 范围说明

- Customer-facing pages should remain separate from staff-facing admin pages.
- 客户可见页面应与工作人员后台页面保持分离。
- The high-fidelity prototype is a reference artifact, not the production architecture.
- 高保真原型是参考产物，不是正式架构。
- Current public pricing direction is package-based graduation photography, not the earlier A-Z point pricing model.
- 当前公开价格方向是毕业照套餐制，而不是早期 A-Z 点位计价模型。
- Online payment, customer accounts, and full booking or order management are not active scope until explicitly added.
- 在线支付、客户账号、完整预约或订单管理在明确加入前不属于当前有效范围。

## Epic 1: Public Brand And Gallery
## Epic 1：公开品牌与作品展示

### US-001: Recognize the studio brand
中文标题：识别工作室品牌

As a photography customer, I want the website to clearly show the studio as DARIA STUDIO, so that I know I am viewing the correct photography business.
作为摄影客户，我希望网站清楚展示工作室品牌为 DARIA STUDIO，以便确认自己正在查看正确的摄影业务。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Public brand text should use `DARIA STUDIO`.
- 公开品牌文案应使用 `DARIA STUDIO`。
- The former `DG墨尔本摄影` brand text has been replaced.
- 之前的 `DG墨尔本摄影` 品牌文案已被替换。

### US-002: Understand the studio's Melbourne positioning
中文标题：理解工作室的墨尔本定位

As a photography customer in Melbourne, I want the homepage copy to express a personal memory-focused feeling, so that the site feels relevant to graduation and wedding moments.
作为墨尔本摄影客户，我希望首页文案表达“专属记忆”的感觉，以便网站与毕业和婚礼等重要时刻相关。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Chinese homepage line: `在墨尔本留下您的专属记忆`.
- 中文首页文案：`在墨尔本留下您的专属记忆`。
- English copy should carry the same meaning rather than being a literal placeholder.
- 英文文案应表达相同含义，而不是使用临时占位翻译。

### US-003: View sample photography work
中文标题：查看摄影样片

As a photography customer, I want to see selected sample images on the homepage, so that I can judge the studio's visual style before looking at prices.
作为摄影客户，我希望在首页看到精选样片，以便在查看价格前判断工作室的视觉风格。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- The current prototype uses 9 sample photos.
- 当前原型使用 9 张样片。
- Original source images are preserved in `sample_pic/`.
- 原始图片素材保存在 `sample_pic/`。
- Prototype display images are copied into `wiki/prototype/high-fidelity/public/images/models/`.
- 原型展示图片复制到 `wiki/prototype/high-fidelity/public/images/models/`。

### US-004: Browse gallery images in one horizontal row
中文标题：以单行横向浏览作品

As a photography customer, I want the homepage work samples to stay in a single horizontal gallery row, so that browsing feels simple and visual rather than like a long image list.
作为摄影客户，我希望首页作品样片保持单行横向展示，以便浏览体验更直观，而不是变成长图片列表。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Gallery items should not wrap into multiple rows in normal desktop use.
- 在常规桌面视图中，作品项不应换成多行。
- Mobile layout should remain usable without text or controls overlapping.
- 移动端布局也应可用，文字和控件不应重叠。

### US-005: Experience automatic gallery movement
中文标题：体验作品自动滚动

As a photography customer, I want the gallery to scroll automatically at a comfortable speed, so that I can passively view the work without needing to click.
作为摄影客户，我希望作品展示以舒适速度自动滚动，以便无需点击也能浏览作品。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- The gallery should move toward the left.
- 作品展示应向左滚动。
- If the user manually interacts with the gallery, auto-scroll should resume after about 3 seconds of no interaction.
- 用户手动操作后，如果约 3 秒没有继续操作，自动滚动应恢复。

### US-006: Control the gallery manually
中文标题：手动控制作品轮播

As a photography customer, I want left and right carousel arrows, so that I can move forward or backward through the images myself.
作为摄影客户，我希望有左右轮播箭头，以便自己向前或向后浏览图片。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Arrows should have a suitable size and color for the design.
- 箭头大小和颜色应适合整体设计。
- Gallery edges should have a fade-in and fade-out feeling as images enter and leave.
- 图片滚入和滚出时，作品展示边缘应有渐入渐出的感觉。

### US-007: Navigate from gallery to pricing
中文标题：从作品页进入价格页

As a photography customer, I want a clear button before the work samples that opens the pricing page, so that I can quickly compare packages after seeing the studio style.
作为摄影客户，我希望作品展示前有一个清晰按钮进入价格页，以便看完风格后快速比较套餐。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- The button appears on the homepage before the gallery section.
- 按钮出现在首页作品展示区域之前。
- It navigates to `/pricing`.
- 按钮跳转到 `/pricing`。

## Epic 2: Language And Navigation
## Epic 2：语言与导航

### US-008: Switch website language
中文标题：切换网站语言

As a photography customer, I want to switch the site between Simplified Chinese and English from the top-right area, so that I can read the site in the language I prefer.
作为摄影客户，我希望能从右上角在简体中文和英文之间切换，以便使用自己偏好的语言阅读网站。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Default language is Simplified Chinese.
- 默认语言为简体中文。
- The language choice should persist after refresh.
- 刷新页面后应保留语言选择。
- Customer-facing labels, package names, navigation, and major descriptions should be bilingual.
- 客户可见标签、套餐名称、导航和主要描述应支持双语。

### US-009: Move between main customer pages
中文标题：在主要客户页面之间切换

As a photography customer, I want simple navigation between the gallery page and pricing page, so that I can move through the public site without confusion.
作为摄影客户，我希望作品页和价格页之间有简单导航，以便顺畅浏览公开网站。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Current customer pages are homepage `/` and pricing `/pricing`.
- 当前客户页面包括首页 `/` 和价格页 `/pricing`。
- Future customer pages can be added after the content model is confirmed.
- 未来可在内容模型确认后增加更多客户页面。

## Epic 3: Service Area And Service Type Discovery
## Epic 3：服务地区与服务类型发现

### US-010: Choose a service area
中文标题：选择服务地区

As a photography customer, I want to choose a service area first, so that the website only shows services relevant to the location I am considering.
作为摄影客户，我希望先选择服务地区，以便网站只展示与目标地区相关的服务。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Current service area options are Shanghai and Melbourne.
- 当前服务地区选项为上海和墨尔本。
- Shanghai currently has no expanded package content.
- 上海目前没有展开套餐内容。

### US-011: See service types for the selected area
中文标题：查看所选地区的服务类型

As a photography customer, I want service type options to appear after I choose a service area, so that I can continue narrowing down what I need.
作为摄影客户，我希望选择服务地区后出现服务类型选项，以便继续缩小需求范围。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Required Melbourne service types include wedding portraits, registry wedding coverage, lifestyle portraits, graduation photography, and ID photos.
- 墨尔本所需服务类型包括婚纱照、注册结婚跟拍、日常写真、毕业照和证件照。
- In the current prototype, only graduation photography is expanded; registry wedding and ID photos now have new requirements that are not yet reflected in the prototype.
- 当前原型只展开毕业照；注册结婚跟拍和证件照已有新需求，但尚未体现在原型中。

### US-012: Understand unavailable service types
中文标题：理解暂未展开的服务类型

As a photography customer, I want unavailable service types to be visible but clearly marked, so that I know the studio may offer them later without expecting complete pricing today.
作为摄影客户，我希望暂未展开的服务类型仍可见但有清楚标记，以便知道这些服务可能后续开放，而不是误以为今天已有完整价格。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Wedding portraits and lifestyle portraits are currently displayed as not expanded.
- 婚纱照和日常写真当前显示为暂未拓展。
- Registry wedding coverage now has package requirements in `US-057` and should no longer be treated as an unavailable service once the pricing flow is updated.
- 注册结婚跟拍已有 `US-057` 中的新套餐需求，价格流程更新后不应再被视为暂未开放服务。

### US-013: Reconfirm registry wedding pricing direction
中文标题：重新确认注册结婚跟拍价格方向

As the studio owner, I want the registry wedding service pricing decision to be clarified, so that production content does not contradict earlier package information.
作为工作室负责人，我希望确认注册结婚跟拍的价格展示方向，以便正式内容不与早期套餐信息冲突。

Status: `Superseded`
状态：`Superseded`

Notes:
说明：

- Earlier requirement: registry wedding coverage had one fixed package at `2000 AUD / day`.
- 早期需求：注册结婚跟拍只有一个固定套餐，价格为 `2000 AUD / day`。
- Later pricing-flow requirement: non-graduation service types were not expanded yet.
- 后续价格流程需求：非毕业照服务类型曾暂不展开。
- Current replacement: registry wedding package tiers are recorded in `US-057`, additional-location pricing in `US-058`, and add-ons in `US-059`.
- 当前替代方案：注册结婚跟拍套餐记录在 `US-057`，加地点价格记录在 `US-058`，加购项记录在 `US-059`。

## Epic 4: Graduation School And Pricing Availability
## Epic 4：毕业照学校与价格可用性

### US-014: Choose a graduation school
中文标题：选择毕业照学校

As a graduation photography customer, I want to choose my school after selecting graduation photography, so that package information can match my campus context.
作为毕业照客户，我希望选择毕业照后再选择学校，以便套餐信息匹配我的学校场景。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Current school options are The University of Melbourne, Monash University, and RMIT.
- 当前学校选项为墨尔本大学、莫纳什大学和 RMIT。
- Chinese display for RMIT should use a suitable Chinese name, while English display can stay `RMIT`.
- 中文界面中 RMIT 应使用合适中文名，英文界面保持 `RMIT` 即可。

### US-015: See pending pricing for schools without confirmed packages
中文标题：查看未确认套餐学校的价格待确认状态

As a graduation photography customer interested in Monash or RMIT, I want the website to tell me that package pricing is pending, so that I do not mistake missing packages for a broken page.
作为关注莫纳什大学或 RMIT 的毕业照客户，我希望网站告知套餐价格待确认，以免误以为页面损坏。

Status: `Superseded`, `Prototype`
状态：`Superseded`，`Prototype`

Notes:
说明：

- Earlier prototype behavior: Monash University and RMIT did not show package prices.
- 早期原型行为：莫纳什大学和 RMIT 不展示套餐价格。
- Current replacement: the other two schools should use the same graduation package structure as the University of Melbourne; see `US-053`.
- 当前替代方案：另外两所学校应使用与墨尔本大学相同的毕业照套餐结构；见 `US-053`。
- A pending-pricing message may still be useful for future schools whose packages are not published yet.
- 对于未来尚未发布套餐的学校，价格待确认提示仍可能有用。

### US-016: Select University of Melbourne scene type
中文标题：选择墨尔本大学场景类型

As a University of Melbourne graduation customer, I want to choose between single-scene and dual-scene coverage, so that package options match the locations I want.
作为墨尔本大学毕业照客户，我希望在单场景和双场景之间选择，以便套餐匹配我想拍摄的地点。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Single scene: University of Melbourne.
- 单场景：墨尔本大学。
- Dual scene: University of Melbourne + Carlton Garden.
- 双场景：墨尔本大学 + Carlton Garden。
- Only the University of Melbourne currently has the dual-scene option.
- 当前只有墨尔本大学有双场景选项。

## Epic 5: University Of Melbourne Graduation Packages
## Epic 5：墨尔本大学毕业照套餐

### US-017: Choose a single-scene graduation package
中文标题：选择单场景毕业照套餐

As a University of Melbourne graduation customer, I want to compare single-scene package tiers, so that I can choose the amount of coverage and retouching I need.
作为墨尔本大学毕业照客户，我希望比较单场景套餐档位，以便选择所需拍摄覆盖和精修数量。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Reference package data:
参考套餐数据：

- Package 1: `198 AUD`; 200 original photos, all originals included; 9 retouched photos; behind-the-scenes video; 5-6 photo spots; iconic campus locations.
- 套餐 1：`198 AUD`；200 张底片，底片全给；送 9 张精修；送花絮视频；5-6 个打卡点；学校标志性地点打卡点。
- Package 2: `298 AUD`; 300 original photos, all originals included; 13 retouched photos; behind-the-scenes video; 8-9 photo spots; more detailed coverage; more locations; more posing guidance; optional locations.
- 套餐 2：`298 AUD`；300 张底片，底片全给；送 13 张精修；送花絮视频；8-9 个打卡点；更细致；更多拍摄点位；更多动作指导；可选地点。
- Package 3: `388 AUD`; 400 original photos, all originals included; 18 retouched photos; behind-the-scenes video; all photo spots; more originals; suitable for photos with parents and friends.
- 套餐 3：`388 AUD`；400 张底片，底片全给；送 18 张精修；送花絮视频；所有打卡点；底片多；适合跟父母朋友合照。

### US-018: Choose a dual-scene graduation package
中文标题：选择双场景毕业照套餐

As a University of Melbourne graduation customer, I want to compare dual-scene package tiers, so that I can include both the university and Carlton Garden in one package.
作为墨尔本大学毕业照客户，我希望比较双场景套餐档位，以便在一个套餐中包含墨尔本大学和 Carlton Garden。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Reference package data:
参考套餐数据：

- Package 1: `388 AUD`; University of Melbourne + Carlton Garden; 400 original photos, all originals included; 18 retouched photos.
- 套餐 1：`388 AUD`；墨尔本大学 + Carlton Garden；400 张底片，底片全给；18 张精修。
- Package 2: `468 AUD`; University of Melbourne + Carlton Garden; 600 original photos, all originals included; 25 retouched photos.
- 套餐 2：`468 AUD`；墨尔本大学 + Carlton Garden；600 张底片，底片全给；25 张精修。
- Package 3: `548 AUD`; University of Melbourne + Carlton Garden; 700 original photos, all originals included; 30 retouched photos.
- 套餐 3：`548 AUD`；墨尔本大学 + Carlton Garden；700 张底片，底片全给；30 张精修。

### US-019: Understand that originals are included
中文标题：理解底片全给

As a graduation photography customer, I want package details to clearly state that all original photos are included, so that I understand what I receive beyond retouched images.
作为毕业照客户，我希望套餐详情清楚说明底片全给，以便理解精修图之外还能获得什么。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- The business message emphasizes `底片全给`.
- 工作室信息强调 `底片全给`。
- This should remain visible in package descriptions.
- 套餐描述中应持续保留该信息。

## Epic 6: Add-ons And Estimated Total
## Epic 6：加购项与预计总价

### US-020: Select clothing add-ons
中文标题：选择服装加购项

As a graduation photography customer, I want to add optional clothing items, so that I can prepare my graduation look from the same package flow.
作为毕业照客户，我希望添加可选服装项目，以便在同一个套餐流程中准备毕业造型。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Reference add-on data:
参考加购项数据：

- Graduation gown + cap: `35 AUD`; available for each school and faculty.
- 毕业袍 + 毕业帽：`35 AUD`；各学校各学院都有。
- Heels + qipao or dress: `10 AUD`.
- 高跟鞋 + 旗袍或裙子：`10 AUD`。
- Hanfu: `40 AUD`.
- 汉服：`40 AUD`。

### US-021: Select prop add-ons
中文标题：选择道具加购项

As a graduation photography customer, I want to add optional props, so that the shoot can include the objects I need.
作为毕业照客户，我希望添加可选道具，以便拍摄中包含我需要的物品。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Reference add-on data:
参考加购项数据：

- Graduation bear + academic cap + bouquet set: `10 AUD`.
- 毕业熊 + 学士帽 + 花束组合：`10 AUD`。
- Bouquet: `3 AUD`.
- 花束：`3 AUD`。
- Academic cap: `3 AUD`.
- 学士帽：`3 AUD`。
- Graduation bear: `5 AUD`.
- 毕业熊：`5 AUD`。
- Academic scroll: `4 AUD`.
- 学术筒：`4 AUD`。
- Uniform bear: `3 AUD`.
- 校服熊：`3 AUD`。

### US-022: Select makeup and styling add-ons
中文标题：选择妆造加购项

As a graduation photography customer, I want to add makeup and styling services, so that I can estimate the full cost of the shoot.
作为毕业照客户，我希望添加妆造服务，以便估算完整拍摄费用。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Reference add-on data:
参考加购项数据：

- Female makeup and styling: `149 AUD`; makeup, hair, lashes, brow shaping, on-site touch-up, and 5 retouched photos.
- 女生妆造：`149 AUD`；化妆、发型、睫毛、修眉，送跟妆，送 5 张精修。
- Male makeup and styling: `79 AUD`; makeup, hair, brow shaping, on-site touch-up, and 5 retouched photos; focused on natural facial definition.
- 男生妆造：`79 AUD`；化妆、发型、修眉，送跟妆，送 5 张精修；主要修饰五官并增强立体度。

### US-023: See a persistent estimated total
中文标题：查看固定显示的预计总价

As a graduation photography customer, I want the estimated total to stay visible in the top-right area while I scroll, so that I can always see how my selections affect price.
作为毕业照客户，我希望预计总价在滚动页面时始终固定显示在右上角，以便随时看到选择对价格的影响。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Total price calculation: selected package price plus selected add-on prices.
- 总价计算方式：已选套餐价格加已选加购项价格。
- When no package is selected, the total area should prompt the customer to choose a package.
- 未选择套餐时，总价区域应提示客户选择套餐。
- When a selected school's package pricing is not published, the total area should show that pricing is pending.
- 当所选学校的套餐价格尚未发布时，总价区域应显示价格待确认。

## Epic 7: Customer Notes And Future Enquiry Payload
## Epic 7：客户备注与未来咨询数据

### US-024: Add notes for school or scene preferences
中文标题：填写学校或场景偏好备注

As a graduation photography customer, I want to add school or scene notes, so that I can record special campus, meeting point, or location preferences.
作为毕业照客户，我希望添加学校或场景备注，以便记录特殊校区、集合点或地点偏好。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Notes do not affect price.
- 备注不影响价格。
- Notes should be kept in state so they can later become part of an enquiry payload.
- 备注应先保存在前端状态中，未来可成为咨询提交数据的一部分。

### US-025: Add notes for selected packages
中文标题：填写套餐备注

As a graduation photography customer, I want to add package notes, so that I can explain preferences such as family photos, friend groups, or shoot priorities.
作为毕业照客户，我希望添加套餐备注，以便说明家庭合照、朋友合照或拍摄重点等偏好。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- These notes are separate from school or scene notes.
- 这些备注与学校或场景备注分开保存。

### US-026: Add notes for clothing, props, and makeup
中文标题：填写服装、道具和妆造备注

As a graduation photography customer, I want separate note areas for clothing, props, and makeup, so that the studio can understand preferences that are not captured by checkboxes.
作为毕业照客户，我希望服装、道具和妆造各有独立备注区域，以便工作室理解复选框没有覆盖的偏好。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Clothing, props, and makeup notes should be stored separately.
- 服装、道具和妆造备注应分开保存。
- Each note group should be suitable for future form submission.
- 每个备注分组都应适合未来并入表单提交。

### US-027: Manage note limits
中文标题：管理备注数量限制

As a graduation photography customer, I want to add and remove multiple notes in each note area, so that I can correct my selections without restarting the flow.
作为毕业照客户，我希望能在每个备注区域添加和删除多条备注，以便不用重走流程也能修正选择。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Empty notes cannot be added.
- 空备注不能添加。
- Each note area can contain up to 10 notes.
- 每个备注区域最多 10 条备注。
- When the limit is reached, adding another note should be disabled or clearly blocked.
- 达到上限后，应禁用或清楚阻止继续添加备注。

### US-028: Reset downstream selections when upstream choices change
中文标题：上游选择变化时清空下游选择

As a photography customer, I want irrelevant downstream choices to clear when I change a major earlier choice, so that the total and notes do not mix data from different packages.
作为摄影客户，我希望更改前面的关键选择时清空无关的下游选择，以免总价和备注混入不同套餐的数据。

Status: `Active`, `Prototype`
状态：`Active`，`Prototype`

Notes:
说明：

- Changing service area, service type, or school should clear downstream package, add-on, and related note selections.
- 切换服务地区、服务类型或学校时，应清空下游套餐、加购项和相关备注。
- Changing a scene type should clear package and add-on selections that no longer apply.
- 切换场景类型时，应清空不再适用的套餐和加购项选择。

## Epic 8: Staff Authentication And Admin Separation
## Epic 8：工作人员认证与后台分离

### US-029: Staff member can sign in
中文标题：工作人员可以登录

As a studio staff member, I want to log in with a staff account, so that only authorized people can edit website content.
作为工作室工作人员，我希望使用工作人员账号登录，以便只有授权人员可以编辑网站内容。

Status: `Next`
状态：`Next`

Notes:
说明：

- Authentication design is not selected yet.
- 认证设计尚未确定。
- Do not add real authentication to the prototype.
- 不要在原型中加入真实认证。

### US-030: Staff admin is separate from the customer website
中文标题：工作人员后台与客户网站分离

As a studio staff member, I want a dedicated admin area, so that editing tools do not mix with the public customer experience.
作为工作室工作人员，我希望有独立后台区域，以便编辑工具不混入公开客户体验。

Status: `Next`
状态：`Next`

Notes:
说明：

- Customer pages and staff pages should use separate routes, layouts, and permission boundaries.
- 客户页面和工作人员页面应使用独立路由、布局和权限边界。

### US-031: Studio owner can manage staff permissions
中文标题：工作室负责人可以管理员工权限

As a studio owner or administrator, I want to control which staff members can edit or publish content, so that public website changes are made by trusted people.
作为工作室负责人或管理员，我希望控制哪些工作人员可以编辑或发布内容，以便公开网站变更由可信人员完成。

Status: `Later`, `Decision needed`
状态：`Later`，`Decision needed`

Notes:
说明：

- First production version may only need one staff role.
- 第一版正式系统可能只需要一种工作人员角色。
- Role count and permission levels must be decided before implementation.
- 实现前必须决定角色数量和权限层级。

## Epic 9: Staff Content Management
## Epic 9：工作人员内容管理

### US-032: Manage service areas
中文标题：管理服务地区

As a studio staff member, I want to add and edit service areas, so that the studio can expand beyond the initial Shanghai and Melbourne options.
作为工作室工作人员，我希望添加和编辑服务地区，以便工作室可以扩展到初始上海和墨尔本以外的地区。

Status: `Next`
状态：`Next`

Notes:
说明：

- Service areas should be data-driven content.
- 服务地区应是数据驱动内容。
- Staff should not need code changes to add a new area.
- 工作人员添加新地区时不应需要修改代码。

### US-033: Manage service types per area
中文标题：按地区管理服务类型

As a studio staff member, I want to add and edit service types under specific service areas, so that each area can show only the services available there.
作为工作室工作人员，我希望在特定服务地区下添加和编辑服务类型，以便每个地区只展示当地可用服务。

Status: `Next`
状态：`Next`

Notes:
说明：

- Service type availability is linked to service area.
- 服务类型可用性与服务地区关联。
- Example: Melbourne has graduation photography while Shanghai currently has no expanded services.
- 示例：墨尔本有毕业照，而上海当前没有展开服务。

### US-034: Manage schools
中文标题：管理学校

As a studio staff member, I want to add and edit schools, so that graduation photography content can expand beyond the initial three schools.
作为工作室工作人员，我希望添加和编辑学校，以便毕业照内容可以扩展到初始三所学校之外。

Status: `Next`
状态：`Next`

Notes:
说明：

- Initial schools are University of Melbourne, Monash University, and RMIT.
- 初始学校为墨尔本大学、莫纳什大学和 RMIT。
- Future school records should support bilingual names.
- 未来学校记录应支持双语名称。

### US-035: Manage scene types
中文标题：管理场景类型

As a studio staff member, I want to add and edit scene types for a school or service, so that combinations like University of Melbourne plus Carlton Garden can be maintained without code changes.
作为工作室工作人员，我希望为学校或服务添加和编辑场景类型，以便墨尔本大学加 Carlton Garden 这类组合无需改代码即可维护。

Status: `Next`
状态：`Next`

Notes:
说明：

- Scene types should belong to the appropriate parent content.
- 场景类型应属于合适的上级内容。
- Carlton Garden is currently a scene component, not a school.
- Carlton Garden 当前是场景组成部分，不是学校。

### US-036: Manage packages
中文标题：管理套餐

As a studio staff member, I want to add and edit packages, so that prices, included details, and availability can change as the business changes.
作为工作室工作人员，我希望添加和编辑套餐，以便价格、包含内容和可用状态能随业务变化调整。

Status: `Next`
状态：`Next`

Notes:
说明：

- Packages need price, currency, bilingual display name, bilingual details, parent scene or service relationship, and availability status.
- 套餐需要价格、货币、双语展示名称、双语详情、上级场景或服务关系，以及可用状态。

### US-037: Manage add-on categories and items
中文标题：管理加购类别和加购项

As a studio staff member, I want to add and edit clothing, prop, and makeup add-ons, so that optional purchase items can be maintained without code changes.
作为工作室工作人员，我希望添加和编辑服装、道具和妆造加购项，以便可选消费项目无需改代码即可维护。

Status: `Next`
状态：`Next`

Notes:
说明：

- Add-on categories should not be hard-coded to only the current three groups forever.
- 加购类别不应永远硬编码为当前三类。
- Current groups are clothing, props, and makeup or styling.
- 当前分组为服装、道具和妆造。

### US-038: Manage bilingual customer-facing copy
中文标题：管理客户可见双语文案

As a studio staff member, I want to edit approved Chinese and English website copy, so that the public site stays accurate for both audiences.
作为工作室工作人员，我希望编辑经确认的中文和英文网站文案，以便公开网站对两类语言用户都保持准确。

Status: `Next`
状态：`Next`

Notes:
说明：

- Bilingual fields should be modeled intentionally in the database.
- 双语字段应在数据库中有意识地建模。
- Production should avoid partial translation states becoming public accidentally.
- 正式系统应避免部分翻译状态被意外公开。

### US-039: Manage gallery media
中文标题：管理作品展示媒体

As a studio staff member, I want to add, order, and update gallery images, so that the public portfolio can grow beyond the initial sample images.
作为工作室工作人员，我希望添加、排序和更新作品展示图片，以便公开作品集可以超出初始样片继续增长。

Status: `Next`
状态：`Next`

Notes:
说明：

- Media records should include useful metadata such as alt text, ordering, and publication state.
- 媒体记录应包含 alt 文案、排序、发布状态等有用元数据。
- Image compression and review rules are still open decisions.
- 图片压缩和审核规则仍待决策。

## Epic 10: Draft, Preview, And Publish Workflow
## Epic 10：草稿、预览与发布流程

### US-040: Save content as draft
中文标题：将内容保存为草稿

As a studio staff member, I want to save edits as drafts, so that I can work on content without immediately changing the public website.
作为工作室工作人员，我希望将编辑保存为草稿，以便处理内容时不会立即改变公开网站。

Status: `Next`
状态：`Next`

Notes:
说明：

- Draft saving should not affect customer-facing pages.
- 保存草稿不应影响客户可见页面。

### US-041: Preview draft content
中文标题：预览草稿内容

As a studio staff member, I want to preview draft content before publishing, so that I can check how changes will look to customers.
作为工作室工作人员，我希望发布前预览草稿内容，以便检查变更对客户显示的效果。

Status: `Next`
状态：`Next`

Notes:
说明：

- The system should clearly show when staff are viewing draft content.
- 系统应清楚提示工作人员当前查看的是草稿内容。

### US-042: Publish approved content
中文标题：发布已确认内容

As a studio staff member, I want publishing to be an explicit action, so that accidental public changes are less likely.
作为工作室工作人员，我希望发布是一个明确操作，以降低误改公开内容的概率。

Status: `Next`
状态：`Next`

Notes:
说明：

- Publishing should move approved draft content to the customer-facing published state.
- 发布应把已确认的草稿内容转为客户可见的已发布状态。

### US-043: Track content versions
中文标题：追踪内容版本

As a studio owner or administrator, I want published content changes to keep version history, so that mistakes can be reviewed or reverted later.
作为工作室负责人或管理员，我希望已发布内容变更保留版本历史，以便后续查看或回退错误。

Status: `Later`, `Decision needed`
状态：`Later`，`Decision needed`

Notes:
说明：

- Decide whether versioning stores full snapshots or per-entity revisions.
- 需要决定版本管理是保存完整快照，还是保存单实体修订。

## Epic 11: Backend API And Data Persistence
## Epic 11：后端 API 与数据持久化

### US-044: Customer site reads published content
中文标题：客户网站读取已发布内容

As a photography customer, I want the public website to show the latest published content, so that package information reflects what the studio has approved.
作为摄影客户，我希望公开网站展示最新已发布内容，以便套餐信息体现工作室确认过的版本。

Status: `Next`
状态：`Next`

Notes:
说明：

- The future customer frontend should read published data from the backend API or a published content source.
- 未来客户前端应从后端 API 或已发布内容源读取数据。

### US-045: Staff edits are stored persistently
中文标题：工作人员编辑内容被持久保存

As a studio staff member, I want my content edits to be stored in a database, so that changes survive refreshes, deployments, and device changes.
作为工作室工作人员，我希望内容编辑被保存到数据库，以便刷新、部署或更换设备后变更仍然存在。

Status: `Next`
状态：`Next`

Notes:
说明：

- Database structure is not designed yet.
- 数据库结构尚未设计。
- Production implementation should wait for schema decisions.
- 正式实现应等待数据结构决策完成。

### US-046: API supports content relationships
中文标题：API 支持内容关系

As a developer, I want the backend API to represent service areas, service types, schools, scene types, packages, add-ons, media, and content versions, so that the frontend can stay data-driven.
作为开发者，我希望后端 API 能表示服务地区、服务类型、学校、场景类型、套餐、加购项、媒体和内容版本，以便前端保持数据驱动。

Status: `Next`
状态：`Next`

Notes:
说明：

- Current relationship draft: service area -> service type -> school -> scene type -> package -> add-on items.
- 当前关系草案：服务地区 -> 服务类型 -> 学校 -> 场景类型 -> 套餐 -> 加购项。
- Some relationship rules still need decisions, especially whether add-ons attach globally, by service type, by school, or by scene.
- 部分关系规则仍需决策，尤其是加购项应全局挂载，还是按服务类型、学校或场景挂载。

### US-047: Future enquiry can include selected package data
中文标题：未来咨询可以包含已选套餐数据

As a photography customer, I want a future enquiry or booking form to carry my selected package, add-ons, estimated total, and notes, so that I do not need to repeat information when contacting the studio.
作为摄影客户，我希望未来咨询或预约表单能携带已选套餐、加购项、预计总价和备注，以便联系工作室时不用重复填写信息。

Status: `Later`
状态：`Later`

Notes:
说明：

- No booking submission is active in the current prototype.
- 当前原型没有启用预约提交。
- Online payment is still out of scope.
- 在线支付仍不在当前范围内。

## Epic 12: Repository, Prototype, And Deployment
## Epic 12：仓库、原型与部署

### US-048: Keep prototype separate from production code
中文标题：保持原型与正式代码分离

As a maintainer, I want the high-fidelity prototype to live under the wiki area, so that it can guide product discussion without becoming the production implementation by accident.
作为维护者，我希望高保真原型位于 wiki 区域，以便它指导产品讨论，但不会意外变成正式实现。

Status: `Active`
状态：`Active`

Notes:
说明：

- Current prototype path: `wiki/prototype/high-fidelity/`.
- 当前原型路径：`wiki/prototype/high-fidelity/`。
- Formal production code placeholders live under `repos/`.
- 正式代码占位位于 `repos/`。

### US-049: Keep formal frontend and backend placeholders clean
中文标题：保持正式前后端占位目录干净

As a maintainer, I want `repos/frontend/` and `repos/backend/` to remain clean placeholders until framework and database decisions are made, so that production work starts from a deliberate architecture.
作为维护者，我希望 `repos/frontend/` 和 `repos/backend/` 在框架和数据库决策完成前保持干净占位，以便正式开发从经过考虑的架构开始。

Status: `Active`
状态：`Active`

Notes:
说明：

- The frontend and backend directories currently contain README files only.
- 前端和后端目录目前只包含 README 文件。

### US-050: Deploy the prototype statically
中文标题：静态部署原型

As the studio owner, I want the current prototype to remain available through GitHub Pages, so that it can be reviewed without renting or maintaining a server.
作为工作室负责人，我希望当前原型继续通过 GitHub Pages 访问，以便无需租用或维护服务器也能审阅。

Status: `Active`
状态：`Active`

Notes:
说明：

- GitHub Pages currently builds from `wiki/prototype/high-fidelity/`.
- GitHub Pages 当前从 `wiki/prototype/high-fidelity/` 构建。
- This is suitable for the prototype because it does not require a backend server.
- 这适合当前原型，因为它不需要后端服务器。

### US-051: Preview the prototype locally with Docker
中文标题：使用 Docker 本地预览原型

As a maintainer, I want Docker to run the high-fidelity prototype locally, so that the preview environment is repeatable even before production infrastructure is chosen.
作为维护者，我希望 Docker 可以在本地运行高保真原型，以便在正式基础设施确定前也有可重复的预览环境。

Status: `Active`
状态：`Active`

Notes:
说明：

- Root `docker-compose.yml` currently points to the prototype directory.
- 根目录 `docker-compose.yml` 当前指向原型目录。

### US-052: Keep planning documents near the project
中文标题：将规划文档保留在项目附近

As a maintainer, I want user stories, acceptance criteria, prototype notes, test plans, architecture drafts, and decisions in the repository wiki folder, so that product thinking evolves alongside the codebase.
作为维护者，我希望用户故事、验收标准、原型说明、测试计划、架构草案和决策记录都放在仓库 wiki 文件夹中，以便产品思考和代码库一起演进。

Status: `Active`
状态：`Active`

Notes:
说明：

- Current planning area: `wiki/`.
- 当前规划区域：`wiki/`。

## Epic 13: Latest Graduation Package Clarifications
## Epic 13：最新毕业照套餐补充

### US-053: Reuse base graduation packages across supported schools
中文标题：支持学校共用基础毕业照套餐

As a graduation photography customer at a supported school, I want to see the same base package tiers when the studio offers the same package structure for my school, so that I can choose a package without seeing a pending-pricing state.
作为受支持学校的毕业照客户，我希望在工作室为我的学校提供相同套餐结构时看到同样的基础套餐档位，以便不用停留在价格待确认状态。

Status: `Active`
状态：`Active`

Notes:
说明：

- Current chat requirement: the other two schools use the same base graduation package structure as the University of Melbourne.
- 当前聊天需求：另外两所学校使用与墨尔本大学相同的基础毕业照套餐结构。
- The base package data is the `198 AUD`, `298 AUD`, and `388 AUD` tier set recorded in `US-017`.
- 基础套餐数据为 `US-017` 记录的 `198 AUD`、`298 AUD`、`388 AUD` 三档。
- This does not automatically make University of Melbourne + Carlton Garden dual-scene packages available to every school.
- 这不代表墨尔本大学 + Carlton Garden 双场景套餐自动适用于所有学校。

### US-054: Show school-specific prop availability
中文标题：展示按学校区分的道具可用性

As a graduation photography customer, I want prop options to reflect my selected school's availability, so that I do not choose a prop the studio cannot provide for that school.
作为毕业照客户，我希望道具选项能根据我选择的学校显示可用状态，以免选到该学校无法提供的道具。

Status: `Active`, `Next`
状态：`Active`，`Next`

Notes:
说明：

- Current chat requirement: props are mostly the same across the other two schools.
- 当前聊天需求：另外两所学校的道具大体相同。
- Monash University and RMIT do not have the graduation scroll or tube prop.
- 莫纳什大学和 RMIT 没有毕业筒/毕业卷轴道具。
- Future content management should model prop availability by school instead of hard-coding one global list.
- 未来内容管理应按学校建模道具可用性，而不是硬编码一份全局列表。

### US-055: Explain photo spot coverage and substitution rules
中文标题：解释打卡点覆盖与替代规则

As a graduation photography customer, I want package copy to explain that photo spots may be adjusted because of weather, lighting, crowds, closures, or other sudden conditions, so that I understand why the final route may differ from the ideal list.
作为毕业照客户，我希望套餐文案解释打卡点可能因天气、光线、人流、封闭或其他突发情况调整，以便理解实际路线为什么可能不同于理想清单。

Status: `Active`
状态：`Active`

Notes:
说明：

- The phrase `all photo spots` should be supported by explanatory copy rather than promising every listed spot under every condition.
- `所有打卡点` 这类表述应配套解释文案，而不是承诺任何情况下都能拍到每个点位。
- If a spot is too crowded, closed, poorly lit, or unsuitable in bad weather, the photographer may use another angle or another nearby spot.
- 如果某个点位人太多、封闭、光线不好或天气不适合，摄影师可以选择其他角度或附近替代点位。
- Final image effects may vary by weather, light, photographer, and shoot time.
- 最终图像效果可能受天气、光线、摄影师和拍摄时间影响。

### US-056: Browse portfolio images by service and location category
中文标题：按服务和地点分类浏览作品图

As a photography customer, I want the Works or Gallery section to include images for each service, school, scene, or photo spot category, so that I can see examples that match the shoot I am considering.
作为摄影客户，我希望作品栏目能按服务、学校、场景或打卡点分类展示图片，以便看到与自己想拍内容匹配的样片。

Status: `Active`, `Next`
状态：`Active`，`Next`

Notes:
说明：

- Current chat requirement: every photo spot has its own images, and the Works section should be able to show images under each category.
- 当前聊天需求：每个打卡点都有各自的图片，作品栏目也应能展示每个分类下的图片。
- Category examples include graduation schools, registry wedding, indoor studio shoots, ID photos, scene types, and individual photo spots.
- 分类示例包括毕业照学校、注册结婚跟拍、棚拍、证件照、场景类型和单个打卡点。
- Media records should support category tags or relationships so future galleries can be data-driven.
- 媒体记录应支持分类标签或关联关系，以便未来作品展示可以数据驱动。

## Epic 14: Registry Wedding Package Pricing
## Epic 14：注册结婚跟拍套餐价格

### US-057: Choose a registry wedding package tier
中文标题：选择注册结婚跟拍套餐档位

As a registry wedding customer, I want to compare registry wedding package tiers, so that I can choose the amount of coverage, locations, and retouching I need.
作为注册结婚跟拍客户，我希望比较注册套餐档位，以便选择所需拍摄覆盖、地点数量和精修数量。

Status: `Active`
状态：`Active`

Reference package data:
参考套餐数据：

- Package 1: `249 AUD`; registry or proposal coverage plus family and friend group photos; 200 original photos; behind-the-scenes video; 5 retouched photos.
- 套餐 1：`249 AUD`；注册（求婚）+ 亲朋合影；200 张底片；送花絮视频；5 张精修。
- Package 2: `349 AUD`; Package 1 plus couple portraits after registry, including posed moments such as ring exchange, kiss, certificate display, and certificate signing; 300 original photos; behind-the-scenes video; 9 retouched photos.
- 套餐 2：`349 AUD`；套餐 1 + 双人注册后情侣照，包括交换戒指、亲吻、展示证书、证书签字等注册摆拍；300 张底片；送花絮视频；9 张精修。
- Package 3: `449 AUD`; Package 2 plus couple portraits at one additional location; 400 original photos; behind-the-scenes video; 13 retouched photos.
- 套餐 3：`449 AUD`；套餐 2 + 另一个地点情侣照；400 张底片；送花絮视频；13 张精修。
- Package 4: `549 AUD`; Package 2 plus couple portraits at two additional locations; 500 original photos; behind-the-scenes video; 17 retouched photos.
- 套餐 4：`549 AUD`；套餐 2 + 另两个地点情侣照；500 张底片；送花絮视频；17 张精修。

### US-058: Add extra registry wedding locations
中文标题：注册跟拍加拍额外地点

As a registry wedding customer, I want to add extra shoot locations to a registry package, so that the package can grow when I want more couple portraits.
作为注册结婚跟拍客户，我希望能在注册套餐中加拍额外地点，以便需要更多情侣照时扩展套餐。

Status: `Active`
状态：`Active`

Notes:
说明：

- Each additional location adds `100 AUD`.
- 每增加一个地点加 `100 AUD`。
- Each additional location also adds 4 retouched photos.
- 每增加一个地点同时增加 4 张精修。
- The estimated total should update when extra locations are selected.
- 选择额外地点时，预计总价应随之更新。

### US-059: Select registry wedding styling, wardrobe, and props
中文标题：选择注册跟拍妆造、服装和道具

As a registry wedding customer, I want to select optional styling, wardrobe, and props, so that I can estimate the complete shoot cost.
作为注册结婚跟拍客户，我希望选择可选妆造、服装和道具，以便估算完整拍摄费用。

Status: `Active`
状态：`Active`

Reference add-on data:
参考加购项数据：

- Female hair, makeup, and lashes: `149 AUD`; includes 5 retouched photos.
- 女生发型 + 妆容 + 睫毛：`149 AUD`；送 5 张精修。
- Male hair and makeup: `79 AUD`.
- 男生发型 + 妆容：`79 AUD`。
- Props: bouquet `10 AUD`, white veil gloves `10 AUD`, veil `10 AUD`, accessories `10 AUD`.
- 道具：花束 `10 AUD`，白纱手套 `10 AUD`，头纱 `10 AUD`，配饰 `10 AUD`。
- Wardrobe: wedding dress `40 AUD`, suit `40 AUD`.
- 服装：女婚纱 `40 AUD`，西装 `40 AUD`。

## Epic 15: Studio Shoot And ID Photo Services
## Epic 15：棚拍与证件照服务

### US-060: Add a graduation studio shoot option
中文标题：增加毕业照棚拍选项

As a graduation photography customer, I want an indoor studio shoot option under graduation photography, so that I can choose a controlled-background graduation photo session in addition to campus outdoor shoots.
作为毕业照客户，我希望毕业照分类下有棚拍选项，以便除了校园外景，也能选择可控背景的室内毕业照拍摄。

Status: `Active`, `Decision needed`
状态：`Active`，`Decision needed`

Reference package data:
参考套餐数据：

- Draft early-bird price: `79 AUD`.
- 草稿早鸟价：`79 AUD`。
- Includes 80 original photos, all originals included, behind-the-scenes video, instant photo, and 9 retouched photos.
- 包含 80 张底片，底片全部给，送花絮视频、拍立得和 9 张精修。
- Multiple background templates should be selectable.
- 可选择多种背景模板。
- The latest chat draft mentions included clothing or props and the option for customers to bring their own clothes; the final included wardrobe list still needs confirmation.
- 最新聊天草稿提到包含服装或道具，也允许客户自带衣服；最终包含的服装清单仍需确认。
- The chat draft also mentions an optional specialty prop add-on at `8 AUD`; public wording and availability need confirmation.
- 聊天草稿还提到一个可选特殊道具加购为 `8 AUD`；公开文案和可用性需确认。

### US-061: Add simple indoor styling for studio shoots
中文标题：增加棚内简单妆造

As a studio shoot customer, I want to add simple indoor styling, so that I can prepare for the shoot without arranging separate makeup or hair service.
作为棚拍客户，我希望可以加购棚内简单妆造，以便不用另行安排妆发服务。

Status: `Active`
状态：`Active`

Notes:
说明：

- Current chat requirement: simple indoor styling is `79 AUD`.
- 当前聊天需求：棚内简单妆造为 `79 AUD`。
- This add-on should be separate from the larger graduation or registry styling packages unless the owner later decides to merge them.
- 该加购项应与毕业照或注册跟拍的大型妆造套餐分开，除非负责人后续决定合并。

### US-062: Add an ID photo service category
中文标题：增加证件照服务分类

As a photography customer, I want ID photos to appear as their own service category, so that I can find them separately from graduation, registry wedding, wedding portraits, and lifestyle portraits.
作为摄影客户，我希望证件照作为独立服务分类出现，以便与毕业照、注册跟拍、婚纱照和日常写真分开查找。

Status: `Active`, `Decision needed`
状态：`Active`，`Decision needed`

Notes:
说明：

- Current chat requirement: add an ID photo category to the overall service classification.
- 当前聊天需求：在整体服务分类中增加证件照。
- Package tiers, prices, included deliverables, retouching count, and customer copy for ID photos have not been provided yet.
- 证件照的套餐档位、价格、包含内容、精修数量和客户可见文案尚未提供。

## Superseded Requirements
## 已被替代的需求

These requirements were discussed earlier but replaced or paused by later decisions.
这些需求曾经讨论过，但已被后续决策替代或暂停。

They are recorded to avoid losing context.
这里保留它们是为了避免上下文丢失。

### SUP-001: A-Z graduation photo points
中文标题：A-Z 毕业照拍摄点位

Earlier idea:
早期想法：

- After choosing a school, customers would choose from 26 shooting points labeled A-Z.
- 选择学校后，客户可以从 A-Z 共 26 个拍摄点位中选择。
- Each point was priced at `25 AUD`.
- 每个点位价格为 `25 AUD`。
- Total price was selected point count multiplied by `25 AUD`.
- 总价为已选点位数量乘以 `25 AUD`。

Current status: `Superseded`
当前状态：`Superseded`

Replacement:
替代方案：

- Graduation pricing is now package-based for the University of Melbourne.
- 当前毕业照价格改为墨尔本大学套餐制。
- The A-Z point selection UI should not appear in the current pricing flow.
- 当前价格流程中不应再出现 A-Z 点位选择 UI。

### SUP-002: Campus selection before point selection
中文标题：点位选择前先选择校区

Earlier idea:
早期想法：

- After choosing a school, customers would choose a campus.
- 选择学校后，客户需要选择校区。
- Campus options were drafted for University of Melbourne, Monash University, and RMIT.
- 曾经为墨尔本大学、莫纳什大学和 RMIT 草拟校区选项。
- Photo points, props, clothing, and makeup would appear after campus selection.
- 选择校区后再出现拍照点位、道具、服装和美妆。

Current status: `Superseded`
当前状态：`Superseded`

Replacement:
替代方案：

- The current flow removes campus and A-Z point selection.
- 当前流程移除了校区和 A-Z 点位选择。
- School selection leads to scene type and package selection for University of Melbourne.
- 选择学校后，墨尔本大学进入场景类型和套餐选择。

### SUP-003: Early add-on pricing model
中文标题：早期加购价格模型

Earlier idea:
早期想法：

- Props were `5 AUD` each.
- 道具每个 `5 AUD`。
- Makeup face service was `20 AUD`.
- 面妆服务 `20 AUD`。
- Hair service was `5 AUD`.
- 头发服务 `5 AUD`。
- Academic gown was `30 AUD`.
- 学士服 `30 AUD`。

Current status: `Superseded`
当前状态：`Superseded`

Replacement:
替代方案：

- Current add-on prices use the studio-provided package data listed in Epic 6.
- 当前加购价格使用 Epic 6 中列出的工作室提供数据。
