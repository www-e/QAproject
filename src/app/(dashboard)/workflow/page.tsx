"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { StatefulButton } from "@/components/ui/stateful-button"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

// Workflow steps data
const workflowSteps = [
  {
    id: 1,
    title: "تخطيط الاختبار",
    description: "تحديد متطلبات الاختبار وإعداد الخطة الشاملة",
    status: "مكتمل",
    progress: 100,
    duration: "2 أيام",
    assignee: "فريق التخطيط",
    icon: Icons.fileText,
    color: "green",
    tasks: [
      { name: "تحليل المتطلبات", completed: true },
      { name: "إعداد خطة الاختبار", completed: true },
      { name: "تحديد البيئات", completed: true }
    ]
  },
  {
    id: 2,
    title: "تصميم حالات الاختبار",
    description: "إنشاء وتصميم حالات الاختبار المفصلة",
    status: "مكتمل",
    progress: 100,
    duration: "3 أيام",
    assignee: "محللو الجودة",
    icon: Icons.settings,
    color: "green",
    tasks: [
      { name: "كتابة حالات الاختبار", completed: true },
      { name: "مراجعة الحالات", completed: true },
      { name: "اعتماد النهائي", completed: true }
    ]
  },
  {
    id: 3,
    title: "إعداد البيئة",
    description: "تجهيز بيئة الاختبار والأدوات المطلوبة",
    status: "قيد التنفيذ",
    progress: 75,
    duration: "1 يوم",
    assignee: "فريق البنية التحتية",
    icon: Icons.settings,
    color: "blue",
    tasks: [
      { name: "إعداد الخوادم", completed: true },
      { name: "تثبيت الأدوات", completed: true },
      { name: "اختبار الاتصال", completed: false }
    ]
  },
  {
    id: 4,
    title: "تنفيذ الاختبارات",
    description: "تشغيل جميع حالات الاختبار وتسجيل النتائج",
    status: "معلق",
    progress: 0,
    duration: "5 أيام",
    assignee: "فريق الاختبار",
    icon: Icons.play,
    color: "orange",
    tasks: [
      { name: "اختبارات الوحدة", completed: false },
      { name: "اختبارات التكامل", completed: false },
      { name: "اختبارات النظام", completed: false }
    ]
  },
  {
    id: 5,
    title: "تقييم النتائج",
    description: "تحليل نتائج الاختبارات وإعداد التقارير",
    status: "لم يبدأ",
    progress: 0,
    duration: "2 أيام",
    assignee: "مدير الجودة",
    icon: Icons.chart,
    color: "gray",
    tasks: [
      { name: "تحليل النتائج", completed: false },
      { name: "إعداد التقرير", completed: false },
      { name: "التوصيات", completed: false }
    ]
  },
  {
    id: 6,
    title: "الاعتماد النهائي",
    description: "اعتماد النتائج والموافقة على الإصدار",
    status: "لم يبدأ",
    progress: 0,
    duration: "1 يوم",
    assignee: "الإدارة العليا",
    icon: Icons.check,
    color: "gray",
    tasks: [
      { name: "مراجعة التقرير", completed: false },
      { name: "الموافقة النهائية", completed: false },
      { name: "الإعلان عن الإصدار", completed: false }
    ]
  }
]

const statusColors = {
  "مكتمل": "default",
  "قيد التنفيذ": "secondary",
  "معلق": "outline",
  "لم يبدأ": "secondary"
} as const

const colorVariants = {
  green: "from-green-500/20 to-emerald-500/30",
  blue: "from-blue-500/20 to-cyan-500/30",
  orange: "from-orange-500/20 to-amber-500/30",
  gray: "from-gray-500/20 to-slate-500/30"
}

