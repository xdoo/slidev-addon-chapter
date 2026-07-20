## ADDED Requirements

### Requirement: Automated GitHub Pages feature showcase
The repository SHALL deploy the Slidev playground as a static GitHub Pages feature showcase on pushes to `main`, independently of npm publication. The deployment SHALL use the repository-owned Pages build script with the configured `/slidev-addon-chapter/` base path, upload the generated `playground/dist` artifact, and use the official GitHub Pages deployment actions with the required Pages and OIDC permissions.

#### Scenario: Main branch deployment
- **WHEN** a commit is pushed to `main`
- **THEN** the Pages workflow installs locked dependencies and runs the repository-owned Pages build script
- **THEN** the generated site is uploaded from `playground/dist` and deployed through the official Pages actions

#### Scenario: Repository base path
- **WHEN** a visitor opens the deployed showcase at `/slidev-addon-chapter/`
- **THEN** the static document and its assets resolve under `/slidev-addon-chapter/` without root-path asset failures

#### Scenario: Publication workflow separation
- **WHEN** an npm release or tag is created without a push to `main`
- **THEN** the feature-page workflow does not deploy as a side effect

### Requirement: Feature showcase coverage
The deployed playground SHALL provide an introductory preface and demonstrate the addon's chapter, subchapter, imported-slide, title, table-of-contents, styling, and navigation behavior documented by the repository.

#### Scenario: Visitor explores the showcase
- **WHEN** a visitor navigates through the deployed playground
- **THEN** the preface, chapter and subchapter examples, imported slides, `ChapterTitle`, `ChapterToc`, and navigation are available for inspection

#### Scenario: README entry point
- **WHEN** a visitor follows the Live Demo link in the README
- **THEN** it points to the deployed GitHub Pages feature showcase URL
