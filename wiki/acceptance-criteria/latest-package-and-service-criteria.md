# Acceptance Criteria For Latest Package And Service Stories
# 最新套餐与服务用户故事验收标准

This document defines acceptance criteria for `US-053` through `US-062`.
本文档定义 `US-053` 至 `US-062` 的验收标准。

These criteria are product planning requirements. They should guide future prototype updates, production frontend work, backend content modeling, and QA, but they are not production code.
这些验收标准属于产品规划需求，可指导后续原型更新、正式前端、后端内容建模和测试，但不是正式业务代码。

## Traceability
## 追溯关系

- Source user stories: `wiki/user-stories/stories-by-epic.md`.
- 来源用户故事：`wiki/user-stories/stories-by-epic.md`。
- Covered IDs: `US-053`, `US-054`, `US-055`, `US-056`, `US-057`, `US-058`, `US-059`, `US-060`, `US-061`, `US-062`.
- 覆盖编号：`US-053`、`US-054`、`US-055`、`US-056`、`US-057`、`US-058`、`US-059`、`US-060`、`US-061`、`US-062`。

## US-053: Reuse Base Graduation Packages Across Supported Schools
## US-053：支持学校共用基础毕业照套餐

### AC-053-01: Show base tiers for supported schools
### AC-053-01：受支持学校展示基础档位

Given a customer has selected Melbourne, graduation photography, and a supported school that uses the shared base graduation package structure,
when the customer reaches package selection,
then the website shows the three base package tiers at `198 AUD`, `298 AUD`, and `388 AUD`.

在客户已选择墨尔本、毕业照，并选择了使用共享基础毕业照套餐结构的受支持学校时，
当客户进入套餐选择区域，
则网站展示 `198 AUD`、`298 AUD` 和 `388 AUD` 三个基础套餐档位。

### AC-053-02: Preserve base package deliverables
### AC-053-02：保留基础套餐交付内容

Given the shared base graduation package tiers are displayed,
when a customer reads the package details,
then the details match the `US-017` package data, including original photo counts, retouched photo counts, behind-the-scenes video, photo spot coverage, and family or friend photo notes where applicable.

在共享基础毕业照套餐档位已展示时，
当客户阅读套餐详情，
则详情与 `US-017` 的套餐数据一致，包括底片数量、精修数量、花絮视频、打卡点覆盖和适用时的父母朋友合照说明。

### AC-053-03: Do not show pending pricing for shared-package schools
### AC-053-03：共用套餐学校不展示价格待确认

Given Monash University or RMIT is configured to use the shared base graduation package structure,
when the customer selects that school,
then the website does not show the old package-pricing-pending message for that school.

在莫纳什大学或 RMIT 已配置为使用共享基础毕业照套餐结构时，
当客户选择该学校，
则网站不再为该学校展示旧的套餐价格待确认提示。

### AC-053-04: Keep dual-scene availability explicit
### AC-053-04：双场景可用性必须明确

Given a school uses the shared base graduation package structure,
when the school does not have a configured dual-scene package,
then the website does not automatically show University of Melbourne + Carlton Garden dual-scene packages for that school.

在某学校使用共享基础毕业照套餐结构时，
当该学校没有配置双场景套餐，
则网站不会自动为该学校展示墨尔本大学 + Carlton Garden 双场景套餐。

## US-054: Show School-Specific Prop Availability
## US-054：展示按学校区分的道具可用性

### AC-054-01: Filter props by selected school
### AC-054-01：根据所选学校筛选道具

Given a customer has selected a graduation school,
when prop add-ons are displayed,
then the prop list only includes props available for that selected school.

在客户已选择毕业照学校时，
当页面展示道具加购项，
则道具列表只包含该学校可用的道具。

### AC-054-02: Exclude graduation scroll or tube for Monash and RMIT
### AC-054-02：莫纳什和 RMIT 排除毕业筒或卷轴

