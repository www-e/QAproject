"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<'ar' | 'en'>('ar')

  const toggleLanguage = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar'
    setCurrentLang(newLang)
    
    // Update document direction and language
    document.documentElement.setAttribute('lang', newLang)
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr')
    
    // Store preference
    localStorage.setItem('preferred-language', newLang)
    
    // Trigger a custom event for components to listen to
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: newLang } }))
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="relative overflow-hidden group border-2 hover:border-primary transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: currentLang === 'ar' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <Icons.workflow className="w-4 h-4" />
          </motion.div>
          
          <span className="font-medium">
            {currentLang === 'ar' ? 'العربية' : 'English'}
          </span>
          
          <motion.div
            className="text-xs px-2 py-1 bg-primary/10 rounded-full"
            animate={{ 
              x: currentLang === 'ar' ? 0 : 5,
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              x: { duration: 0.3 },
              opacity: { duration: 2, repeat: Infinity }
            }}
          >
            {currentLang === 'ar' ? 'AR' : 'EN'}
          </motion.div>
        </div>
        
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-primary/5"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </Button>
    </motion.div>
  )
}