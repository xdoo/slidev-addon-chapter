## Why

Slidev models and lists individual slides and their headings, but presentations often need a separate semantic chapter level spanning multiple slides. A theme-independent addon is needed so chapter metadata, chapter-aware navigation, and reusable chapter state remain portable across themes while visual chapter-divider design stays with the active theme.

## What Changes

- Introduce an explicit chapter model derived from custom `chapter` slide frontmatter: a declaration starts a chapter, includes its own slide, and covers following slides until the next declaration or the end of the deck.
- Keep semantics and presentation independent: `chapter` defines chapter membership; an optional `layout: chapter` only selects a theme-provided layout and is neither required nor interpreted as a chapter declaration by the addon.
- Define validation and deterministic edge-case behavior for required titles, unique IDs, repeated declarations, slides before the first chapter, imported slide files, direct navigation, presenter mode, static builds, and exports.
- Specify a theme-neutral `useChapters()` API that exposes ordered chapter data and the chapter matching the current slide, with final types gated by a spike against documented public Slidev APIs.
- Specify an automatically available `<ChapterToc />` component that renders each chapter exactly once, optionally numbers and highlights it, and links to its first slide.
- Establish a minimal addon package and local `slides.md` playground, without layouts, global styles, build-time transformations, or setup hooks unless the API spike proves one necessary.
- Establish unit, integration, build, theme-compatibility, presenter, PDF/PPTX-export, typecheck, and documentation checks; assess browser automation during implementation and allow full Playwright coverage to follow if disproportionate for the first release.
- Evaluate `slidev-addon-chapters` as the package name under Slidev's current addon naming convention without making publication naming irreversible in this change.
- Exclude production implementation from this change; it produces reviewable requirements, design decisions, risks, and implementation tasks only.
- Establish chapter declarations as the single source of truth for chapter structure: authors define each chapter exactly once, and all chapter overviews, agendas, navigation components, and future chapter-aware features derive their content automatically from those declarations without requiring manually maintained duplicate chapter lists.

## Capabilities

### New Capabilities

- `chapter-model`: Chapter declaration semantics, slide assignment, ordering, validation, edge cases, and theme-independent chapter extraction.
- `chapter-runtime-api`: Public TypeScript/Vue chapter state, current-chapter resolution, and compatibility requirements for Slidev presentation contexts.
- `chapter-toc`: User-facing chapter-only overview, numbering, current-chapter highlighting, and navigation to chapter starts.
- `addon-delivery-and-quality`: Addon packaging conventions, automatic component exposure, playground, documentation, compatibility, build/export, and verification requirements.

### Modified Capabilities

None.

## Impact

- Adds planning contracts for a Vue 3/TypeScript Slidev addon, its public frontmatter schema, composable, component, validation behavior, and package metadata.
- A future implementation will depend on a currently supported Slidev release and only documented exports from `@slidev/client` or other documented public Slidev entry points; it must not couple to nested private client modules.
- The API spike must verify access to all resolved slide metadata (including imported files), reactive current-page navigation, frontmatter typing/extensibility, component auto-registration, static/presenter behavior, and whether any `setup/`, Vite, or Markdown extension is actually necessary.
- No existing theme layouts or global styles are overridden, no `layouts/` directory is proposed for the initial scope, and no runtime dependency beyond Slidev/Vue is accepted without demonstrated need.
- Likely follow-up changes include chapter indicators, progress, previous/next chapter navigation, richer diagnostics, and expanded browser/export automation.
