# DG Melbourne Photography

Frontend website for DG墨尔本摄影.

## Live Site

GitHub Pages:

```text
https://vic5c7.github.io/dg-melbourne-photography/
```

## Run With Docker

From the project root:

```bash
docker compose up --build
```

If your Docker installation exposes Compose as the older command:

```bash
docker-compose up --build
```

Then open:

```text
http://localhost:5173
```

## Project Structure

```text
frontend/   React + TypeScript + Vite website
backend/    Reserved for future Python FastAPI backend
sample_pic/ Original sample photos
```

## Deployment

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.
The workflow builds `frontend` with Vite and deploys `frontend/dist` to GitHub Pages.
