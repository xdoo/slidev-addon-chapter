import { mount } from '@vue/test-utils'
import { computed, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ChapterToc from '../components/ChapterToc.vue'

const currentPage = ref(3)
const go = vi.fn()
const slides = ref([
  { no: 1, meta: { slide: { frontmatter: {} } } },
  { no: 2, meta: { slide: { frontmatter: { chapter: { id: 'one', title: 'One' } } } } },
  { no: 3, meta: { slide: { frontmatter: { title: 'Member slide title', subchapter: { id: 'context', title: 'Context' } } } } },
  { no: 4, meta: { slide: { frontmatter: { chapter: { id: 'two', title: 'Two' } } } } },
  { no: 5, meta: { slide: { frontmatter: { subchapter: { id: 'delivery', title: 'Delivery' } } } } },
])

vi.mock('@slidev/client', () => ({
  useNav: () => ({ slides, currentPage: computed(() => currentPage.value), go }),
}))

describe('ChapterToc', () => {
  beforeEach(() => {
    currentPage.value = 3
    go.mockReset()
  })

  it('renders declarations once and never renders member slide titles', () => {
    const wrapper = mount(ChapterToc)

    expect(wrapper.findAll('[data-chapter-id]')).toHaveLength(2)
    expect(wrapper.text()).toContain('One')
    expect(wrapper.text()).toContain('Two')
    expect(wrapper.text()).not.toContain('Member slide title')
    expect(wrapper.text()).not.toContain('Context')
  })

  it('renders nested subchapters only when enabled and omits empty sublists', () => {
    const wrapper = mount(ChapterToc, { props: { showSubchapters: true } })
    expect(wrapper.findAll('.chapter-toc__sublist')).toHaveLength(2)
    expect(wrapper.findAll('[data-subchapter-id]').map(node => node.text())).toEqual(['Context', 'Delivery'])
    expect(wrapper.get('[data-subchapter-id="context"]').attributes('data-parent-chapter-id')).toBe('one')
  })

  it('shows hierarchical numbers only when numbering is enabled', () => {
    const hidden = mount(ChapterToc, { props: { showSubchapters: true } })
    const shown = mount(ChapterToc, { props: { showSubchapters: true, showNumbers: true } })
    expect(hidden.find('.chapter-toc__subnumber').exists()).toBe(false)
    expect(shown.findAll('.chapter-toc__subnumber').map(node => node.text())).toEqual(['1.1', '2.1'])
  })

  it('reactively highlights both current levels and clears the subchapter at a chapter start', async () => {
    const wrapper = mount(ChapterToc, { props: { showSubchapters: true, highlightCurrent: true } })
    expect(wrapper.get('[data-chapter-id="one"]').classes()).toContain('chapter-toc__item--current')
    expect(wrapper.get('[data-subchapter-id="context"]').classes()).toContain('chapter-toc__subitem--current')

    currentPage.value = 4
    await wrapper.vm.$nextTick()
    expect(wrapper.get('[data-chapter-id="two"]').attributes('data-current')).toBe('true')
    expect(wrapper.find('.chapter-toc__subitem--current').exists()).toBe(false)

    currentPage.value = 5
    await wrapper.vm.$nextTick()
    expect(wrapper.get('[data-subchapter-id="delivery"]').attributes('aria-current')).toBeUndefined()
    expect(wrapper.get('[data-subchapter-id="delivery"] button').attributes('aria-current')).toBe('location')
  })

  it('navigates to a subchapter start with Slidev go', async () => {
    const wrapper = mount(ChapterToc, { props: { showSubchapters: true } })
    await wrapper.get('[data-subchapter-id="delivery"] button').trigger('click')
    expect(go).toHaveBeenCalledWith(5)
  })

  it('shows one-based numbers only when requested', () => {
    const hidden = mount(ChapterToc)
    const shown = mount(ChapterToc, { props: { showNumbers: true } })

    expect(hidden.find('.chapter-toc__number').exists()).toBe(false)
    expect(shown.findAll('.chapter-toc__number').map(node => node.text())).toEqual(['1.', '2.'])
  })

  it('marks only the current chapter when highlighting is enabled', async () => {
    const wrapper = mount(ChapterToc, { props: { highlightCurrent: true } })

    expect(wrapper.findAll('[aria-current="location"]')).toHaveLength(1)
    expect(wrapper.find('[data-chapter-id="one"]').attributes('data-current')).toBe('true')

    currentPage.value = 4
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-chapter-id="two"]').attributes('data-current')).toBe('true')
  })

  it('navigates through the documented Slidev go operation', async () => {
    const wrapper = mount(ChapterToc)
    await wrapper.findAll('button')[1]?.trigger('click')

    expect(go).toHaveBeenCalledWith(4)
  })

  it('derives updated content from declarations without a second source', async () => {
    const wrapper = mount(ChapterToc)
    const declaration = slides.value[1]
    if (!declaration)
      throw new Error('Test fixture is missing the first chapter declaration.')
    const metadata = declaration.meta.slide.frontmatter.chapter
    if (!metadata)
      throw new Error('Test fixture chapter metadata is missing.')
    metadata.title = 'Changed once'
    slides.value = [...slides.value]
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Changed once')
  })
})
