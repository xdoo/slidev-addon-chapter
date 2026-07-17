import type { NormalizedSlide } from '../src/types'
import { describe, expect, it } from 'vitest'
import { extractChapters, findCurrentChapter, findCurrentSubchapter } from '../src/extract-chapters'

function slide(slideNumber: number, frontmatter: Record<string, unknown> = {}): NormalizedSlide {
  return { slideNumber, frontmatter }
}

function chapter(id: string, title: string): Record<string, unknown> {
  return { chapter: { id, title } }
}

function subchapter(id: string, title: string): Record<string, unknown> {
  return { subchapter: { id, title } }
}

function declarations(chapterId: string, chapterTitle: string, subchapterId: string, subchapterTitle: string): Record<string, unknown> {
  return { ...chapter(chapterId, chapterTitle), ...subchapter(subchapterId, subchapterTitle) }
}

describe('extractChapters', () => {
  it('assigns multiple slides and closes the final chapter at the deck end', () => {
    const result = extractChapters([
      slide(1),
      slide(2, chapter('one', 'One')),
      slide(3),
      slide(4),
      slide(5, chapter('two', 'Two')),
      slide(6),
    ])

    expect(result.diagnostics).toEqual([])
    expect(result.chapters).toEqual([
      { id: 'one', title: 'One', index: 0, startSlide: 2, endSlide: 4, slideNumbers: [2, 3, 4], subchapters: [] },
      { id: 'two', title: 'Two', index: 1, startSlide: 5, endSlide: 6, slideNumbers: [5, 6], subchapters: [] },
    ])
  })

  it('supports consecutive declarations as one-slide chapters', () => {
    const result = extractChapters([
      slide(1, chapter('one', 'One')),
      slide(2, chapter('two', 'Two')),
    ])

    expect(result.chapters[0]).toMatchObject({ startSlide: 1, endSlide: 1, slideNumbers: [1] })
    expect(result.chapters[1]).toMatchObject({ startSlide: 2, endSlide: 2, slideNumbers: [2] })
  })

  it('leaves slides before the first declaration unassigned', () => {
    const result = extractChapters([slide(1), slide(2), slide(3, chapter('one', 'One'))])

    expect(result.chapters).toHaveLength(1)
    expect(result.chapters[0]?.startSlide).toBe(3)
    expect(findCurrentChapter(result.chapters, 2)).toBeUndefined()
  })

  it('ignores layout chapter without metadata and accepts metadata without that layout', () => {
    const result = extractChapters([
      slide(1, { layout: 'chapter' }),
      slide(2, chapter('real', 'Real chapter')),
    ])

    expect(result.chapters).toHaveLength(1)
    expect(result.chapters[0]?.id).toBe('real')
  })

  it.each([
    [{ title: 'Title' }, 'missing-id', 'chapter.id'],
    [{ id: 'id' }, 'missing-title', 'chapter.title'],
    [{ id: ' ', title: 'Title' }, 'missing-id', 'chapter.id'],
    [{ id: 'id', title: ' ' }, 'missing-title', 'chapter.title'],
  ])('reports invalid required fields', (value, code, field) => {
    const result = extractChapters([slide(1, { chapter: value })])

    expect(result.chapters).toEqual([])
    expect(result.diagnostics).toContainEqual(expect.objectContaining({
      code,
      field,
      slideNumber: 1,
    }))
  })

  it('reports malformed chapter values', () => {
    const result = extractChapters([slide(4, { chapter: 'invalid' })])

    expect(result.diagnostics[0]).toMatchObject({
      code: 'invalid-chapter',
      field: 'chapter',
      slideNumber: 4,
    })
  })

  it('reports duplicate IDs and the original slide even for identical declarations', () => {
    const result = extractChapters([
      slide(2, chapter('same', 'Same')),
      slide(5, chapter('same', 'Same')),
    ])

    expect(result.chapters).toEqual([])
    expect(result.diagnostics).toEqual([
      expect.objectContaining({
        code: 'duplicate-id',
        field: 'chapter.id',
        slideNumber: 5,
        relatedSlideNumber: 2,
      }),
    ])
  })

  it('sorts normalized imported metadata by resolved slide number', () => {
    const result = extractChapters([
      slide(3),
      slide(1, chapter('imported', 'Imported')),
      slide(2),
    ])

    expect(result.chapters[0]).toEqual({
      id: 'imported',
      title: 'Imported',
      index: 0,
      startSlide: 1,
      endSlide: 3,
      slideNumbers: [1, 2, 3],
      subchapters: [],
    })
  })

  it('builds ordered subchapter ranges and closes them at subchapter and chapter transitions', () => {
    const result = extractChapters([
      slide(1, chapter('one', 'One')),
      slide(2, subchapter('context', 'Context')),
      slide(3),
      slide(4, subchapter('target', 'Target')),
      slide(5, declarations('two', 'Two', 'delivery', 'Delivery')),
      slide(6),
    ])

    expect(result.diagnostics).toEqual([])
    expect(result.chapters[0]?.subchapters).toEqual([
      { id: 'context', title: 'Context', index: 0, startSlide: 2, endSlide: 3, slideNumbers: [2, 3] },
      { id: 'target', title: 'Target', index: 1, startSlide: 4, endSlide: 4, slideNumbers: [4] },
    ])
    expect(result.chapters[1]?.subchapters).toEqual([
      { id: 'delivery', title: 'Delivery', index: 0, startSlide: 5, endSlide: 6, slideNumbers: [5, 6] },
    ])
    expect(Object.isFrozen(result.chapters[0]?.subchapters)).toBe(true)
    expect(Object.isFrozen(result.chapters[0]?.subchapters[0]?.slideNumbers)).toBe(true)
  })

  it('supports consecutive subchapters and allows IDs to repeat in different chapters', () => {
    const result = extractChapters([
      slide(1, chapter('one', 'One')),
      slide(2, subchapter('intro', 'Intro one')),
      slide(3, subchapter('next', 'Next')),
      slide(4, chapter('two', 'Two')),
      slide(5, subchapter('intro', 'Intro two')),
    ])
    expect(result.diagnostics).toEqual([])
    expect(result.chapters[0]?.subchapters[0]).toMatchObject({ startSlide: 2, endSlide: 2 })
    expect(result.chapters[1]?.subchapters[0]?.id).toBe('intro')
  })

  it.each([
    ['invalid', 'invalid-subchapter', 'subchapter'],
    [{ title: 'Title' }, 'missing-id', 'subchapter.id'],
    [{ id: 'id' }, 'missing-title', 'subchapter.title'],
    [{ id: ' ', title: 'Title' }, 'missing-id', 'subchapter.id'],
    [{ id: 'id', title: ' ' }, 'missing-title', 'subchapter.title'],
  ])('reports malformed subchapter metadata', (value, code, field) => {
    const result = extractChapters([slide(1, chapter('one', 'One')), slide(2, { subchapter: value })])
    expect(result.chapters).toEqual([])
    expect(result.diagnostics).toContainEqual(expect.objectContaining({ code, field, slideNumber: 2 }))
  })

  it('rejects an orphaned subchapter with a clear message', () => {
    const result = extractChapters([slide(1, subchapter('orphan', 'Orphan'))])
    expect(result.chapters).toEqual([])
    expect(result.diagnostics[0]).toMatchObject({ code: 'orphaned-subchapter', field: 'subchapter', slideNumber: 1 })
    expect(result.diagnostics[0]?.message).toContain('declare a chapter first')
  })

  it('rejects duplicate subchapter IDs within a chapter with both locations', () => {
    const result = extractChapters([
      slide(1, chapter('one', 'One')),
      slide(2, subchapter('same', 'First')),
      slide(4, subchapter('same', 'Second')),
    ])
    expect(result.chapters).toEqual([])
    expect(result.diagnostics[0]).toMatchObject({ code: 'duplicate-id', field: 'subchapter.id', slideNumber: 4, relatedSlideNumber: 2 })
  })
})

