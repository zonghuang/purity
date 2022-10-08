declare interface ElevatedButton {
  uuid?: string
  name: 'extended-fab'
  style?: Style
  property: {
    label: string
    icon?: string
    disabled?: boolean
  }
  actions?: Action[]
}
