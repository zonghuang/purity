declare interface OutlinedButton {
  uuid: string
  name: 'outlined-button'
  style: Style
  property?: {
    label: string
    icon?: string
    disabled?: boolean
  }
  actions?: Action[]
}
