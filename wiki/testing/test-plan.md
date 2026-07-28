# Test Plan

## Purpose

Define how the DARIA STUDIO website will be verified as it grows from prototype to
production system.

## Test Scope

- Customer-facing website
- Staff admin interface
- Public content APIs
- Admin content APIs
- Authentication and staff sessions
- Database-backed content relationships
- Draft, preview, and publish workflow
- Media and gallery content
- GitHub Pages prototype deployment while the prototype remains active

## Test Types

- Manual product review for prototype and visual flows
- Frontend component and page tests
- Backend API tests
- Database migration and seed checks
- End-to-end tests for critical customer and staff journeys
- Deployment and Docker startup checks

## Critical Journeys

- Customer opens the site and views gallery content.
- Customer selects service area, service type, school, scene, package, and add-ons.
- Customer sees correct estimated pricing.
- Staff logs in.
- Staff edits service, package, add-on, and media content.
- Staff saves draft changes without changing the public site.
- Staff previews and publishes content.
- Customer page reads the latest published content.

## Validation Expectations

- Every implemented user story should link to acceptance criteria.
- Every acceptance criterion should have at least one planned test case.
- Behaviour changes should include relevant automated tests when the framework exists.
- Prototype-only changes may use manual verification plus build checks.
