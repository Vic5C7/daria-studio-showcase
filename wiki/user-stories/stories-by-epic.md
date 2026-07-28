# User Stories By Epic

This document collects the current DARIA STUDIO requirements as user stories. The goal is
to preserve product intent at a useful granularity before the production frontend,
backend, database, and staff admin are designed.

## Scope Notes

- Customer-facing pages should remain separate from staff-facing admin pages.
- The high-fidelity prototype is a reference artifact, not the production architecture.
- Current public pricing direction is package-based graduation photography, not the
  earlier A-Z point pricing model.
- Online payment, customer accounts, and full booking/order management are not active
  production scope until explicitly added.

## Epic 1: Public Brand And Gallery

### US-001: Recognize the studio brand

As a photography customer, I want the website to clearly show the studio as DARIA STUDIO,
so that I know I am viewing the correct photography business.

Status: `Active`, `Prototype`

Notes:

- Public brand text should use `DARIA STUDIO`.
- The former `DG墨尔本摄影` brand text has been replaced.

### US-002: Understand the studio's Melbourne positioning

As a photography customer in Melbourne, I want the homepage copy to express a personal
memory-focused feeling, so that the site feels relevant to graduation and wedding moments.

Status: `Active`, `Prototype`

Notes:

- Chinese homepage line: `在墨尔本留下您的专属记忆`.
- English copy should carry the same meaning rather than being a literal placeholder.

### US-003: View sample photography work

As a photography customer, I want to see selected sample images on the homepage, so that I
can judge the studio's visual style before looking at prices.

Status: `Active`, `Prototype`

Notes:

- The current prototype uses 9 sample photos.
- Original source images are preserved in `sample_pic/`.
- Prototype display images are copied into `wiki/prototype/high-fidelity/public/images/models/`.

### US-004: Browse gallery images in one horizontal row

As a photography customer, I want the homepage work samples to stay in a single horizontal
gallery row, so that browsing feels simple and visual rather than like a long image list.

Status: `Active`, `Prototype`

Notes:

- Gallery items should not wrap into multiple rows in normal desktop use.
- Mobile layout should remain usable without text or controls overlapping.

### US-005: Experience automatic gallery movement

As a photography customer, I want the gallery to scroll automatically at a comfortable
speed, so that I can passively view the work without needing to click.

Status: `Active`, `Prototype`

Notes:

- The gallery should move toward the left.
- If the user manually interacts with the gallery, auto-scroll should resume after about
  3 seconds of no interaction.

### US-006: Control the gallery manually

As a photography customer, I want left and right carousel arrows, so that I can move
forward or backward through the images myself.

Status: `Active`, `Prototype`

Notes:

- Arrows should have a suitable size and color for the design.
- Gallery edges should have a fade-in/fade-out feeling as images enter and leave.

### US-007: Navigate from gallery to pricing

As a photography customer, I want a clear button before the work samples that opens the
pricing page, so that I can quickly compare packages after seeing the studio style.

Status: `Active`, `Prototype`

Notes:

- The button appears on the homepage before the gallery section.
- It navigates to `/pricing`.

## Epic 2: Language And Navigation

### US-008: Switch website language

As a photography customer, I want to switch the site between Simplified Chinese and
English from the top-right area, so that I can read the site in the language I prefer.

Status: `Active`, `Prototype`

Notes:

- Default language is Simplified Chinese.
- The language choice should persist after refresh.
- Customer-facing labels, package names, navigation, and major descriptions should be
  bilingual.

### US-009: Move between main customer pages

As a photography customer, I want simple navigation between the gallery page and pricing
page, so that I can move through the public site without confusion.

Status: `Active`, `Prototype`

Notes:

- Current customer pages are homepage `/` and pricing `/pricing`.
- Future customer pages can be added after the content model is confirmed.

## Epic 3: Service Area And Service Type Discovery

### US-010: Choose a service area

As a photography customer, I want to choose a service area first, so that the website only
shows services relevant to the location I am considering.

Status: `Active`, `Prototype`

Notes:

