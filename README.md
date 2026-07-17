# slidev-addon-chapters

Explicit, theme-independent chapters and optional subchapters for [Slidev](https://sli.dev/). Each structural boundary is declared once in slide frontmatter and can span any number of slides. The addon derives its public API and overview from those declarations; it does not maintain a second agenda list.

## Single Source of Truth

Chapter and subchapter declarations are the single source of truth for the presentation structure. All chapter-aware components, agendas, navigation, progress indicators, and future features derive their content exclusively from these declarations. Themes and other addons should use `useChapters()` instead of parsing frontmatter or maintaining duplicate lists.

## Requirements

- Node.js 20.19 or newer
- Slidev 52.18.0 or newer
- Vue 3

The package starts at `0.1.0` and follows semantic versioning. Before `1.0.0`, breaking public API refinements may be released as minor versions.

Package: [slidev-addon-chapters on npm](https://www.npmjs.com/package/slidev-addon-chapters)

Repository: [xdoo/slidev-addon-chapter](https://github.com/xdoo/slidev-addon-chapter)

Issues: [GitHub Issues](https://github.com/xdoo/slidev-addon-chapter/issues)

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

## Declaring subchapters

Subchapters are an optional second and final hierarchy level beneath chapters. Declare one independently on the slide where it starts:

```yaml
---
subchapter:
  id: target-architecture
  title: Target Architecture
---
```

A subchapter belongs to the currently active chapter. Its declaration slide and following slides remain in it until the next subchapter or chapter declaration; a new chapter always ends the previous subchapter. A chapter may contain no subchapters. When `chapter` and `subchapter` appear on the same slide, the new chapter starts first and owns that subchapter. Nested subchapters and arbitrary hierarchy depth are not supported.

Both subchapter fields must be non-empty strings. IDs are unique within their chapter, so the same subchapter ID may be reused in a different chapter. A subchapter before the first chapter is rejected as orphaned. As with chapters, layouts and headings never create subchapters implicitly.

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
  :show-subchapters="true"
  :highlight-current="true"
/>
```

| Prop | Type | Default | Effect |
| --- | --- | --- | --- |
| `showNumbers` | `boolean` | `false` | Shows one-based chapter numbers. |
| `showSubchapters` | `boolean` | `false` | Renders nested subchapters; with numbers enabled they use `1.1`, `1.2`, and so on. |
| `highlightCurrent` | `boolean` | `false` | Marks the current entry with `aria-current="location"`, `data-current="true"`, and `.chapter-toc__item--current`. |

The default remains chapter-only even when subchapters are declared. When enabled, each subchapter is nested beneath its owning chapter; current chapter and subchapter entries are both highlighted. Chapter and subchapter buttons use Slidev's public `go()` operation to navigate to their first slide.

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
.chapter-toc__sublist
.chapter-toc__subitem
.chapter-toc__subitem--current
.chapter-toc__sublink
.chapter-toc__subnumber
.chapter-toc__subtitle
```

### Data attributes

```text
data-chapter-toc
data-chapter-id="<chapter-id>"
data-subchapter-id="<subchapter-id>"
data-parent-chapter-id="<chapter-id>"
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

const { chapters, currentChapter, currentSubchapter } = useChapters()
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
  readonly subchapters: readonly Subchapter[]
}

interface Subchapter {
  readonly id: string
  readonly title: string
  readonly index: number       // zero-based within its chapter
  readonly startSlide: number  // one-based, inclusive
  readonly endSlide: number    // one-based, inclusive
  readonly slideNumbers: readonly number[]
}

interface ChapterState {
  readonly chapters: Readonly<Ref<readonly Chapter[]>>
  readonly currentChapter: Readonly<Ref<Chapter | undefined>>
  readonly currentSubchapter: Readonly<Ref<Subchapter | undefined>>
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
  findCurrentSubchapter,
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

`Slide N: subchapter.id must be a non-empty string.` / `subchapter.title must be a non-empty string.`

Add the missing stable ID or human-readable title.

`Slide N: subchapter "…" has no active chapter; declare a chapter first.`

Move the declaration after a chapter start or declare its owning chapter on the same slide.

`Slide N: duplicate subchapter.id "…" in chapter "…"; first declared on slide M.`

Use a unique ID within that chapter. IDs may repeat in different chapters.

## Migration from chapter-only decks

Existing presentations require no changes. Chapter frontmatter, `ChapterTitle`, `ChapterToc` defaults, chapter navigation, and `currentChapter` retain their behavior. Adopt subchapters incrementally by adding declarations, enabling `showSubchapters` where desired, and reading the new runtime fields.

If `<ChapterToc />` is unknown, confirm the full addon name is listed in the first slide's headmatter and that the installed Slidev version satisfies the supported range.

## Quality checks

```sh
npm test
npm run typecheck
npm run build
npm run verify:fixture
npm pack --dry-run
npm run export:pdf
npm run export:pptx
```

The release workflow runs the tests, typecheck, Slidev build, clean packed-package fixture, and `npm pack --dry-run` as separate gates. The fixture installs the generated tarball into an independent Slidev project and verifies documented imports, automatic component discovery, typechecking, and production build.

## Maintainer release process

The package is public and unscoped. Releases use npm Trusted Publishing from a published GitHub Release; token-based manual publishing is not supported.

Before the first release:

1. Confirm that `slidev-addon-chapters` is still available on npm and that unscoped public publication is intended.
2. Confirm the semantic version in `package.json` and `package-lock.json` (`0.1.1` for this release).
3. Run `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm run verify:fixture`, and `npm pack --dry-run` locally.
4. In npm package settings, configure a GitHub Actions trusted publisher with organization/user `xdoo`, repository `slidev-addon-chapter`, and workflow filename `publish.yml`.
5. Commit the version and release-ready files. Do not publish manually.

For every release, create a GitHub Release whose tag is exactly `v<package.json version>` (for this release, `v0.1.1`) and whose target is the intended release commit, then publish the GitHub Release. `.github/workflows/publish.yml` checks out that tag, validates the version, repeats every quality gate, and publishes to the public npm registry using OpenID Connect and npm provenance. Pull requests, ordinary pushes, tag creation alone, and draft releases do not publish.

## License

This package is distributed under the [MIT License](./LICENSE).

The [API spike](./docs/API-SPIKE.md) records the selected Slidev integration and official sources. The [verification record](./docs/VERIFICATION.md) contains the tested themes, browser scenarios, base-path build, and export findings.

## Possible follow-ups

- An opt-in deterministic derived-ID policy with explicit collision and compatibility rules
- `<ChapterIndicator />`
- `<ChapterProgress />`
- Previous/next chapter navigation
- Richer build-time diagnostics
- Broader Playwright, cross-browser, and export automation
