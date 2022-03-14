export interface IElement {
  uuid: string
  name: string
  type: string
  style: any
  events: IEvent[]
  propValue: any
  propConfig: any
  animations?: any[]
  childrens?: IElement[]
}

export interface IStyle {
  width?: string | number
  height?: string | number
  top?: string | number
  right?: string | number
  bottom?: string | number
  left?: string | number
  [key: string]: string | number | undefined
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

export interface IPage {
  id: string
  name: string
  elements: IElement[]
  settings: any
  modalList: any[]
}

export interface ISnapshot {
  id: string
  index: number
  List: any[]
}

export interface ITarget {
  index: number
  config: any
  parent: any
}

export interface IEvent {
  userAction?: string
  trigger?: [{ logical: string, conditions: any[] }]
  command?: string
  modalId?: string
  link?: string
  aTarget?: string
  api?: string
  method?: string
  params?: [{ key?: string, value?: string, keyValue?: string, type?: string }] | []
  thenEvents?: IEvent[]
}
export interface IOptions {
  label: string
  value: string | number | boolean
}
