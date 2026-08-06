# Roles and Permissions / 角色与权限

## Document Purpose / 文档目的

This document defines the user roles, permission boundaries, and default access rules for the DARIA STUDIO product. It expands the role decisions already confirmed in `product-scope.md`.

本文档用于定义 DARIA STUDIO 产品的用户角色、权限边界和默认访问规则，并展开 `product-scope.md` 中已经确认的角色决策。

This is a product document, not an implementation document. It should guide user stories, acceptance criteria, interface design, and later technical access-control design.

本文档是产品文档，不是技术实现文档。它应指导后续用户故事、验收标准、界面设计，以及之后的技术权限控制设计。

## Confirmed Role Decisions / 已确认角色决策

- The product has four primary user roles: visitor, logged-in client, employee, and owner.
- Staff roles are fixed as employee and owner.
- Staff permissions are not configurable in the first product scope.
- The owner is also the website administrator.
- Employees can handle original photo upload and related client gallery delivery operations.
- Employees cannot edit customer-facing website content.
- Client accounts are created through client self-registration by email.
- Staff accounts are separate from client accounts.
- The staff workspace interface should be bilingual in Simplified Chinese and English.

- 产品有四类主要用户角色：访客、登录客户、员工和老板。
- 工作人员角色固定为员工和老板。
- 第一阶段不做可配置员工权限。
- 老板同时是网站管理员。
- 员工可以处理底片上传及相关客户相册交付操作。
- 员工不可编辑客户可见的网站内容。
- 客户账号通过邮箱自主注册创建。
- 工作人员账号与客户账号分离。
- 工作人员端界面应支持简体中文和英文双语。

## Role Definitions / 角色定义

### Visitor / 访客

A visitor is any person using the public website without logging in.

访客是指未登录状态下访问公开网站的任何人。

Allowed:

允许：

- Browse customer-facing public pages.
- View gallery categories and available gallery content.
- View service areas, service types, packages, add-ons, and estimated pricing.
- Select pricing options and optional notes.
- Copy the read-only inquiry summary.
- Start email registration or login.

- 浏览客户可见的公开页面。
- 查看作品分类和可展示作品内容。
- 查看服务地区、服务类型、套餐、加购项和估算价格。
- 选择价格页选项并填写可选备注。
- 复制只读咨询信息汇总。
- 进入邮箱注册或登录流程。

Not allowed:

不允许：

- Access client-only photo galleries.
- Download original photos or final retouched photos.
- Select retouched photos.
- Access the staff workspace.
- Edit any website content.

- 访问客户专属相册。
- 下载底片或最终精修图。
- 选择精修照片。
- 访问工作人员端。
- 编辑任何网站内容。

### Logged-in Client / 登录客户

A logged-in client is a customer who has created an account through email self-registration and is authenticated.

登录客户是指通过邮箱自主注册并已登录认证的客户。

Allowed in MVP:

第一阶段允许：

- Log in and log out.
- Manage basic account access, such as email-based login and password recovery.
- Use all visitor-facing browsing and inquiry-copy features.

- 登录和退出登录。
- 管理基础账号访问，例如邮箱登录和密码找回。
- 使用所有访客可用的浏览和咨询信息复制功能。

Allowed in later photo delivery scope:

后续照片交付阶段允许：

- View own assigned client galleries.
- View original photos uploaded to their own account.
- Download original photos as a compressed package during the valid download window.
- Select included free retouched photos within 7 days after originals are uploaded.
- Add one retouching note per selected photo, up to 500 characters.
- Submit retouch selections once.
- View final retouched photos uploaded by staff.
- Download final retouched photos as a compressed package during the same 3-month window as original photos.

- 查看分配给自己账号的客户相册。
- 查看上传到自己账号的底片。
- 在有效下载期内一键下载底片压缩包。
- 在底片上传后 7 天内选择套餐包含的免费精修照片。
- 为每张已选照片填写一条修图备注，最多 500 字。
- 提交一次精修选择。
- 查看工作人员上传的最终精修图。
- 在与底片相同的 3 个月有效期内一键下载最终精修图压缩包。

Not allowed:

