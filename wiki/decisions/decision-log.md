# Decision Log
# 决策记录

Use this document to record important product, architecture, and workflow decisions.
使用本文档记录重要的产品、架构和工作流决策。

## Format
## 格式

Decision:
决策：

Date:
日期：

Context:
背景：

Outcome:
结果：

Consequences:
影响：

## Current Decisions
## 当前决策

Decision: Keep the high-fidelity prototype under `wiki/prototype/high-fidelity/`.
决策：将高保真原型保留在 `wiki/prototype/high-fidelity/`。

Date: 2026-07-29.
日期：2026-07-29。

Context: The project is not ready for production framework and database implementation.
背景：项目尚未准备好进入正式框架和数据库实现阶段。

Outcome: Production placeholders stay under `repos/`, while the prototype remains deployable through GitHub Pages.
结果：正式代码占位保留在 `repos/`，原型继续通过 GitHub Pages 部署。

Consequences: Future production development should not keep extending the prototype as the real architecture.
影响：未来正式开发不应继续把原型扩展成真实架构。
