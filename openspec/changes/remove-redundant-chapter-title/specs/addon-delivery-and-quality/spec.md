## MODIFIED Requirements

### Requirement: Public documentation
The README SHALL document installation using the finalized npm name, full-name addon configuration, a minimal usage example, chapter and optional subchapter concepts/frontmatter semantics, fixed hierarchy and validation rules, optional layout separation, `useChapters()` imports and complete public types, `<CurrentChapterTitle />` and `<ChapterToc />` usage, navigation, stable chapter/subchapter styling APIs, preface behavior, supported Node/Slidev/Vue versions, theme neutrality, static/export limitations, package and repository links, package/API versioning, MIT license information, migration from the removed `<ChapterTitle />` and `.chapter-title` APIs, and the maintainer process for local verification and trusted GitHub Release publication. Existing feature documentation unrelated to publication MUST NOT be rewritten.

#### Scenario: New consumer follows README
- **WHEN** a consumer installs the npm package and configures a valid deck solely from the README
- **THEN** the addon loads, declarations are extracted, and the public component/API can be used for chapters and optional subchapters without private Slidev imports or duplicate navigation data

#### Scenario: Maintainer follows release documentation
- **WHEN** a maintainer prepares the first or a subsequent release from the README
- **THEN** the documented process covers local pack verification, version/tag consistency, npm Trusted Publisher configuration, and the published-GitHub-Release trigger without a long-lived npm token

#### Scenario: Existing consumer reads migration guidance
- **WHEN** a consumer uses `<ChapterTitle />` or styles `.chapter-title`
- **THEN** the README directs them to replace those APIs with `<CurrentChapterTitle />` and `.current-chapter-title`
