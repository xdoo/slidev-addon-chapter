## MODIFIED Requirements

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

### Requirement: Addon-owned types and validation boundary
The addon SHALL publish its public `Chapter`, `Subchapter`, and state types and SHALL validate custom chapter and subchapter frontmatter received from Slidev as external input. Slidev type augmentation SHALL only be used if the supported public typing contract documents it.

#### Scenario: Unsupported type augmentation
- **WHEN** Slidev does not document augmentation of its per-slide frontmatter type
- **THEN** the addon validates `chapter` and `subchapter` locally and exports addon-owned types without patching Slidev declarations

## ADDED Requirements

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
