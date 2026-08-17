# Agile Delivery Process
# 敏捷交付流程

## Working model
## 工作模式

The product direction can remain stable because the prototype has already been reviewed. Agile is used for incremental implementation, verification, and risk reduction rather than requiring constant product changes.
由于原型已经过审阅，产品方向可以保持稳定。敏捷流程用于增量实现、验证和降低风险，并不要求产品持续改变。

## Delivery sequence
## 交付顺序

1. **Sprint 0 / 第 0 个迭代**: freeze scope, extract requirements, agree technical boundary, and resolve blockers.
   冻结范围、提取需求、确认技术边界并解决阻塞问题。
2. **Vertical slices / 垂直切片**: implement one complete user journey at a time.
   每次实现一条完整用户旅程，而不是只实现某一层。
3. **Review / 评审**: compare the working feature with the prototype and acceptance criteria.
   将可运行功能与原型和验收标准进行对照。
4. **Hardening / 加固**: add error states, permission checks, tests, monitoring, and deployment readiness.
   补充错误状态、权限检查、测试、监控和部署准备。

## Definition of Ready
## 开发就绪定义

A task has a clear user story, acceptance criteria, required data, unresolved-question list, and prototype reference when visual behavior matters.
任务必须有明确用户故事、验收标准、所需数据、未决问题清单，以及涉及视觉行为时的原型参考。

## Definition of Done
## 完成定义

A task is done when implementation, tests, error states, permission behavior, visual comparison, documentation, and review are complete for its scope.
任务在其范围内完成实现、测试、错误状态、权限行为、视觉对照、文档和评审后才算完成。

## Change control
## 变更控制

Small implementation clarifications can be handled within a task. A change to approved visual structure, role capability, price logic, or data ownership must update the relevant Wiki page and decision log before implementation continues.
小型实现澄清可以在任务中处理。涉及已确认视觉结构、角色能力、价格逻辑或数据归属的变更，必须先更新相关 Wiki 页面和决策记录。
