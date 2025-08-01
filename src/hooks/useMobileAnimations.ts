"use client"

import { useEffect, useState, useMemo } from 'react'

// Simple client-side device detection hook
export function useMobileAnimations() {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Memoize animation variants based on device capabilities
  const animationVariants = useMemo(() => {
    if (!isClient) return {}

    const duration = prefersReducedMotion ? 0.1 : (isMobile ? 0.2 : 0.3)
    const movement = prefersReducedMotion ? 0 : (isMobile ? 10 : 20)

    return {
      // Adaptive fade in
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration, ease: "easeOut" }
      },

      // Adaptive slide up
      slideUp: {
        initial: { opacity: 0, y: movement },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -movement },
        transition: { duration, ease: "easeOut" }
      },

      // Touch-optimized interactions
      touchInteraction: {
        tap: {
          scale: prefersReducedMotion ? 1 : 0.95,
          transition: { duration: 0.1 }
        },
        hover: isMobile ? {} : {
          scale: prefersReducedMotion ? 1 : 1.02,
          transition: { duration: 0.15 }
        }
      }
    }
  }, [isClient, isMobile, prefersReducedMotion])

  return {
    isClient,
    isMobile,
    prefersReducedMotion,
    variants: animationVariants
  }
}

// Hook for intersection observer-based animations
export function useInViewAnimation(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold])

  return { ref: setRef, isInView }
}

// Hook for performance monitoring
export function useAnimationPerformance() {
  const [fps, setFps] = useState(60)
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const now = performance.now()

      if (now - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (now - lastTime))
        setFps(currentFPS)
        setIsLowPerformance(currentFPS < 30)
        frameCount = 0
        lastTime = now
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return { fps, isLowPerformance }
}