# Decision Log
# 决策记录

## ADR-001: Keep prototype and production implementation separate
## ADR-001：原型与正式实现分离

**Status / 状态:** Accepted / 已接受

The high-fidelity prototype remains in the public showcase repository for demonstrations and visual reference. Production application code belongs in the private platform repository.
高保真原型保留在公开展示仓库中，用于演示和视觉参考。正式应用代码属于私有平台仓库。

## ADR-002: Treat the prototype as a visual and interaction baseline
## ADR-002：将原型作为视觉和交互基线

**Status / 状态:** Accepted / 已接受

The production frontend should match the approved prototype unless a documented usability, accessibility, security, or technical concern is raised and confirmed.
正式前端应匹配已确认原型，除非发现并确认了可用性、无障碍、安全或技术问题。

## ADR-003: Make pricing data-driven
## ADR-003：价格数据驱动

**Status / 状态:** Proposed / 拟议

Service areas, service types, packages, add-ons, availability, localized labels, and price rules should be managed as data rather than hard-coded UI branches. The final storage and editing model remains a Sprint 0 decision.
服务地区、服务类型、套餐、加购项、可用性、双语标签和价格规则应作为数据管理，而不是硬编码在界面分支中。最终存储和编辑模型在第 0 个迭代中确认。

## ADR-004: Keep price calculation authoritative on the server
## ADR-004：由服务端负责权威价格计算

**Status / 状态:** Proposed / 拟议

The frontend may show an estimate, but the production backend must validate selections and calculate the authoritative amount from a versioned configuration.
前端可以展示预计价格，但正式后端必须验证选择，并根据版本化配置计算权威金额。
