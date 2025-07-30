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
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { StatefulButton } from "@/components/ui/stateful-button"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
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
      {/* Enhanced Header */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            🧪 مركز التحكم
          </Badge>
          <TextGenerateEffect
            words="مركز إدارة الاختبارات المتقدم"
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            تتبع وإدارة جميع اختباراتك مع لوحة تحكم متقدمة وتحليلات في الوقت الفعلي
          </p>
        </motion.div>
      </motion.div>

      {/* Enhanced Summary Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {[
          { label: "إجمالي الاختبارات", value: totalTests, color: "primary", icon: Icons.chart },
          { label: "الاختبارات المكتملة", value: completedTests, color: "green", icon: Icons.check },
          { label: "الاختبارات الفاشلة", value: failedTests, color: "red", icon: Icons.alert },
          { label: "معدل النجاح", value: avgSuccess, color: "blue", icon: Icons.chart, suffix: "%" }
        ].map((stat, index) => (
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

      {/* Enhanced Filters */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <BackgroundGradient className="rounded-2xl p-1">
          <Card className="bg-background border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icons.search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="البحث في الاختبارات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 h-12 bg-sidebar-accent/50 border-sidebar-border focus:bg-background"
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] h-12">
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
                    <SelectTrigger className="w-[180px] h-12">
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
        </BackgroundGradient>
      </motion.div>

      {/* Enhanced Tests Table - FIXED VERSION */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <GlowingEffect>
          <Card className="glass border-border/50">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl font-bold">قائمة الاختبارات</span>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="font-arabic-numbers">
                    {filteredTests.length} من {totalTests}
                  </Badge>
                  <Button className="btn-primary">
                    <Icons.play className="w-4 h-4 ml-2" />
                    تشغيل جميع الاختبارات
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Fixed Table Container */}
              <div className="overflow-auto">
                <Table className="w-full" dir="rtl">
                  <TableHeader>
                    <TableRow className="bg-sidebar-accent/30 hover:bg-sidebar-accent/30">
                      <TableHead className="text-right font-semibold text-foreground">معرف الاختبار</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">اسم الاختبار</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">النوع</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">الحالة</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">الأولوية</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">معدل النجاح</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">المسؤول</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.length > 0 ? (
                      filteredTests.map((test, index) => (
                        <motion.tr
                          key={test.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-sidebar-accent/50 transition-colors border-b border-border/30"
                        >
                          <TableCell className="font-mono text-sm font-medium text-foreground">{test.id}</TableCell>
                          <TableCell className="max-w-[200px]">
                            <div>
                              <div className="font-medium text-foreground truncate" title={test.name}>
                                {test.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {test.duration} • {test.environment}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs font-medium">
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
                              <div className="flex-1 bg-border rounded-full h-2 min-w-[60px]">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-primary h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${test.success}%` }}
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <NumberTicker value={test.success} className="font-bold text-sm min-w-[2rem] text-foreground" />
                                <span className="text-muted-foreground text-xs">%</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium text-foreground">{test.assignee}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(test.lastRun).toLocaleDateString('ar-EG')}
                              </div>
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
                                loadingText="جاري..."
                                successText="تم"
                                className="text-xs h-8"
                              >
                                <Icons.play className="w-3 h-3 ml-1" />
                              </StatefulButton>
                              
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Icons.eye className="w-3 h-3" />
                              </Button>
                              
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Icons.settings className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center space-y-2">
                            <Icons.search className="w-8 h-8 text-muted-foreground" />
                            <p className="text-muted-foreground">لم يتم العثور على اختبارات مطابقة للبحث</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </GlowingEffect>
      </motion.div>
    </div>
  )
}
