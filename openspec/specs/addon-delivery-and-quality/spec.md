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
Chapter extraction and current-chapter lookup SHALL be testable as pure TypeScript independently of a running Slidev application.

#### Scenario: Unit suite coverage
- **WHEN** the unit suite runs
- **THEN** it covers multiple slides per chapter, consecutive chapters, final range, preface slides, duplicate IDs, missing title, missing ID, one-slide chapters, and current-chapter lookup

### Requirement: Local playground coverage
The repository SHALL contain a `slides.md` playground that loads the addon locally using the currently documented mechanism and demonstrates ordinary chapter starts, optional chapter-layout coexistence, multiple chapter lengths, and slides before the first chapter.

#### Scenario: Start playground
- **WHEN** a contributor starts Slidev with the repository playground
- **THEN** the local addon loads and the documented representative cases can be inspected

### Requirement: Integration and compatibility verification
Verification SHALL cover dev-server startup, automatic component recognition, chapter-only rendering, navigation, direct refresh, presenter mode, static build, default-theme compatibility, and one additional maintained theme.

#### Scenario: Integration verification passes
- **WHEN** the supported integration checks run against a valid playground
- **THEN** each required context produces the expected chapter content and current-chapter behavior

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
The README SHALL document installation, full-name addon configuration, chapter frontmatter semantics, optional layout separation, `useChapters()` imports and types, `<ChapterToc />` props, validation errors, preface behavior, supported Slidev versions, theme neutrality, static/export limitations, and package/API versioning.

#### Scenario: New consumer follows README
- **WHEN** a consumer configures a valid deck solely from the README
- **THEN** the addon loads, chapters are extracted, and the public component/API can be used without private Slidev imports
