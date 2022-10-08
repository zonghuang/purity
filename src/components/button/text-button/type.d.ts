declare interface TextButton {
  uuid: string
  name: 'text-button'
  style: Style
  property?: {
    label: string
    icon?: string
    disabled?: boolean
  }
  actions?: Action[]
}
