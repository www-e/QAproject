"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"
import { Test } from "@/types/tests"

interface TestsStatsProps {
  tests: Test[]
}

export default function TestsStats({ tests }: TestsStatsProps) {
  const totalTests = tests.length
  const completedTests = tests.filter(t => t.status === "مكتمل").length
  const failedTests = tests.filter(t => t.status === "فشل").length
  const avgSuccess = Math.round(tests.reduce((acc, test) => acc + test.success, 0) / totalTests)

  const stats = [
    { label: "إجمالي الاختبارات", value: totalTests, color: "primary", icon: Icons.chart },
    { label: "الاختبارات المكتملة", value: completedTests, color: "green", icon: Icons.check },
    { label: "الاختبارات الفاشلة", value: failedTests, color: "red", icon: Icons.alert },
    { label: "معدل النجاح", value: avgSuccess, color: "blue", icon: Icons.chart, suffix: "%" }
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={fadeInUp}>
          <GlowingEffect>
            <HoverBorderGradient containerClassName="rounded-xl h-full">
              <Card className="bg-background border-0 text-center h-full">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-${stat.color === 'green' ? 'green' : stat.color === 'red' ? 'red' : stat.color === 'blue' ? 'blue' : 'primary'}-500/10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <stat.icon className={`w-8 h-8 text-${stat.color === 'green' ? 'green' : stat.color === 'red' ? 'red' : stat.color === 'blue' ? 'blue' : 'primary'}-500`} />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1">
                      <NumberTicker 
                        value={stat.value} 
                        className="text-3xl font-bold text-foreground" 
                      />
                      {stat.suffix && <span className="text-xl text-muted-foreground">{stat.suffix}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </HoverBorderGradient>
          </GlowingEffect>
        </motion.div>
      ))}
    </motion.div>
  )
}
