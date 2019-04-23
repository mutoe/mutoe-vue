class Vue {
  constructor(options) {
    this.$options = options

    const proxy = this.initDataProxy()
    return proxy
  }

  initDataProxy() {
    const data = this.$options.data()

    return new Proxy(this, {
      set(_, key, value) {
        data[key] = value
      },
      get(_, key) {
        return data[key]
      },
    })
  }
}

export default Vue
