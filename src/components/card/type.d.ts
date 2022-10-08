declare interface Card {
  uuid?: string
  name: 'card'
  style?: Style
  property: {
    type?: 'elevated' | 'filled' | 'outlined'
  }
  actions?: Action[]
  childrens: Component[]
}
