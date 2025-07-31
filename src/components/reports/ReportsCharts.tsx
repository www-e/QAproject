"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartAreaInteractive } from "@/components/ui/shadcn-io/area-chart-01"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren } from "@/lib/animations"

export default function ReportsCharts() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Main Trend Chart */}
      <motion.div variants={fadeInUp} className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>اتجاهات نتائج الاختبارات</span>
              <Badge variant="secondary">تحليل</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartAreaInteractive />
          </CardContent>
        </Card>
      </motion.div>

      {/* Test Distribution */}
      <motion.div variants={fadeInUp}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>توزيع الاختبارات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>اختبارات الوحدة</span>
                  <span className="font-medium">156 (75%)</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>اختبارات التكامل</span>
                  <span className="font-medium">52 (25%)</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>اختبارات النظام</span>
                  <span className="font-medium">39 (19%)</span>
                </div>
                <Progress value={19} className="h-2" />
              </div>
            </div>

            {/* Performance Summary */}
            <div className="pt-4 border-t space-y-4">
              <h4 className="font-semibold">ملخص الأداء</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">88.1%</div>
                  <div className="text-xs text-muted-foreground">معدل النجاح</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">2.3s</div>
                  <div className="text-xs text-muted-foreground">متوسط التنفيذ</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>مقاييس الأداء التفصيلية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">استهلاك الذاكرة</span>
                <span className="text-sm font-medium">45.2 MB</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">استهلاك المعالج</span>
                <span className="text-sm font-medium">12.5%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">استخدام الشبكة</span>
                <span className="text-sm font-medium">8.3 MB/s</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quality Trends */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>اتجاهات الجودة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">+12%</div>
              <div className="text-sm text-muted-foreground">تحسن هذا الشهر</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">الأسبوع الماضي</span>
                <Badge variant="default">85%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">هذا الأسبوع</span>
                <Badge variant="default">88%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">الهدف</span>
                <Badge variant="outline">90%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Test Coverage */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>تغطية الاختبارات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">92.5%</div>
              <div className="text-sm text-muted-foreground">تغطية الكود</div>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>الواجهات</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>الخدمات</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>قواعد البيانات</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}