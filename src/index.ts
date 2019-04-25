/**
 * Dynamic Vue instance by constractor
 * https://stackoverflow.com/questions/55826350/how-to-dynamically-declare-an-instance-property-of-a-class-from-a-constructor-in
 */
// tslint:disable-next-line:class-name
class _Vue<T extends Record<string, any>> {
  private $options: Partial<IOptions<T>>

  constructor(options: Partial<IOptions<T>> = {}) {
    this.$options = options

    const proxy = this.initDataProxy()
    return proxy
  }

  private initDataProxy(): T & Vue<T> {
    const data = this.$options.data ? this.$options.data() : ({} as T)

    return new Proxy((this as unknown) as T & Vue<T>, {
      set: (_, key: string, value) => {
        if (key in data) {
          data[key] = value
        }
        return true
      },
      get: (_, key: string) => {
        return data[key]
      },
    })
  }
}

/**
 * Vue Class
 */
type Vue<T> = _Vue<T> & T
const Vue: new <T>(data: IOptions<T>) => Vue<T> = _Vue as any

interface IOptions<T extends Record<string, any>> {
  data: () => T
}

export default Vue
