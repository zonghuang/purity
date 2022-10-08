declare interface BottomSheet {
  uuid?: string
  name: 'bottom-sheet'
  style?: Style
  property: {
    type?: 'standard' | 'modal'
    dragHandle?: boolean
  }
  actions?: Action[]
  children: Component[]
}
