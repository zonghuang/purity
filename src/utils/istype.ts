/**
 * undefined, null, false, '' 返回 true
 */
export const isToUndefined = (operand: any) => {
  return ([undefined, null, false, ''].includes(operand))
}

