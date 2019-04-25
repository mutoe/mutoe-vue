/**
 * Dynamic Vue instance by constractor
 * https://stackoverflow.com/questions/55826350/how-to-dynamically-declare-an-instance-property-of-a-class-from-a-constructor-in
 */
// tslint:disable-next-line:class-name
class _Vue<T extends Record<string, any>> {
  private $options: Partial<IOptions<T>>

  /** The object used to save the watchers callback */
  private dataNotifyChain: Record<string, IWatchCallback[]> = {}

  constructor(options: Partial<IOptions<T>> = {}) {
    this.$options = options

    const proxy = this.initDataProxy()
    this.initWatcher()

    return proxy
  }

  /** When the data changes, a method of declaration is called. */
  public $watch(prop: string, callback: IWatchCallback) {
    this.dataNotifyChain[prop] = this.dataNotifyChain[prop] || []
    this.dataNotifyChain[prop].push(callback)
  }

  private initDataProxy(): T & Vue<T> {
    const data = this.$options.data ? this.$options.data() : ({} as T)

    return new Proxy((this as unknown) as T & Vue<T>, {
      set: (_, key: string, value) => {
        if (key in data) {
          const oldVal = data[key]
          data[key] = value
          this.notifyDataChange(key, value, oldVal)
        }
        return true
      },
      get: (_, key: string) => {
        if (data[key]) {
          return data[key]
        }
        return this[key as keyof _Vue<T>]
      },
    })
  }

  /** Initial Watcher */
  private initWatcher() {
    this.dataNotifyChain = {}
  }

  /**  Call the callback in dataNotifyChain when the data is modified */
  private notifyDataChange<TValue>(
    prop: string,
    newValue: TValue,
    oldValue: TValue,
  ): void {
    if (!this.dataNotifyChain[prop]) return
    this.dataNotifyChain[prop].forEach((callback) => {
      callback(newValue, oldValue)
    })
  }
}

type Vue<T> = _Vue<T> & T
const Vue = _Vue as new <T>(options?: Partial<IOptions<T>>) => Vue<T>

interface IOptions<T extends Record<string, any>> {
  data: () => T
}

type IWatchCallback = (newValue: any, oldValue: any) => void

export default Vue
