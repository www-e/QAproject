"use client"

// Performance monitoring utilities

interface PerformanceMetrics {
  navigationTiming: number
  renderTime: number
  memoryUsage: number
  fps: number
  deviceInfo: {
    isMobile: boolean
    isLowEnd: boolean
    connectionSpeed: string
    batteryLevel?: number
  }
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Partial<PerformanceMetrics> = {}
  private observers: PerformanceObserver[] = []
  private frameCount = 0
  private lastFrameTime = 0
  private fps = 60

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring()
    }
  }

  private initializeMonitoring() {
    // Monitor navigation timing
    this.measureNavigationTiming()
    
    // Monitor FPS
    this.startFPSMonitoring()
    
    // Monitor memory usage
    this.measureMemoryUsage()
    
    // Detect device capabilities
    this.detectDeviceInfo()
    
    // Monitor Core Web Vitals
    this.monitorWebVitals()
  }

  private measureNavigationTiming() {
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing
      const navigationTime = timing.loadEventEnd - timing.navigationStart
      this.metrics.navigationTiming = navigationTime
    }
  }

  private startFPSMonitoring() {
    const measureFPS = (timestamp: number) => {
      if (this.lastFrameTime) {
        this.frameCount++
        const elapsed = timestamp - this.lastFrameTime
        
        if (elapsed >= 1000) {
          this.fps = Math.round((this.frameCount * 1000) / elapsed)
          this.metrics.fps = this.fps
          this.frameCount = 0
          this.lastFrameTime = timestamp
          
          // Warn if FPS drops below 30
          if (this.fps < 30) {
            console.warn(`Low FPS detected: ${this.fps}fps`)
            this.onLowPerformance()
          }
        }
      } else {
        this.lastFrameTime = timestamp
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    requestAnimationFrame(measureFPS)
  }

  private measureMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.metrics.memoryUsage = memory.usedJSHeapSize
    }
  }

  private detectDeviceInfo() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Detect low-end devices
    const isLowEnd = (
      (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4 ||
      navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4 ||
      (isMobile && (
        /Android [1-6]/.test(navigator.userAgent) ||
        /iPhone OS [1-9]_/.test(navigator.userAgent)
      ))
    )

    // Detect connection speed
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    const connectionSpeed = connection ? 
      (connection.effectiveType === '4g' ? 'fast' : 'slow') : 
      'unknown'

    // Get battery level if available
    let batteryLevel: number | undefined
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        batteryLevel = battery.level
      })
    }

    this.metrics.deviceInfo = {
      isMobile,
      isLowEnd,
      connectionSpeed,
      batteryLevel
    }
  }

  private monitorWebVitals() {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('LCP:', lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)
      } catch (e) {
        // Ignore if not supported
      }

      // Monitor First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              console.log('FID:', entry.processingStart - entry.startTime)
            }
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)
      } catch (e) {
        // Ignore if not supported
      }

      // Monitor Cumulative Layout Shift (CLS)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          console.log('CLS:', clsValue)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (e) {
        // Ignore if not supported
      }
    }
  }

  private onLowPerformance() {
    // Emit event for components to react to low performance
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('lowPerformance', {
        detail: { fps: this.fps, metrics: this.metrics }
      }))
    }
  }

  // Public methods
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  getFPS(): number {
    return this.fps
  }

  isLowEndDevice(): boolean {
    return this.metrics.deviceInfo?.isLowEnd || false
  }

  isMobileDevice(): boolean {
    return this.metrics.deviceInfo?.isMobile || false
  }

  measureComponentRender(componentName: string, renderFn: () => void): number {
    const startTime = performance.now()
    renderFn()
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`)
    return renderTime
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Hook for using performance monitoring
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance()
  
  return {
    getMetrics: () => monitor.getMetrics(),
    getFPS: () => monitor.getFPS(),
    isLowEndDevice: () => monitor.isLowEndDevice(),
    isMobileDevice: () => monitor.isMobileDevice(),
    measureRender: (name: string, fn: () => void) => monitor.measureComponentRender(name, fn)
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance()

// Auto-start monitoring in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Performance monitoring started')
}