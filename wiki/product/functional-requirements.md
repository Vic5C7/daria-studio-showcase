# DARIA STUDIO Functional Requirements
# DARIA STUDIO 功能需求说明

## Document status
## 文档状态

**Status:** Draft — awaiting manual review.
**状态：** 草案——等待人工审阅。

This document translates the currently approved product scope and the customer-reviewed high-fidelity prototype into functional requirements that can be implemented and tested.
本文档将已经确认的产品范围和客户审阅过的高保真原型，转换为可以开发和验收的功能需求。

The prototype at `wiki/prototype/high-fidelity/` is the primary reference for visible behavior, visual presentation, copy, responsive behavior, and interaction details. Production code may replace prototype implementation mechanisms, but it must preserve the user-visible result unless a change is explicitly reviewed and confirmed.
`wiki/prototype/high-fidelity/` 中的原型是用户可见行为、视觉表现、文案、响应式表现和交互细节的主要依据。正式代码可以替换原型的底层实现方式，但除非经过明确审阅和确认，不得改变用户可见结果。

## Requirement language
## 需求用语

- **MUST / 必须：** Required for acceptance.
  **MUST / 必须：** 验收时必须满足。
- **SHOULD / 应：** Expected unless an explicit decision records another choice.
  **SHOULD / 应：** 除非有明确决策记录其他方案，否则应当满足。
- **OPEN / 待确认：** Visible in the prototype or related to the product, but not sufficiently specified for implementation.
  **OPEN / 待确认：** 原型或产品范围中有所涉及，但目前还不足以直接开发。

## Global requirements
## 全局需求

### FR-G-001 Bilingual experience

The website MUST support Chinese and English presentation and provide the visible language-switching behavior shown in the prototype. Switching language MUST update the relevant user-facing copy without losing the current page context or selections.

网站必须支持中文和英文，并提供原型中展示的语言切换行为。切换语言时，相关用户可见文案必须更新，同时不得丢失当前页面上下文或已选择的信息。

### FR-G-002 Visual and responsive parity

The completed production frontend MUST look and behave exactly like the approved prototype from the user's perspective, including structure, layout, colors, typography, spacing, components, states, responsive presentation, and interactions. Any deviation requires explicit review and confirmation.

正式开发完成的网站前端从用户视角看必须与已确认原型一模一样，包括页面结构、布局、颜色、字体、间距、组件、状态、响应式表现和交互。任何偏差都必须经过明确审阅和确认。

### FR-G-003 Navigation

The visible navigation MUST provide the prototype's routes and actions:

- Home / gallery
- Pricing
- Authentication
- Customer list for an authorized staff user
- Customer album for an authorized customer or staff user

可见导航必须提供原型中的页面和操作：

- 首页/作品展示
- 价格套餐
- 登录与注册
- 已授权工作人员可访问的客户列表
- 已授权客户或工作人员可访问的客户相册

Production route protection MUST be enforced by the server, not only by hiding frontend navigation.
正式系统的路由保护必须由服务端强制执行，不能只依靠前端隐藏导航。

## Public gallery requirements
## 公开作品展示需求

### FR-GAL-001 Gallery presentation

The home page MUST present the studio introduction, brand copy, gallery service-type filters, visible gallery images, and the action that navigates to pricing.

首页必须展示工作室介绍、品牌文案、作品服务类型筛选、可见作品图片，以及进入价格套餐页面的操作。

### FR-GAL-002 Gallery service types and availability

The gallery MUST support selecting a visible service type. Unavailable service types or images MUST retain the prototype's unavailable presentation and MUST NOT be treated as selectable/available content.

作品展示必须支持选择可见的服务类型。不可用的服务类型或图片必须保持原型中的不可用表现，不能被当作可用内容选择。

### FR-GAL-003 Gallery interaction

The gallery MUST preserve the prototype's interaction behavior:

- image carousel navigation;
- automatic scrolling where shown;
- temporary pause after manual navigation;
- studio model album cards;
- expandable studio album view and close behavior;
- empty states when no visible content exists.

作品展示必须保持原型中的交互行为：

- 图片轮播导航；
- 原型中展示的自动滚动；
- 手动操作后的临时暂停；
- 工作室模特影集卡片；
- 可展开的影集视图和关闭行为；
- 没有可见内容时的空状态。

