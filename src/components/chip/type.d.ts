declare interface chip {
  uuid?: string
  name: 'chip'
  style?: Style
  property: {
    icon: string
    label: string
  }
  actions?: Action[]
}
