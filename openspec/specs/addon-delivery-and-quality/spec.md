## Purpose

Define how the addon is packaged, documented, tested, and verified across supported Slidev contexts.

## Requirements

### Requirement: Conventional addon delivery
The package SHALL follow current documented Slidev addon conventions, SHALL evaluate `slidev-addon-chapters` as its full package name, SHALL declare Slidev addon keywords and a tested Slidev engine floor, and SHALL use semantic versioning.

#### Scenario: Package metadata review
- **WHEN** the package is prepared for release
- **THEN** its name, keywords, version, and Slidev compatibility declaration match the documented and tested conventions

### Requirement: Automatic component availability
`ChapterToc.vue` SHALL be placed and packaged according to documented Slidev component discovery so `<ChapterToc />` is recognized after adding the addon, without manual component registration by deck authors.

#### Scenario: Local addon use
- **WHEN** a playground declares `addons: [./]` and uses `<ChapterToc />`
- **THEN** Slidev starts without an unknown-component failure and renders the component

### Requirement: Minimal infrastructure
The first implementation MUST NOT add an addon layout, global styles, setup hook, Vite configuration, UnoCSS configuration, or Markdown transformation unless the API spike demonstrates and documents a requirement that cannot be met through simpler public conventions.

#### Scenario: Public runtime APIs suffice
- **WHEN** documented component discovery and runtime APIs provide all required data and behavior
- **THEN** the addon contains no `layouts/`, `styles/`, `setup/`, `vite.config.ts`, `uno.config.ts`, or custom transformer solely for chapter support

### Requirement: Pure extraction unit tests
Chapter and subchapter extraction and current-state lookup SHALL be testable as pure TypeScript independently of a running Slidev application and without resolving Slidev-generated virtual modules. The repository's normal unit-test command MUST enforce that designated pure extraction tests import only pure source modules and MUST reject imports through a mixed barrel that also exposes Slidev runtime-dependent modules before Vitest collection begins.

#### Scenario: Unit suite coverage
- **WHEN** the unit suite runs in the repository's standalone Vitest environment
- **THEN** it covers existing chapter behavior plus subchapter parsing, inclusive ranges, consecutive declarations, chapter and subchapter transitions, malformed declarations, orphan rejection, chapter-scoped duplicate IDs, reusable IDs across chapters, current-subchapter lookup, and chapter-only backwards compatibility
- **THEN** collection and execution do not require `#slidev/configs` or another Slidev-generated virtual module

#### Scenario: Mixed runtime barrel is reintroduced
- **WHEN** a designated pure extraction test imports through a barrel that also exposes Slidev runtime-dependent modules
- **THEN** the normal unit-test command fails before Vitest collection with an actionable source-boundary error
- **THEN** the failure does not depend on resolving or stubbing a Slidev-generated virtual module

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

### Requirement: Build and export verification
The project SHALL provide automated `test`, `typecheck`, and `build` quality checks and SHALL verify and document PDF and PPTX export behavior for readable chapter output and any navigation limitation.

#### Scenario: Quality gate
- **WHEN** a release candidate is evaluated
- **THEN** test, typecheck, and build pass and PDF/PPTX results are recorded

### Requirement: Proportionate browser automation
The first implementation SHALL evaluate Playwright for navigation, refresh, presenter, and build smoke coverage and SHALL either add the smallest reliable suite needed for acceptance or document broad browser automation as a follow-up with equivalent first-release manual checks.

#### Scenario: Playwright is disproportionate for v1
- **WHEN** the implementation review shows full browser automation adds substantial complexity beyond the first scope
- **THEN** required manual integration evidence is recorded and a scoped follow-up is created rather than dropping the checks

### Requirement: Public documentation
The README SHALL document installation, full-name addon configuration, chapter and optional subchapter concepts/frontmatter semantics, fixed hierarchy and validation rules, optional layout separation, `useChapters()` imports and complete public types, `<ChapterToc />` props and examples with and without subchapters, navigation, stable chapter/subchapter styling APIs, preface behavior, supported Slidev versions, theme neutrality, static/export limitations, package/API versioning, and migration guidance stating existing presentations require no changes.

#### Scenario: New consumer follows README
- **WHEN** a consumer configures a valid deck solely from the README
- **THEN** the addon loads, declarations are extracted, and the public component/API can be used for chapters and optional subchapters without private Slidev imports or duplicate navigation data

#### Scenario: Existing consumer reads migration guidance
- **WHEN** a consumer has a chapter-only presentation
- **THEN** the README states that no frontmatter, component, or API migration is required
