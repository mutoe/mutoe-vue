class Vue {
  private $options: IOptions

  constructor(options: IOptions = {}) {
    this.$options = options

    const proxy = this.initDataProxy()
    return proxy
  }

  private initDataProxy() {
    const data = this.$options.data()

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

interface IOptions {
  data: () => Record<string, any>
}
