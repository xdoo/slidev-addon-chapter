import { mount } from '@vue/test-utils'
import { computed, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ChapterToc from '../components/ChapterToc.vue'

const currentPage = ref(3)
const go = vi.fn()
const slides = ref([
  { no: 1, meta: { slide: { frontmatter: {} } } },
  { no: 2, meta: { slide: { frontmatter: { chapter: { id: 'one', title: 'One' } } } } },
  { no: 3, meta: { slide: { frontmatter: { title: 'Member slide title' } } } },
  { no: 4, meta: { slide: { frontmatter: { chapter: { id: 'two', title: 'Two' } } } } },
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
