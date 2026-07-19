import { mount } from '@vue/test-utils'
import { computed, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CurrentChapterTitle from '../components/CurrentChapterTitle.vue'

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

describe('CurrentChapterTitle', () => {
  beforeEach(() => {
    currentPage.value = 2
  })

  it('renders the current chapter title in the public styling hook', () => {
    const wrapper = mount(CurrentChapterTitle)
    const title = wrapper.get('.current-chapter-title')

    expect(title.element.tagName).toBe('SPAN')
    expect(title.text()).toBe('Architecture')
    expect(title.attributes()).toEqual({ class: 'current-chapter-title' })
    expect(wrapper.findAll('*')).toHaveLength(1)
  })

  it('renders nothing when no chapter is active', () => {
    currentPage.value = 1
    const wrapper = mount(CurrentChapterTitle)

    expect(wrapper.find('.current-chapter-title').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('updates automatically when the current chapter changes', async () => {
    const wrapper = mount(CurrentChapterTitle)

    expect(wrapper.text()).toBe('Architecture')

    currentPage.value = 4
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('Delivery')
  })
})