Given the customer selected Monash University or RMIT,
when prop add-ons are displayed,
then the graduation scroll or tube prop is hidden or clearly marked as unavailable and cannot be selected.

在客户选择莫纳什大学或 RMIT 时，
当页面展示道具加购项，
则毕业筒或毕业卷轴道具被隐藏，或清楚标记为不可用且不可选择。

### AC-054-03: Keep common props available where applicable
### AC-054-03：适用时保留通用道具

Given the selected school supports common graduation props,
when prop add-ons are displayed,
then shared props such as bouquets, academic caps, and available bear props remain visible with their configured prices.

在所选学校支持通用毕业照道具时，
当页面展示道具加购项，
则花束、学士帽和可用玩偶等共享道具仍显示，并展示其配置价格。

### AC-054-04: Store availability as content relationship
### AC-054-04：以内容关系保存可用性

Given staff later manage prop data in the content system,
when they change a prop's school availability,
then the customer-facing prop list updates without requiring code changes.

在工作人员未来通过内容系统管理道具数据时，
当工作人员修改某个道具的学校可用性，
则客户可见的道具列表无需修改代码即可随之更新。

## US-055: Explain Photo Spot Coverage And Substitution Rules
## US-055：解释打卡点覆盖与替代规则

### AC-055-01: Explain `all photo spots`
### AC-055-01：解释“所有打卡点”

Given a package uses wording such as `all photo spots`,
when the package details are displayed,
then the website also shows explanatory copy that photo spots may be adjusted under real shoot conditions.

在某套餐使用 `所有打卡点` 等表述时，
当页面展示套餐详情，
则网站同时展示解释文案，说明实际拍摄中打卡点可能被调整。

### AC-055-02: List substitution reasons
### AC-055-02：列出替代理由

Given photo spot adjustment copy is displayed,
when the customer reads it,
then it mentions weather, lighting, crowding, temporary closures, and other sudden conditions as possible reasons for using another angle or nearby location.

在页面展示打卡点调整说明时，
当客户阅读说明，
则说明包含天气、光线、人流、临时封闭和其他突发情况等可能导致更换角度或附近地点的原因。

### AC-055-03: Do not overpromise exact final route
### AC-055-03：不绝对承诺最终路线

Given a package includes multiple photo spots,
when the customer reads the package copy,
then the copy does not guarantee that every named spot will be photographed under every condition.

在某套餐包含多个打卡点时，
当客户阅读套餐文案，
则文案不保证任何情况下都会拍到每个具名点位。

### AC-055-04: Explain image-result variability
### AC-055-04：解释成片效果差异

Given the customer is viewing package or photo spot guidance,
when final image expectations are described,
then the website states that results may vary because of weather, light, photographer, time, crowding, or closures.

在客户查看套餐或打卡点说明时，
当页面描述最终成片预期，
则网站说明成片效果可能受天气、光线、摄影师、时间、人流或封闭情况影响。

## US-056: Browse Portfolio Images By Service And Location Category
## US-056：按服务和地点分类浏览作品图

### AC-056-01: Show portfolio categories
### AC-056-01：展示作品分类

Given the customer opens the Works or Gallery section,
when category navigation is available,
then the customer can browse images by service type, school, scene type, or photo spot category.

在客户打开作品或图库栏目时，
当分类导航可用，
则客户可以按服务类型、学校、场景类型或打卡点分类浏览图片。

### AC-056-02: Filter images by selected category
### AC-056-02：按所选分类筛选图片

Given a portfolio category has published images,
when the customer selects that category,
then only images assigned to that category or its intended child categories are shown.

在某作品分类已有已发布图片时，
当客户选择该分类，
则页面只展示分配到该分类或其预期子分类的图片。

### AC-056-03: Handle empty categories
### AC-056-03：处理空分类

Given a portfolio category has no published images,
when the customer opens that category,
then the website shows a clear empty state instead of broken image placeholders.

在某作品分类没有已发布图片时，
当客户打开该分类，
则网站展示清楚的空状态，而不是破损图片占位。

