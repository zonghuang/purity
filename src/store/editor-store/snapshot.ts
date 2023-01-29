import { cloneDeep } from 'lodash-es'
import { useEditStore } from './index'


export const useSnapshot = defineStore('snapshot', {
  state: () => ({
    snapshot: {} as Snapshot,
    snapshotStore: any
  }),

  actions: {
    // 记录快照
    recordSnapshot() {
      const editStore = useEditStore()

      this.snapshot.list[++this.snapshot.index] = cloneDeep(editStore.currentPage.components)
      if (this.snapshot.index < this.snapshot.list.length - 1) {
        this.snapshot.list = this.snapshot.list.slice(0, this.snapshot.index + 1)
      }
    },

    // 保存快照
    saveSnapshot() {
      const editStore = useEditStore()
      const index = this.snapshotStore.findIndex((item) => item.id === editStore.currentPage.page)
      this.snapshotStore.splice(index, 1, this.snapshot)
    },
  }
})


const hotUpdate = (store: any) => {
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
  }
}


hotUpdate(useSnapshot)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSnapshot, import.meta.hot))
}
