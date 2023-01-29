export const getModelValue = <T>(store: T) => {
  return (component: Component) => {
    const { uuid, property, modelValue } = component
    const { field, formId } = property || {}

    return modelValue
  }
}
