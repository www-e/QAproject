"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
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

          {/* Features Bento Grid - Cleaned up version */}
          <motion.div variants={fadeInUp}>
            <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[28rem] gap-6">
              {features.map((feature, index) => (
                <BentoGridItem
                  key={feature.title}
                  title={
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 shrink-0">
                        <div className={`p-3 rounded-xl bg-${feature.color}-500/10`}>
                          <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                        </div>
                        <h3 className="font-bold text-xl">{feature.title}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        جديد
                      </Badge>
                    </div>
                  }
                  description={
                    <div className="flex flex-col h-full min-h-0">
                      {/* Description with proper text wrapping */}
                      <div className="flex-1 mb-4">
                        <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3 mb-3">
                          {feature.description}
                        </p>
                      </div>

                      {/* Statistics Card */}
                      <motion.div 
                        className="bg-gradient-to-r from-sidebar-accent/20 to-sidebar-accent/10 rounded-xl p-4 mb-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <NumberTicker 
                              value={feature.stats.value} 
                              className="text-3xl font-bold text-primary" 
                            />
                            <span className="text-sm text-muted-foreground font-medium">
                              {feature.stats.label}
                            </span>
                          </div>
                          <div className={`p-2 rounded-lg bg-${feature.color}-500/10`}>
                            <feature.icon className={`w-5 h-5 text-${feature.color}-500`} />
                          </div>
                        </div>
                      </motion.div>

                      {/* Benefits with better spacing */}
                      <div className="space-y-2">
                        {feature.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <motion.div 
                            key={benefitIndex} 
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: benefitIndex * 0.1 }}
                          >
                            <div className={`w-2 h-2 bg-${feature.color}-500 rounded-full flex-shrink-0`} />
                            <span className="text-sm text-muted-foreground leading-tight">
                              {benefit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  }
                  header={
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
                        <feature.icon className={`w-20 h-20 text-${feature.color}-500/80`} />
                      </motion.div>
                    </div>
                  }
                  className={`${
                    index === 0 ? "md:col-span-2" : 
                    index === 3 ? "md:col-span-1" : 
                    index === 4 ? "md:col-span-1" :
                    index === 5 ? "md:col-span-2" : ""
                  } card-hover group`}
                />
              ))}
            </BentoGrid>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
