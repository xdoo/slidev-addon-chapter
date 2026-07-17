# Verification record

Verified on 2026-07-16 with Slidev 52.18.0, Node.js 22.16.0, Vue 3.5.40, and Chromium through Playwright.

## Automated checks

- `npm test`: 18 unit/component tests passed.
- `npm run typecheck`: passed with strict TypeScript settings.
- `npm run build`: default-theme production build passed and emitted the automatically discovered `ChapterToc` component.
- `npx slidev build playground/slides.md --theme seriph --out dist-seriph`: Seriph production build passed.
- `npx slidev build playground/slides.md --base /chapters/ --out dist-base`: non-root base-path build passed.
- `npm run test:e2e`: Playwright verified chapter-only content, no current chapter on the preface, direct refresh on slide 3, navigation to the imported chapter start, reactive highlighting, and chapter state in presenter mode.

## Export checks

- `npm run export:pdf`: produced a valid seven-page PDF. `pdftotext` confirmed that Fundamentals, Architecture, and Delivery remain readable in order. The component uses JavaScript navigation buttons, so the PDF does not promise interactive chapter links.
- `npm run export:pptx`: produced a seven-slide PPTX. Slidev's current PPTX exporter stores each slide as a rendered image; visual inspection of the first slide confirmed readable ordered chapter labels. Interactive chapter navigation is therefore unavailable in the PPTX output.

## Local addon path

The playground lives at `playground/slides.md` and uses the officially documented `addons: [./]`. With Slidev 52.18.0, the relative addon resolves to the repository root and was verified in dev, build, browser, and export checks.

## Browser automation scope

The initial Playwright suite is intentionally a Chromium smoke test. Cross-browser matrices, visual regression, and automated inspection of exported documents remain follow-up candidates.
