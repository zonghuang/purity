import CSS from 'csstype'

export interface IStyle extends CSS.Properties, CSS.PropertiesHyphen {}

export interface IPage {
  readonly _id?: string
  system: string
  module: string
  name: string
  title: string
  elements: IElement[]
  settings: any
}

export interface IElement {
  uuid: string
  name: string
  type: string
  style: IStyle
  events: IEvent[]
  modelValue: any
  propConfig: any
  animations?: any[]
  childrens?: IElement[]
}

// 'openModal' | 'closeModal' | 'link' | 'fetch' | 'set' | 'reset' | ''
export interface IEvent {
  event?: 'click' | 'dbclick' | 'touch' | 'scroll' | 'update' | 'mount' | 'unmount' | ''
  bindCode?: string
  triggers?: any[]
  action: string
  option: IEventOption
  thenEvents: IEvent[]
}

export interface IEventOption {
  url?: string
  tab?: '_self' | '_blank' | ''
  mode?: 'query' | 'params' | ''
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD' | 'PUT' | ''
  loading?: boolean
  params?: IEventParam[]
  assign?: 'component' | 'componentOptions' | 'components' | 'cacheData' | ''
  target?: string
  targets?: { target: string; source: string }[]
}

export interface IEventParam {
  type: string
  key: string
  value: string
  path?: string
}

export interface ITrbl {
  top?: string | number
  right?: string | number
  bottom?: string | number
  left?: string | number
}

export interface IKeyValue {
  [key: string]: string | number
}

export interface IComponentConfig {
  [key: string]: IElement
}

export interface ILib {
  label: string
  name: string
  childrens?: ILib[]
  icon?: string
}

export interface ISnapshot {
  id: string
  index: number
  list: any[]
}

export interface ITarget {
  index: number
  config: IElement
  parent: IElement[]
}

export interface IAction {
  event: string
  bindCode?: string
}

export interface IOptions {
  label: string
  value: string | number
}
