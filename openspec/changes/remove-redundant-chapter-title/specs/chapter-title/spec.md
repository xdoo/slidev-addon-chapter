## REMOVED Requirements

### Requirement: Current chapter title rendering
**Reason**: `ChapterTitle` duplicates the existing `CurrentChapterTitle` behavior and makes the public component surface ambiguous.

**Migration**: Replace `<ChapterTitle />` with `<CurrentChapterTitle />`; it renders the same reactive `currentChapter.title` value.

### Requirement: No-chapter rendering
**Reason**: The redundant `ChapterTitle` component is removed, so it no longer has a rendering contract.

**Migration**: Use `CurrentChapterTitle`, which renders nothing when no active chapter exists.

### Requirement: Minimal and accessible markup
**Reason**: The `.chapter-title` markup contract belongs only to the removed component.

**Migration**: Use the retained `<span class="current-chapter-title">…</span>` contract from `CurrentChapterTitle`.

### Requirement: Public styling contract
**Reason**: Removing `ChapterTitle` also removes its redundant `.chapter-title` public selector.

**Migration**: Replace `.chapter-title` theme rules with `.current-chapter-title`.

### Requirement: Component documentation
**Reason**: Documentation must no longer present a removed component as part of the public API.

**Migration**: Follow the `CurrentChapterTitle` documentation and use `<CurrentChapterTitle />` with `.current-chapter-title`.
