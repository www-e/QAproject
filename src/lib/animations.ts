// Animation configurations that work with your modern OKLCH color system

export const pageTransitions = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  } as const;
  
  export const cardAnimations = {
    hover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }
  
  export const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  }
  
  export const slideInFromRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  }
  
  // Theme-aware glow effects (using your OKLCH primary color)
  export const glowEffect = {
    boxShadow: [
      "0 0 20px oklch(var(--primary) / 0.3)",
      "0 0 40px oklch(var(--primary) / 0.4)",
      "0 0 20px oklch(var(--primary) / 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
  
  // Sidebar animations compatible with your sidebar variables
  export const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  }
  
  // Mobile-first responsive animations
  export const mobileOptimized = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.2, // Faster for mobile
      ease: "easeOut"
    }
  }
  