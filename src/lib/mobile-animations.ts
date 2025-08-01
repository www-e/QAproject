"use client"

// Mobile animation optimization utilities

interface DeviceCapabilities {
  isMobile: boolean
  isLowEnd: boolean
  prefersReducedMotion: boolean
  batteryLevel?: number
  connectionSpeed: 'slow' | 'fast' | 'unknown'
}

// Detect device capabilities for animation optimization
export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isLowEnd: false,
      prefersReducedMotion: false,
      connectionSpeed: 'unknown'
    }
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Detect low-end devices
  const isLowEnd = (
    // Low memory devices
    (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4 ||
    // Slow CPU
    navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4 ||
    // Old mobile devices
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

  return {
    isMobile,
    isLowEnd,
    prefersReducedMotion,
    connectionSpeed
  }
}

// Get optimized animation config based on device capabilities
export function getOptimizedAnimationConfig(capabilities?: DeviceCapabilities) {
  const caps = capabilities || getDeviceCapabilities()
  
  if (caps.prefersReducedMotion || caps.isLowEnd) {
    return {
      duration: 0.1,
      stagger: 0,
      movement: 0,
      scale: 1,
      enableGlow: false,
      enableShadows: false
    }
  }
  
  if (caps.isMobile) {
    return {
      duration: 0.2,
      stagger: 0.05,
      movement: 10, // Reduced movement
      scale: 1.01, // Subtle scale
      enableGlow: false, // Disable glow on mobile
      enableShadows: true
    }
  }
  
  // Desktop - full animations
  return {
    duration: 0.3,
    stagger: 0.1,
    movement: 20,
    scale: 1.02,
    enableGlow: true,
    enableShadows: true
  }
}

// Create adaptive animation variants
export function createAdaptiveAnimation(baseAnimation: any, capabilities?: DeviceCapabilities) {
  const config = getOptimizedAnimationConfig(capabilities)
  
  return {
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      duration: config.duration
    },
    // Add GPU acceleration
    animate: {
      ...baseAnimation.animate,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform, opacity'
    }
  }
}

// Hook for using adaptive animations in components
export function useAdaptiveAnimations() {
  const capabilities = getDeviceCapabilities()
  const config = getOptimizedAnimationConfig(capabilities)
  
  return {
    capabilities,
    config,
    createAnimation: (baseAnimation: any) => createAdaptiveAnimation(baseAnimation, capabilities)
  }
}

// Performance monitoring for animations
export class AnimationPerformanceMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 60
  
  startMonitoring() {
    const monitor = () => {
      const now = performance.now()
      this.frameCount++
      
      if (now - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime))
        this.frameCount = 0
        this.lastTime = now
        
        // If FPS drops below 30, suggest reducing animations
        if (this.fps < 30) {
          console.warn('Low FPS detected, consider reducing animations')
        }
      }
      
      requestAnimationFrame(monitor)
    }
    
    requestAnimationFrame(monitor)
  }
  
  getFPS() {
    return this.fps
  }
}

// Global animation performance monitor
export const animationMonitor = new AnimationPerformanceMonitor()

// Auto-start monitoring in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  animationMonitor.startMonitoring()
}