- Current service area options: Shanghai and Melbourne.
- Shanghai currently has no expanded package content.

### US-011: See service types for the selected area

As a photography customer, I want service type options to appear after I choose a service
area, so that I can continue narrowing down what I need.

Status: `Active`, `Prototype`

Notes:

- Melbourne service types currently shown:
  - Wedding portraits
  - Registry wedding coverage
  - Lifestyle portraits
  - Graduation photography
- Only graduation photography is expanded in the current prototype.

### US-012: Understand unavailable service types

As a photography customer, I want unavailable service types to be visible but clearly
marked, so that I know the studio may offer them later without expecting complete pricing
today.

Status: `Active`, `Prototype`

Notes:

- Wedding portraits, registry wedding coverage, and lifestyle portraits are currently
  displayed as not expanded.

### US-013: Reconfirm registry wedding pricing direction

As the studio owner, I want the registry wedding service pricing decision to be clarified,
so that production content does not contradict earlier package information.

Status: `Decision needed`

Notes:

- Earlier requirement: registry wedding coverage had one fixed package at `2000 AUD / day`.
- Later pricing-flow requirement: non-graduation service types are not expanded yet.
- Before production implementation, decide whether registry wedding should show the fixed
  daily price immediately or stay hidden/coming soon.

## Epic 4: Graduation School And Pricing Availability

### US-014: Choose a graduation school

As a graduation photography customer, I want to choose my school after selecting
graduation photography, so that package information can match my campus context.

Status: `Active`, `Prototype`

Notes:

- Current school options:
  - The University of Melbourne
  - Monash University
  - RMIT
- Chinese display for RMIT should use a suitable Chinese name, while English display can
  stay `RMIT`.

### US-015: See pending pricing for schools without confirmed packages

As a graduation photography customer interested in Monash or RMIT, I want the website to
tell me that package pricing is pending, so that I do not mistake missing packages for a
broken page.

Status: `Active`, `Prototype`

Notes:

- Monash University and RMIT currently do not show package prices.
- They may still allow notes for future enquiry or booking flows.

### US-016: Select University of Melbourne scene type

As a University of Melbourne graduation customer, I want to choose between single-scene
and dual-scene coverage, so that package options match the locations I want.

Status: `Active`, `Prototype`

Notes:

- Single scene: University of Melbourne.
- Dual scene: University of Melbourne + Carlton Garden.
- Only the University of Melbourne currently has the dual-scene option.

## Epic 5: University Of Melbourne Graduation Packages

### US-017: Choose a single-scene graduation package

As a University of Melbourne graduation customer, I want to compare single-scene package
tiers, so that I can choose the amount of coverage and retouching I need.

Status: `Active`, `Prototype`

Reference package data:

| Package | Price | Included details |
| --- | ---: | --- |
| Package 1 | 198 AUD | 200 originals, all originals included; 9 retouched photos; behind-the-scenes video; 5-6 photo spots; iconic campus locations |
| Package 2 | 298 AUD | 300 originals, all originals included; 13 retouched photos; behind-the-scenes video; 8-9 photo spots; more detailed coverage; more locations; more posing guidance; optional locations |
| Package 3 | 388 AUD | 400 originals, all originals included; 18 retouched photos; behind-the-scenes video; all photo spots; more originals; suitable for photos with parents and friends |

### US-018: Choose a dual-scene graduation package

As a University of Melbourne graduation customer, I want to compare dual-scene package
tiers, so that I can include both the university and Carlton Garden in one package.

Status: `Active`, `Prototype`

Reference package data:

| Package | Price | Included details |
| --- | ---: | --- |
| Package 1 | 388 AUD | University of Melbourne + Carlton Garden; 400 originals, all originals included; 18 retouched photos |
| Package 2 | 468 AUD | University of Melbourne + Carlton Garden; 600 originals, all originals included; 25 retouched photos |
| Package 3 | 548 AUD | University of Melbourne + Carlton Garden; 700 originals, all originals included; 30 retouched photos |

### US-019: Understand that originals are included

