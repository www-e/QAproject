"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

interface WorkflowStatsProps {
  completedSteps: number
  totalSteps: number
  overallProgress: number
}

export default function WorkflowStats({ 
  completedSteps, 
  totalSteps, 
  overallProgress 
}: WorkflowStatsProps) {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Enhanced Stats Grid with Overall Progress as First Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Overall Progress - First Card */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className="text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
                  <Icons.chart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">التقدم الإجمالي</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <NumberTicker
                      value={overallProgress}
                      className="text-4xl font-bold text-primary"
                    />
                    <span className="text-2xl text-muted-foreground">%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3 mb-4" />
                  <p className="text-muted-foreground">
                    <NumberTicker
                      value={completedSteps}
                      className="font-bold"
                    />{" "}
                    من {totalSteps} مراحل مكتملة
                  </p>
                </div>
              </div>
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-300" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Other Stats */}
        <motion.div variants={fadeInUp}>
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className="text-center space-y-3">
                <div className="p-3 bg-green-500/10 rounded-lg w-fit mx-auto">
                  <Icons.check className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-green-600">
                  <NumberTicker value={completedSteps} />
                </div>
                <div>
                  <p className="font-semibold text-sm">مراحل مكتملة</p>
                  <p className="text-xs text-muted-foreground">تم إنجازها بنجاح</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className="text-center space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-lg w-fit mx-auto">
                  <Icons.clock className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  <NumberTicker value={totalSteps - completedSteps} />
                </div>
                <div>
                  <p className="font-semibold text-sm">مراحل متبقية</p>
                  <p className="text-xs text-muted-foreground">في انتظار التنفيذ</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className="text-center space-y-3">
                <div className="p-3 bg-orange-500/10 rounded-lg w-fit mx-auto">
                  <Icons.users className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-orange-600">
                  <NumberTicker value={6} />
                </div>
                <div>
                  <p className="font-semibold text-sm">فرق العمل</p>
                  <p className="text-xs text-muted-foreground">فرق نشطة حالياً</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp}>
          <Button className="btn-primary">
            <Icons.fileText className="ml-2 h-4 w-4" />
            تصدير التقرير
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Button variant="outline">
            <Icons.bell className="ml-2 h-4 w-4" />
            تنبيهات المراحل
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Button variant="secondary">
            <Icons.settings className="ml-2 h-4 w-4" />
            إعدادات سير العمل
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}