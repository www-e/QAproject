"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

const features = [
  {
    title: "لوحة تحكم ذكية",
    description: "واجهة عربية متطورة مع إحصائيات تفاعلية وتحليلات ذكية في الوقت الفعلي",
    icon: Icons.chart,
    color: "primary",
    stats: { value: 247, label: "تقرير" },
    benefits: ["تحليل فوري", "واجهة عربية", "تقارير تفاعلية"]
  },
  {
    title: "الذكاء الاصطناعي",
    description: "مساعد ذكي متقدم لتحليل نتائج الاختبارات وتقديم التوصيات المخصصة",
    icon: Icons.message,
    color: "green",
    stats: { value: 98, label: "دقة%" },
    benefits: ["تحليل ذكي", "توصيات مخصصة", "تعلم آلي"]
  },
  {
    title: "إدارة الاختبارات",
    description: "نظام شامل لإدارة وتتبع جميع أنواع الاختبارات مع إمكانيات متقدمة للفلترة",
    icon: Icons.settings,
    color: "blue",
    stats: { value: 1247, label: "اختبار" },
    benefits: ["إدارة شاملة", "فلترة متقدمة", "تتبع فوري"]
  },
  {
    title: "سير العمل المرن",
    description: "تخصيص مراحل العمل وتتبع التقدم مع إشعارات ذكية وتقارير مفصلة",
    icon: Icons.workflow,
    color: "orange",
    stats: { value: 6, label: "مراحل" },
    benefits: ["مرونة كاملة", "إشعارات ذكية", "تقارير مفصلة"]
  },
  {
    title: "الأمان المتقدم",
    description: "حماية متعددة المستويات مع تشفير البيانات وإدارة الصلاحيات المتقدمة",
    icon: Icons.lock,
    color: "red",
    stats: { value: 256, label: "bit تشفير" },
    benefits: ["حماية متقدمة", "تشفير البيانات", "إدارة الصلاحيات"]
  },
  {
    title: "التقارير الذكية",
    description: "تقارير تلقائية مع رؤى ذكية ومقاييس أداء متقدمة قابلة للتخصيص",
    icon: Icons.fileText,
    color: "purple",
    stats: { value: 50, label: "قالب" },
    benefits: ["تقارير تلقائية", "رؤى ذكية", "قوالب جاهزة"]
  }
]

const colorVariants = {
  primary: "from-primary/20 to-blue-500/30",
  green: "from-green-500/20 to-emerald-500/30",
  blue: "from-blue-500/20 to-cyan-500/30",
  orange: "from-orange-500/20 to-amber-500/30",
  red: "from-red-500/20 to-pink-500/30",
  purple: "from-purple-500/20 to-violet-500/30"
}

export function FeaturesShowcase() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ✨ المميزات الرئيسية
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              حلول متكاملة لإدارة الجودة
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              اكتشف مجموعة شاملة من الأدوات المتطورة التي تجعل إدارة اختبارات الجودة أسهل وأكثر فعالية
            </p>
          </motion.div>

          {/* Features Bento Grid using Your Components */}
          <motion.div variants={fadeInUp}>
            <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[22rem]">
              {features.map((feature, index) => (
                <BentoGridItem
                  key={feature.title}
                  title={
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-${feature.color === 'primary' ? 'primary' : feature.color}-500/10`}>
                          <feature.icon className={`w-6 h-6 text-${feature.color === 'primary' ? 'primary' : feature.color}-500`} />
                        </div>
                        <h3 className="font-bold text-xl">{feature.title}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        جديد
                      </Badge>
                    </div>
                  }
                  description={
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {feature.description}
                      </p>
                      
                      {/* Statistics */}
                      <div className="flex items-center gap-3 p-4 bg-sidebar-accent/30 rounded-lg">
                        <NumberTicker 
                          value={feature.stats.value} 
                          className="text-2xl font-bold text-foreground" 
                        />
                        <span className="text-muted-foreground">{feature.stats.label}</span>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                  header={
                    <BackgroundGradient 
                      className="rounded-lg p-4 h-full"
                      containerClassName="h-full"
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${colorVariants[feature.color as keyof typeof colorVariants]} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                        {/* Animated Icon */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        >
                          <feature.icon className={`w-20 h-20 text-${feature.color === 'primary' ? 'primary' : feature.color}-500/80`} />
                        </motion.div>

                        {/* Floating Particles */}
                        <motion.div
                          className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.4, 1, 0.4]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                        <motion.div
                          className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/60 rounded-full"
                          animate={{
                            y: [0, -15, 0],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.4
                          }}
                        />
                      </div>
                    </BackgroundGradient>
                  }
                  className={`${index === 0 || index === 5 ? "md:col-span-2" : ""} card-hover group`}
                />
              ))}
            </BentoGrid>
          </motion.div>

          {/* Interactive Demo CTA */}
          <motion.div variants={fadeInUp} className="text-center">
            <HoverBorderGradient containerClassName="rounded-2xl">
              <Card className="bg-background border-0 p-8 text-center max-w-2xl mx-auto">
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      جرب المميزات بنفسك
                    </h3>
                    <p className="text-muted-foreground">
                      اختبر جميع المميزات المتقدمة مع النسخة التجريبية المجانية
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      className="btn-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icons.play className="w-4 h-4" />
                      تجربة مجانية
                    </motion.button>
                    <motion.button
                      className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-sidebar-accent transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icons.eye className="w-4 h-4" />
                      عرض توضيحي
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </HoverBorderGradient>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}