### FR-GAL-004 Gallery content administration

An authorized staff user MUST be able to use the visible gallery editing capability to manage the configured bilingual copy, visibility, availability, ordering, and gallery sections exposed by the prototype. Changes MUST be persisted and permission-checked in production.

已授权工作人员必须可以使用原型中展示的作品编辑能力，管理可配置的双语文案、可见性、可用性、排序和作品展示栏目。正式系统中这些修改必须持久化并经过权限检查。

## Pricing requirements
## 价格套餐需求

### FR-PRI-001 Pricing flow

The pricing page MUST preserve the prototype's service-selection flow. The flow MUST support the applicable sequence of:

1. service area;
2. service type;
3. school, when applicable;
4. scene type, when applicable;
5. package;
6. service-specific add-ons and notes.

价格页面必须保持原型中的服务选择流程。根据服务类型，流程必须支持以下适用顺序：

1. 服务地区；
2. 服务类型；
3. 学校（适用时）；
4. 场景类型（适用时）；
5. 套餐；
6. 当前服务对应的加购项和备注。

Changing an upstream selection MUST clear or recalculate downstream selections and totals in the same user-visible way as the prototype.
修改上游选择时，必须按照原型的用户可见行为清除或重新计算下游选择和总价。

### FR-PRI-002 Service-specific pricing flows

The production implementation MUST support the pricing flows shown in the prototype, including:

- graduation photography with school, scene, package, and graduation add-ons;
- studio graduation photography with its studio package and add-ons;
- registry/proposal photography with package, extra locations, and registry add-ons;
- ID photography with its package and ID-photo add-ons.

正式系统必须支持原型展示的价格流程，包括：

- 包含学校、场景、套餐和毕业照加购项的毕业照流程；
- 包含工作室套餐和加购项的棚拍毕业照流程；
- 包含套餐、额外地点和登记/求婚加购项的登记/求婚流程；
- 包含套餐和证件照加购项的证件照流程。

### FR-PRI-003 Visibility and availability states

Pricing content MUST distinguish visibility from availability. Hidden content MUST not be shown. Visible but unavailable content MUST retain the prototype's unavailable state and explanatory presentation. Packages whose price is pending MUST retain the prototype's pending-price state and MUST not be treated as confirmed-priced packages.

价格内容必须区分“可见”和“可用”。隐藏内容不得展示。可见但不可用的内容必须保持原型中的不可用状态和说明表现。价格待确认的套餐必须保持原型中的待定价格状态，不能被当作已确认价格的套餐。

### FR-PRI-004 Add-on selection and grouping

The pricing page MUST preserve the add-on groups shown for the selected service. It MUST support the prototype's selection rules, including multi-select groups and exclusive-selection groups where shown. Selected add-ons MUST be displayed and calculated under their original group rather than being flattened into an unrelated group.

价格页面必须保持当前服务对应的加购栏目，并支持原型中的选择规则，包括可多选栏目和原型中展示的单选栏目。已选加购项必须归属于原来的栏目并参与计算，不能被合并到无关栏目中。

### FR-PRI-005 Estimated total

The page MUST display an estimated total after a valid priced package is selected. The total MUST include the selected package, selected add-ons, and the registry extra-location pricing effect where applicable. The production backend MUST be authoritative for the final pricing calculation.

选择有效且价格已确认的套餐后，页面必须显示预计总价。总价必须包含已选套餐、已选加购项，以及适用时的登记/求婚额外地点费用。正式系统最终价格计算必须以后端为准。

### FR-PRI-006 Notes

The pricing page MUST support the notes inputs shown in the prototype:

- scene notes for the selected graduation school/scene flow;
- package notes where shown;
- clothing notes;
- props notes;
- makeup/styling notes;
- registry extra-location notes;
- registry clothing, props, and styling notes;
- ID-photo clothing, props, and styling notes.

价格页面必须支持原型中展示的备注输入，包括：

- 毕业照学校/场景流程中的场景备注；
- 原型中展示的套餐备注；
- 服装备注；
- 道具备注；
- 妆造备注；
- 登记/求婚额外地点备注；
- 登记/求婚服装、道具和妆造备注；
- 证件照服装、道具和妆造备注。

