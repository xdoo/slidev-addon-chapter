## ADDED Requirements

### Requirement: Explicit subchapter declarations
The addon SHALL treat a slide with a valid `subchapter` frontmatter object as the start of a subchapter owned by the currently active chapter, SHALL include the declaration slide, and SHALL assign following slides through the slide before the next valid subchapter or chapter declaration.

#### Scenario: Multiple slides in one subchapter
- **WHEN** a chapter starts on slide 2, subchapter `context` starts on slide 3, and the next declaration is a subchapter on slide 6
- **THEN** `context` belongs to that chapter and contains slides 3 through 5

#### Scenario: Chapter and subchapter share a declaration slide
- **WHEN** a valid chapter and valid subchapter are declared on the same slide
- **THEN** the chapter starts first and the subchapter belongs to that new chapter starting on the same slide

### Requirement: Fixed two-level hierarchy
The addon SHALL support exactly Chapter → Subchapter and MUST NOT infer or represent nested subchapters or arbitrary hierarchy depth.

#### Scenario: Consumer reads hierarchy
- **WHEN** extracted presentation state contains subchapters
- **THEN** each subchapter appears directly in one chapter's `subchapters` collection and has no child collection

### Requirement: Deterministic subchapter boundaries
A new subchapter SHALL end the previous subchapter on the preceding slide, a new chapter SHALL end any active subchapter on the preceding slide, and the final active subchapter SHALL end at the final slide of its owning chapter.

#### Scenario: Consecutive subchapters
- **WHEN** valid subchapters start on consecutive slides 3 and 4 within one chapter
- **THEN** the first subchapter contains only slide 3 and the second begins on slide 4

#### Scenario: Chapter transition closes subchapter
- **WHEN** a subchapter starts on slide 3 and the next chapter starts on slide 7
- **THEN** the subchapter ends on slide 6 and does not include any slide from the next chapter

#### Scenario: Chapter has no subchapters
- **WHEN** a valid chapter contains no subchapter declaration
- **THEN** it remains valid with an empty `subchapters` collection

### Requirement: Deterministic subchapter records
Each subchapter SHALL have its declared `id` and `title`, a zero-based index within its chapter, one-based inclusive `startSlide` and `endSlide`, and an ordered `slideNumbers` list matching its range.

#### Scenario: Ordered subchapter output
- **WHEN** two subchapters begin on slides 3 and 6 within a chapter ending on slide 8
- **THEN** they have indices 0 and 1 and ranges 3–5 and 6–8 in declaration order

### Requirement: Valid subchapter metadata and ownership
Every subchapter SHALL have a non-empty string `id` and `title`, SHALL belong to exactly one active chapter, and SHALL have an ID unique within that chapter. Invalid declarations SHALL produce understandable deterministic errors identifying the slide and invalid field or ownership and MUST NOT silently create, merge, move, or overwrite subchapters.

#### Scenario: Missing subchapter ID
- **WHEN** a subchapter declaration has a title but no non-empty ID
- **THEN** validation reports the slide and invalid `subchapter.id`

#### Scenario: Missing subchapter title
- **WHEN** a subchapter declaration has an ID but no non-empty title
- **THEN** validation reports the slide and invalid `subchapter.title`

#### Scenario: Orphaned subchapter
- **WHEN** a subchapter is declared before the first valid chapter
- **THEN** validation rejects it with a clear error identifying the slide and absence of an active chapter

#### Scenario: Duplicate ID within chapter
- **WHEN** two subchapters in the same chapter declare the same ID
- **THEN** validation reports both declaration locations and does not collapse them

#### Scenario: Reused ID in different chapters
- **WHEN** subchapters in different chapters declare the same ID
- **THEN** both declarations are valid and remain owned by their respective chapters

### Requirement: Layout-independent subchapter semantics
The addon SHALL derive subchapter boundaries exclusively from `subchapter` frontmatter and MUST NOT infer them from layouts, headings, slide titles, or other navigation structures.

#### Scenario: Heading without declaration
- **WHEN** a slide has a heading but no `subchapter` object
- **THEN** it does not start a subchapter