### AC-056-04: Support point-level examples
### AC-056-04：支持点位级样片

Given a photo spot has its own sample images,
when the customer opens that photo spot category,
then the website can show those images separately from broader school or service galleries.

在某个打卡点有自己的样片时，
当客户打开该打卡点分类，
则网站可以将这些图片与更宽泛的学校或服务图库分开展示。

### AC-056-05: Keep media data-driven
### AC-056-05：保持媒体数据驱动

Given staff manage portfolio media later,
when they assign or remove category relationships for an image,
then customer-facing category galleries update without code changes.

在工作人员未来管理作品媒体时，
当工作人员为图片添加或移除分类关系，
则客户可见的分类图库无需修改代码即可更新。

## US-057: Choose A Registry Wedding Package Tier
## US-057：选择注册结婚跟拍套餐档位

### AC-057-01: Registry wedding is selectable
### AC-057-01：注册跟拍可被选择

Given the customer selected Melbourne as the service area,
when the customer views service types,
then registry wedding coverage is available as a selectable service type once the new package flow is implemented.

在客户选择墨尔本作为服务地区时，
当客户查看服务类型，
则在新套餐流程实现后，注册结婚跟拍应作为可选择的服务类型出现。

### AC-057-02: Show four registry package tiers
### AC-057-02：展示四档注册套餐

Given the customer selected registry wedding coverage,
when package options are displayed,
then the website shows four package tiers at `249 AUD`, `349 AUD`, `449 AUD`, and `549 AUD`.

在客户选择注册结婚跟拍时，
当页面展示套餐选项，
则网站展示 `249 AUD`、`349 AUD`、`449 AUD` 和 `549 AUD` 四个套餐档位。

### AC-057-03: Show correct package contents
### AC-057-03：展示正确套餐内容

Given registry package tiers are displayed,
when the customer reads each tier,
then the website shows the configured original photo count, retouched photo count, behind-the-scenes video inclusion, and included coverage for that tier.

在页面已展示注册套餐档位时，
当客户阅读每个档位，
则网站展示该档位配置的底片数量、精修数量、花絮视频和包含拍摄内容。

### AC-057-04: Include posed registry moments for Package 2 and above
### AC-057-04：套餐 2 及以上包含注册摆拍内容

Given Package 2, Package 3, or Package 4 is displayed,
when the customer reads the package details,
then the copy includes after-registry couple portraits and examples such as ring exchange, kiss, certificate display, and certificate signing.

在页面展示套餐 2、套餐 3 或套餐 4 时，
当客户阅读套餐详情，
则文案包含注册后双人情侣照，以及交换戒指、亲吻、展示证书、证书签字等示例。

### AC-057-05: Update estimated total on package selection
### AC-057-05：选择套餐后更新预计总价

Given no registry package is selected,
when the customer selects a registry package tier,
then the estimated total updates to that package's base price before add-ons or extra locations.

在客户尚未选择注册套餐时，
当客户选择一个注册套餐档位，
则预计总价更新为该套餐基础价格，暂不包含加购项或额外地点。

## US-058: Add Extra Registry Wedding Locations
## US-058：注册跟拍加拍额外地点

### AC-058-01: Offer extra location control
### AC-058-01：提供额外地点控制

Given the customer selected a registry wedding package,
when extra location add-ons are allowed,
then the website provides a control for adding or removing extra locations.

在客户已选择注册结婚跟拍套餐时，
当允许加拍额外地点，
则网站提供增加或减少额外地点的控制项。

### AC-058-02: Add price per location
### AC-058-02：按地点增加价格

Given the customer has selected a registry wedding package,
when the customer adds one extra location,
then the estimated total increases by `100 AUD`.

在客户已选择注册结婚跟拍套餐时，
当客户增加一个额外地点，
则预计总价增加 `100 AUD`。

### AC-058-03: Add retouched photos per location
### AC-058-03：按地点增加精修数量

Given the customer has selected a registry wedding package,
when the customer adds one extra location,
then the displayed included retouched photo count increases by 4.

