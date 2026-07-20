## ADDED Requirements

### Requirement: Beginner-oriented introduction
The playground SHALL begin with a short introductory sequence that explains the add-on's purpose, the relationship between slides, chapters, and subchapters, and the minimum setup needed to use it, without assuming prior knowledge of the repository.

#### Scenario: First-time reader opens the playground
- **WHEN** a reader starts the playground at its first slide
- **THEN** the opening sequence explains what problem the add-on solves before presenting detailed component examples
- **AND** it shows how the add-on is enabled and how the first chapter is declared

### Requirement: Result and source pairing
The playground SHALL present each feature-teaching example with Slidev's `two-cols` layout, placing the live rendered result in the left column and the corresponding copyable `slides.md` Markdown in the right column.

#### Scenario: Reader views a feature example
- **WHEN** a feature-teaching slide demonstrates add-on behavior
- **THEN** its left column is clearly identifiable as the result
- **AND** its right column is clearly identifiable as the Markdown
- **AND** the shown source is sufficient to understand what produces the result

#### Scenario: Structural metadata drives an example
- **WHEN** the example depends on chapter or subchapter frontmatter
- **THEN** the right column includes the relevant frontmatter
- **AND** the live slide metadata produces behavior consistent with the shown source

### Requirement: Progressive public feature coverage
The playground SHALL explain the public feature set in a progression from structural declarations to rendered components and programmatic access, using plain-language descriptions of what each feature is useful for.

#### Scenario: Reader completes the feature tour
- **WHEN** a reader navigates through the complete playground
- **THEN** the tour has demonstrated chapter and subchapter declarations
- **AND** it has demonstrated chapter title, current chapter title, current chapter number, chapter count, and chapter table-of-contents components
- **AND** it has demonstrated table-of-contents numbering, subchapter visibility, and current-entry highlighting
- **AND** it has explained imported-slide behavior and `useChapters()` access

### Requirement: CSS customization examples
The playground SHALL demonstrate how presentation authors can customize add-on output with CSS while distinguishing the add-on's stable public styling hooks from playground-only layout helpers.

#### Scenario: Reader views a CSS example
- **WHEN** a slide demonstrates customized component styling
- **THEN** the left column renders the customized result
- **AND** the right column shows the applicable `<style>` block as Markdown source
- **AND** the example targets stable public add-on classes

#### Scenario: Reader compares default and custom presentation
- **WHEN** CSS customization is introduced
- **THEN** the deck provides enough visual and textual context to understand what changed from the default rendering
- **AND** styling for the example does not unintentionally alter unrelated default examples

### Requirement: Executable documentation deck
The redesigned playground SHALL remain a valid live Slidev deck and SHALL continue to exercise real add-on behavior rather than substituting static representations for the demonstrated output.

#### Scenario: Production playground build runs
- **WHEN** the existing playground build command is executed
- **THEN** the deck builds successfully without new runtime dependencies

#### Scenario: Reader navigates chapter examples
- **WHEN** the reader moves between the representative chapters and subchapters
- **THEN** the rendered title, position, and table-of-contents state reflects the active slide metadata

### Requirement: Presentation readability
The playground SHALL keep explanations and source examples readable at normal presentation dimensions, with one clear learning objective per feature slide and descriptive labels for result and source.

#### Scenario: Example source is too large for one column
- **WHEN** a feature requires source that would make a half-slide code block difficult to read
- **THEN** the content is split across focused slides or reduced to the smallest complete example
- **AND** essential behavior is not hidden behind unexplained omissions
