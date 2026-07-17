# slidev-addon-chapters

Explicit, theme-independent chapters for [Slidev](https://sli.dev/). A chapter is declared once in slide frontmatter and can span any number of slides. The addon derives its public API and chapter overview from those declarations; it does not maintain a second agenda list.

## Single Source of Truth

Chapter declarations are the single source of truth for the presentation structure. Authors define each chapter exactly once. All chapter-aware components, such as <ChapterToc />, agendas, navigation, progress indicators, and future chapter features derive their content exclusively from these declarations. No duplicate chapter lists are maintained.

## Requirements

- Node.js 20.12 or newer
- Slidev 52.18.0 or newer
- Vue 3

The package starts at `0.1.0` and follows semantic versioning. Before `1.0.0`, breaking public API refinements may be released as minor versions.

## Installation

```sh
npm install slidev-addon-chapters
```

Use the full addon package name in deck headmatter:

```yaml
---
addons:
  - slidev-addon-chapters
---
```

The repository playground uses Slidev's documented local addon form:

```yaml
---
addons:
  - ./
---
```

Run `npm run dev` to open `playground/slides.md`. Keeping the deck in this subdirectory makes `./` resolve portably to the addon root with Slidev 52.18.0.

## Declaring chapters

Add `chapter.id` and `chapter.title` to the slide that starts a chapter:

```md
---
chapter:
  id: fundamentals
  title: Fundamentals
---

In practice, chapter metadata is typically added to the agenda or chapter-divider slide that introduces the chapter. The addon does not require a specific layout; it only interprets the chapter frontmatter.

# First slide in the chapter

---

# Another slide in the same chapter

---
chapter:
  id: architecture
  title: Architecture
---

# First architecture slide
```

The declaration slide belongs to the new chapter. Following slides remain in that chapter until another declaration. The final chapter ends on the final slide. Slides before the first declaration are valid and have no current chapter.

Both fields are required non-empty strings. IDs must be unique across the resolved presentation. Invalid declarations throw `ChapterValidationError` with deterministic diagnostics containing the slide number and field. IDs are deliberately not generated from titles: explicit IDs keep navigation stable when wording changes and avoid locale and collision ambiguity.

Imported slides work when Slidev exposes them in its resolved public `useNav().slides` sequence. Their effective presentation number—not their source-file-local index—is used.

### Semantics and layout are independent

Only `chapter` starts a chapter. `layout: chapter` alone has no semantic meaning to this addon. A theme can provide a chapter-divider layout and authors may combine it with metadata:

```yaml
---
layout: chapter
chapter:
  id: architecture
  title: Architecture
---
```

The addon provides no layouts, overrides no theme layout, and adds no global CSS.

## `<ChapterTitle />`

`<ChapterTitle />` displays the title of the currently active chapter without requiring a theme or presentation to access `useChapters()` directly. It is a presentation-agnostic building block for headers, footers, progress indicators, and custom layouts.

Components in an addon are discovered automatically by Slidev. Add the component wherever the current chapter title should appear:

```md
# Current chapter

<ChapterTitle />
```

When the active chapter title is `Architecture`, the component renders:

```html
<span class="chapter-title">
  Architecture
</span>
```

It renders nothing before the first chapter or whenever no chapter is active. The title updates automatically as navigation enters another chapter. The component always displays `chapter.title`; it adds no numbering, icons, wrapper elements, or extra semantics.

The component has no inline or opinionated default styles. Use its public CSS class to theme it:

```css
.chapter-title {
  font-weight: 600;
}
```

`.chapter-title` is part of the addon's stable public styling API and will remain compatible across minor releases.

## `<ChapterToc />`

Components in an addon are discovered automatically by Slidev:

```vue
<ChapterToc />

<ChapterToc
  :show-numbers="true"
  :highlight-current="true"
/>
```

| Prop | Type | Default | Effect |
| --- | --- | --- | --- |
| `showNumbers` | `boolean` | `false` | Shows one-based chapter numbers. |
| `highlightCurrent` | `boolean` | `false` | Marks the current entry with `aria-current="location"`, `data-current="true"`, and `.chapter-toc__item--current`. |

The component renders each chapter exactly once and never adds member-slide titles. Entries use Slidev's public `go()` operation to navigate to the first slide. Stable local hooks include `[data-chapter-toc]`, `[data-chapter-id]`, `.chapter-toc__item`, `.chapter-toc__link`, `.chapter-toc__number`, and `.chapter-toc__title`.

The small component-scoped baseline only resets the button and list enough to remain usable. Themes and decks retain control of appearance.

## Styling

All components are intentionally designed to be fully themeable using standard CSS.

The addon does not use Shadow DOM. Component styles are limited to sensible defaults and can be overridden by themes or presentations.

Every relevant DOM element exposes stable CSS class names and data attributes.

### CSS classes

```text
.chapter-title
.chapter-toc
.chapter-toc__list
.chapter-toc__item
.chapter-toc__item--current
.chapter-toc__link
.chapter-toc__number
.chapter-toc__title
```

### Data attributes

```text
data-chapter-toc
data-chapter-id="<chapter-id>"
data-current="true"
```

Themes should rely on these public selectors instead of DOM traversal.

When styling from another Vue component using `<style scoped>`, use `:deep(...)` as required by Vue.

### Example

```css
.chapter-toc {
    width: 100%;
}

.chapter-toc__list {
    display: grid;
    gap: 1rem;
}

.chapter-toc__link {
    display: flex;
    align-items: baseline;
    width: 100%;
}

.chapter-toc__item--current .chapter-toc__title {
    font-weight: 700;
}

.chapter-toc__item[data-chapter-id="architecture"] {
    /* Custom styling for a specific chapter */
}
```

> **Note**
>
> The documented CSS classes and data attributes are part of the addon's public styling API. Themes and presentations should use these selectors for customization rather than relying on the exact DOM hierarchy.
## `useChapters()`

Composable auto-imports are not a documented addon convention, so import it explicitly:

```ts
import { useChapters } from 'slidev-addon-chapters'
// or: import { useChapters } from 'slidev-addon-chapters/composables'

const { chapters, currentChapter } = useChapters()
```

Both properties are readonly Vue refs and update from Slidev's public navigation state:

```ts
interface Chapter {
  readonly id: string
  readonly title: string
  readonly index: number       // zero-based
  readonly startSlide: number  // one-based, inclusive
  readonly endSlide: number    // one-based, inclusive
  readonly slideNumbers: readonly number[]
}

interface ChapterState {
  readonly chapters: Readonly<Ref<readonly Chapter[]>>
  readonly currentChapter: Readonly<Ref<Chapter | undefined>>
}
```

Direct entry and browser refresh work because `currentChapter` is calculated from the current one-based slide number rather than navigation history.

The exported chapter model is the public integration point for chapter-aware functionality. Themes, decks, and third-party addons should consume the exported APIs instead of re-parsing slide frontmatter or implementing their own chapter extraction logic. This ensures a single, consistent interpretation of chapter semantics across the presentation.

Pure extraction utilities and public types are also exported for advanced consumers:

```ts
import {
  ChapterValidationError,
  extractChapters,
  findCurrentChapter,
} from 'slidev-addon-chapters'
```

## Compatibility and output

The addon is tested with Slidev's default and Seriph themes. It uses only the public `@slidev/client` entry point and has no runtime dependency beyond Slidev/Vue.

- Presentation and presenter modes use the same reactive current-slide calculation.
- Static `slidev build` output contains the chapter overview and navigation uses Slidev routing, including configured base paths.
- PDF and PPTX exports retain readable chapter labels and numbers. Exported navigation is not guaranteed because exporter/link preservation differs by format and Slidev version.
- No `layouts/`, `setup/`, `styles/`, Vite configuration, UnoCSS configuration, or Markdown transformer is installed by the addon.

## Troubleshooting

`Slide N: chapter.id must be a non-empty string.`  
Add an explicit stable ID to that slide.

`Slide N: chapter.title must be a non-empty string.`  
Add the human-readable chapter title.

`Slide N: duplicate chapter.id "…"; first declared on slide M.`  
Give one of the chapters a unique ID. Repeated identical declarations are still duplicates, not references.

If `<ChapterToc />` is unknown, confirm the full addon name is listed in the first slide's headmatter and that the installed Slidev version satisfies the supported range.

## Quality checks

```sh
npm test
npm run typecheck
npm run build
npm run export:pdf
npm run export:pptx
```

The [API spike](./docs/API-SPIKE.md) records the selected Slidev integration and official sources. The [verification record](./docs/VERIFICATION.md) contains the tested themes, browser scenarios, base-path build, and export findings.

## Possible follow-ups

- An opt-in deterministic derived-ID policy with explicit collision and compatibility rules
- `<ChapterIndicator />`
- `<ChapterProgress />`
- Previous/next chapter navigation
- Richer build-time diagnostics
- Broader Playwright, cross-browser, and export automation
