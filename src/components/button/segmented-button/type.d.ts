declare interface ElevatedButton {
  uuid?: string
  name: 'segmented-button'
  style?: Style
  property: {
    type?: 'single' | 'multi'
    segments: {
      label: string
      icon?: string
      disabled?: boolean
    }[]
  }
  actions?: Action[]
}
