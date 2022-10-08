declare interface ElevatedButton {
  uuid?: string
  name: 'fab'
  style?: Style
  property: {
    icon: string
    size?: 'default' | 'large' | 'small'
    disabled?: boolean
  }
  actions?: Action[]
}
