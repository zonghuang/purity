export interface ElementT {
  version: string,
  uuid: string
  name: string
  style: object
  animations: Array<object>
  config: object
  events: object
  childrens: object[]
  data: any
}
