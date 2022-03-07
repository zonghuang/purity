export interface IElement {
  uuid: string
  name: string
  type?: string
  style: any
  events?: any[]
  propValue: any
  propConfig: any
  animations?: any[]
  childrens?: IElement[]
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

export interface ICoord {
  x: number
  y: number
}

export interface IState {
  coord: ICoord
  canvasOffset: ICoord
  elementOffset: ICoord
  pages: IPage[]
  currentPage: IPage
  currentComponent: IElement | null
}

export interface IPage {
  id: string
  name: string
  elements: IElement[]
  settings: object
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
