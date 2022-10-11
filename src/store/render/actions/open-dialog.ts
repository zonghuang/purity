/**
 * 打开对话框
 */
export function openDialog(targetId: string, components: Component[]) {
  const target = components.find(component => component.uuid === targetId)
  if (target) target.modelValue = true
}
