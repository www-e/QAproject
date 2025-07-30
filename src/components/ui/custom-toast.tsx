"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

interface CustomToastProps {
  isVisible: boolean
  type: "loading" | "success" | "error"
  title: string
  description?: string
  onClose?: () => void
}

export function CustomToast({ 
  isVisible, 
  type, 
  title, 
  description, 
  onClose 
}: CustomToastProps) {
  const getToastStyles = () => {
    switch (type) {
      case "loading":
        return {
          bg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
          border: "border-blue-200 dark:border-blue-800",
          icon: <Icons.spinner className="w-6 h-6 text-blue-500 animate-spin" />,
          titleColor: "text-blue-800 dark:text-blue-200",
          descColor: "text-blue-600 dark:text-blue-300"
        }
      case "success":
        return {
          bg: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
          border: "border-green-200 dark:border-green-800",
          icon: <Icons.check className="w-6 h-6 text-green-500" />,
          titleColor: "text-green-800 dark:text-green-200",
          descColor: "text-green-600 dark:text-green-300"
        }
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950",
          border: "border-red-200 dark:border-red-800",
          icon: <Icons.alert className="w-6 h-6 text-red-500" />,
          titleColor: "text-red-800 dark:text-red-200",
          descColor: "text-red-600 dark:text-red-300"
        }
    }
  }

  const styles = getToastStyles()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] max-w-md w-full mx-4"
        >
          <div className={cn(
            "rounded-xl border shadow-lg backdrop-blur-sm p-4",
            styles.bg,
            styles.border
          )}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {styles.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={cn("font-semibold text-sm", styles.titleColor)}>
                  {title}
                </h4>
                {description && (
                  <p className={cn("text-sm mt-1", styles.descColor)}>
                    {description}
                  </p>
                )}
              </div>
              {onClose && type !== "loading" && (
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Icons.close className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}