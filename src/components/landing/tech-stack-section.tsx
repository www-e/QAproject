"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

const technologies = [
  {
    name: "Next.js 15",
    description: "أحدث إصدار مع React 19 وServer Components",
    icon: "⚡",
    category: "Framework",
    color: "primary"
  },
  {
    name: "Tailwind CSS v4",
    description: "أحدث نظام تصميم مع OKLCH colors",
    icon: "🎨",
    category: "Styling",
    color: "blue"
  },
  {
    name: "Framer Motion",
    description: "أنيميشن متقدم وتفاعلات سلسة",
    icon: "🎭",
    category: "Animation",
    color: "green"
  },
  {
    name: "TypeScript",
    description: "برمجة آمنة ومطورة مع أحدث المعايير",
    icon: "🔧",
    category: "Language",
    color: "orange"
  },
  {
    name: "Aceternity UI",
    description: "مكونات متقدمة مع تأثيرات بصرية مذهلة",
    icon: "✨",
    category: "Components",
    color: "purple"
  },
  {
    name: "Arabic RTL",
    description: "دعم كامل للغة العربية والتخطيط من اليمين لليسار",
    icon: "🌍",
    category: "Localization",
    color: "red"
  }
]

const techFeatures = [
  {
    title: "أداء فائق",
    description: "تحسينات Next.js 15 مع React 19 لأداء استثنائي",
    icon: Icons.chart,
    stats: "99.9% Uptime"
  },
  {
    title: "أمان متقدم",
    description: "تشفير البيانات وحماية متعددة المستويات",
    icon: Icons.lock,
    stats: "256-bit SSL"
  },
  {
    title: "استجابة فورية",
    description: "واجهات تفاعلية مع استجابة فورية",
    icon: Icons.clock,
    stats: "<100ms"
  }
]

export function TechStackSection() {
  return (
    <section id="tech" className="py-24 bg-background">
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
              🚀 التقنيات المتقدمة
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              بناء بأحدث التقنيات العالمية
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              نستخدم أحدث التقنيات والأدوات المتطورة لضمان تجربة مستخدم استثنائية وأداء متفوق
            </p>
          </motion.div>

          {/* Technology Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <GlowingEffect>
                  <HoverBorderGradient containerClassName="rounded-xl h-full">
                    <Card className="bg-background border-0 p-6 h-full">
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl">{tech.icon}</div>
                          <Badge variant="outline" className="text-xs">
                            {tech.category}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground mb-2">
                            {tech.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {tech.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverBorderGradient>
                </GlowingEffect>
              </motion.div>
            ))}
          </div>

          {/* Technical Features */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <BackgroundGradient className="rounded-xl p-1">
                  <Card className="bg-background border-0 p-6 text-center">
                    <CardContent className="space-y-4">
                      <motion.div
                        className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <feature.icon className="w-8 h-8 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {feature.description}
                        </p>
                        <Badge variant="default" className="font-mono">
                          {feature.stats}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </BackgroundGradient>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