在客户已选择注册结婚跟拍套餐时，
当客户增加一个额外地点，
则页面展示的包含精修数量增加 4 张。

### AC-058-04: Keep location count understandable
### AC-058-04：地点数量表达清楚

Given a package already includes one or two additional locations,
when the customer views or edits extra locations,
then the website distinguishes included locations from newly added paid extra locations.

在某套餐本身已包含一个或两个额外地点时，
当客户查看或编辑额外地点，
则网站区分套餐已包含地点和客户新加购的付费额外地点。

## US-059: Select Registry Wedding Styling, Wardrobe, And Props
## US-059：选择注册跟拍妆造、服装和道具

### AC-059-01: Show registry add-on groups
### AC-059-01：展示注册跟拍加购分组

Given the customer selected registry wedding coverage,
when add-ons are displayed,
then the website shows separate groups for styling, props, and wardrobe.

在客户选择注册结婚跟拍时，
当页面展示加购项，
则网站分别展示妆造、道具和服装分组。

### AC-059-02: Show styling prices
### AC-059-02：展示妆造价格

Given registry styling add-ons are displayed,
when the customer reads the options,
then female hair, makeup, and lashes show `149 AUD` and 5 included retouched photos, while male hair and makeup show `79 AUD`.

在页面展示注册跟拍妆造加购项时，
当客户阅读选项，
则女生发型 + 妆容 + 睫毛显示 `149 AUD` 并包含 5 张精修，男生发型 + 妆容显示 `79 AUD`。

### AC-059-03: Show prop prices
### AC-059-03：展示道具价格

Given registry prop add-ons are displayed,
when the customer reads the options,
then bouquet, white veil gloves, veil, and accessories each show `10 AUD`.

在页面展示注册跟拍道具加购项时，
当客户阅读选项，
则花束、白纱手套、头纱和配饰均显示 `10 AUD`。

### AC-059-04: Show wardrobe prices
### AC-059-04：展示服装价格

Given registry wardrobe add-ons are displayed,
when the customer reads the options,
then wedding dress and suit each show `40 AUD`.

在页面展示注册跟拍服装加购项时，
当客户阅读选项，
则女婚纱和西装均显示 `40 AUD`。

### AC-059-05: Update total and included retouching
### AC-059-05：更新总价和包含精修

Given the customer has selected a registry package,
when the customer selects or removes registry add-ons,
then the estimated total updates and any add-on retouched photos are reflected in the displayed included retouching count where applicable.

在客户已选择注册套餐时，
当客户选择或移除注册跟拍加购项，
则预计总价随之更新，并在适用时把加购项附带精修体现在页面展示的包含精修数量中。

## US-060: Add A Graduation Studio Shoot Option
## US-060：增加毕业照棚拍选项

### AC-060-01: Show studio shoot under graduation photography
### AC-060-01：在毕业照下展示棚拍

Given the customer selected Melbourne and graduation photography,
when service or scene options are displayed,
then an indoor studio shoot option is available separately from campus outdoor shoot packages.

在客户选择墨尔本和毕业照时，
当页面展示服务或场景选项，
则室内棚拍选项作为独立选项出现，并与校园外景套餐分开。

### AC-060-02: Show early-bird studio shoot package details
### AC-060-02：展示早鸟棚拍套餐详情

Given the graduation studio shoot option is selected,
when the package details are displayed,
then the draft early-bird package shows `79 AUD`, 80 original photos, all originals included, behind-the-scenes video, instant photo, and 9 retouched photos.

在客户选择毕业照棚拍选项时，
当页面展示套餐详情，
则草稿早鸟套餐显示 `79 AUD`、80 张底片、底片全部给、花絮视频、拍立得和 9 张精修。

### AC-060-03: Offer background template selection
### AC-060-03：提供背景模板选择

Given the customer is configuring a graduation studio shoot,
when background templates are available,
then the customer can select one template and see which template is currently selected.

