import { useState } from 'react'

import { BrowserStorage } from '../classes'

const useLocalStorage = (
  key: string,
  initialValue?: string,
  storageType: StorageType = 'localStorage',
): [string | undefined, (v: any) => void] => {
  const [storedValue, setStoredValue] = useState<string | undefined>(() => {
    try {
      const item = BrowserStorage.getStorage(storageType).getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  const setValue = (value): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      BrowserStorage.getStorage(storageType).setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  }
  return [storedValue, setValue]
}

export default useLocalStorage
