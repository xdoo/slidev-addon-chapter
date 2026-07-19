## Purpose

Each position component renders exactly one value from the runtime chapter state (`useChapters()`) as a single root element with a stable public CSS class, no inline styles, no formatting, and no labels. They provide reusable building blocks for progress indicators, section headers, footers, and other position-aware UI without requiring consumers to import or destructure the composable.

## Requirements

### Requirement: Current chapter number rendering
The addon SHALL provide an auto-discovered Vue component named `CurrentChapterNumber` that retrieves chapter state through `useChapters()` and renders the one-based index of the active chapter as its only text content.

#### Scenario: Active chapter exists
- **WHEN** `useChapters()` exposes an active chapter whose zero-based `index` is 2
- **THEN** `CurrentChapterNumber` renders `3`
- **AND** the rendered output contains no formatting, separator, or label

#### Scenario: Active chapter changes
- **WHEN** the active chapter changes through reactive navigation state
- **THEN** `CurrentChapterNumber` updates automatically to the new active chapter's one-based index

#### Scenario: No active chapter
- **WHEN** the current slide has no active chapter
- **THEN** `CurrentChapterNumber` renders nothing

### Requirement: Chapter count rendering
The addon SHALL provide an auto-discovered Vue component named `ChapterCount` that retrieves chapter state through `useChapters()` and renders the total number of declared chapters as its only text content.

#### Scenario: Chapters are declared
- **WHEN** `useChapters()` exposes 5 chapters
- **THEN** `ChapterCount` renders `5`
- **AND** the rendered output contains no formatting, separator, or label

#### Scenario: No chapters are declared
- **WHEN** `useChapters()` exposes an empty chapters array
- **THEN** `ChapterCount` renders nothing

#### Scenario: Chapter count updates
- **WHEN** the resolved chapter list changes (e.g., slide frontmatter changes during editing)
- **THEN** `ChapterCount` updates automatically to the new count

### Requirement: Current chapter title rendering (explicit component)
The addon SHALL provide an auto-discovered Vue component named `CurrentChapterTitle` that retrieves chapter state through `useChapters()` and renders the active chapter's `title` as its only text content, using the CSS class `.current-chapter-title` distinct from the existing `ChapterTitle` component's `.chapter-title`.

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

### Requirement: Minimal markup per component
Each position component SHALL render exactly one `span` with its designated public CSS class when its value is present, SHALL add no wrapper, and SHALL introduce no additional semantic or accessibility attributes.

#### Scenario: CurrentChapterNumber rendered HTML
- **WHEN** the one-based chapter index is `3`
- **THEN** the rendered HTML is `<span class="current-chapter-number">3</span>`

#### Scenario: ChapterCount rendered HTML
- **WHEN** the chapter count is `5`
- **THEN** the rendered HTML is `<span class="chapter-count">5</span>`

#### Scenario: CurrentChapterTitle rendered HTML
- **WHEN** the current chapter title is `Architecture`
- **THEN** the rendered HTML is `<span class="current-chapter-title">Architecture</span>`

### Requirement: Public styling contract
Each component SHALL use its designated stable public CSS class (`.current-chapter-number`, `.chapter-count`, `.current-chapter-title`), SHALL apply no inline styles, and SHALL provide at most minimal theme-overridable default styling. Each class SHALL remain compatible across minor releases.

#### Scenario: Theme customizes a component
- **WHEN** a theme defines a rule for `.current-chapter-number`, `.chapter-count`, or `.current-chapter-title`
- **THEN** the rule can customize the component's presentation without changing component markup or runtime code

### Requirement: Component exports from entry point
The addon SHALL export `CurrentChapterNumber`, `ChapterCount`, and `CurrentChapterTitle` as named exports from `src/index.ts` so consumers can import them explicitly alongside the runtime API.

#### Scenario: Explicit component import
- **WHEN** a consumer runs `import { CurrentChapterNumber, ChapterCount, CurrentChapterTitle } from 'slidev-addon-chapters'`
- **THEN** each import resolves to the corresponding component's default export

### Requirement: Component documentation
The addon documentation SHALL describe each component's purpose, show usage, show its rendered HTML, identify its public styling class, and include a CSS customization example.

#### Scenario: Consumer consults documentation
- **WHEN** a theme or presentation author reads the component documentation
- **THEN** they can use each position component and style it through its public CSS class without using the runtime API directly