在客户配置毕业照棚拍时，
当背景模板可用，
则客户可以选择一个模板，并看见当前已选模板。

### AC-060-04: Protect unconfirmed included wardrobe wording
### AC-060-04：保护未确认的服装包含文案

Given the final included wardrobe or prop list for the studio shoot has not been confirmed,
when customer-facing copy is prepared,
then unconfirmed included-item claims are hidden, marked as draft, or blocked from publishing.

在毕业照棚拍最终包含服装或道具清单尚未确认时，
当准备客户可见文案，
则未确认的包含项承诺应被隐藏、标记为草稿，或被阻止发布。

### AC-060-05: Support optional specialty prop pricing
### AC-060-05：支持特殊道具加购价格

Given the studio shoot allows optional specialty props,
when the specialty prop add-on is displayed,
then it shows `8 AUD` and is included in the estimated total when selected.

在棚拍允许可选特殊道具时，
当页面展示特殊道具加购项，
则该项显示 `8 AUD`，并在被选中时计入预计总价。

## US-061: Add Simple Indoor Styling For Studio Shoots
## US-061：增加棚内简单妆造

### AC-061-01: Show simple indoor styling add-on
### AC-061-01：展示棚内简单妆造加购项

Given the customer selected a studio shoot service or package,
when styling add-ons are displayed,
then simple indoor styling is available at `79 AUD`.

在客户选择棚拍服务或套餐时，
当页面展示妆造加购项，
则棚内简单妆造以 `79 AUD` 显示。

### AC-061-02: Keep studio styling separate from other styling packages
### AC-061-02：棚拍妆造与其他妆造分开

Given the customer is configuring a studio shoot,
when styling add-ons are displayed,
then simple indoor styling is not confused with graduation outdoor styling or registry wedding styling packages.

在客户配置棚拍时，
当页面展示妆造加购项，
则棚内简单妆造不会与毕业照外景妆造或注册结婚跟拍妆造套餐混淆。

### AC-061-03: Update estimated total
### AC-061-03：更新预计总价

Given the customer selected a studio shoot package,
when the customer selects simple indoor styling,
then the estimated total increases by `79 AUD`.

在客户已选择棚拍套餐时，
当客户选择棚内简单妆造，
则预计总价增加 `79 AUD`。

## US-062: Add An ID Photo Service Category
## US-062：增加证件照服务分类

### AC-062-01: Show ID photo service category
### AC-062-01：展示证件照服务分类

Given the customer selected a service area where ID photos are offered,
when service types are displayed,
then ID photos appear as a separate service category.

在客户选择提供证件照的服务地区时，
当页面展示服务类型，
则证件照作为独立服务分类出现。

### AC-062-02: Keep ID photos separate from other services
### AC-062-02：证件照与其他服务分开

Given ID photos are shown as a service category,
when the customer compares service types,
then ID photos are visually and structurally separate from graduation photography, registry wedding coverage, wedding portraits, and lifestyle portraits.

在证件照作为服务分类展示时，
当客户比较服务类型，
则证件照在视觉和结构上与毕业照、注册结婚跟拍、婚纱照和日常写真分开。

### AC-062-03: Handle missing ID photo package data
### AC-062-03：处理证件照套餐数据缺失

Given ID photo package tiers, prices, deliverables, or copy have not been provided,
when the customer opens ID photos before those details are published,
then the website shows a clear coming-soon or details-pending state instead of blank or misleading package content.

在证件照套餐档位、价格、交付内容或文案尚未提供时，
当客户在详情发布前打开证件照分类，
则网站展示清楚的即将开放或详情待确认状态，而不是空白或误导性的套餐内容。

### AC-062-04: Allow future package content
### AC-062-04：允许未来补充套餐内容

Given staff later add published ID photo package content,
when the customer opens the ID photo category,
then the category can show those packages without changing the top-level service classification.

在工作人员未来添加并发布证件照套餐内容时，
当客户打开证件照分类，
则该分类可以展示这些套餐，而无需改变顶层服务分类。
