import Vue from '../src/index'

describe('Data proxy', () => {
  test('Basic', () => {
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

  it('should have a $data property', () => {
    const vm = new Vue({
      data() {
        return {
          a: 2,
        }
      },
    })
    expect(vm.$data.a).toBe(2)

    vm.$data.a = 3
    expect(vm.a).toEqual(3)
  })
})
