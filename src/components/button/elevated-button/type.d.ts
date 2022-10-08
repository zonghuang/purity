declare interface ElevatedButton {
  uuid?: string
  name: 'elevated-button'
  style?: Style
  property: {
    label: string
    icon?: string
    disabled?: boolean
  }
  actions?: Action[]
}
