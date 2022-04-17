export interface IPage {
  id: string
  name: string
  path: string
  elements: IElement[]
  settings: any
}

export interface IElement {
  uuid: string
  name: string
  type: string
  style: any
  events: IEvent[]
  modelValue: any
  propConfig: any
  animations?: any[]
  childrens?: IElement[]
}

export interface IEvent {
  userAction?: string
  bindCode?: string
  triggers?: any[]
  event: string
  option: IEventOption
  thenEvents: IEvent[]
}

export interface IEventOption {
  modalId?: string
  url?: string
  window?: string
  transferMode?: string
  params?: { type: string; key: string; value: string; deepProp?: string }[]
  api?: string
  method?: string
  loading?: boolean
  assign?: string
  target?: string
  targets?: { source: string; target: string }[]
}

export interface ITrbl {
  top: string | number
  right: string | number
  bottom: string | number
  left: string | number
}

export interface IStyle {
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
  userAction: string
  bindCode?: string
}

export interface IOptions {
  label: string
  value: string | number
}
