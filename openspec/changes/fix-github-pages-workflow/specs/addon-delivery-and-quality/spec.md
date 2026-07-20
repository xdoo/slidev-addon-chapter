## MODIFIED Requirements

### Requirement: Build and export verification
The project SHALL provide automated `test`, `typecheck`, and `build` quality checks, SHALL verify the final npm inventory with `npm pack --dry-run`, and SHALL retain installation, import, component-discovery, typecheck, and build validation in a clean packed-package fixture when that fixture provides evidence beyond npm's standard packaging checks. It SHALL verify and document PDF and PPTX export behavior for readable chapter output and any navigation limitation. Release publication MUST be blocked when any applicable package quality gate fails, but package tests MUST NOT include static workflow inspection or other release-only checks that duplicate npm or GitHub Actions behavior. Automated static-site deployment SHALL build through a repository package script that resolves the locked project-local CLI, SHALL preserve the configured deployment base path, and SHALL use maintained GitHub action majors and a Node.js runtime that do not rely on GitHub's deprecated action-runtime compatibility fallback.

#### Scenario: Quality gate
- **WHEN** a release candidate is evaluated
- **THEN** reproducible dependency installation, package tests, typecheck, build, npm dry-run package inspection, and meaningful clean-fixture installation/build pass while PDF/PPTX results remain recorded

#### Scenario: Quality regression blocks release
- **WHEN** any required package quality check fails
- **THEN** the package is not published

#### Scenario: Release-only duplicate is encountered
- **WHEN** a test only inspects workflow text, repeats tag/version comparison already performed inline, or duplicates npm's inventory rules
- **THEN** it is excluded from the package quality suite and removed with its dedicated helper

#### Scenario: Static deployment build runs on GitHub Actions
- **WHEN** the GitHub Pages workflow installs the locked dependencies and starts its production build
- **THEN** it invokes the repository-owned Pages build script and resolves the locally installed Slidev CLI without requiring a global executable
- **THEN** the generated site uses `/slidev-addon-chapter/` as its base path
- **THEN** checkout, Node setup, and the build job run without the Node 20 action-runtime deprecation warning
