---
theme: default
addons:
  - ./
title: Slidev Chapters Addon Playground
---

<div data-testid="playground-introduction">

# Give long presentations a clear structure

`slidev-addon-chapters` turns explicit slide metadata into chapter-aware titles, navigation, progress, and data — without requiring a special theme.

<div class="intro-grid">
  <div><strong>1. Declare</strong><span>Add a chapter or subchapter to slide frontmatter.</span></div>
  <div><strong>2. Display</strong><span>Drop in components such as <code>&lt;ChapterTitle /&gt;</code>.</span></div>
  <div><strong>3. Style</strong><span>Use stable CSS classes to match your presentation.</span></div>
</div>

<ChapterToc :show-numbers="true" :show-subchapters="true" />

</div>

---

# The mental model

Every presentation still consists of ordinary **slides**. You mark only the slides where a new section begins.

<div class="model-flow" aria-label="Chapter and subchapter hierarchy">
  <div class="model-flow__chapter">Chapter: Foundations</div>
  <div class="model-flow__subchapter">Subchapter: Declarations</div>
  <div class="model-flow__slide">Slide</div>
  <div class="model-flow__slide">Slide</div>
  <div class="model-flow__subchapter">Subchapter: Components</div>
  <div class="model-flow__slide">Slide</div>
</div>

- A `chapter` stays active until the next chapter declaration.
- A `subchapter` belongs to the active chapter and is optional.
- Layouts and headings remain yours; metadata supplies the structure.

---

<div data-testid="playground-setup">

# Start in two small steps

**1. Enable the addon in the headmatter of `slides.md`:**

```yaml
---
addons:
  - slidev-addon-chapters
---
```

**2. Add metadata to the slide that begins your first chapter:**

```yaml
---
chapter:
  id: foundations
  title: Foundations
---
```

That declaration slide and every following slide now belong to **Foundations** until another chapter begins.

</div>

---
layout: two-cols
chapter:
  id: foundations
  title: Foundations
data-testid: chapter-declaration-example
---

# Declare a chapter

## Result

<div class="result-panel">
  <span class="eyebrow">The active chapter is</span>
  <ChapterTitle />
</div>

The chapter begins on this slide. Its `id` is a stable technical key; its `title` is what readers see.

::right::

## Markdown

```md
---
layout: two-cols
chapter:
  id: foundations
  title: Foundations
---

# Declare a chapter

<ChapterTitle />
```

Only the `chapter` block creates chapter semantics. You can combine it with any theme layout.

---
layout: two-cols
subchapter:
  id: declarations
  title: Declarations
data-testid: subchapter-declaration-example
---

# Add an optional subchapter

## Result

<ChapterToc
  :show-numbers="true"
  :show-subchapters="true"
  :highlight-current="true"
/>

Both **Foundations** and **Declarations** are marked as current because this slide starts that subchapter.

::right::

## Markdown

```md
---
layout: two-cols
subchapter:
  id: declarations
  title: Declarations
---

<ChapterToc
  :show-numbers="true"
  :show-subchapters="true"
  :highlight-current="true"
/>
```

Subchapter IDs need to be unique only inside their chapter.

---
layout: two-cols
data-testid: chapter-title-example
---

# Show the active chapter title

## Result

<div class="result-stack">
  <div class="result-panel">
    <span class="eyebrow">Compact name</span>
    <ChapterTitle />
  </div>
  <div class="result-panel">
    <span class="eyebrow">Explicit name</span>
    <CurrentChapterTitle />
  </div>
</div>

Both components react to navigation. The explicit variant has its own CSS class for independent styling.

::right::

## Markdown

```md
## Current topic

<ChapterTitle />

<!-- Same value, more explicit name -->
<CurrentChapterTitle />
```

Use these small building blocks in headings, footers, or your own layouts.

---
layout: two-cols
subchapter:
  id: components
  title: Components
data-testid: chapter-position-example
---

# Add chapter progress

