import Vue from '../src/index'

describe.only('Watcher', () => {
  it('Base', () => {
    const callback = jest.fn()
    const vm = new Vue({
      data() {
        return {
          a: 2,
        }
      },
    })

    vm.$watch('a', (newVal, oldVal) => {
      callback(newVal, oldVal)
    })

    vm.a = 3
    expect(callback).toBeCalledWith(3, 2)
  })

  // TODO: vm.$data.someProp changed should be emit watcher
  it.skip('should be called when $data changed', () => {
    const callback = jest.fn()
    const vm = new Vue({
      data: () => ({
        a: 2,
      }),
    })
    vm.$watch('a', (newVal, oldVal) => {
      callback(newVal, oldVal)
    })

    vm.$data.a = 3
    expect(callback).toBeCalledWith(3, 2)
  })
})
