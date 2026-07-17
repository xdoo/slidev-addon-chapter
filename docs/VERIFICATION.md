# Verification record

Verified on 2026-07-16 with Slidev 52.18.0, Node.js 22.16.0, Vue 3.5.40, and Chromium through Playwright.

## Automated checks

- `npm test`: the unit/component suite covers chapter-only compatibility plus subchapter extraction, validation, runtime state, TOC rendering, highlighting, and navigation.
- `npm run typecheck`: passed with strict TypeScript settings.
- `npm run build`: default-theme production build passed and emitted the automatically discovered `ChapterToc` component.
- `npx slidev build playground/slides.md --theme seriph --out dist-seriph`: Seriph production build passed.
- `npx slidev build playground/slides.md --base /chapters/ --out dist-base`: non-root base-path build passed.
- `npm run test:e2e`: Playwright verifies chapter and opt-in subchapter content, no current chapter on the preface, direct refresh, navigation, reactive highlighting, and state in presenter mode.

## Export checks

- PDF export is expected to retain readable chapter and enabled subchapter labels/numbers. The component uses JavaScript navigation buttons, so exported interactive links are not promised.
- Slidev's PPTX exporter renders slides as images; chapter and enabled subchapter labels remain visually readable, while interactive chapter/subchapter navigation is unavailable.

## Local addon path

The playground lives at `playground/slides.md` and uses the officially documented `addons: [./]`. With Slidev 52.18.0, the relative addon resolves to the repository root and was verified in dev, build, browser, and export checks.

## Browser automation scope

The initial Playwright suite is intentionally a Chromium smoke test. Cross-browser matrices, visual regression, and automated inspection of exported documents remain follow-up candidates.
