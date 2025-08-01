"use client"

// Device detection and capability assessment

export interface DeviceCapabilities {
  // Device type
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  
  // Performance indicators
  isLowEnd: boolean
  memoryGB: number
  cpuCores: number
  
  // Network
  connectionSpeed: 'slow' | 'fast' | 'unknown'
  isOnline: boolean
  
  // Battery
  batteryLevel?: number
  isCharging?: boolean
  
  // Display
  pixelRatio: number
  screenWidth: number
  screenHeight: number
  
  // Capabilities
  supportsWebGL: boolean
  supportsServiceWorker: boolean
  supportsIntersectionObserver: boolean
  
  // Preferences
  prefersReducedMotion: boolean
  prefersDarkMode: boolean
}

class DeviceDetector {
  private static instance: DeviceDetector
  private capabilities: DeviceCapabilities | null = null

  static getInstance(): DeviceDetector {
    if (!DeviceDetector.instance) {
      DeviceDetector.instance = new DeviceDetector()
    }
    return DeviceDetector.instance
  }

  async getCapabilities(): Promise<DeviceCapabilities> {
    if (this.capabilities) {
      return this.capabilities
    }

    if (typeof window === 'undefined') {
      // Server-side fallback
      return this.getServerSideCapabilities()
    }

    this.capabilities = await this.detectCapabilities()
    return this.capabilities
  }

  private getServerSideCapabilities(): DeviceCapabilities {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLowEnd: false,
      memoryGB: 8,
      cpuCores: 4,
      connectionSpeed: 'fast',
      isOnline: true,
      pixelRatio: 1,
      screenWidth: 1920,
      screenHeight: 1080,
      supportsWebGL: true,
      supportsServiceWorker: true,
      supportsIntersectionObserver: true,
      prefersReducedMotion: false,
      prefersDarkMode: false
    }
  }

  private async detectCapabilities(): Promise<DeviceCapabilities> {
    const userAgent = navigator.userAgent

    // Device type detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*(?:\bTablet\b|\bTab\b))/i.test(userAgent)
    const isDesktop = !isMobile && !isTablet

    // Performance indicators
    const memoryGB = (navigator as any).deviceMemory || 4
    const cpuCores = navigator.hardwareConcurrency || 4
    const isLowEnd = memoryGB < 4 || cpuCores < 4 || (isMobile && (
      /Android [1-6]/.test(userAgent) ||
      /iPhone OS [1-9]_/.test(userAgent)
    ))

    // Network detection
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    const connectionSpeed = connection ? 
      (connection.effectiveType === '4g' ? 'fast' : 'slow') : 
      'unknown'
    const isOnline = navigator.onLine

    // Battery detection
    let batteryLevel: number | undefined
    let isCharging: boolean | undefined
    
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery()
        batteryLevel = battery.level
        isCharging = battery.charging
      } catch (e) {
        // Battery API not available
      }
    }

    // Display detection
    const pixelRatio = window.devicePixelRatio || 1
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height

    // Capability detection
    const supportsWebGL = this.detectWebGL()
    const supportsServiceWorker = 'serviceWorker' in navigator
    const supportsIntersectionObserver = 'IntersectionObserver' in window

    // Preference detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    return {
      isMobile,
      isTablet,
      isDesktop,
      isLowEnd,
      memoryGB,
      cpuCores,
      connectionSpeed,
      isOnline,
      batteryLevel,
      isCharging,
      pixelRatio,
      screenWidth,
      screenHeight,
      supportsWebGL,
      supportsServiceWorker,
      supportsIntersectionObserver,
      prefersReducedMotion,
      prefersDarkMode
    }
  }

  private detectWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      return !!gl
    } catch (e) {
      return false
    }
  }

  // Get performance tier based on device capabilities
  getPerformanceTier(capabilities?: DeviceCapabilities): 'low' | 'medium' | 'high' {
    const caps = capabilities || this.capabilities
    if (!caps) return 'medium'

    if (caps.isLowEnd || caps.memoryGB < 4 || caps.cpuCores < 4) {
      return 'low'
    }

    if (caps.memoryGB >= 8 && caps.cpuCores >= 8 && caps.supportsWebGL) {
      return 'high'
    }

    return 'medium'
  }

  // Get recommended animation settings
  getAnimationSettings(capabilities?: DeviceCapabilities) {
    const caps = capabilities || this.capabilities
    if (!caps) return { duration: 0.3, complexity: 'medium' }

    if (caps.prefersReducedMotion) {
      return { duration: 0.1, complexity: 'minimal' }
    }

    const tier = this.getPerformanceTier(caps)
    
    switch (tier) {
      case 'low':
        return { duration: 0.2, complexity: 'simple' }
      case 'high':
        return { duration: 0.4, complexity: 'complex' }
      default:
        return { duration: 0.3, complexity: 'medium' }
    }
  }

  // Check if device should use reduced features
  shouldReduceFeatures(capabilities?: DeviceCapabilities): boolean {
    const caps = capabilities || this.capabilities
    if (!caps) return false

    return caps.isLowEnd || 
           caps.connectionSpeed === 'slow' || 
           (caps.batteryLevel !== undefined && caps.batteryLevel < 0.2)
  }
}

// Hook for using device detection
export function useDeviceCapabilities() {
  const detector = DeviceDetector.getInstance()
  
  return {
    getCapabilities: () => detector.getCapabilities(),
    getPerformanceTier: (caps?: DeviceCapabilities) => detector.getPerformanceTier(caps),
    getAnimationSettings: (caps?: DeviceCapabilities) => detector.getAnimationSettings(caps),
    shouldReduceFeatures: (caps?: DeviceCapabilities) => detector.shouldReduceFeatures(caps)
  }
}

// Export singleton
export const deviceDetector = DeviceDetector.getInstance()