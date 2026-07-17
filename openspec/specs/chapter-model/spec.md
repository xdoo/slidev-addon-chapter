## Purpose

Define declaration-based chapter semantics, validation, ordering, and slide-range behavior.

## Requirements

### Requirement: Explicit chapter declarations
The addon SHALL treat a slide with a valid `chapter` frontmatter object as the start of a new chapter, SHALL include that slide in the new chapter, and SHALL assign following slides through the slide before the next valid declaration to that chapter.

#### Scenario: Multiple slides in one chapter
- **WHEN** slide 2 declares chapter `a` and slides 3 and 4 have no chapter declaration
- **THEN** chapter `a` contains slides 2, 3, and 4

#### Scenario: Consecutive chapter declarations
- **WHEN** slides 2 and 3 each declare a different valid chapter
- **THEN** the chapter declared on slide 2 contains only slide 2 and the chapter declared on slide 3 begins at slide 3

#### Scenario: Last chapter reaches deck end
- **WHEN** the final chapter starts before the final slide and no later chapter is declared
- **THEN** its `endSlide` is the final slide and its slide list includes every slide in that inclusive range

### Requirement: Layout-independent semantics
The addon SHALL derive chapter boundaries exclusively from `chapter` frontmatter and MUST NOT infer a chapter from `layout: chapter` or any other layout name.

#### Scenario: Theme chapter layout without metadata
- **WHEN** a slide uses `layout: chapter` but has no `chapter` object
- **THEN** the slide does not start a chapter

#### Scenario: Chapter metadata on an ordinary layout
- **WHEN** a slide declares a valid `chapter` object without `layout: chapter`
- **THEN** the slide starts a chapter

### Requirement: Deterministic chapter records
The extractor SHALL return chapters once each in presentation order with zero-based `index`, one-based inclusive `startSlide` and `endSlide`, an ordered `slideNumbers` list matching that range, and an ordered readonly `subchapters` collection containing every valid subchapter owned by that chapter.

#### Scenario: Ordered chapter output
- **WHEN** valid chapters start on slides 2 and 5 of a six-slide deck
- **THEN** the output contains two chapters in that order with ranges 2–4 and 5–6

#### Scenario: One-slide chapter
- **WHEN** a chapter declaration is immediately followed by another declaration
- **THEN** the first chapter has equal start and end slide numbers and one slide number

#### Scenario: Existing chapter-only deck
- **WHEN** a valid presentation declares chapters but no subchapters
- **THEN** its chapter IDs, titles, indices, ranges, and slide numbers are unchanged and every chapter has an empty `subchapters` collection

### Requirement: Valid chapter metadata
Every chapter SHALL have a non-empty string `id` and `title`, and every ID SHALL be unique within the resolved presentation. Invalid declarations SHALL produce understandable deterministic errors identifying the slide and invalid field and MUST NOT silently create, merge, or overwrite chapters.

#### Scenario: Missing title
- **WHEN** a chapter declaration has an ID but no non-empty title
- **THEN** validation reports the slide and missing `chapter.title`

#### Scenario: Missing ID
- **WHEN** a chapter declaration has a title but no non-empty ID
- **THEN** validation reports the slide and missing `chapter.id` rather than deriving one

#### Scenario: Duplicate ID
- **WHEN** two declarations use the same ID, whether or not their titles are identical
- **THEN** validation reports a duplicate ID with enough location information to find both declarations and does not collapse them

### Requirement: Slides before the first chapter
Slides before the first valid chapter declaration SHALL be allowed and SHALL remain unassigned rather than forming an implicit chapter.

#### Scenario: Preface slides
- **WHEN** the first declaration occurs on slide 3
- **THEN** slides 1 and 2 belong to no chapter and the first chapter starts on slide 3

### Requirement: Resolved imported slide order
The addon SHALL apply the same chapter rules to imported or split slide files when Slidev exposes their resolved metadata through the selected documented public API.

#### Scenario: Declaration in an imported file
- **WHEN** a resolved imported slide exposes valid chapter frontmatter in the deck's public slide sequence
- **THEN** it starts a chapter at its resolved presentation slide number
