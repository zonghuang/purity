class SessionCache {
  setCache(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = sessionStorage.getItem(key)
    try {
      if (value) return JSON.parse(value)
    } catch (err) {
      console.error(err)
      return value
    }
  }

  deleteCache(key: string) {
    sessionStorage.removeItem(key)
  }

  clearCache() {
    sessionStorage.clear()
  }
}

export const sessionCache = new SessionCache()
