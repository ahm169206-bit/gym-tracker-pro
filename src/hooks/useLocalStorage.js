import { useState, useEffect, useRef } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.error('Failed to read from localStorage', err)
      return initialValue
    }
  })

  const isFirstRun = useRef(true)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      if (!isFirstRun.current) {
        setJustSaved(true)
        const t = setTimeout(() => setJustSaved(false), 1600)
        return () => clearTimeout(t)
      }
      isFirstRun.current = false
    } catch (err) {
      console.error('Failed to write to localStorage', err)
    }
  }, [key, value])

  return [value, setValue, justSaved]
}
