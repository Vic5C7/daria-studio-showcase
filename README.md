# DARIA STUDIO Website

This repository is being reset for the future production DARIA STUDIO website.

The current working website is now kept as a high-fidelity prototype, while
`frontend/` and `backend/` are reserved for the future production rebuild.

## Live Site

GitHub Pages currently deploys the high-fidelity prototype:

```text
https://vic5c7.github.io/dg-melbourne-photography/
```

## Run The Prototype With Docker

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
prototype/high-fidelity/  Archived React + TypeScript + Vite prototype
frontend/                 Reserved for the future production frontend
backend/                  Reserved for the future production backend
sample_pic/               Original sample photos
```

## Deployment

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.
The workflow builds `prototype/high-fidelity` with Vite and deploys its `dist` folder to
GitHub Pages.
