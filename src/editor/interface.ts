export interface IElement {
  uuid: string
  name: string
  type?: string
  style: object
  events?: object[]
  propValue: any
  propConfig: object
  animations?: object[]
  childrens?: IElement[]
}

export interface IComponentConfig {
  [key: string]: IElement
}

export interface ILib {
  label: string
  name: string
  children?: ILib[]
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
}
