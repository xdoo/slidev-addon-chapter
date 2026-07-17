# Slidev API spike

Verified against Slidev 52.18.0 on 2026-07-16.

## Selected public integration

- `useNav()` is exported by the documented public `@slidev/client` entry point.
- Its public `SlidevContextNav` type exposes `slides`, `currentPage`, `currentFrontmatter`, `go()`, presenter/print flags, and the current route.
- Each resolved `SlideRoute` contains its one-based `no` and `meta.slide.frontmatter`. The public `SlideInfo` type describes the presentation index and its source/import chain, so imported files use the resolved presentation sequence.
- Custom frontmatter is intentionally represented as `Record<string, any>` by Slidev. The addon validates `chapter` as unknown external input and publishes addon-owned types; it does not augment Slidev's declarations.
- `go(slideNumber)` is the documented public navigation operation and avoids constructing base-path-sensitive URLs.

## Packaging decision

Slidev documents automatic discovery for `components/*`, not addon composable auto-imports. `ChapterToc.vue` therefore uses the conventional component directory, while `useChapters()` is explicitly exported from `slidev-addon-chapters` and `slidev-addon-chapters/composables`.

No `setup/`, `layouts/`, global styles, Vite config, UnoCSS config, Markdown transformer, pre-parser, or private nested Slidev import is required.

The official guide documents `addons: [./]`. Slidev 52.18.0 resolves a relative addon against the parent of the deck's `userRoot`; placing the development deck at `playground/slides.md` therefore resolves `./` to the addon root. This documented spelling was verified in dev, build, browser, and export modes.

## Supported baseline

- Slidev: `>=52.18.0` (the version verified by the spike)
- Node.js: `>=20.12.0` (the current Slidev repository baseline)
- Compatibility themes: `@slidev/theme-default` and `@slidev/theme-seriph`

## References

- https://sli.dev/guide/global-context
- https://sli.dev/guide/write-addon
- https://sli.dev/custom/directory-structure
- https://sli.dev/guide/syntax#importing-slides
- https://github.com/slidevjs/slidev/tree/main/packages/client
- https://github.com/slidevjs/slidev/tree/main/packages/types