## Result

<div class="position-demo" data-testid="chapter-position-result">
  Chapter <CurrentChapterNumber /> of <ChapterCount />
</div>

`CurrentChapterNumber` is one-based. `ChapterCount` includes all chapter declarations in the resolved deck.

::right::

## Markdown

```md
Chapter <CurrentChapterNumber />
of <ChapterCount />
```

The components provide only their values. You decide whether they become a footer, badge, or progress indicator.

---
layout: two-cols
data-testid: chapter-toc-default-example
---

# Build chapter navigation

## Result

<ChapterToc />

The default is deliberately small: one link per chapter, with no numbering or subchapters.

::right::

## Markdown

```md
<ChapterToc />
```

Each entry navigates to the first slide of that chapter using Slidev's navigation API.

---
layout: two-cols
data-testid: chapter-toc-options-example
---

# Choose how much context to show

## Result

<ChapterToc
  :show-numbers="true"
  :show-subchapters="true"
  :highlight-current="true"
/>

Numbering shows the hierarchy, while highlighting follows the active chapter and subchapter.

::right::

## Markdown

```md
<ChapterToc
  :show-numbers="true"
  :show-subchapters="true"
  :highlight-current="true"
/>
```

- `show-numbers`: prefixes `1`, `1.1`, …
- `show-subchapters`: reveals the second level
- `highlight-current`: exposes current-state classes and attributes

---
src: ./pages/architecture.md
---

---
layout: two-cols
subchapter:
  id: composable
  title: Composable
data-testid: use-chapters-example
---

<script setup>
import { useChapters } from 'slidev-addon-chapters'

const { chapters, currentChapter, currentSubchapter } = useChapters()
</script>

# Build your own chapter UI

## Result

<div class="data-card">
  <span><strong>{{ chapters.length }}</strong> chapters found</span>
  <span>Current: <strong>{{ currentChapter?.title }}</strong></span>
  <span>Subchapter: <strong>{{ currentSubchapter?.title }}</strong></span>
</div>

The readonly refs update whenever Slidev navigation changes.

::right::

## Markdown

```vue
<script setup>
import { useChapters }
  from 'slidev-addon-chapters'

const {
  chapters,
  currentChapter,
  currentSubchapter,
} = useChapters()
</script>

{{ currentChapter?.title }}
```

Use the composable when the ready-made components are not enough for your layout or addon.

---
layout: two-cols
class: title-css-demo
data-testid: title-css-example
---

# Style titles and position values

## Result

<div>
  Chapter <CurrentChapterNumber /> / <ChapterCount /><br>
  <ChapterTitle />
</div>

The addon provides semantic class names, not a visual identity. Your presentation stays in control.

::right::

## Markdown

```md
Chapter <CurrentChapterNumber /> / <ChapterCount />

<ChapterTitle />

<style>
.title-css-demo .chapter-title {
  color: #2563eb;
  font-size: 2rem;
  font-weight: 800;
}

.title-css-demo .current-chapter-number {
  color: #2563eb;
  font-weight: 700;
}
</style>
```

The selectors in this example are stable public styling hooks.

---
layout: two-cols
chapter:
  id: next-steps
  title: Next Steps
class: toc-css-demo
data-testid: toc-css-example
---

# Style the table of contents

## Result

<ChapterToc
  :show-numbers="true"
  :show-subchapters="true"
  :highlight-current="true"
/>

Current-state classes let a theme emphasize location without reimplementing chapter discovery.

::right::

## Markdown

```md
<ChapterToc
  :show-numbers="true"
  :show-subchapters="true"
  :highlight-current="true"
/>

<style>
.toc-css-demo .chapter-toc__link {
  padding: .35rem .6rem;
  border-radius: .5rem;
}

.toc-css-demo
  .chapter-toc__item--current
  .chapter-toc__link {
  color: white;
  background: #2563eb;
}
</style>
```

Public element and state classes are safe for presentation and theme CSS.
