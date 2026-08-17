# Test Plan
# 测试计划

## Test strategy
## 测试策略

Testing follows the user journey from public browsing to client delivery and staff administration. The prototype is checked for visual and interaction regression; the private production platform must additionally test server-side data and permission behavior.
测试围绕从公开浏览到客户交付和工作人员管理的用户旅程展开。原型进行视觉和交互回归；私有正式平台还必须测试服务端数据和权限行为。

## Required test layers
## 必要测试层级

- **Unit tests / 单元测试**: price calculation, availability rules, localization helpers, file naming.
- **Component tests / 组件测试**: pricing selectors, notes, gallery editor, album states.
- **API tests / API 测试**: authentication, authorization, validation, error envelope, price estimates.
- **End-to-end tests / 端到端测试**: visitor pricing flow, client album flow, admin content flow.
- **Visual regression / 视觉回归**: approved routes at agreed viewport sizes and languages.

## Minimum regression scenarios
## 最低回归场景

1. Public visitor opens Gallery, switches language, and opens Pricing.
   公开访客打开作品页、切换语言并打开价格页。
2. Visitor selects an available graduation or registry option and sees an itemized estimate.
   访客选择可用的毕业照或注册/求婚选项并看到逐项估算。
3. Visitor encounters unavailable service or pending price without seeing an invalid total.
   访客遇到不可用服务或待确认价格时，不看到错误总价。
4. Client can view only the authorized album.
   客户只能查看被授权的相册。
5. Admin can manage content and open the intended customer album.
   管理员可以管理内容并打开指定客户相册。
6. Prototype builds successfully and its GitHub Pages asset paths remain valid.
   原型构建成功，且 GitHub Pages 资源路径仍然有效。

## Release gate
## 发布门槛

No production feature is complete until its acceptance criteria pass, critical permission tests pass, and the visual result is compared with the prototype baseline.
正式功能在验收标准通过、关键权限测试通过并完成原型视觉对照前，不视为完成。
