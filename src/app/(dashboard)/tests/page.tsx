"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { StatefulButton } from "@/components/ui/stateful-button"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

// Mock test data
const testData = [
  {
    id: "T-001",
    name: "اختبار واجهة المستخدم الرئيسية",
    type: "UI Testing",
    status: "مكتمل",
    priority: "عالية",
    duration: "45 دقيقة",
    lastRun: "2025-07-29T10:30:00",
    success: 95,
    assignee: "أحمد محمد",
    environment: "Production"
  },
  {
    id: "T-002", 
    name: "اختبار أداء قاعدة البيانات",
    type: "Performance",
    status: "قيد التنفيذ",
    priority: "متوسطة",
    duration: "2 ساعة",
    lastRun: "2025-07-29T14:15:00",
    success: 78,
    assignee: "فاطمة علي",
    environment: "Staging"
  },
  {
    id: "T-003",
    name: "اختبار الأمان والحماية",
    type: "Security",
    status: "فشل",
    priority: "عالية جداً",
    duration: "1.5 ساعة",
    lastRun: "2025-07-29T09:00:00",
    success: 45,
    assignee: "محمد حسن",
    environment: "Testing"
  },
  {
    id: "T-004",
    name: "اختبار التكامل مع API",
    type: "Integration",
    status: "معلق",
    priority: "متوسطة",
    duration: "30 دقيقة",
    lastRun: "2025-07-28T16:45:00",
    success: 88,
    assignee: "سارة أحمد",
    environment: "Development"
  },
  {
    id: "T-005",
    name: "اختبار التحميل والاستجابة",
    type: "Load Testing",
    status: "مكتمل",
    priority: "عالية",
    duration: "3 ساعات",
    lastRun: "2025-07-29T11:00:00",
    success: 92,
    assignee: "عمر خالد",
    environment: "Production"
  }
]

const statusColors = {
  "مكتمل": "default",
  "قيد التنفيذ": "secondary", 
  "فشل": "destructive",
  "معلق": "outline"
} as const

const priorityColors = {
  "عالية جداً": "destructive",
  "عالية": "default",
  "متوسطة": "secondary",
  "منخفضة": "outline"
} as const

export default function TestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isRunningTest, setIsRunningTest] = useState<string | null>(null)

  const filteredTests = testData.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || test.status === statusFilter
    const matchesType = typeFilter === "all" || test.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleRunTest = async (testId: string) => {
    setIsRunningTest(testId)
    // Simulate test execution
    setTimeout(() => {
      setIsRunningTest(null)
    }, 3000)
  }

  // Calculate summary stats
  const totalTests = testData.length
  const completedTests = testData.filter(t => t.status === "مكتمل").length
  const failedTests = testData.filter(t => t.status === "فشل").length
  const avgSuccess = Math.round(testData.reduce((acc, test) => acc + test.success, 0) / totalTests)

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="space-y-4"
      >
        <motion.h1 
          className="text-3xl font-bold text-foreground"
          variants={fadeInUp}
        >
          إدارة الاختبارات
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground text-lg"
          variants={fadeInUp}
        >
          تتبع وإدارة جميع اختباراتك في مكان واحد
        </motion.p>
      </motion.div>

      {/* Summary Stats using Your Hover Border Gradient */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp}>
          <HoverBorderGradient containerClassName="rounded-xl">
            <Card className="bg-background border-0 text-center">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">إجمالي الاختبارات</p>
                  <NumberTicker value={totalTests} className="text-3xl font-bold text-foreground" />
                </div>
              </CardContent>
            </Card>
          </HoverBorderGradient>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <HoverBorderGradient containerClassName="rounded-xl">
            <Card className="bg-background border-0 text-center">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">الاختبارات المكتملة</p>
                  <NumberTicker value={completedTests} className="text-3xl font-bold text-green-600" />
                </div>
              </CardContent>
            </Card>
          </HoverBorderGradient>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <HoverBorderGradient containerClassName="rounded-xl">
            <Card className="bg-background border-0 text-center">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">الاختبارات الفاشلة</p>
                  <NumberTicker value={failedTests} className="text-3xl font-bold text-destructive" />
                </div>
              </CardContent>
            </Card>
          </HoverBorderGradient>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <HoverBorderGradient containerClassName="rounded-xl">
            <Card className="bg-background border-0 text-center">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">معدل النجاح</p>
                  <NumberTicker value={avgSuccess} className="text-3xl font-bold text-primary" />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </CardContent>
            </Card>
          </HoverBorderGradient>
        </motion.div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <GlowingEffect>
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icons.search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="البحث في الاختبارات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="حالة الاختبار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="مكتمل">مكتمل</SelectItem>
                      <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                      <SelectItem value="فشل">فشل</SelectItem>
                      <SelectItem value="معلق">معلق</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="نوع الاختبار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="UI Testing">اختبار واجهة</SelectItem>
                      <SelectItem value="Performance">اختبار أداء</SelectItem>
                      <SelectItem value="Security">اختبار أمان</SelectItem>
                      <SelectItem value="Integration">اختبار تكامل</SelectItem>
                      <SelectItem value="Load Testing">اختبار تحميل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </GlowingEffect>
      </motion.div>

      {/* Tests Table using Your Components */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <GlowingEffect>
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>قائمة الاختبارات</span>
                <Badge variant="secondary" className="font-arabic-numbers">
                  {filteredTests.length} من {totalTests}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">معرف الاختبار</TableHead>
                    <TableHead className="text-right">اسم الاختبار</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الأولوية</TableHead>
                    <TableHead className="text-right">معدل النجاح</TableHead>
                    <TableHead className="text-right">المسؤول</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test, index) => (
                    <motion.tr
                      key={test.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <TableCell className="font-mono text-sm">{test.id}</TableCell>
                      <TableCell className="font-medium max-w-[200px]">
                        <div className="truncate" title={test.name}>
                          {test.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {test.duration} • {test.environment}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {test.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[test.status as keyof typeof statusColors]}>
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={priorityColors[test.priority as keyof typeof priorityColors]} className="text-xs">
                          {test.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <NumberTicker value={test.success} className="font-bold" />
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{test.assignee}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(test.lastRun).toLocaleDateString('ar-EG')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <StatefulButton
                            size="sm"
                            onClick={() => handleRunTest(test.id)}
                            disabled={test.status === "قيد التنفيذ"}
                            isLoading={isRunningTest === test.id}
                            idleText="تشغيل"
                            loadingText="جاري التشغيل"
                            successText="تم التشغيل"
                            className="text-xs"
                          >
                            <Icons.play className="w-3 h-3 ml-1" />
                          </StatefulButton>
                          
                          <Button variant="outline" size="sm">
                            <Icons.eye className="w-3 h-3" />
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <Icons.settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </GlowingEffect>
      </motion.div>
    </div>
  )
}
