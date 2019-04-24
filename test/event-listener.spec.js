import Vue from '../src/index'

describe('Event', () => {
  it('Basic', () => {
    const callback = jest.fn()

    const vm = new Vue({
      render(h) {
        return h(
          'button',
          {
            class: 'btn',
            on: { click: callback },
          },
          [],
        )
      },
    }).$mount()

    document.body.appendChild(vm.$el)
    const btn = document.querySelector('.btn')
    expect(btn.tagName).toEqual('BUTTON')

    btn.click()
    expect(callback).toHaveBeenCalled()
  })
})
