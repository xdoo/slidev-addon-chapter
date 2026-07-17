## MODIFIED Requirements

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
