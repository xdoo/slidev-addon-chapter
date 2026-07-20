## Why

`ChapterTitle` and `CurrentChapterTitle` expose the same reactive chapter title and differ only in their names and CSS classes. Keeping both makes the public component API and playground harder to understand without providing distinct behavior.

## What Changes

- **BREAKING** Remove the auto-discovered `ChapterTitle` component and its `.chapter-title` styling contract, leaving `CurrentChapterTitle` as the single component for rendering the active chapter title.
- Update the `CurrentChapterTitle` contract and documentation so it is presented as the canonical title component rather than an equivalent alternative.
- Replace `ChapterTitle` examples and references throughout the playground, README, package verification fixture, and related tests with `CurrentChapterTitle`.
- Remove the redundant `ChapterTitle` component test while retaining focused coverage for `CurrentChapterTitle`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `chapter-title`: Remove the public `ChapterTitle` component and its styling and documentation contracts.
- `chapter-position-components`: Make `CurrentChapterTitle` the sole public component for rendering the active chapter title and remove language requiring it to coexist with `ChapterTitle`.
- `addon-delivery-and-quality`: Update the documented and packaged public component surface from `ChapterTitle` to `CurrentChapterTitle`.
- `github-feature-page`: Require the deployed playground to demonstrate `CurrentChapterTitle` instead of the removed `ChapterTitle` component.

## Impact

- Removes `components/ChapterTitle.vue` and `tests/chapter-title.test.ts`.
- Updates playground content in `playground/slides.md` and imported playground pages, including source examples and rendered demonstrations.
- Updates README component documentation and compatibility guidance.
- Updates package fixture and playground-content assertions that currently reference `ChapterTitle`.
- This is a breaking change for presentations using `<ChapterTitle />` or styling `.chapter-title`; consumers must migrate to `<CurrentChapterTitle />` and `.current-chapter-title`.
