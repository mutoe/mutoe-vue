import Vue from '../src/index'

describe('Method', () => {
  it('Basic', () => {
    const vm = new Vue({
      data() {
        return {
          a: 1,
        }
      },
      methods: {
        hello() {
          return {
            self: this,
            msg: 'hello',
            b: this.a,
          }
        },
      },
    })

    const ret = vm.hello()

    expect(ret.self).toEqual(vm)
    expect(ret.msg).toEqual('hello')
    expect(ret.b).toEqual(1)
  })
})
