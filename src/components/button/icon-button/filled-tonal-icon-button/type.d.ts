declare interface FilledTonalIconButton {
  uuid?: string
  name: 'filled-tonal-icon-button'
  style?: Style
  property: {
    icon: string
    disabled?: boolean
  }
  actions?: Action[]
}
