"use client"

// Touch and mobile-specific optimizations

interface TouchOptimizationConfig {
  enablePassiveListeners: boolean
  debounceDelay: number
  tapThreshold: number
  swipeThreshold: number
}

const defaultConfig: TouchOptimizationConfig = {
  enablePassiveListeners: true,
  debounceDelay: 16, // ~60fps
  tapThreshold: 10, // pixels
  swipeThreshold: 50 // pixels
}

class TouchOptimizer {
  private static instance: TouchOptimizer
  private config: TouchOptimizationConfig
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map()

  static getInstance(config?: Partial<TouchOptimizationConfig>): TouchOptimizer {
    if (!TouchOptimizer.instance) {
      TouchOptimizer.instance = new TouchOptimizer(config)
    }
    return TouchOptimizer.instance
  }

  constructor(config?: Partial<TouchOptimizationConfig>) {
    this.config = { ...defaultConfig, ...config }
    this.initializeOptimizations()
  }

  private initializeOptimizations() {
    if (typeof window === 'undefined') return

    // Disable 300ms tap delay on mobile
    this.disableTapDelay()
    
    // Optimize scroll performance
    this.optimizeScrolling()
    
    // Add touch feedback optimizations
    this.optimizeTouchFeedback()
  }

  private disableTapDelay() {
    // Add meta tag to disable tap delay
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      const content = viewport.getAttribute('content') || ''
      if (!content.includes('user-scalable=no')) {
        viewport.setAttribute('content', content + ', user-scalable=no')
      }
    }

    // Add CSS to disable tap highlights
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }
      
      input, textarea, [contenteditable] {
        -webkit-user-select: auto;
        user-select: auto;
      }
    `
    document.head.appendChild(style)
  }

  private optimizeScrolling() {
    // Add smooth scrolling CSS
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
      }
      
      /* Optimize scroll performance */
      .scroll-container {
        transform: translateZ(0);
        will-change: scroll-position;
      }
    `
    document.head.appendChild(style)
  }

  private optimizeTouchFeedback() {
    // Add CSS for better touch feedback
    const style = document.createElement('style')
    style.textContent = `
      .touch-feedback {
        position: relative;
        overflow: hidden;
      }
      
      .touch-feedback::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
        pointer-events: none;
      }
      
      .touch-feedback:active::after {
        width: 200px;
        height: 200px;
      }
    `
    document.head.appendChild(style)
  }

  // Debounced event handler
  debounce<T extends (...args: any[]) => void>(
    key: string,
    func: T,
    delay?: number
  ): T {
    const actualDelay = delay || this.config.debounceDelay
    
    return ((...args: any[]) => {
      const existingTimer = this.debounceTimers.get(key)
      if (existingTimer) {
        clearTimeout(existingTimer)
      }
      
      const timer = setTimeout(() => {
        func(...args)
        this.debounceTimers.delete(key)
      }, actualDelay)
      
      this.debounceTimers.set(key, timer)
    }) as T
  }

  // Optimized touch event handler
  createTouchHandler(
    onTap?: (event: TouchEvent) => void,
    onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', event: TouchEvent) => void
  ) {
    let startX = 0
    let startY = 0
    let startTime = 0

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      startTime = Date.now()
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      const endTime = Date.now()

      const deltaX = endX - startX
      const deltaY = endY - startY
      const deltaTime = endTime - startTime

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Check for tap
      if (distance < this.config.tapThreshold && deltaTime < 300) {
        onTap?.(event)
        return
      }

      // Check for swipe
      if (distance > this.config.swipeThreshold && deltaTime < 500) {
        const absX = Math.abs(deltaX)
        const absY = Math.abs(deltaY)

        if (absX > absY) {
          // Horizontal swipe
          onSwipe?.(deltaX > 0 ? 'right' : 'left', event)
        } else {
          // Vertical swipe
          onSwipe?.(deltaY > 0 ? 'down' : 'up', event)
        }
      }
    }

    return {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd
    }
  }

  // Passive event listener helper
  addPassiveListener(
    element: EventTarget,
    event: string,
    handler: EventListener
  ): () => void {
    const options = this.config.enablePassiveListeners ? { passive: true } : false
    element.addEventListener(event, handler, options)
    
    return () => element.removeEventListener(event, handler)
  }

  // Cleanup
  cleanup() {
    this.debounceTimers.forEach(timer => clearTimeout(timer))
    this.debounceTimers.clear()
  }
}

// Hook for using touch optimizations
export function useTouchOptimizations(config?: Partial<TouchOptimizationConfig>) {
  const optimizer = TouchOptimizer.getInstance(config)
  
  return {
    debounce: <T extends (...args: any[]) => void>(key: string, func: T, delay?: number) => 
      optimizer.debounce(key, func, delay),
    createTouchHandler: (
      onTap?: (event: TouchEvent) => void,
      onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', event: TouchEvent) => void
    ) => optimizer.createTouchHandler(onTap, onSwipe),
    addPassiveListener: (element: EventTarget, event: string, handler: EventListener) =>
      optimizer.addPassiveListener(element, event, handler)
  }
}

// Export singleton
export const touchOptimizer = TouchOptimizer.getInstance()