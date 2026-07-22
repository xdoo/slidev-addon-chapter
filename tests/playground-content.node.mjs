import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const slides = await readFile(new URL('../playground/slides.md', import.meta.url), 'utf8')
const importedSlide = await readFile(new URL('../playground/pages/architecture.md', import.meta.url), 'utf8')
const styles = await readFile(new URL('../playground/style.css', import.meta.url), 'utf8')

function withoutCodeFences(source) {
  return source.replace(/```[\s\S]*?```/g, '')
}

function occurrences(source, value) {
  return source.split(value).length - 1
}

test('introduces the addon before the result/source feature tour', () => {
  const renderedSource = withoutCodeFences(slides)

  assert.match(renderedSource, /Give long presentations a clear structure/)
  assert.match(renderedSource, /The mental model/)
  assert.match(renderedSource, /Start in two small steps/)
  assert.ok(renderedSource.indexOf('Start in two small steps') < renderedSource.indexOf('layout: two-cols'))
})

test('pairs every feature slide with result and Markdown columns', () => {
  const featureSource = withoutCodeFences(`${slides}\n${importedSlide}`)
  const twoColumnSlides = occurrences(featureSource, 'layout: two-cols')

  assert.equal(twoColumnSlides, 11)
  assert.equal(occurrences(featureSource, '## Result'), twoColumnSlides)
  assert.equal(occurrences(featureSource, '::right::'), twoColumnSlides)
  assert.equal(occurrences(featureSource, '## Markdown'), twoColumnSlides)
})

test('covers the public chapter guide surface with live examples', () => {
  const allSlides = `${slides}\n${importedSlide}`

  for (const expected of [
    'chapter:',
    'subchapter:',
    '<CurrentChapterTitle',
    '<CurrentChapterNumber',
    '<ChapterCount',
    '<ChapterToc',
    ':show-numbers="true"',
    ':show-subchapters="true"',
    ':highlight-current="true"',
    'highlight-current-mode="single"',
    'src: ./pages/architecture.md',
    "useChapters } from 'slidev-addon-chapters'",
  ]) {
    assert.ok(allSlides.includes(expected), `missing playground example: ${expected}`)
  }
})

test('keeps CSS demos scoped and uses public addon styling hooks', () => {
  assert.match(slides, /class: title-css-demo/)
  assert.match(slides, /class: toc-css-demo/)

  for (const selector of [
    '.current-chapter-title',
    '.current-chapter-number',
    '.chapter-toc__link',
    '.chapter-toc__item--current',
  ]) {
    assert.ok(slides.includes(selector), `missing copyable CSS selector: ${selector}`)
    assert.ok(styles.includes(selector), `missing rendered CSS selector: ${selector}`)
  }

  assert.match(styles, /Playground-only teaching helpers/)
  assert.match(styles, /Demonstrated public addon hooks/)
})
