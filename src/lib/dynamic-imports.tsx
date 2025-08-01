"use client"

import { lazy, Suspense, ComponentType } from "react"
import { motion } from "framer-motion"

// Loading fallback component that preserves layout
const PageLoader = () => (
  <div className="container mx-auto p-6 space-y-8 animate-pulse">
    <div className="h-8 bg-muted rounded-lg w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-muted rounded-lg" />
      ))}
    </div>
    <div className="h-64 bg-muted rounded-lg" />
  </div>
)

// Enhanced dynamic import with preloading
export function createDynamicPage<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
) {
  const LazyComponent = lazy(importFn)
  
  const DynamicPage = (props: any) => {
    // Fix: Capitalize the fallback component for proper React rendering
    const FallbackComponent = fallback || PageLoader
    
    return (
      <Suspense fallback={<FallbackComponent />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ transform: 'translate3d(0, 0, 0)' }} // GPU acceleration
          className="will-change-transform"
        >
          <LazyComponent {...props} />
        </motion.div>
      </Suspense>
    )
  }
  
  // Add preload method for prefetching
  DynamicPage.preload = importFn
  
  return DynamicPage
}

// Enhanced preload function with better error handling and performance
export function preloadPage(importFn: () => Promise<any>) {
  // Use requestIdleCallback for better performance
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => {
          importFn().catch((error) => {
            // Optional: Add subtle error logging for debugging
            if (process.env.NODE_ENV === 'development') {
              console.debug('Preload failed:', error)
            }
          })
        },
        { timeout: 2000 } // Timeout to prevent blocking
      )
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        importFn().catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            console.debug('Preload failed:', error)
          }
        })
      }, 100)
    }
  }
}

// Bonus: Enhanced preload with intersection observer for tabs
export function preloadOnHover(
  element: HTMLElement | null,
  importFn: () => Promise<any>
) {
  if (!element || typeof window === 'undefined') return

  let hasPreloaded = false
  
  const handleMouseEnter = () => {
    if (!hasPreloaded) {
      hasPreloaded = true
      preloadPage(importFn)
    }
  }

  element.addEventListener('mouseenter', handleMouseEnter, { once: true })
  
  // Cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
  }
}
