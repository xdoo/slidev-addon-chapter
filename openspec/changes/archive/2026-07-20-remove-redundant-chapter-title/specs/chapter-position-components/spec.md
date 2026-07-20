## MODIFIED Requirements

### Requirement: Current chapter title rendering (explicit component)
The addon SHALL provide `CurrentChapterTitle` as the sole auto-discovered Vue component dedicated to rendering the active chapter title. It SHALL retrieve chapter state through `useChapters()` and render the active chapter's `title` as its only text content using the CSS class `.current-chapter-title`. The addon SHALL NOT provide an auto-discovered `ChapterTitle` component.

#### Scenario: Active chapter exists
- **WHEN** `useChapters()` exposes an active chapter whose `title` is `Architecture`
- **THEN** `CurrentChapterTitle` renders `Architecture`
- **AND** the rendered output contains no chapter number or icon

#### Scenario: Active chapter changes
- **WHEN** the active chapter changes through reactive navigation state
- **THEN** `CurrentChapterTitle` updates automatically to the new active chapter's `title`

#### Scenario: No active chapter
- **WHEN** the current slide has no active chapter
- **THEN** `CurrentChapterTitle` renders nothing

#### Scenario: Consumer chooses the title component
- **WHEN** a consumer inspects the addon's auto-discovered components
- **THEN** `CurrentChapterTitle` is available for rendering the active chapter title
- **AND** `ChapterTitle` is not provided
