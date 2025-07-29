"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

const stats = [
  {
    number: 1247,
    suffix: "+",
    label: "اختبار مكتمل",
    description: "تم تنفيذها بنجاح خلال الشهر الماضي",
    icon: Icons.check,
    color: "green"
  },
  {
    number: 98.7,
    suffix: "%",
    label: "معدل النجاح",
    description: "دقة عالية في اكتشاف المشاكل والأخطاء",
    icon: Icons.chart,
    color: "primary"
  },
  {
    number: 24,
    suffix: "ساعة",
    label: "توفير يومي",
    description: "في الوقت والجهد مقارنة بالطرق التقليدية",
    icon: Icons.clock,
    color: "blue"
  },
  {
    number: 150,
    suffix: "+",
    label: "عميل راض",
    description: "يثقون في حلولنا المتقدمة لإدارة الجودة",
    icon: Icons.users,
    color: "orange"
  }
]

export function StatsSection() {
  return (
    <section id="stats" className="py-24 bg-gradient-to-b from-background to-sidebar-accent/20">
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
              📊 أرقام تتحدث عن نفسها
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              نتائج حقيقية وقابلة للقياس
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              إحصائيات مؤثرة تعكس فعالية نظامنا في تحسين جودة المشاريع وزيادة الإنتاجية
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <GlowingEffect>
                  <HoverBorderGradient containerClassName="rounded-2xl h-full">
                    <div className="bg-background border-0 p-8 text-center space-y-6 h-full flex flex-col justify-between">
                      {/* Icon */}
                      <motion.div
                        className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-${stat.color === 'primary' ? 'primary' : stat.color}-500/10`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <stat.icon className={`w-8 h-8 text-${stat.color === 'primary' ? 'primary' : stat.color}-500`} />
                      </motion.div>

                      {/* Number */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-1">
                          <NumberTicker 
                            value={stat.number} 
                            className="text-4xl font-bold text-foreground"
                            decimalPlaces={stat.number % 1 !== 0 ? 1 : 0}
                          />
                          <span className="text-2xl font-bold text-muted-foreground">
                            {stat.suffix}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {stat.label}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </HoverBorderGradient>
                </GlowingEffect>
              </motion.div>
            ))}
          </div>

          {/* Additional Stats Row */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border"
          >
            <div className="text-center">
              <NumberTicker value={99.9} className="text-2xl font-bold text-foreground" />
              <span className="text-muted-foreground">%</span>
              <p className="text-sm text-muted-foreground mt-1">وقت التشغيل</p>
            </div>
            <div className="text-center">
              <NumberTicker value={5} className="text-2xl font-bold text-foreground" />
              <span className="text-muted-foreground">دقائق</span>
              <p className="text-sm text-muted-foreground mt-1">متوسط الاستجابة</p>
            </div>
            <div className="text-center">
              <NumberTicker value={45} className="text-2xl font-bold text-foreground" />
              <span className="text-muted-foreground">دولة</span>
              <p className="text-sm text-muted-foreground mt-1">حول العالم</p>
            </div>
            <div className="text-center">
              <NumberTicker value={7} className="text-2xl font-bold text-foreground" />
              <span className="text-muted-foreground">أيام</span>
              <p className="text-sm text-muted-foreground mt-1">دعم أسبوعي</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
