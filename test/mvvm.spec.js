import Vue from '../src/index'

describe('MVVM', () => {
  it('Basic', () => {
    const vm = new Vue({
      data() {
        return {
          a: 0,
        }
      },
      render(h) {
        return h('div', null, this.a)
      },
    }).$mount()

    vm.a++
    expect(vm.$el.textContent).toBe('1')

    vm.a = 999
    expect(vm.$el.textContent).toBe('999')
  })
})
