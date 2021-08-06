export let defaultLocalStorage = window?.localStorage


export function setDefaultLocalStorage(localStorage) {
  defaultLocalStorage = localStorage
}


function errorHandler(err: any) {
  console.error('MasterHook. LocalStorage error: ', err)
}


export interface LocalStorage {
  getItem: (key: string) => Promise<any>
  getWithHeaders: (key: string) => Promise<{
    type: string
    body: any
    timestamp: string
  }>
  setItem: (key: string, value?: string | object | boolean) => Promise<boolean>
  removeItem: (key: string) => Promise<boolean>
  clear: () => Promise<boolean>
}

export const localStorage: LocalStorage = {
  getItem: async (key) => {
    try {
      const value = await defaultLocalStorage.getItem(key)
      if (!value) {
        return
      }
      const result = JSON.parse(value)?.body
      return result
    } catch(e) {
      errorHandler(e)
    }
  },


  getWithHeaders: async (key) => {
    try {
      const value = await defaultLocalStorage.getItem(key)
      if (!value) {
        return
      }
      const result = JSON.parse(value)
      return result
    } catch(e) {
      errorHandler(e)
    }
  },

  setItem: async (key, value) => {
    try {
      const newValue = JSON.stringify({
        type: typeof value,
        body: value,
        timestamp: new Date().toISOString(),
      })
      defaultLocalStorage.setItem(key, newValue)
      return true
    } catch(e) {
      errorHandler(e)
      return false
    }
  },

  removeItem: async (key) => {
    try {
      defaultLocalStorage.removeItem(key)
      return true
    } catch(e) {
      errorHandler(e)
      return false
    }
  },

  clear: async () => {
    try {
      defaultLocalStorage.clear()
      return true
    } catch(e) {
      errorHandler(e)
      return false
    }
  }
}