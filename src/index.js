import VNode from './vnode'

class Vue {
  constructor(options) {
    this.$options = options

    this.proxy = this.initDataProxy()
    this.initWatch()

    return this.proxy
  }

  $watch(key, cb) {
    this.dataNotifyChain[key] = this.dataNotifyChain[key] || []
    this.dataNotifyChain[key].push(cb)
  }

  $mount(root) {
    const { mounted, render } = this.$options
    const vnode = render.call(this.proxy, this.createElement)
    this.$el = this.createDom(vnode)
    if (root) {
      root.appendChild(this.$el)
    }

    mounted && mounted.call(this.proxy)

    return this
  }

  createElement(tag, data, children) {
    return new VNode(tag, data, children)
  }

  createDom(vnode) {
    const el = document.createElement(vnode.tag)
    for (let key in vnode.data) {
      el.setAttribute(key, vnode.data[key])
    }

    // Dom event listener
    const events = (vnode.data || {}).on || {}
    for (let key in events) {
      el.addEventListener(key, events[key])
    }

    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach((child) => {
        if (typeof child === 'string') {
          el.textContent = child
        } else {
          el.appendChild(this.createDom(child))
        }
      })
    }
    return el
  }

  initDataProxy() {
    const data = this.$options.data ? this.$options.data() : {}

    return new Proxy(this, {
      set: (_, key, value) => {
        if (key in data) {
          const oldVal = data[key]
          data[key] = value
          if (oldVal !== value) this.notifyDataChange(key, value, oldVal)
        } else {
          this[key] = value
        }
        return true
      },
      get: (_, key) => {
        const methods = this.$options.methods || {}
        if (key in data) return data[key]
        if (key in methods) return methods[key].bind(this.proxy)
        return this[key]
      },
    })
  }

  initWatch() {
    this.dataNotifyChain = {}
  }

  notifyDataChange(key, val, oldVal) {
    (this.dataNotifyChain[key] || []).forEach((cb) => cb(val, oldVal))
  }
}

export default Vue
