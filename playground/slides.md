---
theme: default
addons:
  - ./
title: Slidev Chapters Addon Playground
---

# Preface

This slide intentionally appears before the first chapter.

<div class="chapter-context">
  <span class="chapter-context__label">Current chapter</span>
  <ChapterTitle></ChapterTitle>
  <span class="chapter-context__empty">None yet — ChapterTitle renders nothing</span>
</div>

<ChapterToc :show-numbers="true" :show-subchapters="true" :highlight-current="true"></ChapterToc>

---
layout: section
chapter:
  id: fundamentals
  title: Fundamentals
---

# Fundamentals

The chapter declaration works with an ordinary theme layout.

<div class="chapter-context">
  <span class="chapter-context__label">Current chapter</span>
  <ChapterTitle></ChapterTitle>
</div>

---
subchapter:
  id: foundations
  title: Foundations
---

# A titled member slide

This title must not become a `ChapterToc` entry.

<div class="chapter-context">
  <span class="chapter-context__label">Current chapter</span>
  <ChapterTitle></ChapterTitle>
</div>

<ChapterToc :show-numbers="true" :show-subchapters="true" :highlight-current="true"></ChapterToc>

---
src: ./pages/architecture.md
---

---
subchapter:
  id: target-architecture
  title: Target Architecture
---

# Architecture details

This slide belongs to the imported Architecture chapter.

<div class="chapter-context">
  <span class="chapter-context__label">Current chapter</span>
  <ChapterTitle></ChapterTitle>
</div>

---
chapter:
  id: delivery
  title: Delivery
---

# Delivery

This chapter begins on a content slide, has no subchapters, and runs to the deck end.

<div class="chapter-context">
  <span class="chapter-context__label">Current chapter</span>
  <ChapterTitle></ChapterTitle>
</div>

<ChapterToc :show-numbers="true" :show-subchapters="true" :highlight-current="true"></ChapterToc>

---

# Optional theme-owned divider

Themes may combine their own layout with the same semantic declaration:

```yaml
layout: chapter
chapter:
  id: theme-divider
  title: Theme-owned divider
```

The addon does not provide or interpret `layout: chapter`.

<div class="chapter-context">
  <span class="chapter-context__label">Current chapter</span>
  <ChapterTitle></ChapterTitle>
</div>

<style>
.chapter-context {
  display: inline-flex;
  align-items: baseline;
  gap: 0.65rem;
  margin-block: 1rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 0.4rem;
}

.chapter-context__label {
  opacity: 0.6;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chapter-title {
  font-weight: 600;
}

.chapter-context:has(.chapter-title) .chapter-context__empty {
  display: none;
}

.chapter-context__empty {
  opacity: 0.6;
  font-style: italic;
}

.chapter-toc__sublist {
  margin-block: 0.2rem 0.6rem;
  padding-inline-start: 1.5rem;
}

.chapter-toc__subitem--current .chapter-toc__subtitle {
  font-weight: 700;
  text-decoration: underline;
}
</style>
