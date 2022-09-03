import { ILoading } from './types'

/**
 * There are two types of progress indicators: Linear and circular
 */
export class Progress {
  loading(option: boolean | ILoading) {
    console.log('loading', option)
  }

  unloading() {
    console.log('unloading')
  }
}
