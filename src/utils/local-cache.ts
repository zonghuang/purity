class LocalCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = localStorage.getItem(key)
    try {
      if (value) return JSON.parse(value)
    } catch (err) {
      console.error(err)
      return value
    }
  }

  deleteCache(key: string) {
    localStorage.removeItem(key)
  }

  clearLocal() {
    localStorage.clear()
  }
}

export const localCache = new LocalCache()
