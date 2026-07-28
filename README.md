# DARIA STUDIO Website

This repository is being reset for the future production DARIA STUDIO website.

The repository is organized into:

- `repos/` for future production code.
- `wiki/` for product documentation, user stories, acceptance criteria, and prototypes.
- `sample_pic/` for original photo assets.

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
repos/                         Future production code
repos/frontend/                Reserved for the future production frontend
repos/backend/                 Reserved for the future production backend
wiki/                          Product documentation and prototype artifacts
wiki/prototype/high-fidelity/  Archived React + TypeScript + Vite prototype
sample_pic/                    Original sample photos
```

## Deployment

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.
The workflow builds `wiki/prototype/high-fidelity` with Vite and deploys its `dist`
folder to GitHub Pages.
