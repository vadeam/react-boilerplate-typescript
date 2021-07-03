declare global {
  type StorageType = 'localStorage' | 'sessionStorage'
}

export class BrowserStorage implements Storage {
  private storage: typeof localStorage | typeof sessionStorage | undefined

  constructor(public readonly storageType: StorageType = 'localStorage') {
    this.storage = BrowserStorage.createStorage(storageType)
  }

  private static createStorage(type: StorageType): Storage | undefined {
    const storage: Storage = window[type]

    try {
      const x = '__storage_test__'

      storage.setItem(x, x)
      storage.removeItem(x)

      return storage
    } catch (e) {
      if (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      ) {
        return storage
      }
    }

    return undefined
  }

  public static getStorage(storageType: StorageType = 'localStorage'): Storage {
    return BrowserStorage[storageType] || new BrowserStorage(storageType)
  }

  public get length(): number {
    return this.storage?.length || 0
  }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  clear(): void {
    this.storage?.clear()
  }

  /**
   * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
   */
  getItem(key: string): string | null {
    return this.storage?.getItem(key) ?? null
  }

  /**
   * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of key/value pairs in the object.
   */
  key(index: number): string | null {
    return this.storage?.key(index) ?? null
  }

  /**
   * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
   */
  removeItem(key: string): void {
    this.storage?.removeItem(key)
  }

  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   */
  setItem(key: string, value: string): void {
    this.storage?.setItem(key, value)
  }
}
