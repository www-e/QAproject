"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isPageReady: boolean
  setIsPageReady: (ready: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPageReady, setIsPageReady] = useState(false)

  // Auto-start loading sequence when component mounts
  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Small delay before starting page animations
      setTimeout(() => {
        setIsPageReady(true)
      }, 100)
    }, 4000) // 4 seconds for the journey

    return () => clearTimeout(timer)
  }, [])

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setIsLoading,
      isPageReady,
      setIsPageReady
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}