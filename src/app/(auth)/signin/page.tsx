"use client";

import { motion } from "framer-motion";
import { SignInForm } from "@/components/auth/signin-form";
import { DayNightSwitch } from "@/components/shsfui/switch/day-night-switch";
import { pageTransitions, fadeInUp } from "@/lib/animations";

export default function SignInPage() {
  return (
    <div className="min-h-screen-mobile flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Pattern (using your OKLCH variables) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]" />

      {/* Floating Orbs Animation */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Your Beautiful Day-Night Switch */}
      <motion.div
        className="absolute top-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <DayNightSwitch
          defaultChecked={true}
          onToggle={(checked) => {
            // Integrate with your theme provider
            const theme = checked ? "light" : "dark";
            document.documentElement.className = theme;
          }}
          className="border-2 border-border/50 hover:border-primary/50 transition-colors"
        />
      </motion.div>

      {/* Main Authentication Container */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        {...pageTransitions}
      >
        {/* Logo and Header */}
        <motion.div
          className="text-center mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 animate-glow"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-8 h-8 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-foreground mb-2"
            variants={fadeInUp}
          >
            مرحباً بك
          </motion.h1>

          <motion.p className="text-muted-foreground" variants={fadeInUp}>
            سجل دخولك لمتابعة رحلة الجودة
          </motion.p>
        </motion.div>

        {/* Authentication Card */}
        <motion.div
          className="glass p-8 rounded-2xl border shadow-xl card-hover"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <SignInForm />
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6 }}
        >
          نظام إدارة الجودة المتقدم © 2025
        </motion.p>
      </motion.div>
    </div>
  );
}