不允许：

- View another client's gallery or files.
- Modify retouch selections after submission.
- Ask staff to unlock submitted retouch selections through the product flow.
- Upload original photos or final retouched photos.
- Access the staff workspace.
- Edit customer-facing website content.

- 查看其他客户的相册或文件。
- 提交后修改精修选择。
- 通过产品流程要求工作人员解锁已提交的精修选择。
- 上传底片或最终精修图。
- 访问工作人员端。
- 编辑客户可见的网站内容。

### Employee / 员工

An employee is a staff user who can handle client gallery delivery work but cannot manage customer-facing website content.

员工是工作人员用户，可以处理客户相册交付工作，但不能管理客户可见的网站内容。

Allowed:

允许：

- Log in to the staff workspace.
- View assigned client galleries.
- Upload original photos for assigned client galleries.
- Review uploaded original photos before making them available to the client.
- View client retouch selections after submission.
- View per-photo client retouching notes after submission.
- Upload final retouched photos corresponding to selected originals.
- View delivery status for assigned client galleries.
- Use the staff workspace in Simplified Chinese or English.

- 登录工作人员端。
- 查看被分配的客户相册。
- 为被分配的客户相册上传底片。
- 在向客户开放前检查已上传底片。
- 在客户提交后查看精修选择。
- 在客户提交后查看每张照片的修图备注。
- 上传与客户已选底片对应的最终精修图。
- 查看被分配客户相册的交付状态。
- 使用简体中文或英文的工作人员端界面。

Not allowed:

不允许：

- Edit customer-facing website copy.
- Add, edit, delete, reorder, publish, or hide gallery categories.
- Add, edit, delete, reorder, publish, or hide public gallery images.
- Add, edit, delete, reorder, publish, or hide studio shoot display sets.
- Manage service areas, service types, schools, scene types, packages, or add-ons.
- Change prices or package details.
- Manage employee accounts.
- Change role permissions.
- Unlock submitted client retouch selections.
- Access client galleries that are not assigned to them, unless the owner later defines a broader operational rule.

- 编辑客户可见的网站文案。
- 新增、编辑、删除、排序、发布或隐藏作品分类。
- 新增、编辑、删除、排序、发布或隐藏公开作品图片。
- 新增、编辑、删除、排序、发布或隐藏棚拍展示集。
- 管理服务地区、服务类型、学校、场景类型、套餐或加购项。
- 修改价格或套餐详情。
- 管理员工账号。
- 修改角色权限。
- 解锁客户已提交的精修选择。
- 访问未分配给自己的客户相册，除非后续由老板定义更宽的运营规则。

### Owner / 老板

The owner is the studio owner and website administrator. The owner has all employee delivery capabilities plus website content and staff account management capabilities.

老板是工作室负责人和网站管理员。老板拥有所有员工交付能力，同时拥有网站内容管理和工作人员账号管理能力。

Allowed:

允许：

- Log in to the staff workspace.
- Use all employee client gallery delivery capabilities.
- View and manage all client galleries.
- Create, edit, delete, reorder, publish, hide, and review customer-facing website content.
- Manage gallery categories and public gallery images.
- Manage studio shoot display sets and their images.
- Manage service areas, service types, schools, scene types, packages, add-on groups, add-on items, prices, sort order, and availability status.
- Manage bilingual customer-facing content fields.
- See missing translation warnings before publishing.
- Manage employee accounts.
- Assign client galleries to employees.
- Disable employee access when needed.

- 登录工作人员端。
- 使用所有员工客户相册交付能力。
- 查看和管理全部客户相册。
- 新增、编辑、删除、排序、发布、隐藏和复核客户可见网站内容。
- 管理作品分类和公开作品图片。
- 管理棚拍展示集及其图片。
- 管理服务地区、服务类型、学校、场景类型、套餐、加购分组、加购项、价格、排序和可用状态。
- 管理客户可见内容的中英双语字段。
- 发布前查看缺失翻译提醒。
- 管理员工账号。
- 将客户相册分配给员工。
- 在需要时禁用员工访问。

Not allowed:

不允许：

