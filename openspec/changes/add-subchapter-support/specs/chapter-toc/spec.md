## MODIFIED Requirements

### Requirement: Chapter-only overview
`<ChapterToc />` SHALL by default render every valid chapter exactly once in presentation order, MUST NOT render subchapters unless explicitly enabled, and MUST NOT render titles of individual slides as additional entries.

#### Scenario: Default with declared subchapters
- **WHEN** a presentation contains subchapters and `showSubchapters` is false or omitted
- **THEN** the component renders each chapter once and renders no subchapter entries

#### Scenario: Chapter contains titled slides
- **WHEN** a chapter contains multiple slides with headings
- **THEN** the component renders one entry for the chapter title and no entries for those slide headings

### Requirement: Optional numbering
The component SHALL accept a boolean `showNumbers` prop that controls visible numbering without changing IDs, ordering, or navigation targets. When both numbering and subchapter rendering are enabled, chapter numbers SHALL be one-based and each subchapter SHALL use hierarchical `<chapter>.<subchapter>` numbering based on its zero-based chapter-local index.

#### Scenario: Chapter numbering enabled
- **WHEN** `showNumbers` is true for two chapters and subchapter rendering is disabled
- **THEN** the entries show one-based chapter numbers in presentation order

#### Scenario: Hierarchical numbering enabled
- **WHEN** `showNumbers` and `showSubchapters` are true for the second subchapter of the first chapter
- **THEN** that subchapter displays `1.2`

#### Scenario: Numbering disabled
- **WHEN** `showNumbers` is false or omitted under the documented default
- **THEN** chapter and enabled subchapter entries remain present without visible numbers

### Requirement: Optional current-chapter highlighting
The component SHALL accept a boolean `highlightCurrent` prop and, when enabled, SHALL expose matching chapter and rendered subchapter entries through accessible semantic state and stable local styling hooks without global CSS side effects.

#### Scenario: Highlight current chapter and subchapter
- **WHEN** `highlightCurrent` and `showSubchapters` are true and the current slide belongs to a subchapter in the second chapter
- **THEN** the second chapter entry and that subchapter entry are each marked current with their documented modifier classes and appropriate semantic current state

#### Scenario: Current chapter has no current subchapter
- **WHEN** the current slide belongs to a chapter but precedes its first subchapter
- **THEN** that chapter is marked current and no subchapter entry is marked current

#### Scenario: No current chapter
- **WHEN** the current slide precedes the first declaration
- **THEN** no chapter or subchapter entry is marked current

## ADDED Requirements

### Requirement: Optional subchapter overview
`<ChapterToc />` SHALL accept a boolean `showSubchapters` prop defaulting to false and, when true, SHALL render each valid subchapter exactly once beneath its owning chapter in declaration order.

#### Scenario: Subchapter rendering enabled
- **WHEN** `showSubchapters` is true for chapters containing subchapters
- **THEN** each subchapter appears once in a nested list beneath its owning chapter

#### Scenario: Chapter without subchapters
- **WHEN** `showSubchapters` is true and a chapter has no subchapters
- **THEN** the chapter remains present without an empty subchapter list

### Requirement: Navigation to subchapter start
Each interactive subchapter entry SHALL navigate to that subchapter's first slide using the same documented Slidev-compatible mechanism as chapter navigation.

#### Scenario: Activate a subchapter entry
- **WHEN** a user activates an entry for a subchapter starting on slide 7
- **THEN** Slidev navigates to slide 7

### Requirement: Stable subchapter styling API
Rendered subchapter markup SHALL expose stable, independently styleable `.chapter-toc__sublist`, `.chapter-toc__subitem`, `.chapter-toc__subitem--current`, `.chapter-toc__subtitle`, and `.chapter-toc__subnumber` classes, with stable ownership/identity data attributes documented where provided. The component SHALL apply no global CSS side effects.

#### Scenario: Theme styles subchapter elements
- **WHEN** a theme defines separate rules for the documented subchapter classes
- **THEN** it can independently style the nested list, entry, current entry, title, and number without changing component code
