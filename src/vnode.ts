export default class VNode {
  /** HTML 标签字符串 */
  public tag: keyof HTMLElementTagNameMap

  /** VNode 数据对象 */
  public data?: IVNodeData | null

  /** 子虚拟节点 */
  public children?: Array<VNode | string> | string

  constructor(
    tag: keyof HTMLElementTagNameMap,
    data?: IVNodeData | null,
    children?: Array<VNode | string> | string,
  ) {
    this.tag = tag
    this.data = data
    this.children = children
  }
}

export interface IVNodeData {
  /** 和`v-bind:class`一样的 API, 接收一个字符串、对象或字符串和对象组成的数组 */
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>

  /** 和`v-bind:style`一样的 API, 接收一个字符串、对象或对象组成的数组 */
  style?: string | Record<string, string> | Array<Record<string, string>>

  /** 普通的 HTML 特性 */
  attrs?: Record<string, string>

  /** DOM 属性 */
  domProps?: Record<string, any>

  /** 事件监听器 */
  on?: Record<string, (...rest: any[]) => void>
}