As a graduation photography customer, I want package details to clearly state that all
original photos are included, so that I understand what I receive beyond retouched images.

Status: `Active`, `Prototype`

Notes:

- The business message emphasizes `底片全给`.
- This should remain visible in package descriptions.

## Epic 6: Add-ons And Estimated Total

### US-020: Select clothing add-ons

As a graduation photography customer, I want to add optional clothing items, so that I can
prepare my graduation look from the same package flow.

Status: `Active`, `Prototype`

Reference add-on data:

| Add-on | Price | Notes |
| --- | ---: | --- |
| Graduation gown + cap | 35 AUD | Available for each school and faculty |
| Heels + qipao/dress | 10 AUD |  |
| Hanfu | 40 AUD |  |

### US-021: Select prop add-ons

As a graduation photography customer, I want to add optional props, so that the shoot can
include the objects I need.

Status: `Active`, `Prototype`

Reference add-on data:

| Add-on | Price |
| --- | ---: |
| Graduation bear + academic cap + bouquet set | 10 AUD |
| Bouquet | 3 AUD |
| Academic cap | 3 AUD |
| Graduation bear | 5 AUD |
| Academic scroll | 4 AUD |
| Uniform bear | 3 AUD |

### US-022: Select makeup and styling add-ons

As a graduation photography customer, I want to add makeup and styling services, so that I
can estimate the full cost of the shoot.

Status: `Active`, `Prototype`

Reference add-on data:

| Add-on | Price | Included details |
| --- | ---: | --- |
| Female makeup and styling | 149 AUD | Makeup, hair, lashes, brow shaping, on-site touch-up, and 5 retouched photos |
| Male makeup and styling | 79 AUD | Makeup, hair, brow shaping, on-site touch-up, and 5 retouched photos; focused on natural facial definition |

### US-023: See a persistent estimated total

As a graduation photography customer, I want the estimated total to stay visible in the
top-right area while I scroll, so that I can always see how my selections affect price.

Status: `Active`, `Prototype`

Notes:

- Total price calculation: selected package price plus selected add-on prices.
- When no package is selected, the total area should prompt the customer to choose a
  package.
- When a school's package pricing is pending, the total area should show that pricing is
  pending.

## Epic 7: Customer Notes And Future Enquiry Payload

### US-024: Add notes for school or scene preferences

As a graduation photography customer, I want to add school or scene notes, so that I can
record special campus, meeting point, or location preferences.

Status: `Active`, `Prototype`

Notes:

- Notes do not affect price.
- Notes should be kept in state so they can later become part of an enquiry payload.

### US-025: Add notes for selected packages

As a graduation photography customer, I want to add package notes, so that I can explain
preferences such as family photos, friend groups, or shoot priorities.

Status: `Active`, `Prototype`

Notes:

- These notes are separate from school/scene notes.

### US-026: Add notes for clothing, props, and makeup

As a graduation photography customer, I want separate note areas for clothing, props, and
makeup, so that the studio can understand preferences that are not captured by checkboxes.

Status: `Active`, `Prototype`

Notes:

- Clothing, props, and makeup notes should be stored separately.
- Each note group should be suitable for future form submission.

### US-027: Manage note limits

As a graduation photography customer, I want to add and remove multiple notes in each note
area, so that I can correct my selections without restarting the flow.

Status: `Active`, `Prototype`

Notes:

- Empty notes cannot be added.
- Each note area can contain up to 10 notes.
- When the limit is reached, adding another note should be disabled or clearly blocked.

### US-028: Reset downstream selections when upstream choices change

As a photography customer, I want irrelevant downstream choices to clear when I change a
major earlier choice, so that the total and notes do not mix data from different packages.

Status: `Active`, `Prototype`

Notes:

- Changing service area, service type, or school should clear downstream package, add-on,
  and related note selections.
- Changing a scene type should clear package and add-on selections that no longer apply.

## Epic 8: Staff Authentication And Admin Separation

### US-029: Staff member can sign in

As a studio staff member, I want to log in with a staff account, so that only authorized
people can edit website content.

