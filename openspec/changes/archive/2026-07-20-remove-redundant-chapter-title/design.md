## Context

`components/ChapterTitle.vue` and `components/CurrentChapterTitle.vue` both consume `useChapters().currentChapter`, render nothing without an active chapter, and otherwise render only `currentChapter.title` in a `span`. Their sole runtime distinction is the CSS class (`.chapter-title` versus `.current-chapter-title`). The duplication is visible across tests, README documentation, package fixtures, and a playground that currently demonstrates both side by side.

The repository already groups `CurrentChapterTitle` with `CurrentChapterNumber` and `ChapterCount`, exports it from `src/index.ts`, and gives it focused reactive tests. It is therefore the coherent component to retain.

## Goals / Non-Goals

**Goals:**

- Expose one unambiguous component, `CurrentChapterTitle`, for the active chapter title.
- Remove the redundant component implementation and its `.chapter-title` styling contract.
- Make the playground and documentation teach only the retained API.
- Keep package and content verification aligned with the reduced public surface.
- Give affected users explicit migration guidance for the breaking rename and class change.

**Non-Goals:**

- Change how chapter titles are derived or react to navigation.
- Change the markup, CSS class, export, or behavior of `CurrentChapterTitle`.
- Add a compatibility alias or deprecation period for `ChapterTitle`.
- Change `CurrentChapterNumber`, `ChapterCount`, `ChapterToc`, or the runtime composable.

## Decisions

### Remove `ChapterTitle` instead of aliasing it

Delete `components/ChapterTitle.vue` so Slidev no longer auto-discovers `<ChapterTitle />`. A compatibility wrapper or alias would preserve the same ambiguity and duplicate public API the change is intended to eliminate. Because removal is breaking, the README and release-facing documentation will identify `<CurrentChapterTitle />` as the replacement.

### Retain `CurrentChapterTitle` unchanged

Keep its existing `useChapters()` integration, conditional rendering, `span` markup, `.current-chapter-title` class, named entry-point export, and tests. This name aligns with the existing `CurrentChapterNumber` component and explicitly communicates that the value follows navigation state.

### Replace playground examples rather than merely deleting comparisons

Every rendered use, code sample, explanatory label, and imported playground page that mentions `ChapterTitle` will use `CurrentChapterTitle`. The duplicate comparison slide or block will be collapsed to one example, so the playground continues to cover title rendering without suggesting two equivalent choices.

### Remove obsolete verification and tests

Delete the dedicated `ChapterTitle` unit test and update playground-content expectations and the packed-package fixture to assert `CurrentChapterTitle`. Existing `CurrentChapterTitle` tests remain the behavioral proof for active, absent, and reactively changing chapter state.

## Risks / Trade-offs

- [Existing decks using `<ChapterTitle />` stop rendering that component after upgrade] → Mark the change as breaking and document the direct replacement `<CurrentChapterTitle />`.
- [Themes targeting `.chapter-title` lose styling] → Document the selector migration to `.current-chapter-title` alongside the component migration.
- [Stale references survive in examples or verification fixtures] → Search the non-archived repository for both identifiers and run tests, typecheck, build, playground-content checks, and packed-package verification.
- [Removing the old test reduces apparent coverage] → Retain and run the equivalent `CurrentChapterTitle` test suite, which exercises the same state behavior and the surviving markup contract.

## Migration Plan

1. Replace consumer markup `<ChapterTitle />` with `<CurrentChapterTitle />`.
2. Replace theme selectors `.chapter-title` with `.current-chapter-title`.
3. Remove the obsolete component and test, then update repository documentation, playground content, and verification fixtures.
4. Run the full project quality checks and verify no active source or documentation references to the old API remain.

Rollback consists of restoring `ChapterTitle.vue`, its test and documentation, and the previous playground and fixture references.

## Open Questions

None.
