---
theme: default
addons:
  - ./
title: Slidev Chapters Addon Playground
---

# Preface

This slide intentionally appears before the first chapter.

<ChapterToc :show-numbers="true" :highlight-current="true" />

---
layout: section
chapter:
  id: fundamentals
  title: Fundamentals
---

# Fundamentals

The chapter declaration works with an ordinary theme layout.

---

# A titled member slide

This title must not become a `ChapterToc` entry.

<ChapterToc :show-numbers="true" :highlight-current="true" />

---
src: ./pages/architecture.md
---

---

# Architecture details

This slide belongs to the imported Architecture chapter.

---
chapter:
  id: delivery
  title: Delivery
---

# Delivery

This chapter begins on a content slide and runs to the deck end.

<ChapterToc :show-numbers="true" :highlight-current="true" />

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
