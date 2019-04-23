import Vue from '../src/index'

describe('Proxy test', () => {
  test('should proxy vm._data.a = vm.a', () => {
    const vm = new Vue({
      data() {
        return {
          a: 2,
        }
      },
    })
    expect(vm.a).toEqual(2)
  })
})
