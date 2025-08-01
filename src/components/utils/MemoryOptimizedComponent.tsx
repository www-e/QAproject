"use client"

import { memo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAnimationCleanup, useEventListenerCleanup, useTimerCleanup } from '@/hooks/useAnimationCleanup'

// Example component showing proper memory cleanup
const MemoryOptimizedComponent = memo(function MemoryOptimizedComponent() {
  const { cleanupAnimations } = useAnimationCleanup()
  const { addEventListener, removeEventListener } = useEventListenerCleanup()
  const { setTimeout, clearTimeout, requestAnimationFrame } = useTimerCleanup()

  useEffect(() => {
    // Example: Add event listener with automatic cleanup
    const handleResize = () => {
      console.log('Window resized')
    }
    addEventListener(window, 'resize', handleResize)

    // Example: Set timer with automatic cleanup
    const timer = setTimeout(() => {
      console.log('Timer executed')
    }, 1000)


    // Manual cleanup if needed (automatic cleanup happens on unmount)
    return () => {
      // These are optional since hooks handle cleanup automatically
      removeEventListener(window, 'resize')
      clearTimeout(timer)
      cleanupAnimations()
    }
  }, [addEventListener, removeEventListener, setTimeout, clearTimeout, requestAnimationFrame, cleanupAnimations])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationStart={() => {
        // Animation started - could register for cleanup if needed
        // Note: Framer Motion handles its own cleanup automatically
      }}
      className="p-4 bg-card rounded-lg"
    >
      <h3>Memory Optimized Component</h3>
      <p>This component properly cleans up all resources on unmount.</p>
    </motion.div>
  )
})

export default MemoryOptimizedComponent