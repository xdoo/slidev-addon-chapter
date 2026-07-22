## ADDED Requirements

### Requirement: Main-branch changes produce a controlled release PR
The repository SHALL run Release Please for pushes to `main` and SHALL create or update a reviewable release PR instead of directly changing versions or publishing packages. The release PR SHALL target `main`, use the root npm package `slidev-addon-chapters`, and include the generated changelog and all package version files required by the `node` release type.

#### Scenario: Release-worthy Conventional Commit reaches main
- **WHEN** a `fix:`, `perf:`, `feat:`, or breaking Conventional Commit is merged into `main`
- **THEN** the Release Please workflow creates or updates a release PR with the corresponding semantic version proposal

#### Scenario: No release-worthy commit reaches main
- **WHEN** a push to `main` contains no release-worthy commit after the last release PR
- **THEN** Release Please does not create a duplicate release PR or change package files

#### Scenario: Release PR is reviewed
- **WHEN** a maintainer inspects the generated release PR
- **THEN** it contains the proposed version, `package.json`/`package-lock.json` changes where required, `CHANGELOG.md` entries, and generated release notes before merge

### Requirement: Semantic versioning follows documented commit types
Release management SHALL use Conventional Commits for new changes. `fix` and `perf` SHALL request patch releases, `feat` SHALL request minor releases while the current major version is zero, and `BREAKING CHANGE` or a `!` marker SHALL request a major release. Existing non-conventional history SHALL NOT be rewritten.

#### Scenario: Patch release
- **WHEN** the release PR contains `fix:` or `perf:` changes only
- **THEN** its version proposal increments the patch component

#### Scenario: Minor release before 1.0.0
- **WHEN** the release PR contains a `feat:` change and no breaking change
- **THEN** its version proposal increments the minor component

#### Scenario: Breaking release
- **WHEN** a commit contains `BREAKING CHANGE:` or a Conventional Commit `!` marker
- **THEN** its version proposal increments the major component according to semantic versioning

### Requirement: Bootstrap produces the unreleased 0.1.1 candidate
Because npm currently reports `0.1.0` as the latest published version while the repository manifest is `0.1.1`, the initial Release Please manifest SHALL use `0.1.0` as its last-released baseline and SHALL be bounded so the first generated Release PR proposes exactly `0.1.1`. Implementation SHALL create no tag, GitHub Release, or npm publication while bootstrapping.

#### Scenario: First Release PR is generated
- **WHEN** Release Please runs after the automation configuration is merged to `main`
- **THEN** the controlled Release PR proposes version `0.1.1` and tag `v0.1.1`

#### Scenario: Bootstrap would propose another version
- **WHEN** Release Please would propose a version other than `0.1.1` for the first release
- **THEN** the bootstrap is corrected before merge and no tag or GitHub Release is created

### Requirement: Merging the release PR creates the release identity
After a Release Please release PR is merged, the release automation SHALL create exactly one tag `v<version>` and one published GitHub Release for the same commit and version. The release automation credential SHALL emit an event that can trigger the separate `publish.yml` workflow.

#### Scenario: Release PR merge succeeds
- **WHEN** a valid Release Please PR is merged into `main`
- **THEN** Release Please creates tag `v<version>` and a GitHub Release pointing at the release PR merge commit

#### Scenario: Existing tag or Release conflicts
- **WHEN** the requested `v<version>` tag or GitHub Release already exists
- **THEN** the release automation fails visibly and does not create a second identity or advance the package version silently

#### Scenario: Release event reaches publication workflow
- **WHEN** Release Please publishes the GitHub Release
- **THEN** the `release.published` trigger starts `.github/workflows/publish.yml` for the same tag
