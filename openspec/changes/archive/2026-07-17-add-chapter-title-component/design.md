## Context

The addon already exposes chapter state through `useChapters()` and follows Slidev's addon convention of auto-discovering Vue components from `components/`. Consumers can derive the active title themselves, but that couples common presentation markup to the runtime API. The new component must remain reactive, visually neutral, and compatible with future additions to the chapter model while continuing to render `chapter.title` initially.

## Goals / Non-Goals

**Goals:**

- Provide an auto-discovered `ChapterTitle.vue` component backed by `useChapters()`.
- Keep the rendered contract to one conditional `span.chapter-title` containing the current title.
- Preserve Vue reactivity when navigation or chapter declarations change.
- Publish a stable, theme-overridable CSS hook and document its contract.
- Cover the component contract with focused Vue tests.
- Improve the documentation (README.md), that the user can easily use the component. Provide a sample as well.

**Non-Goals:**

- Adding props for numbering, icons, metadata selection, fallback text, or custom semantics.
- Changing chapter extraction, current-chapter selection, or the `useChapters()` API.
- Providing an opinionated visual design or a new layout.

## Decisions

### Read chapter state through the public composable

`ChapterTitle.vue` will call `useChapters()` and bind directly to its readonly `currentChapter` ref. This keeps the component a thin consumer of the canonical state and ensures updates follow the existing reactive pipeline. Reimplementing current-page lookup inside the component was rejected because it would duplicate chapter semantics and risk divergence.

### Conditionally render one span

The template will use `v-if="currentChapter"` on a single `<span class="chapter-title">` and interpolate `currentChapter.title`. Vue will emit no element when the computed chapter is absent. A persistent empty wrapper was rejected because it violates the render-nothing contract and gives consumers misleading layout content.

The component deliberately reads `title` explicitly rather than forwarding arbitrary chapter metadata. Future metadata such as `shortTitle` or `icon` can later be exposed through optional props or additional components without altering the initial default or DOM contract.

### Keep styling local and neutral

The component will include no inline styles. Any baseline component CSS will be limited to neutral inheritance behavior; `.chapter-title` is the documented stable selector and themes remain responsible for presentation. Extra classes, data attributes, and structural wrappers are excluded from the initial public API.

### Test through mocked Slidev navigation state

Tests will mount the real component while mocking `@slidev/client` navigation refs, matching the existing `ChapterToc` test strategy. Fixtures will cover a current chapter, a page before the first declaration, and navigation between chapters, with a Vue tick awaited for reactive updates.

## Risks / Trade-offs

- [A single `span` provides no built-in layout semantics] → This is intentional; consuming headers, footers, and layouts own their surrounding semantics.
- [Documenting `.chapter-title` constrains future DOM refactors] → Keep the component's DOM deliberately minimal and treat the selector as a compatibility contract.
- [Future metadata may motivate different display choices] → Preserve `chapter.title` as the default and add future behavior through backward-compatible opt-in API.
- [Scoped baseline CSS can affect selector specificity] → Keep defaults minimal enough that ordinary theme selectors can override them without special mechanisms.
