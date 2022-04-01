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

export interface IPage {
  id: string
  name: string
  elements: IElement[]
  settings: any
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

export interface IEventParams {
  key: string
  value: string
  type: string
}

export interface ITrigger {
  logical: string
  conditions: any[]
}

export interface IEvent {
  userAction?: string
  bindCode?: string
  trigger: ITrigger[]
  event: string
  modalId: string
  link: string
  aTarget: string
  api: string
  method: string
  showLoading: boolean
  params: IEventParams[]
  assignmentType: string
  valueToComp: string
  valueToComps: any[]
  sourceToTarget: any[]
  thenEvents: IEvent[]
}

export interface IAction {
  userAction: string
  bindCode?: string
}

export interface IParamValue {
  key: string
  value: any
}

export interface IOptions {
  label: string
  value: string | number
}
