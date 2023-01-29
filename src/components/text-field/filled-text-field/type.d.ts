declare interface ElevatedButton {
  uuid?: string
  name: 'filled-text-field'
  style?: Style
  property: {
    label: string
    field: string
    type?: string
    placeholder?: string
    readonly?: boolean
    disabled?: boolean
    required?: boolean
    autocomplete?: 'off' | 'on'
    maxlength?: number
    minlength?: number
    size?: number
  }
  actions?: Action[]
}
