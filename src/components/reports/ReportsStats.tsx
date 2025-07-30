"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

interface ReportsStatsProps {
  tests: any[]
}

export default function ReportsStats({ tests }: ReportsStatsProps) {
  const totalTests = tests.length
  const passedTests = tests.filter(test => test.status === "نجح").length
  const failedTests = tests.filter(test => test.status === "فشل").length
  const successRate = Math.round((passedTests / totalTests) * 100)

  const stats = [
    {
      title: "إجمالي الاختبارات",
      value: totalTests,
      change: "+12%",
      changeType: "positive",
      icon: Icons.chart,
      color: "blue",
      description: "العدد الكلي للاختبارات"
    },
    {
      title: "الاختبارات الناجحة",
      value: passedTests,
      change: `${successRate}%`,
      changeType: "positive",
      icon: Icons.check,
      color: "green",
      description: "اختبارات مكتملة بنجاح"
    },
    {
      title: "الاختبارات الفاشلة",
      value: failedTests,
      change: `${100 - successRate}%`,
      changeType: "negative",
      icon: Icons.alert,
      color: "red",
      description: "اختبارات تحتاج مراجعة"
    },
    {
      title: "متوسط وقت التنفيذ",
      value: 2.3,
      change: "-15%",
      changeType: "positive",
      icon: Icons.clock,
      color: "orange",
      description: "بالثواني لكل اختبار"
    },
    {
      title: "فرق العمل النشطة",
      value: 6,
      change: "نشط",
      changeType: "neutral",
      icon: Icons.users,
      color: "purple",
      description: "فرق تعمل حالياً"
    }
  ]

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div key={stat.title} variants={fadeInUp}>
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === "positive" 
                    ? "bg-green-100 text-green-700" 
                    : stat.changeType === "negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  <NumberTicker value={stat.value} />
                  {stat.title === "متوسط وقت التنفيذ" && <span className="text-lg">s</span>}
                </div>
                <h3 className="font-semibold text-sm">{stat.title}</h3>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>

              {/* Decorative gradient */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${stat.color}-500/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300`} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}