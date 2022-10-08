declare interface FilledButton {
  uuid?: string
  name: 'filled-button'
  style?: Style
  property: {
    label: string
    icon?: string
    disabled?: boolean
  }
  actions?: Action[]
}
