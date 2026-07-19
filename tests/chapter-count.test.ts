import { mount } from '@vue/test-utils'
import { computed, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ChapterCount from '../components/ChapterCount.vue'

const currentPage = ref(2)
const slides = ref([
  { no: 1, meta: { slide: { frontmatter: {} } } },
  { no: 2, meta: { slide: { frontmatter: { chapter: { id: 'architecture', title: 'Architecture' } } } } },
  { no: 3, meta: { slide: { frontmatter: {} } } },
  { no: 4, meta: { slide: { frontmatter: { chapter: { id: 'delivery', title: 'Delivery' } } } } },
])

vi.mock('@slidev/client', () => ({
  useNav: () => ({ slides, currentPage: computed(() => currentPage.value) }),
}))

describe('ChapterCount', () => {
  beforeEach(() => {
    currentPage.value = 2
    slides.value = [
      { no: 1, meta: { slide: { frontmatter: {} } } },
      { no: 2, meta: { slide: { frontmatter: { chapter: { id: 'architecture', title: 'Architecture' } } } } },
      { no: 3, meta: { slide: { frontmatter: {} } } },
      { no: 4, meta: { slide: { frontmatter: { chapter: { id: 'delivery', title: 'Delivery' } } } } },
    ]
  })

  it('renders the total chapter count in the public styling hook', () => {
    const wrapper = mount(ChapterCount)
    const count = wrapper.get('.chapter-count')

    expect(count.element.tagName).toBe('SPAN')
    expect(count.text()).toBe('2')
    expect(count.attributes()).toEqual({ class: 'chapter-count' })
    expect(wrapper.findAll('*')).toHaveLength(1)
  })

  it('renders nothing when no chapters are declared', () => {
    slides.value = [{ no: 1, meta: { slide: { frontmatter: {} } } }]
    const wrapper = mount(ChapterCount)

    expect(wrapper.find('.chapter-count').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('updates automatically when the chapter count changes', async () => {
    const wrapper = mount(ChapterCount)
    expect(wrapper.text()).toBe('2')

    slides.value = [
      { no: 1, meta: { slide: { frontmatter: { chapter: { id: 'one', title: 'One' } } } } },
      { no: 2, meta: { slide: { frontmatter: { chapter: { id: 'two', title: 'Two' } } } } },
      { no: 3, meta: { slide: { frontmatter: { chapter: { id: 'three', title: 'Three' } } } } },
    ]
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('3')
  })
})
