import VNode, { IVNodeData } from './vnode'

/**
 * Dynamic Vue instance by constractor
 * https://stackoverflow.com/questions/55826350/how-to-dynamically-declare-an-instance-property-of-a-class-from-a-constructor-in
 */
// tslint:disable-next-line:class-name
class _Vue<T extends Record<string, any>> {
  public $el: HTMLElement = document.createElement('null')
  public $data: T = {} as T

  private $options: Partial<IOptions<T>>

  /** The object used to save the watchers callback */
  private dataNotifyChain: Record<string, IWatchCallback[]> = {}

  constructor(options: Partial<IOptions<T>> = {}) {
    this.$options = options
    this.$data = options.data ? options.data() : ({} as T)

    const proxy = this.initDataProxy()
    this.initWatcher()

    return proxy
  }

  public $mount(root?: HTMLElement) {
    if (this.$options.render) {
      const vnode = this.$options.render(this.createElement)
      this.$el = this.createDom(vnode)
      if (root) {
        root.appendChild(this.$el)
      }
    }
    return this
  }

  /** When the data changes, a method of declaration is called. */
  public $watch(prop: string, callback: IWatchCallback) {
    this.dataNotifyChain[prop] = this.dataNotifyChain[prop] || []
    this.dataNotifyChain[prop].push(callback)
  }

  private createElement: ICreateElement = (tag, data, children) => {
    return new VNode(tag, data, children)
  }

  private createDom(vnode: VNode) {
    const el = document.createElement(vnode.tag)

    if (vnode.data) {
      for (const key in vnode.data.attrs) {
        if (vnode.data.hasOwnProperty(key)) {
          el.setAttribute(key, vnode.data.attrs[key])
        }
      }
    }

    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else if (vnode.children) {
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

  private initDataProxy(): T & Vue<T> {
    return new Proxy((this as unknown) as T & Vue<T>, {
      set: (_, key: keyof _Vue<T> | keyof T, value) => {
        if (key in this.$data) {
          const oldVal = this.$data[key]
          this.$data[key] = value
          this.notifyDataChange(key as string, value, oldVal)
        } else {
          this[key as keyof _Vue<T>] = value
        }
        return true
      },
      get: (_, key: keyof T | keyof _Vue<T>) => {
        if (key in this.$data) return this.$data[key]
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
  render: (h: ICreateElement) => VNode
}

type IWatchCallback = (newValue: any, oldValue: any) => void

type ICreateElement = (
  tag: keyof HTMLElementTagNameMap,
  data?: IVNodeData | null,
  children?: Array<VNode | string> | string,
) => VNode

export default Vue
