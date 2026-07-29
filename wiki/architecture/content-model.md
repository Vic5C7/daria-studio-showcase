# Content Model
# 内容模型

This document describes how editable website content should relate to other content.
本文档描述网站中可编辑内容之间应如何关联。

## Core Idea
## 核心思路

The customer-facing website should be driven by editable content rather than hard-coded pricing and package data.
客户可见网站应由可编辑内容驱动，而不是依赖硬编码的价格和套餐数据。

## Main Content Relationships
## 主要内容关系

```text
Service Area / 服务地区
  -> Service Type / 服务类型
    -> School / 学校
      -> Scene Type / 场景类型
        -> Package / 套餐
          -> Add-on Items / 加购项
```

Media assets and bilingual copy can be attached to the relevant content area.
媒体素材和双语文案可以挂载到对应的内容区域。

## Content Entities To Model
## 需要建模的内容实体

- Service area: examples include Melbourne and Shanghai.
- 服务地区：例如墨尔本和上海。
- Service type: examples include graduation photography, registry wedding coverage, daily portraits, and wedding portraits.
- 服务类型：例如毕业照、注册结婚跟拍、日常写真和婚纱照。
- School: used for education-related services such as graduation photography.
- 学校：用于毕业照等教育相关服务。
- Scene type: a shoot context, such as University of Melbourne single scene or University of Melbourne plus Carlton Garden.
- 场景类型：拍摄场景上下文，例如墨尔本大学单场景，或墨尔本大学加 Carlton Garden。
- Package: a priced offer attached to a scene type.
- 套餐：挂载在场景类型下的有价格服务组合。
- Add-on category: clothing, props, makeup, or future categories.
- 加购类别：服装、道具、妆造或未来新增类别。
- Add-on item: a priced optional item.
- 加购项：带价格的可选项目。
- Media asset: image or future media item used by gallery or service content.
- 媒体素材：用于作品展示或服务内容的图片或未来媒体项目。
- Content version: draft or published content snapshot.
- 内容版本：草稿或已发布内容快照。

## Data Rules To Decide Later
## 后续需要决策的数据规则

- Whether add-ons attach globally, by service type, by school, or by scene.
- 加购项是全局挂载，还是按服务类型、学校或场景挂载。
- Whether packages can belong to non-school services.
- 套餐是否可以属于非学校类服务。
- Whether content versioning stores full snapshots or per-entity revisions.
- 内容版本是存完整快照，还是存单个实体的修订。
- How bilingual fields should be stored.
- 双语字段应如何存储。
- How image metadata and ordering should be managed.
- 图片元数据和排序应如何管理。
