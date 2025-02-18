import { mount } from '@vue/test-utils'
import ToList from '@/components/ToList.vue'
import { expect, it } from 'vitest'

it('ToList.vue', () => {
    const wrapper = mount(ToList)
    const todos = wrapper.get(['[data-test="todo"]'])
    expect(todos.text()).toBe('Learn Vue.js 3')

    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')

    const incrementEvent = wrapper.emitted('increment')
    console.log("code line-13 \n\r😍 incrementEvent:\n\r", incrementEvent);

    expect(incrementEvent[0]).toEqual([6])
    expect(incrementEvent[1]).toEqual([7])
})