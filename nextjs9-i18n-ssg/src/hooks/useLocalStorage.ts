import { useState } from 'react'

export function useLocalStorage(key: string, initialValue: any = '') {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToString = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToString)
      window.localStorage.setItem(key, JSON.stringify(valueToString))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}