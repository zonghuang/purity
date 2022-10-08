declare interface FilledIconButton {
  uuid?: string
  name: 'filled-icon-button'
  style?: Style
  property: {
    icon: string
    disabled?: boolean
  }
  actions?: Action[]
}
