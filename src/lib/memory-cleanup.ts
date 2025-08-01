"use client"

// Memory cleanup utilities for preventing leaks

export class MemoryCleanupManager {
  private static instance: MemoryCleanupManager
  private cleanupTasks: Map<string, () => void> = new Map()
  private timers: Set<NodeJS.Timeout> = new Set()
  private intervals: Set<NodeJS.Timeout> = new Set()
  private animationFrames: Set<number> = new Set()
  private eventListeners: Map<EventTarget, Map<string, EventListener>> = new Map()

  static getInstance(): MemoryCleanupManager {
    if (!MemoryCleanupManager.instance) {
      MemoryCleanupManager.instance = new MemoryCleanupManager()
    }
    return MemoryCleanupManager.instance
  }

  // Register a cleanup task
  registerCleanup(id: string, cleanup: () => void): void {
    this.cleanupTasks.set(id, cleanup)
  }

  // Execute and remove a specific cleanup task
  executeCleanup(id: string): void {
    const cleanup = this.cleanupTasks.get(id)
    if (cleanup) {
      cleanup()
      this.cleanupTasks.delete(id)
    }
  }

  // Execute all cleanup tasks
  executeAllCleanups(): void {
    this.cleanupTasks.forEach(cleanup => cleanup())
    this.cleanupTasks.clear()
  }

  // Managed setTimeout that auto-cleans up
  setTimeout(callback: () => void, delay: number): NodeJS.Timeout {
    const timer = setTimeout(() => {
      callback()
      this.timers.delete(timer)
    }, delay)
    this.timers.add(timer)
    return timer
  }

  // Managed setInterval that auto-cleans up
  setInterval(callback: () => void, delay: number): NodeJS.Timeout {
    const interval = setInterval(callback, delay)
    this.intervals.add(interval)
    return interval
  }

  // Managed requestAnimationFrame that auto-cleans up
  requestAnimationFrame(callback: FrameRequestCallback): number {
    const frame = requestAnimationFrame((time) => {
      callback(time)
      this.animationFrames.delete(frame)
    })
    this.animationFrames.add(frame)
    return frame
  }

  // Managed event listener that auto-cleans up
  addEventListener(
    target: EventTarget, 
    type: string, 
    listener: EventListener, 
    options?: boolean | AddEventListenerOptions
  ): void {
    target.addEventListener(type, listener, options)
    
    if (!this.eventListeners.has(target)) {
      this.eventListeners.set(target, new Map())
    }
    this.eventListeners.get(target)!.set(type, listener)
  }

  // Clear specific timer
  clearTimeout(timer: NodeJS.Timeout): void {
    clearTimeout(timer)
    this.timers.delete(timer)
  }

  // Clear specific interval
  clearInterval(interval: NodeJS.Timeout): void {
    clearInterval(interval)
    this.intervals.delete(interval)
  }

  // Clear specific animation frame
  cancelAnimationFrame(frame: number): void {
    cancelAnimationFrame(frame)
    this.animationFrames.delete(frame)
  }

  // Remove specific event listener
  removeEventListener(target: EventTarget, type: string): void {
    const listeners = this.eventListeners.get(target)
    if (listeners) {
      const listener = listeners.get(type)
      if (listener) {
        target.removeEventListener(type, listener)
        listeners.delete(type)
        if (listeners.size === 0) {
          this.eventListeners.delete(target)
        }
      }
    }
  }

  // Clean up all managed resources
  cleanupAll(): void {
    // Clear all timers
    this.timers.forEach(timer => clearTimeout(timer))
    this.timers.clear()

    // Clear all intervals
    this.intervals.forEach(interval => clearInterval(interval))
    this.intervals.clear()

    // Cancel all animation frames
    this.animationFrames.forEach(frame => cancelAnimationFrame(frame))
    this.animationFrames.clear()

    // Remove all event listeners
    this.eventListeners.forEach((listeners, target) => {
      listeners.forEach((listener, type) => {
        target.removeEventListener(type, listener)
      })
    })
    this.eventListeners.clear()

    // Execute all cleanup tasks
    this.executeAllCleanups()
  }
}

// Hook for using memory cleanup in components
export function useMemoryCleanup(componentId: string) {
  const cleanup = MemoryCleanupManager.getInstance()

  // Return cleanup utilities
  return {
    registerCleanup: (task: () => void) => cleanup.registerCleanup(componentId, task),
    setTimeout: (callback: () => void, delay: number) => cleanup.setTimeout(callback, delay),
    setInterval: (callback: () => void, delay: number) => cleanup.setInterval(callback, delay),
    requestAnimationFrame: (callback: FrameRequestCallback) => cleanup.requestAnimationFrame(callback),
    addEventListener: (target: EventTarget, type: string, listener: EventListener, options?: boolean | AddEventListenerOptions) => 
      cleanup.addEventListener(target, type, listener, options),
    cleanup: () => cleanup.executeCleanup(componentId)
  }
}

// Animation interface for type safety
interface Animation {
  stop?: () => void
}

// Framer Motion animation cleanup utilities
export function createAnimationCleanup() {
  const activeAnimations = new Set<Animation>()
  
  return {
    // Register an animation for cleanup
    registerAnimation: (animation: Animation) => {
      activeAnimations.add(animation)
    },
    
    // Stop and cleanup all animations
    cleanupAnimations: () => {
      activeAnimations.forEach(animation => {
        if (animation && typeof animation.stop === 'function') {
          animation.stop()
        }
      })
      activeAnimations.clear()
    },
    
    // Remove specific animation
    removeAnimation: (animation: Animation) => {
      activeAnimations.delete(animation)
    }
  }
}

// Global cleanup for page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    MemoryCleanupManager.getInstance().cleanupAll()
  })
}