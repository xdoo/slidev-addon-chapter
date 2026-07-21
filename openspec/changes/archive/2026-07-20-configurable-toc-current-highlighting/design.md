## Context

`ChapterToc.vue` currently passes two independent current-state signals to each chapter row: whether the chapter is current and the current subchapter ID. `Chapter.vue` uses those signals to mark the parent chapter and matching subchapter simultaneously. The existing `highlightCurrent` boolean is already public and documented, so changing its type or default would unnecessarily break existing decks.

## Goals / Non-Goals

**Goals:**

- Keep `highlightCurrent` as the opt-in boolean.
- Add a typed mode that chooses hierarchical (`chapter` plus active `subchapter`) or single-entry (`deepest visible current entry`) highlighting.
- Keep `aria-current`, `data-current`, and modifier classes consistent with whichever entry is selected.
- Make the default preserve today's behavior.

**Non-Goals:**

- Change chapter/subchapter navigation targets or ordering.
- Add separate styling classes or alter the existing accessibility markup.
- Change `showSubchapters` or the runtime chapter-state API.

## Decisions

### Add `highlightCurrentMode` instead of changing `highlightCurrent`

`highlightCurrent` remains a boolean. The new `highlightCurrentMode` accepts `hierarchy` (default) and `single`. `single` directly communicates that at most one TOC entry is marked, while `hierarchy` communicates parent-plus-child context. This preserves existing templates and makes the two visual policies explicit in both Vue and kebab-case template syntax.

### Derive mutually exclusive current signals at the TOC boundary

When mode is `hierarchy`, pass the current chapter ID and active subchapter ID exactly as today. When mode is `single`, mark the active subchapter only when it is actually rendered; if subchapters are hidden or no subchapter is active, mark the owning chapter. Chapter current state and subchapter current state must be independent inputs because `Chapter.vue` currently gates subchapter highlighting through the chapter's own current flag. This ensures exactly one visible entry receives current semantics in single-entry mode.

### Keep the existing default and no-current behavior

With `highlightCurrent` omitted or false, no current markers are emitted. With `highlightCurrent=true` and no active subchapter, both modes mark the chapter. With an active rendered subchapter, `hierarchy` marks both entries while `single` marks only the subchapter. When subchapters are not rendered, both modes mark the visible chapter so highlighting never disappears solely because `showSubchapters` is false.

### Document mode names and migration

README and playground examples will show the existing default and the new `highlight-current-mode="single"` form. No migration is needed for existing users; users wanting one highlighted item opt into `single`.

## Risks / Trade-offs

- [A mode prop typo reaches runtime from untyped Markdown] → Use a TypeScript string union, document the accepted values, and implement any value other than `single` as the backwards-compatible `hierarchy` behavior.
- [Single-entry mode hides the parent chapter's current context] → Keep `hierarchy` as the default and expose both modes clearly.
- [Accessibility state could mark two entries accidentally] → Add tests asserting exactly one `aria-current`, `data-current`, and current modifier in `single` mode.

## Migration Plan

No migration is required for existing decks. To use single-entry highlighting, add `highlight-current-mode="single"` alongside `:highlight-current="true"`. Remove the mode prop to return to the current hierarchy behavior.

## Open Questions

None.
