declare interface OutlinedIcondButton {
  uuid?: string
  name: 'outlined-icon-button'
  style?: Style
  property: {
    icon: string
    disabled?: boolean
  }
  actions?: Action[]
}
