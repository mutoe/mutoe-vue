import Vue from '../src/index'

describe('Demo', () => {
  it('Basic', () => {
    const vm = new Vue({
      data() {
        return {
          a: 0,
        }
      },
      render(h) {
        return h(
          'button',
          {
            on: { click: this.handleClick },
          },
          this.a,
        )
      },
      methods: {
        handleClick() {
          this.a++
        },
      },
    }).$mount()

    document.body.append(vm.$el)
  })
})
