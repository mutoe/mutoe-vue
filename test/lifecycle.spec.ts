import Vue from '../src/index'

describe('Lifecycle: mounted', () => {
  it('should be called on dom was mounted', () => {
    const callback = jest.fn()
    const vm = new Vue({
      mounted() {
        callback()
      },
      render(h) {
        return h('div', null, 'hello')
      },
    })
    expect(callback).not.toHaveBeenCalled()

    vm.$mount()
    expect(callback).toHaveBeenCalled()
  })

  it('should have correct this pointer', () => {
    const vm = new Vue({
      data: () => ({
        a: 1,
      }),
      mounted() {
        this.a = 2
      },
      render(h) {
        return h('div', null, 'hello')
      },
    }).$mount()
    expect(vm.a).toEqual(2)
  })
})
