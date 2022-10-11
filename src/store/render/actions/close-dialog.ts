/**
 * 关闭对话框
 */
export function closeDialog(targetId: string, components: Component[]) {
  const target = components.find(component => component.uuid === targetId)
  if (target) target.modelValue = false
}
