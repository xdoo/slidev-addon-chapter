## MODIFIED Requirements

### Requirement: Pure extraction unit tests
Chapter and subchapter extraction and current-state lookup SHALL be testable as pure TypeScript independently of a running Slidev application and without resolving Slidev-generated virtual modules.

#### Scenario: Unit suite coverage
- **WHEN** the unit suite runs in the repository's standalone Vitest environment
- **THEN** it covers existing chapter behavior plus subchapter parsing, inclusive ranges, consecutive declarations, chapter and subchapter transitions, malformed declarations, orphan rejection, chapter-scoped duplicate IDs, reusable IDs across chapters, current-subchapter lookup, and chapter-only backwards compatibility
- **THEN** collection and execution do not require `#slidev/configs` or another Slidev-generated virtual module

### Requirement: Local playground coverage
The repository SHALL contain a `slides.md` playground that loads the addon locally using the currently documented mechanism and demonstrates ordinary chapter starts, optional chapter-layout coexistence, multiple chapter lengths, slides before the first chapter, multiple subchapters, chapter transitions, a chapter without subchapters, hierarchical TOC rendering, and current chapter/subchapter styling.

#### Scenario: Start playground
- **WHEN** a contributor starts Slidev with the repository playground
- **THEN** the local addon loads and chapter-only plus subchapter representative cases can be inspected and navigated

### Requirement: Integration and compatibility verification
Verification SHALL cover dev-server startup, automatic component recognition, chapter-only and opt-in subchapter rendering, chapter and subchapter navigation, direct refresh, presenter mode, static build, default-theme compatibility, and one additional maintained theme.

#### Scenario: Integration verification passes
- **WHEN** the supported integration checks run against a valid playground
- **THEN** each required context produces expected chapter/subchapter content and reactive current-state behavior while chapter-only defaults remain unchanged

### Requirement: Public documentation
The README SHALL document installation, full-name addon configuration, chapter and optional subchapter concepts/frontmatter semantics, fixed hierarchy and validation rules, optional layout separation, `useChapters()` imports and complete public types, `<ChapterToc />` props and examples with and without subchapters, navigation, stable chapter/subchapter styling APIs, preface behavior, supported Slidev versions, theme neutrality, static/export limitations, package/API versioning, and migration guidance stating existing presentations require no changes.

#### Scenario: New consumer follows README
- **WHEN** a consumer configures a valid deck solely from the README
- **THEN** the addon loads, declarations are extracted, and the public component/API can be used for chapters and optional subchapters without private Slidev imports or duplicate navigation data

#### Scenario: Existing consumer reads migration guidance
- **WHEN** a consumer has a chapter-only presentation
- **THEN** the README states that no frontmatter, component, or API migration is required