- Unlock or modify a client retouch selection after the client has submitted it.
- Use the public showcase repository as the production authentication, database, backend, or file-storage implementation.
- Treat prototype behavior as final production access-control behavior without later technical design.

- 在客户提交精修选择后解锁或修改该选择。
- 将公开展示仓库作为生产级登录认证、数据库、后端或文件存储实现。
- 在没有后续技术设计的情况下，把原型行为直接视为正式生产权限行为。

## Permission Matrix / 权限矩阵

| Capability | Visitor | Logged-in Client | Employee | Owner |
| --- | --- | --- | --- | --- |
| Browse public website | Yes | Yes | Yes | Yes |
| Select pricing options and copy inquiry summary | Yes | Yes | Yes | Yes |
| Self-register client account | Yes | Not needed | No | No |
| Access client galleries | No | Own galleries only, later scope | Assigned galleries only | All galleries |
| Download original photos | No | Own galleries only, later scope | No | All galleries |
| Select free retouched photos | No | Yes, later scope | No | No |
| Submit per-photo retouch notes | No | Yes, later scope | No | No |
| Download final retouched photos | No | Own galleries only, later scope | No | All galleries |
| Access staff workspace | No | No | Yes | Yes |
| Upload original photos | No | No | Assigned galleries only | All galleries |
| View submitted retouch selections and notes | No | Own submissions only | Assigned galleries only | All galleries |
| Upload final retouched photos | No | No | Assigned galleries only | All galleries |
| Edit public website content | No | No | No | Yes |
| Manage gallery categories and public gallery images | No | No | No | Yes |
| Manage packages, add-ons, and prices | No | No | No | Yes |
| Manage employee accounts | No | No | No | Yes |
| Change role permissions | No | No | No | No, out of scope |
| Unlock submitted retouch selections | No | No | No | No |

| 能力 | 访客 | 登录客户 | 员工 | 老板 |
| --- | --- | --- | --- | --- |
| 浏览公开网站 | 可以 | 可以 | 可以 | 可以 |
| 选择价格选项并复制咨询信息 | 可以 | 可以 | 可以 | 可以 |
| 自主注册客户账号 | 可以 | 不需要 | 不可以 | 不可以 |
| 访问客户相册 | 不可以 | 仅自己的相册，后续范围 | 仅被分配相册 | 全部相册 |
| 下载底片 | 不可以 | 仅自己的相册，后续范围 | 不可以 | 全部相册 |
| 选择免费精修照片 | 不可以 | 可以，后续范围 | 不可以 | 不可以 |
| 提交每张照片的修图备注 | 不可以 | 可以，后续范围 | 不可以 | 不可以 |
| 下载最终精修图 | 不可以 | 仅自己的相册，后续范围 | 不可以 | 全部相册 |
| 访问工作人员端 | 不可以 | 不可以 | 可以 | 可以 |
| 上传底片 | 不可以 | 不可以 | 仅被分配相册 | 全部相册 |
| 查看已提交的精修选择和备注 | 不可以 | 仅自己的提交 | 仅被分配相册 | 全部相册 |
| 上传最终精修图 | 不可以 | 不可以 | 仅被分配相册 | 全部相册 |
| 编辑公开网站内容 | 不可以 | 不可以 | 不可以 | 可以 |
| 管理作品分类和公开作品图片 | 不可以 | 不可以 | 不可以 | 可以 |
| 管理套餐、加购项和价格 | 不可以 | 不可以 | 不可以 | 可以 |
| 管理员工账号 | 不可以 | 不可以 | 不可以 | 可以 |
| 修改角色权限 | 不可以 | 不可以 | 不可以 | 不可以，当前不做 |
| 解锁已提交精修选择 | 不可以 | 不可以 | 不可以 | 不可以 |

## Account and Access Rules / 账号与访问规则

- Client accounts are created through client self-registration by email.
- Staff accounts are separate from client accounts.
- Employees should not self-register into staff access.
- The owner account should be established through an approved setup or administrative process.
- The owner can create, disable, and manage employee accounts.
- A client account should never grant staff workspace access.
- A staff account should not automatically act as a client account unless a separate client account is created.
- Staff workspace access should require login.
- Customer-facing public pages remain accessible without login.

