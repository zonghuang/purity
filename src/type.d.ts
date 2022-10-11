declare type RequestConfig = import('@/service/types').RequestConfig
declare type CSSStyle = Partial<CSSStyleDeclaration>
declare type IObject = Record<string | number | symbol, any>
declare type InsertSeat = 'previous' | 'next' | 'inside'

declare interface RenderState {
  page: IPage
  cacheData: IObject
}

declare interface EditorState {
  pages: IPage[]
  currentPage: IPage
  currentComponent: Component | null
  snapshot: ISnapshot
  snapshotStore: ISnapshot[]
  time: number
}

declare interface Page {
  readonly _id?: string
  system: string
  module: string
  page: string
  title: string
  components: Component[]
  settings: any
}

declare interface Snapshot {
  id: string
  index: number
  list: any[]
}

declare interface Component {
  uuid: string
  name: string
  style?: CSSStyle
  property?: any
  modelValue?: any
  actions?: Action[]
  animations?: any[]
  children?: Component[]
  slots?: {
    name: string
    children: Component[]
  }[]
}

// events
declare type EventType =
  | 'click'
  | 'dbclick'
  | 'touch'
  | 'scroll'
  | 'update'
  | 'beforeMount'
  | 'mounted'
  | 'beforeUnmount'
  | 'activated'
  | 'deactivated'

// actions
declare type Action =
  | OpenDialog
  | CloseDialog
  | NavigateTo
  | Fetch
  | Download
  | Validate
  | resetValue
  | setValue
  | Delegation

declare interface OpenDialog {
  event?: EventType
  action: 'openDialog'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface CloseDialog {
  event?: EventType
  action: 'closeDialog'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface NavigateTo {
  event?: EventType
  action: 'navigateTo'
  options: Navigation
  condition: Condition
  thenActions: Action[]
}

declare interface Navigation {
  go?: number
  url?: string
  tab?: '_self' | '_blank'
  mode?: 'query' | 'params'
  name?: string
  payloads?: Payload[]
}

declare interface Fetch {
  event?: EventType
  action: 'fetch'
  options: FetchOption
  condition: Condition
  thenActions: Action[]
}

declare interface FetchOption extends RequestConfig {
  payloads: Payload[]
  headerPayloads?: Payload[]
}

declare interface Download {
  event?: EventType
  action: 'download'
  options: {
    // 待完善
  }
  condition: Condition
  thenActions: Action[]
}

declare interface Validate {
  event?: EventType
  action: 'validate'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface resetValue {
  event?: EventType
  action: 'resetValue'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface setValue {
  event?: EventType
  action: 'setValue'
  options: {
    payloads: Payload[]

    // 单个组件
    target?: {
      id: string
      path: string | string[]
      payloadKey?: string
    }

    // 多个组件
    targets?: {
      id: string
      path: string | string[]
      payloadKey?: string
    }[]
  }
  condition: Condition
  thenActions: Action[]
}

declare interface Delegation {
  event?: EventType
  action: 'delegation'
  options: DelegationOption
  condition: Condition
  thenActions: Action[]
}

declare interface DelegationOption {
  targetId: string
  event: EventType
}

// payload
declare interface IPayload {
  key?: string
  value?: string
  sourceId?: string
  jsonPath?: string
}

// condition
declare interface Condition {
  payloads: Payload[]
  expression: string
}

/**************
 * Pipeline
 **************/

declare interface CurrencyPipe {
  /**
   * 货币名称
   */
  currency?: 'CNY' | 'USD' | 'EUR' | 'GBP' | 'CHF' | 'JPY' | 'KRW' | 'HKD'
  /**
   * 前缀
   */
  prefix?: string
  /**
   * 后缀
   */
  suffix?: string
  /**
   * 保留小数点位数，默认 2 位
   */
  digits?: number
  /**
   * 是否千分位，默认 true
   */
  thousands?: boolean
}

declare interface DatePipe {
  format?: string
}

declare interface DecimalPipe {
  /**
   * 保留小数点位数，默认 2 位
   */
  digits?: number
  /**
   * 是否千分位，默认 true
   */
  thousands?: boolean
}

declare interface PercentPipe {
  /**
   * 保留小数点位数，默认 2 位
   */
  digits?: number
}

declare declare interface TextmapPipe {
  textMap: {
    origin?: number | string | boolean
    result?: string
  }[]
}
