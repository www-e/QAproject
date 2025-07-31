"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { fadeInUp, staggerChildren } from "@/lib/animations"
import Link from "next/link"

const reportSteps = [
  { id: 1, name: "جمع البيانات", description: "استخراج بيانات الاختبارات", duration: 2000 },
  { id: 2, name: "تحليل النتائج", description: "معالجة وتحليل البيانات", duration: 3000 },
  { id: 3, name: "إنشاء الرسوم البيانية", description: "توليد المخططات والإحصائيات", duration: 2500 },
  { id: 4, name: "تنسيق التقرير", description: "تطبيق القوالب والتنسيق", duration: 1500 },
  { id: 5, name: "المراجعة النهائية", description: "فحص جودة التقرير", duration: 1000 }
]

export default function ReportGenerationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [generatedData, setGeneratedData] = useState({
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    coverage: 0
  })

  useEffect(() => {
    if (currentStep < reportSteps.length) {
      const step = reportSteps[currentStep]
      const stepProgress = (currentStep / reportSteps.length) * 100
      
      const timer = setTimeout(() => {
        setProgress(stepProgress + (100 / reportSteps.length))
        
        // Simulate data generation
        if (currentStep === 0) {
          setGeneratedData(prev => ({ ...prev, totalTests: 247 }))
        } else if (currentStep === 1) {
          setGeneratedData(prev => ({ ...prev, passedTests: 218, failedTests: 29 }))
        } else if (currentStep === 2) {
          setGeneratedData(prev => ({ ...prev, coverage: 88.2 }))
        }
        
        if (currentStep === reportSteps.length - 1) {
          setIsComplete(true)
        } else {
          setCurrentStep(prev => prev + 1)
        }
      }, step.duration)

      return () => clearTimeout(timer)
    }
  }, [currentStep])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Icons.fileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">إنشاء تقرير الجودة</h1>
          </div>
          <p className="text-muted-foreground">
            جاري إنشاء تقرير شامل لنتائج الاختبارات والمقاييس
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>تقدم الإنشاء</span>
                <Badge variant={isComplete ? "default" : "secondary"}>
                  {isComplete ? "مكتمل" : "قيد المعالجة"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <NumberTicker value={Math.round(progress)} />%
                </div>
                <Progress value={progress} className="h-3" />
              </div>
              
              {/* Live Data Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    <NumberTicker value={generatedData.totalTests} />
                  </div>
                  <div className="text-sm text-muted-foreground">إجمالي الاختبارات</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    <NumberTicker value={generatedData.passedTests} />
                  </div>
                  <div className="text-sm text-muted-foreground">اختبارات ناجحة</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    <NumberTicker value={generatedData.failedTests} />
                  </div>
                  <div className="text-sm text-muted-foreground">اختبارات فاشلة</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    <NumberTicker value={generatedData.coverage} />%
                  </div>
                  <div className="text-sm text-muted-foreground">التغطية</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Steps Progress */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>مراحل الإنشاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportSteps.map((step, index) => {
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep || isComplete
                  const isCurrent = index === currentStep && !isComplete

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                        isActive ? 'border-primary bg-primary/5' : 
                        isCompleted ? 'border-green-200 bg-green-50 dark:bg-green-950' : 
                        'border-border'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isActive ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <Icons.check className="w-5 h-5" />
                        ) : isCurrent ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Icons.spinner className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <span className="font-bold">{step.id}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold">{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>

                      {isCurrent && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-primary rounded-full"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-full h-full bg-primary rounded-full"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Completion Actions */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="p-8 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                  تم إنشاء التقرير بنجاح!
                </h3>
                <p className="text-green-600 dark:text-green-300">
                  تقرير الجودة الشامل جاهز للعرض والتحميل
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary">
                  <Icons.eye className="w-4 h-4 ml-2" />
                  عرض التقرير
                </Button>
                <Button variant="outline">
                  <Icons.fileText className="w-4 h-4 ml-2" />
                  تحميل PDF
                </Button>
                <Link href="/reports">
                  <Button variant="secondary">
                    <Icons.chevronRight className="w-4 h-4 ml-2" />
                    العودة للتقارير
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}