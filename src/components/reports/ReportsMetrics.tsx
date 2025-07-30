"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

interface ReportsMetricsProps {
  tests: any[]
}

export default function ReportsMetrics({ tests }: ReportsMetricsProps) {
  const metricsData = [
    {
      title: "تحليل الأخطاء",
      description: "أكثر الأخطاء شيوعاً وحلولها",
      icon: Icons.alert,
      color: "red",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>أخطاء الاتصال</span>
              <Badge variant="destructive">23</Badge>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>أخطاء التحقق</span>
              <Badge variant="destructive">18</Badge>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>أخطاء الأداء</span>
              <Badge variant="destructive">12</Badge>
            </div>
            <Progress value={30} className="h-2" />
          </div>
        </div>
      )
    },
    {
      title: "إحصائيات الفرق",
      description: "أداء فرق العمل المختلفة",
      icon: Icons.users,
      color: "blue",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">فريق الواجهات</span>
            <div className="flex items-center gap-2">
              <Progress value={92} className="w-16 h-2" />
              <span className="text-sm font-medium">92%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">فريق الخدمات</span>
            <div className="flex items-center gap-2">
              <Progress value={88} className="w-16 h-2" />
              <span className="text-sm font-medium">88%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">فريق قواعد البيانات</span>
            <div className="flex items-center gap-2">
              <Progress value={95} className="w-16 h-2" />
              <span className="text-sm font-medium">95%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "الاختبارات الآلية",
      description: "حالة الأتمتة والتطوير",
      icon: Icons.settings,
      color: "green",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              <NumberTicker value={156} />
            </div>
            <div className="text-sm text-muted-foreground">اختبار آلي</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>معدل الأتمتة</span>
              <span className="font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </div>
      )
    },
    {
      title: "الأداء والسرعة",
      description: "مقاييس الأداء والاستجابة",
      icon: Icons.clock,
      color: "orange",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">
                <NumberTicker value={2.3} />s
              </div>
              <div className="text-xs text-muted-foreground">متوسط التنفيذ</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                <NumberTicker value={45} />MB
              </div>
              <div className="text-xs text-muted-foreground">استهلاك الذاكرة</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>تحسن الأداء</span>
              <Badge variant="default">+15%</Badge>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Advanced Metrics Grid */}
      <motion.div variants={fadeInUp}>
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem] gap-6">
          {metricsData.map((metric, index) => (
            <BentoGridItem
              key={metric.title}
              title={
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}-500/10`}>
                    <metric.icon className={`w-5 h-5 text-${metric.color}-500`} />
                  </div>
                  <span className="font-semibold">{metric.title}</span>
                </div>
              }
              description={
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                  {metric.content}
                </div>
              }
              header={
                <BackgroundGradient
                  className="rounded-lg p-4 h-full"
                  containerClassName="h-full"
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/30 rounded-lg flex items-center justify-center`}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <metric.icon
                        className={`w-16 h-16 text-${metric.color}-500/80`}
                      />
                    </motion.div>
                  </div>
                </BackgroundGradient>
              }
              className={`${
                index === 0 || index === 3 ? "md:col-span-2" : ""
              } card-hover`}
            />
          ))}
        </BentoGrid>
      </motion.div>

      {/* Detailed Analytics */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>تحليل الاتجاهات الشهرية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { month: "يناير", tests: 245, success: 88 },
                { month: "فبراير", tests: 267, success: 91 },
                { month: "مارس", tests: 289, success: 85 },
                { month: "أبريل", tests: 312, success: 89 },
              ].map((data, index) => (
                <div key={data.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{data.month}</div>
                    <div className="text-sm text-muted-foreground">{data.tests} اختبار</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{data.success}%</div>
                    <div className="text-sm text-muted-foreground">معدل النجاح</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أهم التوصيات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                {
                  title: "تحسين اختبارات الأداء",
                  description: "زيادة تغطية اختبارات الأداء بنسبة 20%",
                  priority: "عالية",
                  icon: Icons.alert
                },
                {
                  title: "أتمتة الاختبارات اليدوية",
                  description: "تحويل 15 اختبار يدوي إلى آلي",
                  priority: "متوسطة",
                  icon: Icons.settings
                },
                {
                  title: "تدريب الفرق",
                  description: "ورشة عمل حول أفضل ممارسات الاختبار",
                  priority: "منخفضة",
                  icon: Icons.users
                }
              ].map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <recommendation.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{recommendation.title}</h4>
                      <Badge 
                        variant={
                          recommendation.priority === "عالية" ? "destructive" :
                          recommendation.priority === "متوسطة" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {recommendation.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{recommendation.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}