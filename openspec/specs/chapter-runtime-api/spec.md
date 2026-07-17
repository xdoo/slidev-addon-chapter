## Purpose

Define the public reactive chapter API and its compatibility boundary with Slidev.

## Requirements

### Requirement: Public chapter state API
The addon SHALL expose a documented TypeScript/Vue API named `useChapters()` or an equivalently documented API that provides readonly ordered chapters, an optional current chapter, and an optional current subchapter without requiring consumers to access Slidev internals. Chapter records SHALL contain readonly ordered `subchapters`, and subchapter records SHALL contain ID, title, zero-based chapter-local index, start slide, end slide, and slide numbers.

#### Scenario: Consumer reads chapter and subchapter state
- **WHEN** a theme or Vue component consumes the public API in a valid deck with subchapters
- **THEN** it receives structured chapter records containing their subchapter records plus the current chapter and current subchapter when they exist

#### Scenario: Consumer reads chapter-only state
- **WHEN** a theme or Vue component consumes the public API in a deck without subchapters
- **THEN** it receives the existing chapter state, every `subchapters` collection is empty, and `currentSubchapter` is absent

### Requirement: Declaration-derived single source of truth
The addon SHALL derive all public chapter and subchapter state and addon-provided views exclusively from the presentation's `chapter` and `subchapter` declarations and MUST NOT require or accept a separately maintained chapter, subchapter, or agenda list for the same structure.

#### Scenario: Structural declaration changes
- **WHEN** an author changes the ID, title, position, or presence of a valid chapter or subchapter declaration
- **THEN** the public API and addon-provided views reflect that change without requiring an update to any second data source

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
The addon SHALL publish its public `Chapter`, `Subchapter`, and state types and SHALL validate custom chapter and subchapter frontmatter received from Slidev as external input. Slidev type augmentation SHALL only be used if the supported public typing contract documents it.

#### Scenario: Unsupported type augmentation
- **WHEN** Slidev does not document augmentation of its per-slide frontmatter type
- **THEN** the addon validates `chapter` and `subchapter` locally and exports addon-owned types without patching Slidev declarations

### Requirement: Reactive current subchapter
The public API SHALL determine `currentSubchapter` from Slidev's documented public current-slide state, the current chapter, and inclusive subchapter ranges, and SHALL update without navigation-history dependence when the current slide changes.

#### Scenario: Navigate within a subchapter
- **WHEN** navigation moves between two slides in the same subchapter
- **THEN** `currentSubchapter` continues to identify that subchapter

#### Scenario: Cross a subchapter boundary
- **WHEN** navigation moves to the first slide of the next subchapter
- **THEN** `currentSubchapter` updates to the next subchapter

#### Scenario: Enter a new chapter without a starting subchapter
- **WHEN** navigation moves to a new chapter before that chapter's first subchapter declaration
- **THEN** `currentChapter` identifies the new chapter and `currentSubchapter` is absent

#### Scenario: Direct entry into later subchapter
- **WHEN** a browser loads or refreshes directly on a slide inside a later subchapter
- **THEN** `currentSubchapter` immediately identifies that subchapter
