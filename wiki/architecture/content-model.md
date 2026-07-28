# Content Model

This document describes how editable website content should relate to other content.

## Core Idea

The customer-facing website should be driven by editable content rather than hard-coded
pricing and package data.

## Main Content Relationships

```text
Service Area
  -> Service Type
    -> School
      -> Scene Type
        -> Package
          -> Add-on Items
```

Media assets and bilingual copy can be attached to the relevant content area.

## Content Entities To Model

- Service area: examples include Melbourne and Shanghai.
- Service type: examples include graduation photography, registry wedding coverage, daily portraits, and wedding portraits.
- School: used for education-related services such as graduation photography.
- Scene type: a shoot context, such as University of Melbourne single scene or University of Melbourne plus Carlton Garden.
- Package: a priced offer attached to a scene type.
- Add-on category: clothing, props, makeup, or future categories.
- Add-on item: a priced optional item.
- Media asset: image or future media item used by gallery or service content.
- Content version: draft or published content snapshot.

## Data Rules To Decide Later

- Whether add-ons attach globally, by service type, by school, or by scene.
- Whether packages can belong to non-school services.
- Whether content versioning stores full snapshots or per-entity revisions.
- How bilingual fields should be stored.
- How image metadata and ordering should be managed.
