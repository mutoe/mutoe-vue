import Vue from '../src/index'

describe('Proxy test', function() {
  it('should proxy vm._data.a = vm.a', () => {
    const vm = new Vue({
      data() {
        return {
          a: 2,
        }
      },
    })
    expect(vm.a).toEqual(2)
    vm.a = 3
    expect(vm.a).toEqual(3)
  })
})
