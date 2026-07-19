import { mount } from '@vue/test-utils'
import { computed, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CurrentChapterNumber from '../components/CurrentChapterNumber.vue'

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

describe('CurrentChapterNumber', () => {
  beforeEach(() => {
    currentPage.value = 2
  })

  it('renders the one-based chapter index in the public styling hook', () => {
    const wrapper = mount(CurrentChapterNumber)
    const number = wrapper.get('.current-chapter-number')

    expect(number.element.tagName).toBe('SPAN')
    expect(number.text()).toBe('1')
    expect(number.attributes()).toEqual({ class: 'current-chapter-number' })
    expect(wrapper.findAll('*')).toHaveLength(1)
  })

  it('renders nothing when no chapter is active', () => {
    currentPage.value = 1
    const wrapper = mount(CurrentChapterNumber)

    expect(wrapper.find('.current-chapter-number').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('updates automatically when the current chapter changes', async () => {
    const wrapper = mount(CurrentChapterNumber)

    expect(wrapper.text()).toBe('1')

    currentPage.value = 4
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('2')
  })
})
