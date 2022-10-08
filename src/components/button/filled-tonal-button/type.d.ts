declare interface FilledTonalButton {
  uuid?: string
  name: 'filled-tonal-button'
  style?: Style
  property: {
    label: string
    icon?: string
    disabled?: boolean
  }
  actions?: Action[]
}
