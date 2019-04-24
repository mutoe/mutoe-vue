import Vue from '../src/index.js'

describe.only('Watch Data change', () => {
  it('watch callback is called', () => {
    const vm = new Vue({
      data() {
        return {
          a: 2,
        }
      },
    })

    const callback = jest.fn()

    vm.$watch('a', (newVal, oldVal) => {
      callback(newVal, oldVal)
    })

    vm.a = 3

    expect(callback).toBeCalledWith(3, 2)
  })
})