export default function WorkflowPage() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [isExecuting, setIsExecuting] = useState<number | null>(null)

  const handleExecuteStep = async (stepId: number) => {
    setIsExecuting(stepId)
    // Simulate execution
    setTimeout(() => {
      setIsExecuting(null)
    }, 3000)
  }

  const completedSteps = workflowSteps.filter(step => step.status === "مكتمل").length
  const totalSteps = workflowSteps.length
  const overallProgress = Math.round((completedSteps / totalSteps) * 100)

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header with Progress Overview */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Title */}
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <TextGenerateEffect
            words="سير عمل اختبار الجودة"
            className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            تتبع مراحل عملية اختبار الجودة من التخطيط إلى الاعتماد النهائي
          </p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div variants={fadeInUp}>
          <HoverBorderGradient containerClassName="rounded-2xl">
            <Card className="bg-background border-0 p-8 text-center">
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">التقدم الإجمالي</h3>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <NumberTicker value={overallProgress} className="text-4xl font-bold text-primary" />
                    <span className="text-2xl text-muted-foreground">%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3 mb-4" />
                  <p className="text-muted-foreground">
                    <NumberTicker value={completedSteps} className="font-bold" /> من {totalSteps} مراحل مكتملة
                  </p>
                </div>
              </CardContent>
            </Card>
          </HoverBorderGradient>
        </motion.div>
      </motion.div>

      {/* Workflow Steps using Your Bento Grid */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[25rem]">
          {workflowSteps.map((step, index) => {
            const isSelected = selectedStep === step.id
            const completedTasks = step.tasks.filter(task => task.completed).length
            
            return (
              <motion.div
                key={step.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <BentoGridItem
                  title={
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${step.color === 'green' ? 'green' : step.color === 'blue' ? 'blue' : step.color === 'orange' ? 'orange' : 'gray'}-500/10`}>
                          <step.icon className={`w-5 h-5 text-${step.color === 'green' ? 'green' : step.color === 'blue' ? 'blue' : step.color === 'orange' ? 'orange' : 'gray'}-500`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{step.title}</h3>
                          <Badge variant={statusColors[step.status as keyof typeof statusColors]} className="text-xs mt-1">
                            {step.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-muted-foreground">{step.duration}</div>
                      </div>
                    </div>
                  }
                  description={
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span className="font-bold">{step.progress}%</span>
                        </div>
                        <Progress value={step.progress} className="h-2" />
                      </div>

                      {/* Tasks */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>المهام</span>
                          <span className="font-bold">{completedTasks}/{step.tasks.length}</span>
                        </div>
                        <div className="space-y-1">
                          {step.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center gap-2 text-xs">
                              <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span className={task.completed ? 'text-green-600' : 'text-muted-foreground'}>
                                {task.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assignee */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">المسؤول:</span>
                        <span className="font-medium">{step.assignee}</span>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {step.status === "معلق" || step.status === "لم يبدأ" ? (
                          <StatefulButton
                            onClick={() => handleExecuteStep(step.id)}
                            disabled={step.status === "لم يبدأ"}
                            isLoading={isExecuting === step.id}
                            idleText="بدء المرحلة"
                            loadingText="جاري التنفيذ"
                            successText="تم البدء"
                            className="w-full btn-primary text-sm"
                          >
                            <step.icon className="w-4 h-4 ml-2" />
                          </StatefulButton>
                        ) : step.status === "قيد التنفيذ" ? (
                          <Button variant="secondary" className="w-full" disabled>
                            <Icons.spinner className="w-4 h-4 ml-2 animate-spin" />
                            قيد التنفيذ...
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full text-green-600 border-green-200">
                            <Icons.check className="w-4 h-4 ml-2" />
                            مكتمل
                          </Button>
                        )}
                      </div>
                    </div>
                  }
                  header={
                    <BackgroundGradient 
                      className="rounded-lg p-4 h-full"
                      containerClassName="h-full"
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${colorVariants[step.color as keyof typeof colorVariants]} rounded-lg flex flex-col items-center justify-center relative overflow-hidden`}>
                        {/* Step Number */}
                        <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{step.id}</span>
                        </div>
                        
                        {/* Icon */}
                        <motion.div
                          animate={{ 
                            scale: step.status === "قيد التنفيذ" ? [1, 1.1, 1] : 1,
                            rotate: step.status === "مكتمل" ? [0, 360] : 0
                          }}
                          transition={{ 
                            duration: step.status === "قيد التنفيذ" ? 2 : 1,
                            repeat: step.status === "قيد التنفيذ" ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                        >
                          <step.icon className={`w-16 h-16 text-${step.color === 'green' ? 'green' : step.color === 'blue' ? 'blue' : step.color === 'orange' ? 'orange' : 'gray'}-500/80`} />
                        </motion.div>

                        {/* Connection Line */}
                        {index < workflowSteps.length - 1 && (
                          <div className="absolute -bottom-4 left-1/2 w-0.5 h-8 bg-border transform -translate-x-1/2" />
                        )}
                      </div>
                    </BackgroundGradient>
                  }
                  className={`${index % 2 === 0 ? "md:col-span-2" : ""} card-hover`}
                />
              </motion.div>
            )
          })}
        </BentoGrid>
      </motion.div>

      {/* Quick Actions */}
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
            <Icons.settings className="ml-2 h-4 w-4" />
            إعدادات سير العمل
          </Button>
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <Button variant="secondary">
            <Icons.bell className="ml-2 h-4 w-4" />
            تنبيهات المراحل
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