Status: `Next`

Notes:

- Authentication design is not selected yet.
- Do not add real authentication to the prototype.

### US-030: Staff admin is separate from the customer website

As a studio staff member, I want a dedicated admin area, so that editing tools do not mix
with the public customer experience.

Status: `Next`

Notes:

- Customer pages and staff pages should use separate routes, layouts, and permission
  boundaries.

### US-031: Studio owner can manage staff permissions

As a studio owner or administrator, I want to control which staff members can edit or
publish content, so that public website changes are made by trusted people.

Status: `Later`, `Decision needed`

Notes:

- First production version may only need one staff role.
- Role count and permission levels must be decided before implementation.

## Epic 9: Staff Content Management

### US-032: Manage service areas

As a studio staff member, I want to add and edit service areas, so that the studio can
expand beyond the initial Shanghai and Melbourne options.

Status: `Next`

Notes:

- Service areas should be data-driven content.
- Staff should not need code changes to add a new area.

### US-033: Manage service types per area

As a studio staff member, I want to add and edit service types under specific service
areas, so that each area can show only the services available there.

Status: `Next`

Notes:

- Service type availability is linked to service area.
- Example: Melbourne has graduation photography while Shanghai currently has no expanded
  services.

### US-034: Manage schools

As a studio staff member, I want to add and edit schools, so that graduation photography
content can expand beyond the initial three schools.

Status: `Next`

Notes:

- Initial schools are University of Melbourne, Monash University, and RMIT.
- Future school records should support bilingual names.

### US-035: Manage scene types

As a studio staff member, I want to add and edit scene types for a school or service, so
that combinations like University of Melbourne plus Carlton Garden can be maintained
without code changes.

Status: `Next`

Notes:

- Scene types should belong to the appropriate parent content.
- Carlton Garden is currently a scene component, not a school.

### US-036: Manage packages

As a studio staff member, I want to add and edit packages, so that prices, included
details, and availability can change as the business changes.

Status: `Next`

Notes:

- Packages need price, currency, bilingual display name, bilingual details, parent scene or
  service relationship, and availability status.

### US-037: Manage add-on categories and items

As a studio staff member, I want to add and edit clothing, prop, and makeup add-ons, so
that optional purchase items can be maintained without code changes.

Status: `Next`

Notes:

- Add-on categories should not be hard-coded to only the current three groups forever.
- Current groups are clothing, props, and makeup/styling.

### US-038: Manage bilingual customer-facing copy

As a studio staff member, I want to edit approved Chinese and English website copy, so that
the public site stays accurate for both audiences.

Status: `Next`

Notes:

- Bilingual fields should be modeled intentionally in the database.
- Production should avoid partial translation states becoming public accidentally.

### US-039: Manage gallery media

As a studio staff member, I want to add, order, and update gallery images, so that the
public portfolio can grow beyond the initial sample images.

Status: `Next`

Notes:

- Media records should include useful metadata such as alt text, ordering, and publication
  state.
- Image compression and review rules are still open decisions.

## Epic 10: Draft, Preview, And Publish Workflow

### US-040: Save content as draft

As a studio staff member, I want to save edits as drafts, so that I can work on content
without immediately changing the public website.

Status: `Next`

Notes:

- Draft saving should not affect customer-facing pages.

### US-041: Preview draft content

As a studio staff member, I want to preview draft content before publishing, so that I can
check how changes will look to customers.

Status: `Next`

Notes:

- The system should clearly show when staff are viewing draft content.

### US-042: Publish approved content

As a studio staff member, I want publishing to be an explicit action, so that accidental
public changes are less likely.

Status: `Next`

Notes:

- Publishing should move approved draft content to the customer-facing published state.

### US-043: Track content versions

As a studio owner or administrator, I want published content changes to keep version
history, so that mistakes can be reviewed or reverted later.

Status: `Later`, `Decision needed`

Notes:

- Decide whether versioning stores full snapshots or per-entity revisions.

## Epic 11: Backend API And Data Persistence

### US-044: Customer site reads published content

