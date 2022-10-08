declare interface Switch {
  uuid?: string
  name: 'switch'
  style?: Style
  property: {
    offIcon?: string
    onIcon?: string
  }
  actions?: Action[]
}
