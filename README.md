# DARIA STUDIO Showcase
# DARIA STUDIO 公开展示仓库

This public repository stores the DARIA STUDIO wiki, high-fidelity prototype, public sample assets, and GitHub Pages deployment.
本公开仓库用于保存 DARIA STUDIO 的 wiki、高保真原型、公开样片素材和 GitHub Pages 部署。

Production application code belongs in the private repository `daria-studio-platform`.
正式应用代码应放在私有仓库 `daria-studio-platform` 中。

The repository is organized into:
仓库目前分为以下区域：

- `wiki/` for product documentation, user stories, acceptance criteria, and prototypes.
- `wiki/` 用于产品文档、用户故事、验收标准和原型。
- `wiki/prototype/high-fidelity/` for the runnable React + TypeScript + Vite prototype.
- `wiki/prototype/high-fidelity/` 用于保存当前可运行的 React + TypeScript + Vite 高保真原型。
- `sample_pic/` for temporary public sample photos pending future asset review.
- `sample_pic/` 用于临时保存公开样片，后续上线前需要复核授权、隐私和资产存放方式。

## Live Site
## 线上站点

GitHub Pages currently deploys the high-fidelity prototype.
GitHub Pages 当前部署的是高保真原型。

```text
https://vic5c7.github.io/daria-studio-showcase/
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
wiki/                          Product docs and prototype artifacts / 产品文档和原型
wiki/prototype/high-fidelity/  React + TypeScript + Vite prototype / 高保真原型
sample_pic/                    Temporary public sample photos / 临时公开样片
```

## Deployment
## 部署

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.
推送到 `main` 会运行 `.github/workflows/deploy-pages.yml` 中的 GitHub Actions workflow。

The workflow builds `wiki/prototype/high-fidelity` with Vite and deploys its `dist` folder to GitHub Pages.
该 workflow 使用 Vite 构建 `wiki/prototype/high-fidelity`，并将生成的 `dist` 文件夹部署到 GitHub Pages。
