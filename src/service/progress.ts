import { Loading } from './types'

/**
 * There are two types of progress indicators: Linear and circular
 */
export class Progress {
  loading(option: boolean | Loading) {
    console.log('loading', option)
  }

  unloading() {
    console.log('unloading')
  }
}
