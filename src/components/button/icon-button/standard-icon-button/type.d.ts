declare interface StandardIconButton {
  uuid?: string
  name: 'standard-icon-button'
  style?: Style
  property: {
    icon: string
    disabled?: boolean
  }
  actions?: Action[]
}
