## 1. Slidev API Spike

- [ ] 1.1 Pin a currently supported Slidev candidate version and record official source links for addon component discovery, custom frontmatter transport, imported slides, public runtime exports, current-page state, navigation, presenter/build/print contexts, and package naming.
- [ ] 1.2 Build a disposable proof that enumerates all resolved slides and nested custom `chapter` frontmatter through documented public APIs, including a declaration in an imported slide file; record API shapes and behavior without retaining production code.
- [ ] 1.3 Verify `useNav()` or the documented alternative for one-based current slide state on direct load, refresh, normal presentation, presenter, static build, and print/export routes.
- [ ] 1.4 Verify the documented base-path-safe navigation primitive for linking to a chapter's first slide.
- [ ] 1.5 Verify whether per-slide frontmatter types support public module augmentation and whether addon composables are auto-imported or must be exposed through package exports.
- [ ] 1.6 Decide and document the public integration approach, supported Slidev floor, second test theme, and whether any `setup/`, transformer, Vite, or Markdown hook is genuinely required; stop implementation if only private Slidev internals can satisfy the contract.

## 2. Addon Package Foundation

- [ ] 2.1 Create the minimal Vue 3/TypeScript addon package structure and package exports selected by the spike, using `slidev-addon-chapters` as the reviewed working package name.
- [ ] 2.2 Add semantic package metadata, `slidev` and `slidev-addon` keywords, the tested Slidev engine constraint, and only necessary peer/development dependencies.
- [ ] 2.3 Configure verifiable `test`, `typecheck`, and `build` scripts without adding layouts or global style/configuration files.

## 3. Chapter Data Model and Validation

- [ ] 3.1 Define addon-owned readonly `Chapter`, `ChapterState`, normalized slide-input, chapter-frontmatter, and diagnostic types based on the spike results.
- [ ] 3.2 Implement validation for non-empty explicit IDs and titles with deterministic slide-aware messages.
- [ ] 3.3 Implement duplicate-ID detection that reports all relevant declarations and never silently merges repeated definitions.
- [ ] 3.4 Keep title-derived IDs out of v1 and document the evaluated slug-generation alternative and compatibility rationale.

## 4. Chapter Extraction from Slide Metadata

- [ ] 4.1 Implement the pure TypeScript extractor that starts chapters only from `chapter`, includes the declaration slide, and closes ranges at the next declaration or deck end.
- [ ] 4.2 Produce ordered zero-based indices, one-based inclusive ranges, and ordered slide-number lists, including one-slide chapters.
- [ ] 4.3 Preserve pre-chapter slides as unassigned and ignore `layout: chapter` when chapter metadata is absent.
- [ ] 4.4 Implement the narrow documented Slidev adapter for resolved slide metadata and verify imported files use the same resolved sequence.

## 5. Public `useChapters()` API

- [ ] 5.1 Implement and export `useChapters()` or the spike-approved equivalent as readonly reactive chapter state without exposing Slidev internals, and make this declaration-derived state the single source consumed by all public chapter-aware APIs and components.
- [ ] 5.2 Implement pure current-chapter lookup from a one-based slide number and inclusive chapter ranges.
- [ ] 5.3 Connect current-chapter lookup to documented reactive Slidev navigation state and verify direct load/refresh does not depend on navigation history.
- [ ] 5.4 Expose validation failures through the documented error/diagnostic contract chosen by the spike.

## 6. `<ChapterToc />`

- [ ] 6.1 Implement `components/ChapterToc.vue` using only the public declaration-derived chapter API so each chapter appears once, slide headings never become entries, and no separately maintained chapter or agenda list is accepted or required.
- [ ] 6.2 Implement `showNumbers` with documented defaults and one-based display numbering.
- [ ] 6.3 Implement `highlightCurrent` with a single accessible `aria-current` marker and stable component-local class/data hooks without global CSS.
- [ ] 6.4 Implement accessible links/navigation to each chapter's first slide using the documented base-path-safe Slidev primitive.
- [ ] 6.5 Verify automatic component discovery in dev, presenter, static build, and export rendering.

## 7. Unit Tests

- [ ] 7.1 Test multiple slides per chapter, multiple/consecutive chapters, final chapter through deck end, and one-slide chapters.
- [ ] 7.2 Test pre-chapter slides and confirm `layout: chapter` alone does not create a chapter while `chapter` without that layout does.
- [ ] 7.3 Test missing ID, missing title, duplicate IDs including identical repeated declarations, and deterministic diagnostic locations.
- [ ] 7.4 Test ordered chapter fields and current-chapter lookup before, within, and across chapter boundaries, and verify that changing a chapter declaration is reflected automatically in the public API and `<ChapterToc />` without updating a second data source.
- [ ] 7.5 Test normalized metadata representing imported slides after the integration shape is fixed.

## 8. Playground and Integration Tests

- [ ] 8.1 Create a local `slides.md` using the officially documented `addons: [./]` with preface slides, ordinary chapter starts, optional `layout: chapter`, varied chapter lengths, and titled member slides.
- [ ] 8.2 Verify the Slidev dev server starts, `<ChapterToc />` is auto-recognized, only chapters render, and chapter-start navigation works.
- [ ] 8.3 Verify direct refresh on a later chapter and reactive highlighting in normal presentation and presenter modes.
- [ ] 8.4 Run the playground with the default theme and the spike-selected maintained second theme and record theme-neutral results.
- [ ] 8.5 Evaluate a narrow Playwright smoke suite for navigation, refresh, and presenter coverage; implement it where it materially improves repeatability or record equivalent manual evidence plus a scoped follow-up.

## 9. Build and Export Verification

- [ ] 9.1 Run the production static Slidev build and verify chapter data, component rendering, route base paths, and direct chapter URLs in built output.
- [ ] 9.2 Export PDF and verify readable ordered chapter labels/numbers and document whether links remain interactive.
- [ ] 9.3 Export PPTX and verify readable ordered chapter labels/numbers and document exporter-specific navigation or rendering limitations.
- [ ] 9.4 Run the complete `test`, `typecheck`, and `build` quality gate on the supported toolchain and resolve all failures.

## 10. README and Usage Documentation

- [ ] 10.1 Document installation, full addon naming/configuration, supported Slidev range, local development, and semantic-versioning policy.
- [ ] 10.2 Document `chapter` frontmatter, explicit ID/title rules, unique-ID diagnostics, range semantics, pre-chapter behavior, imported-slide support, and the independence of optional `layout: chapter`.
- [ ] 10.3 Document the final `useChapters()` import, types, reactivity/error behavior, and `<ChapterToc />` props, accessibility, navigation, and styling hooks.
- [ ] 10.4 Document theme neutrality, absent global/layout overrides, static/presenter compatibility, PDF/PPTX findings, known limitations, and troubleshooting messages.
- [ ] 10.5 Record follow-up candidates for derived-ID policy, `<ChapterIndicator />`, `<ChapterProgress />`, previous/next chapter navigation, richer diagnostics, and expanded browser/export automation.
