# ADR-006: Localization and Data Storage / 多语言与数据存储

## Status / 状态

Accepted with deferred detail.

已接受，细节待定。

## Date / 日期

2026-08-07

## Context / 背景

The product must remain bilingual in Simplified Chinese and English for both customer-facing and staff-facing UI. Editable customer-facing business content also needs bilingual fields.

产品的客户可见界面和工作人员端都必须保持简体中文与英文双语。客户可见的可编辑业务内容也需要双语字段。

The confirmed localization model has three layers: fixed interface copy, editable business content, and localized formatting/display rules.

已确认多语言模型分为三层：固定界面文案、可编辑业务内容、本地化格式/展示规则。

## Decision / 决策

Use the three-layer localization model.

使用三层多语言模型。

For the first schema draft, store editable bilingual business fields as PostgreSQL `jsonb` values with `zh` and `en` keys.

第一版 Schema 草案中，可编辑双语业务字段使用 PostgreSQL `jsonb`，包含 `zh` 和 `en` key。

## Rationale / 理由

- Fixed interface copy belongs in frontend/backend translation files or typed dictionaries.
- Editable business content belongs in the database because the owner manages it through the staff workspace.
- Shared values such as price, sort order, image reference, count, status, and expiry timestamps should not be duplicated by language.
- `jsonb` keeps the first schema simpler than separate translation tables.

- 固定界面文案属于前端/后端翻译文件或类型化字典。
- 可编辑业务内容属于数据库，因为老板通过工作人员端管理它。
- 价格、排序、图片引用、数量、状态和过期时间等共享值不应按语言重复保存。
- `jsonb` 比独立翻译表更适合第一版保持 Schema 简洁。

## Consequences / 影响

- Publish validation must check required `zh` and `en` values.
- The backend should expose localized fields for public reads and full bilingual fields for owner editing.
- If future language count or translation workflow becomes more complex, this decision can be superseded by a translation-table design.

- 发布校验必须检查必填 `zh` 和 `en` 值。
- 后端应在公开读取时返回本地化字段，在老板编辑时返回完整双语字段。
- 如果未来语言数量或翻译流程变复杂，该决策可以被翻译表设计替代。

## Related Documents / 相关文档

- `wiki/product/product-scope.md`
- `wiki/architecture/content-model.md`
- `wiki/architecture/database-schema-draft.md`
