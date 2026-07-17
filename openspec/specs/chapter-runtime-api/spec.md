## Purpose

Define the public reactive chapter API and its compatibility boundary with Slidev.

## Requirements

### Requirement: Public chapter state API
The addon SHALL expose a documented TypeScript/Vue API named `useChapters()` or an equivalently documented API that provides readonly ordered chapters and an optional current chapter without requiring consumers to access Slidev internals.

#### Scenario: Consumer reads chapter state
- **WHEN** a theme or Vue component consumes the public API in a valid deck
- **THEN** it receives structured chapter records containing ID, title, index, start slide, end slide, and slide numbers plus the current chapter when one exists

### Requirement: Declaration-derived single source of truth
The addon SHALL derive all public chapter state and addon-provided chapter views from the presentation's `chapter` declarations and MUST NOT require or accept a separately maintained chapter or agenda list for the same structure.

#### Scenario: Chapter declaration changes
- **WHEN** an author changes the ID, title, position, or presence of a valid chapter declaration
- **THEN** the public chapter API and addon-provided chapter views reflect that change without requiring an update to any second chapter data source

### Requirement: Reactive current chapter
The public API SHALL determine the current chapter from Slidev's documented public current-slide state and inclusive chapter ranges, and SHALL update when the current slide changes.

#### Scenario: Navigate within a chapter
- **WHEN** navigation moves between two slides in the same chapter
- **THEN** `currentChapter` continues to identify that chapter

#### Scenario: Cross a chapter boundary
- **WHEN** navigation moves to the first slide of the next chapter
- **THEN** `currentChapter` updates to the next chapter

#### Scenario: Current slide precedes all chapters
- **WHEN** the current slide is before the first declaration
- **THEN** `currentChapter` is absent

### Requirement: Entry-point independence
Current chapter resolution SHALL be correct on direct URL entry and browser refresh and MUST NOT depend on previously observed navigation events.

#### Scenario: Refresh on a later slide
- **WHEN** the browser loads or refreshes directly on a slide inside a later chapter
- **THEN** the API immediately resolves that later chapter from current slide state

### Requirement: Required Slidev contexts
The public API SHALL function in normal presentation and presenter modes and SHALL provide deterministic renderable chapter state during static build and export contexts supported by the selected public Slidev API.

#### Scenario: Presenter mode
- **WHEN** the active slide changes in presenter mode
- **THEN** current chapter state matches the presenter's active slide

#### Scenario: Static output load
- **WHEN** a built static deck loads at a chapter slide
- **THEN** chapter data and current chapter are available without a development server

### Requirement: Public API compatibility boundary
The implementation MUST use documented public Slidev APIs and MUST NOT import nested private Slidev modules when a public alternative exists. If all-slide metadata is not documented, implementation SHALL remain blocked on a documented spike decision rather than silently depending on internals.

#### Scenario: API spike cannot confirm metadata enumeration
- **WHEN** no documented public API can provide all resolved slide frontmatter for the supported Slidev version
- **THEN** the spike records the gap and the production extractor integration is not implemented using a private module

### Requirement: Addon-owned types and validation boundary
The addon SHALL publish its public chapter types and SHALL validate custom frontmatter received from Slidev as external input. Slidev type augmentation SHALL only be used if the supported public typing contract documents it.

#### Scenario: Unsupported type augmentation
- **WHEN** Slidev does not document augmentation of its per-slide frontmatter type
- **THEN** the addon validates `chapter` locally and exports addon-owned types without patching Slidev declarations
