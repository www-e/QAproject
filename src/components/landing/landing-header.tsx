"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DayNightSwitch } from "@/components/shsfui/switch/day-night-switch"
import { Icons } from "@/components/ui/icons"
import { useTheme } from "next-themes" // Corrected import
import Link from "next/link"
import { fadeInUp } from "@/lib/animations"

export function LandingHeader() {
  // Use the centralized theme hook
  const { setTheme, resolvedTheme } = useTheme()

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'light' : 'dark')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-3"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center animate-glow"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Icons.check className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-foreground">نظام الجودة</h1>
              <p className="text-xs text-muted-foreground">إدارة متقدمة</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              المميزات
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              الإحصائيات
            </button>
            <button 
              onClick={() => scrollToSection('tech')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              التقنيات
            </button>
          </nav>

          {/* Right Actions - Your Day-Night-Switch Featured */}
          <div className="flex items-center gap-4">
            {/* Your Beautiful Day-Night Switch - Now correctly controlled */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm animate-pulse" />
              <DayNightSwitch 
                checked={resolvedTheme === 'light'}
                onToggle={handleThemeToggle}
                className="relative border-2 border-primary/20 hover:border-primary/50 transition-colors"
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/signin">
                <Button className="btn-primary">
                  دخول النظام
                  <Icons.chevronRight className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}