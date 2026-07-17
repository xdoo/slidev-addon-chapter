## MODIFIED Requirements

### Requirement: Conventional addon delivery
The package SHALL follow current documented Slidev addon conventions, SHALL use a final npm name whose availability, scope, and public access have been explicitly confirmed, SHALL declare Slidev addon keywords and a tested Node/Slidev compatibility floor, SHALL use semantic versioning, and SHALL link to the repository at `https://github.com/xdoo/slidev-addon-chapter.git`. The existing `slidev-addon-chapters` manifest name SHALL remain a candidate until its discrepancy with the `slidev-addon-chapter` repository name and its npm availability are resolved.

#### Scenario: Package metadata review
- **WHEN** the package is prepared for release
- **THEN** its confirmed name, scope/access, keywords, version, repository links, and Node/Slidev compatibility declarations match documented and tested conventions

### Requirement: Build and export verification
The project SHALL provide automated `test`, `typecheck`, and `build` quality checks, SHALL verify the final npm tarball inventory and installation/build in a clean Slidev fixture, and SHALL verify and document PDF and PPTX export behavior for readable chapter output and any navigation limitation. Release publication MUST be blocked when any applicable release quality gate fails.

#### Scenario: Quality gate
- **WHEN** a release candidate is evaluated
- **THEN** reproducible dependency installation, test, typecheck, build, package-content verification, and clean-fixture installation/build pass and PDF/PPTX results remain recorded

#### Scenario: Quality regression blocks release
- **WHEN** any required release quality check fails
- **THEN** the package is not published

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
