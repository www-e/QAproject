"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { fadeInUp, staggerChildren } from "@/lib/animations"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
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
          ease: "linear"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          className="text-center space-y-8 max-w-4xl mx-auto"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              🚀 أحدث تقنيات اختبار الجودة 2025
            </Badge>
          </motion.div>

          {/* Main Headline using Your Text Generate Effect */}
          <motion.div variants={fadeInUp}>
            <TextGenerateEffect
              words="نظام إدارة الجودة المتقدم بالذكاء الاصطناعي"
              className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            حلول متطورة لإدارة اختبارات الجودة مع واجهات عربية حديثة وذكاء اصطناعي متقدم
          </motion.p>

          {/* Stats Preview */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 my-12"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <NumberTicker value={1247} className="text-3xl font-bold text-primary" />
              <p className="text-sm text-muted-foreground mt-1">اختبار مكتمل</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <NumberTicker value={98} className="text-3xl font-bold text-green-500" />
              <span className="text-muted-foreground">%</span>
              <p className="text-sm text-muted-foreground mt-1">معدل النجاح</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <NumberTicker value={24} className="text-3xl font-bold text-blue-500" />
              <span className="text-muted-foreground">h</span>
              <p className="text-sm text-muted-foreground mt-1">توفير وقت يومي</p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Link href="/signin">
                <BackgroundGradient className="rounded-xl">
                  <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-8 py-4 text-lg">
                    <Icons.play className="ml-2 h-5 w-5" />
                    تجربة النظام مجاناً
                  </Button>
                </BackgroundGradient>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Icons.eye className="ml-2 h-5 w-5" />
                شاهد العرض التوضيحي
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mt-16 opacity-60"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2">
              <Icons.check className="w-4 h-4 text-green-500" />
              <span className="text-sm">أمان متقدم</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.check className="w-4 h-4 text-green-500" />
              <span className="text-sm">واجهة عربية</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.check className="w-4 h-4 text-green-500" />
              <span className="text-sm">ذكاء اصطناعي</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.check className="w-4 h-4 text-green-500" />
              <span className="text-sm">دعم فني 24/7</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
