declare interface Badge {
  uuid: string
  name: 'badge'
  style: Style
  property?: {
    type: 'small' | 'large'
    label: string
    icon: string
  }
  actions?: Action[]
}