Each notes input MUST support adding and deleting notes and MUST preserve the prototype's maximum-note behavior. Empty notes MUST remain empty and MUST not create misleading content.
每个备注输入必须支持添加和删除备注，并保持原型中的备注数量上限行为。没有内容的备注必须保持为空，不能生成误导性内容。

### FR-PRI-007 Copy-all selection summary

After the customer selects a valid priced package and the estimated total is available, the bottom of the pricing page MUST show the prototype's copy-all area and the customer-service contact.

当客户选择有效且价格已确认的套餐、页面产生预计总价后，价格页面底部必须显示原型中的一键复制区域和客服联系方式。

The copy area MUST display the WeChat ID exactly as `Moerben2027` and MUST provide a one-click copy action. The visible success and failure states MUST match the prototype.
复制区域必须准确显示微信号 `Moerben2027`，并提供一键复制操作。复制成功和失败状态必须与原型一致。

The copied text MUST preserve the prototype's order and include, when applicable:

1. service area;
2. service type;
3. school;
4. scene type;
5. scene notes immediately after the scene type;
6. package;
7. package notes immediately after the package;
8. each add-on group, followed immediately by that group's notes;
9. registry extra-location information where applicable;
10. estimated total;
11. WeChat support ID.

复制文本必须保持原型中的顺序，并在适用时包含：

1. 服务地区；
2. 服务类型；
3. 学校；
4. 场景类型；
5. 紧跟场景类型之后的场景备注；
6. 套餐；
7. 紧跟套餐之后的套餐备注；
8. 每个加购栏，并紧跟该栏的备注；
9. 适用时的登记/求婚额外地点信息；
10. 预计总价；
11. 客服微信号。

Add-on groups with no selected items MUST still be represented as empty fields when the prototype shows that group. Notes with no content MUST still be represented as empty note fields. If a group has content, all selected items and their prices MUST be included.
原型展示的加购栏即使没有选择内容，也必须保留为空字段。没有内容的备注也必须保留为空备注字段。有内容时，必须完整导出所有已选项目及其价格。

The production implementation may use a different clipboard mechanism, but the user-visible copy result and feedback MUST remain equivalent to the prototype.
正式实现可以使用不同的剪贴板技术，但用户可见的复制结果和反馈必须与原型等价。

## Authentication requirements
## 认证需求

### FR-AUTH-001 Login and registration

The authentication page MUST provide the prototype's login and registration tabs, bilingual fields, validation feedback, and successful navigation behavior.

登录页面必须提供原型中的登录和注册标签、双语字段、验证反馈和成功后的导航行为。

Registration MUST collect the visible registration fields and create a customer account in production. Login MUST authenticate against the production account store. The prototype's demo-account behavior MUST NOT be used as the production authentication mechanism.
注册必须收集原型中展示的注册字段，并在正式系统中创建客户账户。登录必须验证正式账户数据。原型中的演示账号行为不能作为正式认证机制。

### FR-AUTH-002 Account states

The production system MUST support authenticated and unauthenticated states, logout, session persistence according to the approved security design, and role-aware navigation.

正式系统必须支持已认证和未认证状态、退出登录、符合最终安全方案的会话持久化，以及基于角色的导航。

Password reset and account recovery behavior is OPEN and is defined in `scope.md` as requiring confirmation before implementation.
密码重置和账户找回行为目前为待确认事项，`scope.md` 已规定在实现前必须确认。

## Customer and album requirements
## 客户和相册需求

### FR-ALB-001 Customer list

An authorized staff user MUST be able to view the customer list shown by the prototype, search by the visible customer/project fields, inspect album and retouch summary counts, and open a selected customer's album.

已授权工作人员必须可以查看原型中的客户列表，按原型展示的客户/项目字段搜索，查看相册和精修申请统计，并打开选定客户的相册。

### FR-ALB-002 Customer album

An authorized customer MUST be able to:

- view raw photos;
- select photos for retouching;
- stay within the configured retouch quota;
- add a note for each selected retouch request;
- submit or update the retouch request;
- view matching retouched photos when available;
- download the available raw and retouched photo packages.

已授权客户必须可以：

- 查看底片；
- 选择照片申请精修；
- 遵守配置的精修数量上限；
- 为每个精修申请填写备注；
- 提交或更新精修申请；
- 在有精修图时查看对应成片；
- 下载可用的底片和精修照片压缩包。

