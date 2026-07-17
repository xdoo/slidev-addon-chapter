## Purpose

Define how the addon is packaged, documented, tested, and verified across supported Slidev contexts.

## Requirements

### Requirement: Conventional addon delivery
The package SHALL follow current documented Slidev addon conventions, SHALL use a final npm name whose availability, scope, and public access have been explicitly confirmed, SHALL declare Slidev addon keywords and a tested Node/Slidev compatibility floor, SHALL use semantic versioning, and SHALL link to the repository at `https://github.com/xdoo/slidev-addon-chapter.git`. The existing `slidev-addon-chapters` manifest name SHALL remain a candidate until its discrepancy with the `slidev-addon-chapter` repository name and its npm availability are resolved.

#### Scenario: Package metadata review
- **WHEN** the package is prepared for release
- **THEN** its confirmed name, scope/access, keywords, version, repository links, and Node/Slidev compatibility declarations match documented and tested conventions

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
The project SHALL provide automated `test`, `typecheck`, and `build` quality checks, SHALL verify the final npm tarball inventory and installation/build in a clean Slidev fixture, and SHALL verify and document PDF and PPTX export behavior for readable chapter output and any navigation limitation. Release publication MUST be blocked when any applicable release quality gate fails.

#### Scenario: Quality gate
- **WHEN** a release candidate is evaluated
- **THEN** reproducible dependency installation, test, typecheck, build, package-content verification, and clean-fixture installation/build pass and PDF/PPTX results remain recorded

#### Scenario: Quality regression blocks release
- **WHEN** any required release quality check fails
- **THEN** the package is not published

### Requirement: Proportionate browser automation
The first implementation SHALL evaluate Playwright for navigation, refresh, presenter, and build smoke coverage and SHALL either add the smallest reliable suite needed for acceptance or document broad browser automation as a follow-up with equivalent first-release manual checks.

#### Scenario: Playwright is disproportionate for v1
- **WHEN** the implementation review shows full browser automation adds substantial complexity beyond the first scope
- **THEN** required manual integration evidence is recorded and a scoped follow-up is created rather than dropping the checks

### Requirement: Public documentation
The README SHALL document installation using the finalized npm name, full-name addon configuration, a minimal usage example, chapter and optional subchapter concepts/frontmatter semantics, fixed hierarchy and validation rules, optional layout separation, `useChapters()` imports and complete public types, `<ChapterTitle />` and `<ChapterToc />` usage, navigation, stable chapter/subchapter styling APIs, preface behavior, supported Node/Slidev/Vue versions, theme neutrality, static/export limitations, package and repository links, package/API versioning, MIT license information, and the maintainer process for local verification and trusted GitHub Release publication. Existing feature documentation unrelated to publication MUST NOT be rewritten.

#### Scenario: New consumer follows README
- **WHEN** a consumer installs the npm package and configures a valid deck solely from the README
- **THEN** the addon loads, declarations are extracted, and the public component/API can be used for chapters and optional subchapters without private Slidev imports or duplicate navigation data

#### Scenario: Maintainer follows release documentation
- **WHEN** a maintainer prepares the first or a subsequent release from the README
- **THEN** the documented process covers local pack verification, version/tag consistency, npm Trusted Publisher configuration, and the published-GitHub-Release trigger without a long-lived npm token

#### Scenario: Existing consumer reads migration guidance
- **WHEN** a consumer has a chapter-only presentation
- **THEN** the README states that publication preparation requires no frontmatter, component, styling, or API migration
