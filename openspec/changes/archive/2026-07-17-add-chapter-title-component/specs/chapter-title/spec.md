## ADDED Requirements

### Requirement: Current chapter title rendering
The addon SHALL provide an auto-discovered Vue component named `ChapterTitle` that retrieves chapter state through `useChapters()` and renders the active chapter's `title` as its only text content.

#### Scenario: Active chapter exists
- **WHEN** `useChapters()` exposes an active chapter whose `title` is `Architecture`
- **THEN** `ChapterTitle` renders `Architecture`
- **AND** the rendered output contains no chapter number or icon

#### Scenario: Active chapter changes
- **WHEN** the active chapter changes through reactive navigation state
- **THEN** `ChapterTitle` updates automatically to the new active chapter's `title`

#### Scenario: Future metadata is present
- **WHEN** an active chapter contains additional metadata such as `shortTitle` or `icon`
- **THEN** `ChapterTitle` continues to display `chapter.title` by default

### Requirement: No-chapter rendering
The component SHALL render no DOM element when `useChapters()` exposes no active chapter.

#### Scenario: Slide precedes the first chapter
- **WHEN** the current slide has no active chapter
- **THEN** `ChapterTitle` renders nothing

### Requirement: Minimal and accessible markup
When a chapter is active, the component SHALL render exactly one `span` with the class `chapter-title`, SHALL add no wrapper, and SHALL introduce no additional semantic or accessibility attributes.

#### Scenario: Rendered HTML contract
- **WHEN** the current chapter title is `Architecture`
- **THEN** the rendered HTML is a `span.chapter-title` whose text content is `Architecture`
- **AND** the component adds no numbering, icons, wrappers, roles, or ARIA attributes

### Requirement: Public styling contract
The component SHALL use `.chapter-title` as its stable public CSS class, SHALL apply no inline styles, and SHALL provide at most minimal theme-overridable default styling. The class SHALL remain compatible across minor releases.

#### Scenario: Theme customizes the title
- **WHEN** a theme defines a rule for `.chapter-title`
- **THEN** the rule can customize the component's presentation without changing component markup or runtime code

### Requirement: Component documentation
The addon documentation SHALL describe the component's purpose, show `<ChapterTitle />` usage, show its rendered HTML, identify `.chapter-title` as the public styling class, and include a CSS customization example.

#### Scenario: Consumer consults documentation
- **WHEN** a theme or presentation author reads the component documentation
- **THEN** they can add the current chapter title and style it through `.chapter-title` without using the runtime API directly