### FR-ALB-003 Staff album management

An authorized staff user MUST be able to perform the staff actions shown by the prototype, including uploading and deleting raw photos, uploading/replacing/deleting retouched photos, reviewing retouch requests and notes, and downloading photo packages.

已授权工作人员必须可以执行原型中展示的工作人员操作，包括上传和删除底片、上传/替换/删除精修图、查看精修申请和备注，以及下载照片压缩包。

Album ownership, image access, uploads, deletions, and downloads MUST be enforced by the production backend and storage layer.
正式系统必须由后端和存储层强制执行相册归属、图片访问、上传、删除和下载权限。

## Administration requirements
## 管理后台需求

### FR-ADM-001 Content and pricing editing

An authorized staff user MUST be able to manage the gallery and pricing configuration exposed by the prototype, including bilingual copy, visibility, availability, ordering, package/add-on content, and pricing flow sections where the prototype provides those controls.

已授权工作人员必须可以管理原型中开放编辑的作品和价格配置，包括双语文案、可见性、可用性、排序、套餐/加购内容，以及原型提供编辑入口的价格流程栏目。

### FR-ADM-002 Persistence and auditability

Production admin changes MUST be persisted in the production data store, permission-checked on every write, and auditable according to the final operational design. Browser local storage is acceptable only for the prototype and MUST NOT be the production source of truth.

正式系统中的后台修改必须持久化到正式数据存储，每次写入都必须进行权限检查，并按照最终运营方案保留可追溯记录。浏览器本地存储只适用于原型，不能作为正式系统的真实数据源。

## Cross-cutting acceptance criteria
## 通用验收标准

The production implementation is functionally acceptable only when:
正式实现只有满足以下条件，功能上才可验收：

1. Every prototype-visible user action has a corresponding production behavior or an explicitly confirmed replacement.
   原型中每个用户可见操作都有对应的正式行为，或有明确确认的替代方案。
2. Pricing selections, add-ons, notes, and totals remain consistent when the user changes an upstream selection.
   用户修改上游选择时，价格选择、加购项、备注和总价保持一致并正确更新。
3. The copy-all summary contains the same fields, order, grouping, empty fields, prices, notes, and WeChat ID required by the approved prototype.
   一键复制内容包含已确认原型要求的相同字段、顺序、分组、空字段、价格、备注和微信号。
4. Bilingual behavior, responsive presentation, loading/empty/unavailable/error states, and visible feedback are preserved.
   双语行为、响应式表现、加载/空状态/不可用/错误状态以及可见反馈均被保留。
5. Unauthorized users cannot access staff or other customers' data through direct routes or API calls.
   未授权用户不能通过直接访问路由或调用 API 访问工作人员功能或其他客户数据。
6. The production implementation does not depend on prototype local storage, demo accounts, static demo albums, or frontend-only permission checks.
   正式实现不依赖原型本地存储、演示账号、静态演示相册或仅由前端执行的权限检查。
7. The result can be deployed on Tencent Cloud according to the approved production architecture.
   成果可以按照已确认的正式架构部署到腾讯云。

## Open items
## 待确认事项

This document does not silently define the items listed as open in `wiki/product/scope.md`, including full booking submission, payment, invoicing, refunds, cancellation, notification channels, password recovery, album expiry/sharing policies, and final operational pricing policies.
本文档不擅自定义 `wiki/product/scope.md` 中列出的待确认事项，包括完整预约提交、支付、发票、退款、取消、通知渠道、密码找回、相册有效期/分享政策，以及最终运营价格政策。

## Sources
## 来源

- `wiki/product/scope.md`
- `wiki/prototype/README.md`
- `wiki/prototype/AGENTS.md`
- `wiki/prototype/high-fidelity/AGENTS.md`
- Current implementation under `wiki/prototype/high-fidelity/`
- Customer-confirmed prototype changes, including the copy-all selection summary and WeChat contact display.

- `wiki/product/scope.md`
- `wiki/prototype/README.md`
- `wiki/prototype/AGENTS.md`
- `wiki/prototype/high-fidelity/AGENTS.md`
- `wiki/prototype/high-fidelity/` 下的当前实现
- 客户确认的原型变更，包括一键复制选择信息和显示客服微信。
