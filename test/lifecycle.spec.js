import Vue from '../src/index'

describe('Lifecycle', () => {
  const callback = jest.fn()

  it('mounted', () => {
    const vm = new Vue({
      data() {
        return {
          a: 1,
        }
      },
      mounted() {
        callback()
        this.a = 2
      },
      render(h) {
        return h('div', null, 'hello')
      },
    }).$mount()

    expect(callback).toHaveBeenCalled()
    expect(vm.a).toEqual(2)
  })
})