- 客户账号通过邮箱自主注册创建。
- 工作人员账号与客户账号分离。
- 员工不应通过自主注册获得工作人员权限。
- 老板账号应通过经过确认的初始化或管理流程建立。
- 老板可以创建、禁用和管理员工账号。
- 客户账号绝不应授予工作人员端访问权限。
- 工作人员账号不应自动等同于客户账号，除非另行创建客户账号。
- 访问工作人员端必须登录。
- 客户可见公开页面保持无需登录即可访问。

## Client Gallery Assignment Rules / 客户相册分配规则

- Owner can see all client galleries.
- Employee can only see assigned client galleries by default.
- Owner can assign a client gallery to an employee.
- Employee delivery actions should be tied to assigned galleries.
- Client can only see galleries connected to their own client account.
- Visitor cannot see client galleries.

- 老板可以查看全部客户相册。
- 员工默认只能查看被分配的客户相册。
- 老板可以将客户相册分配给员工。
- 员工交付操作应绑定到被分配的相册。
- 客户只能查看与自己客户账号关联的相册。
- 访客不能查看客户相册。

## Retouch Selection Locking Rules / 精修选择锁定规则

- Client retouch selections become locked after submission.
- Locked retouch selections cannot be edited by the client.
- Locked retouch selections cannot be unlocked by employees.
- Locked retouch selections cannot be unlocked by the owner through the normal product flow.
- Employees and owner can view submitted selections and notes for delivery work.
- Staff can upload final retouched photos based on submitted selections.

- 客户提交精修选择后，该选择进入锁定状态。
- 锁定后的精修选择不能由客户修改。
- 锁定后的精修选择不能由员工解锁。
- 锁定后的精修选择不能由老板通过正常产品流程解锁。
- 员工和老板可以为了交付工作查看已提交选择和备注。
- 工作人员可以根据已提交选择上传最终精修图。

## Timing and Storage Permission Rules / 时效与存储权限规则

- Original photo upload starts the 7-day free retouch selection window.
- If the client does not submit retouch selections within 7 days, the client loses the included free retouch selection right.
- Original photo upload also starts the 3-month download and storage window.
- Final retouched photos use the same 3-month timing rule as original photos.
- Client download access should expire after the valid download window.
- Staff delivery access after expiration should be defined in later operational and storage policy documents.

- 底片上传会开始计算 7 天免费精修选择期。
- 如果客户 7 天内未提交精修选择，则失去套餐包含的免费精修选择权。
- 底片上传同时开始计算 3 个月下载和存储期。
- 最终精修图与底片使用同一套 3 个月计时规则。
- 有效下载期结束后，客户下载权限应失效。
- 过期后工作人员交付访问权限应在后续运营和存储策略文档中定义。

## Out of Scope / 当前不做

- Configurable staff permissions.
- Custom employee permission groups.
- Client invitation-only account creation.
- Staff-created client accounts as the only account creation path.
- Online booking and online payment permissions.
- Retouch revision permissions.
- Unlock workflow for submitted retouch selections.
- Production authentication, database, file storage, or backend implementation in the public showcase repository.

- 可配置员工权限。
- 自定义员工权限组。
- 仅邀请制客户账号创建。
- 仅由工作人员创建客户账号的路径。
- 在线预约和在线支付权限。
- 精修返修权限。
- 已提交精修选择的解锁流程。
- 在公开展示仓库中实现生产级认证、数据库、文件存储或后端。

## Open Questions / 待确认问题

- Can employees replace or remove uploaded original photos before the gallery is released to the client?
- Should employees see all client contact details, or only the minimum information needed for delivery?
- Should more than one employee be assignable to the same client gallery?
- After the 3-month window expires, should the owner retain any manual archive access outside the client download flow?

- 员工是否可以在相册向客户开放前替换或移除已上传底片？
- 员工应看到全部客户联系方式，还是只看到交付所需的最少信息？
- 同一个客户相册是否可以分配给多个员工？
- 3 个月期限过后，老板是否在客户下载流程之外保留人工归档访问权限？
