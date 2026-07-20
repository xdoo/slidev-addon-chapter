## MODIFIED Requirements

### Requirement: Feature showcase coverage
The deployed playground SHALL provide an introductory preface and demonstrate the addon's chapter, subchapter, imported-slide, current-title, table-of-contents, styling, and navigation behavior documented by the repository. It SHALL use `CurrentChapterTitle` as the only component example for rendering the active chapter title.

#### Scenario: Visitor explores the showcase
- **WHEN** a visitor navigates through the deployed playground
- **THEN** the preface, chapter and subchapter examples, imported slides, `CurrentChapterTitle`, `ChapterToc`, and navigation are available for inspection
- **AND** the showcase does not present `ChapterTitle` as an available alternative

#### Scenario: README entry point
- **WHEN** a visitor follows the Live Demo link in the README
- **THEN** it points to the deployed GitHub Pages feature showcase URL
