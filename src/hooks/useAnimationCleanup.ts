"use client"

import { useEffect, useRef } from 'react'
import { createAnimationCleanup } from '@/lib/memory-cleanup'

// Hook for cleaning up Framer Motion animations
export function useAnimationCleanup() {
  const cleanupRef = useRef(createAnimationCleanup())

  useEffect(() => {
    const cleanup = cleanupRef.current

    return () => {
      // Cleanup all animations when component unmounts
      cleanup.cleanupAnimations()
    }
  }, [])

  return {
    registerAnimation: cleanupRef.current.registerAnimation,
    removeAnimation: cleanupRef.current.removeAnimation,
    cleanupAnimations: cleanupRef.current.cleanupAnimations
  }
}

// Hook for cleaning up event listeners
export function useEventListenerCleanup() {
  const listenersRef = useRef<Array<{
    target: EventTarget
    type: string
    listener: EventListener
  }>>([])

  const addEventListener = (
    target: EventTarget,
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => {
    target.addEventListener(type, listener, options)
    listenersRef.current.push({ target, type, listener })
  }

  const removeEventListener = (target: EventTarget, type: string) => {
    const index = listenersRef.current.findIndex(
      item => item.target === target && item.type === type
    )
    if (index !== -1) {
      const { listener } = listenersRef.current[index]
      target.removeEventListener(type, listener)
      listenersRef.current.splice(index, 1)
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup all event listeners when component unmounts
      listenersRef.current.forEach(({ target, type, listener }) => {
        target.removeEventListener(type, listener)
      })
      listenersRef.current = []
    }
  }, [])

  return { addEventListener, removeEventListener }
}

// Hook for cleaning up timers
export function useTimerCleanup() {
  const timersRef = useRef<{
    timeouts: Set<NodeJS.Timeout>
    intervals: Set<NodeJS.Timeout>
    animationFrames: Set<number>
  }>({
    timeouts: new Set(),
    intervals: new Set(),
    animationFrames: new Set()
  })

  const setTimeout = (callback: () => void, delay: number): NodeJS.Timeout => {
    const timer = globalThis.setTimeout(() => {
      callback()
      timersRef.current.timeouts.delete(timer)
    }, delay)
    timersRef.current.timeouts.add(timer)
    return timer
  }

  const setInterval = (callback: () => void, delay: number): NodeJS.Timeout => {
    const interval = globalThis.setInterval(callback, delay)
    timersRef.current.intervals.add(interval)
    return interval
  }

  const requestAnimationFrame = (callback: FrameRequestCallback): number => {
    const frame = globalThis.requestAnimationFrame((time) => {
      callback(time)
      timersRef.current.animationFrames.delete(frame)
    })
    timersRef.current.animationFrames.add(frame)
    return frame
  }

  const clearTimeout = (timer: NodeJS.Timeout): void => {
    globalThis.clearTimeout(timer)
    timersRef.current.timeouts.delete(timer)
  }

  const clearInterval = (interval: NodeJS.Timeout): void => {
    globalThis.clearInterval(interval)
    timersRef.current.intervals.delete(interval)
  }

  const cancelAnimationFrame = (frame: number): void => {
    globalThis.cancelAnimationFrame(frame)
    timersRef.current.animationFrames.delete(frame)
  }

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      // Cleanup all timers when component unmounts
      timers.timeouts.forEach(timer => globalThis.clearTimeout(timer))
      timers.intervals.forEach(interval => globalThis.clearInterval(interval))
      timers.animationFrames.forEach(frame => globalThis.cancelAnimationFrame(frame))
      
      timers.timeouts.clear()
      timers.intervals.clear()
      timers.animationFrames.clear()
    }
  }, [])

  return {
    setTimeout,
    setInterval,
    requestAnimationFrame,
    clearTimeout,
    clearInterval,
    cancelAnimationFrame
  }
}