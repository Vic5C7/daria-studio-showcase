# DARIA STUDIO Website
# DARIA STUDIO 网站

This repository is being prepared for the future production DARIA STUDIO website.
本仓库正在为未来正式版 DARIA STUDIO 网站做准备。

The repository is organized into:
仓库目前分为以下区域：

- `repos/` for future production code.
- `repos/` 用于未来正式项目代码。
- `wiki/` for product documentation, user stories, acceptance criteria, and prototypes.
- `wiki/` 用于产品文档、用户故事、验收标准和原型。
- `sample_pic/` for original photo assets.
- `sample_pic/` 用于保存原始图片素材。

## Live Site
## 线上站点

GitHub Pages currently deploys the high-fidelity prototype.
GitHub Pages 当前部署的是高保真原型。

```text
https://vic5c7.github.io/dg-melbourne-photography/
```

## Run The Prototype With Docker
## 使用 Docker 运行原型

From the project root:
在项目根目录运行：

```bash
docker compose up --build
```

If your Docker installation exposes Compose as the older command:
如果你的 Docker 仍使用旧版 Compose 命令：

```bash
docker-compose up --build
```

Then open:
然后打开：

```text
http://localhost:5173
```

## Project Structure
## 项目结构

```text
repos/                         Future production code / 未来正式代码
repos/frontend/                Reserved production frontend / 预留正式前端
repos/backend/                 Reserved production backend / 预留正式后端
wiki/                          Product docs and prototype artifacts / 产品文档和原型
wiki/prototype/high-fidelity/  React + TypeScript + Vite prototype / 高保真原型
sample_pic/                    Original sample photos / 原始样片
```

## Deployment
## 部署

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.
推送到 `main` 会运行 `.github/workflows/deploy-pages.yml` 中的 GitHub Actions workflow。

The workflow builds `wiki/prototype/high-fidelity` with Vite and deploys its `dist` folder to GitHub Pages.
该 workflow 使用 Vite 构建 `wiki/prototype/high-fidelity`，并将生成的 `dist` 文件夹部署到 GitHub Pages。
