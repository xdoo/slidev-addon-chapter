## ADDED Requirements

### Requirement: Chapter-only overview
`<ChapterToc />` SHALL render every valid chapter exactly once in presentation order and MUST NOT render titles of individual slides as additional entries.

#### Scenario: Chapter contains titled slides
- **WHEN** a chapter contains multiple slides with headings
- **THEN** the component renders one entry for the chapter title and no entries for those slide headings

### Requirement: Optional numbering
The component SHALL accept a boolean `showNumbers` prop that controls visible chapter numbering without changing chapter IDs, ordering, or navigation targets.

#### Scenario: Numbering enabled
- **WHEN** `showNumbers` is true for two chapters
- **THEN** the entries show one-based chapter numbers in presentation order

#### Scenario: Numbering disabled
- **WHEN** `showNumbers` is false or omitted under the documented default
- **THEN** entries remain present without visible chapter numbers

### Requirement: Optional current-chapter highlighting
The component SHALL accept a boolean `highlightCurrent` prop and, when enabled, SHALL expose the matching entry through accessible semantic state and stable local styling hooks without global CSS side effects.

#### Scenario: Highlight current chapter
- **WHEN** `highlightCurrent` is true and the current slide belongs to the second chapter
- **THEN** only the second entry is marked current, including an appropriate `aria-current` value

#### Scenario: No current chapter
- **WHEN** the current slide precedes the first declaration
- **THEN** no chapter entry is marked current

### Requirement: Navigation to chapter start
Each interactive entry SHALL target that chapter's first slide using a documented Slidev-compatible navigation or routing mechanism that remains correct with static-build base paths.

#### Scenario: Activate a chapter entry
- **WHEN** a user activates an entry for a chapter starting on slide 7
- **THEN** Slidev navigates to slide 7

### Requirement: Theme and context neutrality
The component SHALL neither require a particular theme nor override layouts or global styles, and its chapter labels SHALL remain readable in presentation, presenter, static-build, PDF, and PPTX render paths even when interactive navigation is unavailable.

#### Scenario: Two themes
- **WHEN** the same deck uses the default theme and then a second maintained theme
- **THEN** the component renders the same chapter content without requiring theme-specific integration

#### Scenario: Export rendering
- **WHEN** the deck is exported to PDF or PPTX
- **THEN** chapter titles and enabled numbers are present and readable, while navigation availability is documented according to exporter behavior