As a photography customer, I want the public website to show the latest published content,
so that package information reflects what the studio has approved.

Status: `Next`

Notes:

- The future customer frontend should read published data from the backend API or a
  published content source.

### US-045: Staff edits are stored persistently

As a studio staff member, I want my content edits to be stored in a database, so that
changes survive refreshes, deployments, and device changes.

Status: `Next`

Notes:

- Database structure is not designed yet.
- Production implementation should wait for schema decisions.

### US-046: API supports content relationships

As a developer, I want the backend API to represent service areas, service types, schools,
scene types, packages, add-ons, media, and content versions, so that the frontend can stay
data-driven.

Status: `Next`

Notes:

- Current relationship draft: service area -> service type -> school -> scene type ->
  package -> add-on items.
- Some relationship rules still need decisions, especially whether add-ons attach globally,
  by service type, by school, or by scene.

### US-047: Future enquiry can include selected package data

As a photography customer, I want a future enquiry or booking form to carry my selected
package, add-ons, estimated total, and notes, so that I do not need to repeat information
when contacting the studio.

Status: `Later`

Notes:

- No booking submission is active in the current prototype.
- Online payment is still out of scope.

## Epic 12: Repository, Prototype, And Deployment

### US-048: Keep prototype separate from production code

As a maintainer, I want the high-fidelity prototype to live under the wiki area, so that it
can guide product discussion without becoming the production implementation by accident.

Status: `Active`

Notes:

- Current prototype path: `wiki/prototype/high-fidelity/`.
- Formal production code placeholders live under `repos/`.

### US-049: Keep formal frontend and backend placeholders clean

As a maintainer, I want `repos/frontend/` and `repos/backend/` to remain clean
placeholders until framework and database decisions are made, so that production work
starts from a deliberate architecture.

Status: `Active`

Notes:

- The frontend and backend directories currently contain README files only.

### US-050: Deploy the prototype statically

As the studio owner, I want the current prototype to remain available through GitHub
Pages, so that it can be reviewed without renting or maintaining a server.

Status: `Active`

Notes:

- GitHub Pages currently builds from `wiki/prototype/high-fidelity/`.
- This is suitable for the prototype because it does not require a backend server.

### US-051: Preview the prototype locally with Docker

As a maintainer, I want Docker to run the high-fidelity prototype locally, so that the
preview environment is repeatable even before production infrastructure is chosen.

Status: `Active`

Notes:

- Root `docker-compose.yml` currently points to the prototype directory.

### US-052: Keep planning documents near the project

As a maintainer, I want user stories, acceptance criteria, prototype notes, test plans,
architecture drafts, and decisions in the repository wiki folder, so that product thinking
evolves alongside the codebase.

Status: `Active`

Notes:

- Current planning area: `wiki/`.

## Superseded Requirements

These requirements were discussed earlier but replaced or paused by later decisions. They
are recorded to avoid losing context.

### SUP-001: A-Z graduation photo points

Earlier idea:

- After choosing a school, customers would choose from 26 shooting points labeled A-Z.
- Each point was priced at `25 AUD`.
- Total price was selected point count multiplied by `25 AUD`.

Current status: `Superseded`

Replacement:

- Graduation pricing is now package-based for the University of Melbourne.
- The A-Z point selection UI should not appear in the current pricing flow.

### SUP-002: Campus selection before point selection

Earlier idea:

- After choosing a school, customers would choose a campus.
- Campus options were drafted for University of Melbourne, Monash University, and RMIT.
- Photo points, props, clothing, and makeup would appear after campus selection.

Current status: `Superseded`

Replacement:

- The current flow removes campus and A-Z point selection.
- School selection leads to scene type and package selection for University of Melbourne.

### SUP-003: Early add-on pricing model

Earlier idea:

- Props were `5 AUD` each.
- Makeup face service was `20 AUD`.
- Hair service was `5 AUD`.
- Academic gown was `30 AUD`.

Current status: `Superseded`

Replacement:

- Current add-on prices use the studio-provided package data listed in Epic 6.
