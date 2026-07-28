# AGENTS.md

## Project Intent

This repository is for the future production DARIA STUDIO website.

The long-term product direction is:

- A customer-facing website
- A staff admin interface
- A backend API
- A database-backed content system

The project is currently before final framework and database design. Do not rush formal
business implementation before the architecture, database structure, authentication
approach, and deployment direction are confirmed.

## Repository State

- `prototype/high-fidelity/` contains the current runnable high-fidelity prototype.
- `frontend/` is reserved for the future production frontend and is currently a placeholder.
- `backend/` is reserved for the future production backend and is currently a placeholder.
- `sample_pic/` contains original photo assets.

## Decision Rules

- Do not treat the prototype as the production architecture.
- Avoid adding real admin, database, authentication, or complex business logic to the
  prototype.
- Before building production features, confirm the frontend framework, backend framework,
  database structure, authentication model, and deployment model.
- Favor maintainable, data-driven content management over hard-coded feature growth.
- Future pricing, packages, service areas, service types, schools, scene types, clothing,
  props, and makeup data should be modeled as editable content.
- Keep customer-facing pages, staff admin pages, API boundaries, and permission boundaries
  clearly separated.

## Prototype Rules

- The prototype may be used for demos, visual reference, interaction reference, and product
  discussion.
- Small prototype changes are allowed when they support presentation quality, such as copy,
  image, layout, or styling fixes.
- Do not expand the prototype into the real system.
- When changing the prototype, keep GitHub Pages compatibility in mind.

## Development Rules

- Before modifying a directory, read the closest `AGENTS.md` files from the repository root
  down to that directory.
- Preserve the frontend/backend separation.
- Do not delete or overwrite user-provided assets or existing work unless explicitly asked.
- Keep changes scoped to the current request.
- Prefer clear, boring structure over clever abstractions until the real framework choices
  are locked.
- Use English for code identifiers and commit messages. User-facing Chinese and English copy
  should both be preserved where the product requires bilingual content.

## Git And Verification Rules

- Check Git status before making changes and before finalizing work.
- If a change affects `prototype/high-fidelity/`, verify that its build still passes.
- GitHub Pages currently deploys `prototype/high-fidelity/`; if deployment configuration
  changes, keep the working directory, cache path, and artifact path aligned.
- Do not commit generated dependency folders or build output such as `node_modules/` or
  `dist/`.