describe('findCurrentChapter', () => {
  const chapters = extractChapters([
    slide(1),
    slide(2, chapter('one', 'One')),
    slide(3),
    slide(4, chapter('two', 'Two')),
    slide(5),
  ]).chapters

  it('returns no chapter before the first declaration', () => {
    expect(findCurrentChapter(chapters, 1)).toBeUndefined()
  })

  it('returns chapters within inclusive boundaries', () => {
    expect(findCurrentChapter(chapters, 2)?.id).toBe('one')
    expect(findCurrentChapter(chapters, 3)?.id).toBe('one')
    expect(findCurrentChapter(chapters, 4)?.id).toBe('two')
    expect(findCurrentChapter(chapters, 5)?.id).toBe('two')
  })
})

describe('findCurrentSubchapter', () => {
  const chapters = extractChapters([
    slide(1),
    slide(2, chapter('one', 'One')),
    slide(3, subchapter('a', 'A')),
    slide(4),
    slide(5, subchapter('b', 'B')),
    slide(6, chapter('two', 'Two')),
  ]).chapters

  it('is absent before a chapter and before its first subchapter', () => {
    expect(findCurrentSubchapter(findCurrentChapter(chapters, 1), 1)).toBeUndefined()
    expect(findCurrentSubchapter(findCurrentChapter(chapters, 2), 2)).toBeUndefined()
  })

  it('tracks inclusive subchapter ranges and clears at chapter transitions', () => {
    expect(findCurrentSubchapter(findCurrentChapter(chapters, 3), 3)?.id).toBe('a')
    expect(findCurrentSubchapter(findCurrentChapter(chapters, 4), 4)?.id).toBe('a')
    expect(findCurrentSubchapter(findCurrentChapter(chapters, 5), 5)?.id).toBe('b')
    expect(findCurrentSubchapter(findCurrentChapter(chapters, 6), 6)).toBeUndefined()
  })
})
