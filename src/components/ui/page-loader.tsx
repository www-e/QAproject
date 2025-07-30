"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Icons } from "@/components/ui/icons"
import { NumberTicker } from "@/components/magicui/number-ticker"

interface PageLoaderProps {
  isLoading: boolean
  onComplete: () => void
}

export function PageLoader({ isLoading, onComplete }: PageLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const journeySteps = [
    { icon: Icons.check, text: "تحميل النظام", color: "text-blue-500" },
    { icon: Icons.settings, text: "إعداد الواجهة", color: "text-green-500" },
    { icon: Icons.chart, text: "تحضير البيانات", color: "text-orange-500" },
    { icon: Icons.message, text: "تفعيل الذكاء الاصطناعي", color: "text-purple-500" },
    { icon: Icons.users, text: "جاهز للاستخدام", color: "text-emerald-500" }
  ]

  useEffect(() => {
    if (!isLoading) return

    const stepDuration = 800 // Duration for each step
    const totalDuration = journeySteps.length * stepDuration

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / 50))
        return Math.min(newProgress, 100)
      })
    }, 50)

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1
        if (nextStep >= journeySteps.length) {
          clearInterval(stepInterval)
          clearInterval(progressInterval)
          // Complete the loader after a brief pause
          setTimeout(() => {
            onComplete()
          }, 500)
          return prev
        }
        return nextStep
      })
    }, stepDuration)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [isLoading, onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            scale: 50,
            opacity: 0,
            borderRadius: "50%"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.76, 0, 0.24, 1],
            scale: { duration: 1.2 },
            opacity: { duration: 0.8, delay: 0.4 }
          }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main Loader Content */}
          <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Icons.check className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                نظام إدارة الجودة
              </h1>
              <p className="text-muted-foreground">
                جاري تحضير تجربتك المتميزة
              </p>
            </motion.div>

            {/* Progress Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative w-32 h-32 mx-auto"
            >
              {/* Background Circle */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className="text-primary"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    strokeDasharray: "351.86",
                    strokeDashoffset: `${351.86 * (1 - progress / 100)}`
                  }}
                />
              </svg>
              
              {/* Progress Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  <NumberTicker value={Math.round(progress)} />%
                </span>
              </div>
            </motion.div>

            {/* Journey Steps */}
            <div className="space-y-4">
              {journeySteps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = index <= currentStep
                const isCurrent = index === currentStep

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3,
                      x: 0,
                      scale: isCurrent ? 1.05 : 1
                    }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5,
                      scale: { duration: 0.3 }
                    }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
                  >
                    <div className={`p-2 rounded-full ${
                      isActive ? 'bg-primary/10' : 'bg-muted/50'
                    } transition-colors duration-300`}>
                      <StepIcon className={`w-5 h-5 ${
                        isActive ? step.color : 'text-muted-foreground'
                      } transition-colors duration-300`} />
                    </div>
                    
                    <div className="flex-1 text-right">
                      <span className={`text-sm font-medium ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      } transition-colors duration-300`}>
                        {step.text}
                      </span>
                    </div>

                    {/* Loading indicator for current step */}
                    {isCurrent && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-full h-full bg-primary rounded-full"
                        />
                      </motion.div>
                    )}

                    {/* Checkmark for completed steps */}
                    {isActive && !isCurrent && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Icons.check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Icons.spinner className="w-4 h-4" />
                </motion.div>
                <span>جاري التحضير...</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}