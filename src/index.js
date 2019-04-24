class Vue {
  constructor(options) {
    this.$options = options

    const proxy = this.initDataProxy()
    this.initWatch()

    return proxy
  }

  $watch(key, cb) {
    this.dataNotifyChain[key] = this.dataNotifyChain[key] || []
    this.dataNotifyChain[key].push(cb)
  }

  initDataProxy() {
    const data = this.$options.data()

    return new Proxy(this, {
      set: (_, key, value) => {
        const oldVal = data[key]
        data[key] = value
        if (oldVal !== value) this.notifyDataChange(key, value, oldVal)
        return true
      },
      get: (_, key) => {
        if (key in this) return this[key]
        return data[key]
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
