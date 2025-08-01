// Universal animation configurations that work on both server and client
// Note: Device detection moved to client-side hooks to prevent hydration mismatch

// Universal page transitions with GPU acceleration (works on all devices)
export const pageTransitions = {
  initial: {
    opacity: 0,
    y: 20, // Consistent across all devices
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
  transition: {
    duration: 0.3, // Consistent timing
    ease: "easeOut",
  },
} as const;

// Universal card animations with GPU acceleration
export const cardAnimations = {
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Universal stagger animations
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Universal fade in up with GPU acceleration
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.4,
    ease: "easeOut",
  },
};

// Universal slide in from right with GPU acceleration
export const slideInFromRight = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

// Universal glow effects
export const glowEffect = {
  boxShadow: [
    "0 0 20px oklch(var(--primary) / 0.3)",
    "0 0 40px oklch(var(--primary) / 0.4)",
    "0 0 20px oklch(var(--primary) / 0.3)",
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

// Universal sidebar animations with GPU acceleration
export const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
};

// Universal mobile-optimized animations
export const mobileOptimized = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};

// Universal touch-optimized animations
export const touchOptimized = {
  tap: {
    scale: 0.95,
    transition: { duration: 0.1, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

// Universal list animations
export const listItemAnimation = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};
