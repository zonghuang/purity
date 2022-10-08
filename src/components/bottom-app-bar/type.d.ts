declare interface BottomAppBar {
  uuid?: string
  name: 'bottom-app-bar'
  style?: Style
  property: {

  }
  slots: [
    {
      name: 'fab',
      children: ElevatedButton[]
    },
    {
      name: 'icon-button',
      children: IconButton[]
    }
  ]
}
