## MODIFIED Requirements

### Requirement: Pure extraction unit tests
Chapter extraction and current-chapter lookup SHALL be testable as pure TypeScript independently of a running Slidev application and without resolving Slidev-generated virtual modules.

#### Scenario: Unit suite coverage
- **WHEN** the unit suite runs in the repository's standalone Vitest environment
- **THEN** it covers multiple slides per chapter, consecutive chapters, final range, preface slides, duplicate IDs, missing title, missing ID, one-slide chapters, and current-chapter lookup
- **THEN** collection and execution do not require `#slidev/configs` or another Slidev-generated virtual module
