"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      themes={['light', 'dark']}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// Theme Toggle Hook (Works perfectly with your OKLCH colors)
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = require("next-themes").useTheme()
  
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return {
    theme,
    setTheme,
    resolvedTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light'
  }
}

// Theme-aware component wrapper for animations
export function ThemeAwareComponent({ 
  children, 
  className = "",
  animate = true 
}: { 
  children: React.ReactNode
  className?: string
  animate?: boolean
}) {
  const { resolvedTheme } = useTheme()
  
  return (
    <div 
      className={`
        transition-theme 
        ${animate ? 'animate-fade-in' : ''} 
        ${className}
      `}
      data-theme={resolvedTheme}
    >
      {children}
    </div>
  )
}
