import { IFeedback } from './types'

export function feedback(option: IFeedback, message?: string) {
  console.log(option, message)
}
