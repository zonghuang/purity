
export const isToUndefined = (operand: any) => {
  return ([undefined, null, false, ''].includes(operand))
}

