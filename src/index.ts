class Vue {
  $options: Options = {}

  constructor(options: object) {
    this.$options = options

    const proxy = this.initDataProxy()
    return proxy
  }

  initDataProxy() {
    const data = this.$options.data

    return new Proxy(this, {
      set(_, key, value) {
        data[key] = value
        return true
      },
      get(_, key) {
        return data[key]
      },
    })
  }
}

export default Vue

interface Options {
  data?: any
}
