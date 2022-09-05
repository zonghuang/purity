declare type RequestConfig = import('@/service/types').RequestConfig
// declare type IStyle = Partial<CSSStyleDeclaration>
declare type CSSProperties = import('csstype').Properties
declare type CSSPropertiesHyphen = import('csstype').Properties
declare interface IStyle extends CSSProperties, CSSPropertiesHyphen {}
declare type IObject = Record<string | number | symbol, any>
declare type InsertSeat = 'previous' | 'next' | 'inside'

declare interface IRenderState {
  page: IPage
  cacheData: IObject
}

declare interface IEditorState {
  pages: IPage[]
  currentPage: IPage
  currentComponent: IElement | null
  snapshot: ISnapshot,
  snapshotStore: ISnapshot[]
  time: number
}

declare interface IPage {
  readonly _id?: string
  system: string
  module: string
  page: string
  title: string
  elements: IElement[]
  settings: any
  actions?: IAction[]
}

declare interface IElement {
  uuid: string
  name: string
  type: string
  style: IStyle
  actions?: IAction[]
  modelValue?: any
  propConfig?: any
  animations?: any[]
  childrens?: IElement[]
}

declare interface IAction {
  event: 'click' | 'dbclick' | 'touch' | 'scroll' | 'update' | 'beforeMount' | 'mounted' | 'beforeUnmount'
  action: 'openModal' | 'closeModal' | 'linkto' | 'request' | 'download' | 'setValue' | 'resetValue' | 'print'
  option: ITarget & ILinkto & IRequest & ISetValue
  trigger?: ICondition
  thenActions?: IAction[]
  bindCode?: string
}

declare interface ITarget {
  targetId?: string
}

declare interface ILinkto {
  url?: string
  tab?: '_self' | '_blank'
  mode?: 'query' | 'params'
  name?: string
  payloads?: IPayload[]
}

declare interface IRequest extends RequestConfig {
  url?: string
  payloads?: IPayload[]
  headerPayloads?: IPayload[]
}

declare interface ISetValue {
  type?: 'modelValue' | 'options' | 'components' | 'store' | 'localCache' | 'sessionCache'
  payloads?: IPayload[]
  targetId?: string
  targets?: { sourceKey: string; targetId: string }[]
}

declare interface IPayload {
  key?: string
  value?: string
  sourceId?: string
  jsonPath?: string
}

declare interface ICondition {
  belong?: 'success' | 'error' | 'finally'
  type: 'show' | 'hide' | 'disable' | 'highlight'
  payloads: IPayload[]
  expression: string
  option?: {
    color?: string
    background?: string
  }
}

//

declare interface ISnapshot {
  id: string
  index: number
  list: any[]
}

//

declare interface ILib {
  label: string
  name: string
  childrens?: ILib[]
  icon?: string
}

declare interface IOption {
  label: string
  value: string | number
}


// table
declare interface ITableState {
  dataSource: any[]
  currentRow: IObject
  currentKey: string | number
  selectedRows: any[]
  selectedKeys: string[] | number[]
  summary: any
}
