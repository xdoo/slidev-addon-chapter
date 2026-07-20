---
layout: two-cols
chapter:
  id: architecture
  title: Architecture
subchapter:
  id: imported-slides
  title: Imported Slides
data-testid: imported-slide-example
---

# Keep structure in imported slides

## Result

<div class="result-panel">
  <span class="eyebrow">Imported chapter</span>
  <ChapterTitle />
</div>

This title comes from the imported page's own frontmatter. Slidev resolves the page into the presentation, and the addon uses that resolved order.

::right::

## Markdown

In `slides.md`:

```md
---
src: ./pages/architecture.md
---
```

In `pages/architecture.md`:

```md
---
layout: two-cols
chapter:
  id: architecture
  title: Architecture
subchapter:
  id: imported-slides
  title: Imported Slides
---
```

Imported metadata behaves like metadata in the main deck.
