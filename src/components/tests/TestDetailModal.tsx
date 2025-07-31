"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TestDetailModalProps {
  test: any
  isOpen: boolean
  onClose: () => void
}

export default function TestDetailModal({ test, isOpen, onClose }: TestDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState(test?.status || "قيد التنفيذ")
  
  if (!test) return null

  const statusOptions = [
    { value: "قيد التنفيذ", label: "قيد التنفيذ", color: "secondary" },
    { value: "مكتمل", label: "مكتمل", color: "default" },
    { value: "فشل", label: "فشل", color: "destructive" },
    { value: "معلق", label: "معلق", color: "outline" },
    { value: "ملغي", label: "ملغي", color: "secondary" }
  ]

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus)
    // Here you would typically update the test status in your data store
    console.log(`Status changed to: ${newStatus}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Icons.fileText className="w-6 h-6" />
            تفاصيل الاختبار: {test.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="execution">التنفيذ</TabsTrigger>
            <TabsTrigger value="errors">الأخطاء</TabsTrigger>
            <TabsTrigger value="external">الروابط الخارجية</TabsTrigger>
            <TabsTrigger value="metadata">البيانات الوصفية</TabsTrigger>
            <TabsTrigger value="history">السجل</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>معلومات أساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الاسم:</span>
                    <span className="font-medium">{test.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">النوع:</span>
                    <Badge variant="outline">{test.type}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">الحالة:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto p-0">
                          <Badge 
                            variant={
                              statusOptions.find(s => s.value === currentStatus)?.color as any || "secondary"
                            }
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            {currentStatus}
                            <Icons.chevronRight className="w-3 h-3 mr-1" />
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {statusOptions.map((status) => (
                          <DropdownMenuItem
                            key={status.value}
                            onClick={() => handleStatusChange(status.value)}
                            className="cursor-pointer"
                          >
                            <Badge 
                              variant={status.color as any}
                              className="mr-2"
                            >
                              {status.label}
                            </Badge>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الأولوية:</span>
                    <Badge 
                      variant={
                        test.priority === "عالية" ? "destructive" : 
                        test.priority === "متوسطة" ? "secondary" : "outline"
                      }
                    >
                      {test.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>مقاييس الأداء</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">وقت التنفيذ:</span>
                    <span className="font-medium">{test.duration || "2.3s"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">استهلاك الذاكرة:</span>
                    <span className="font-medium">45.2 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">استهلاك المعالج:</span>
                    <span className="font-medium">12.5%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>معدل النجاح</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>الوصف</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {test.description || "هذا الاختبار يتحقق من صحة وظائف النظام الأساسية ويضمن أن جميع المكونات تعمل بشكل صحيح. يتضمن اختبارات للواجهات والقواعد البيانات والخدمات الخارجية."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="execution" className="space-y-6">
            {/* Test Steps */}
            <Card>
              <CardHeader>
                <CardTitle>خطوات التنفيذ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: "إعداد البيئة", status: "مكتمل", time: "0.5s" },
                    { step: "تحميل البيانات", status: "مكتمل", time: "1.2s" },
                    { step: "تنفيذ الاختبار", status: "مكتمل", time: "2.1s" },
                    { step: "التحقق من النتائج", status: "مكتمل", time: "0.3s" },
                    { step: "تنظيف البيئة", status: "مكتمل", time: "0.2s" },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Icons.check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium">{step.step}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{step.status}</Badge>
                        <span className="text-sm text-muted-foreground">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Logs */}
            <Card>
              <CardHeader>
                <CardTitle>سجل التنفيذ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-60 overflow-y-auto">
                  <div>[2024-01-15 10:30:15] INFO: بدء تنفيذ الاختبار</div>
                  <div>[2024-01-15 10:30:15] INFO: إعداد البيئة...</div>
                  <div>[2024-01-15 10:30:16] INFO: تحميل البيانات التجريبية</div>
                  <div>[2024-01-15 10:30:17] INFO: تنفيذ حالات الاختبار</div>
                  <div>[2024-01-15 10:30:19] INFO: جميع الاختبارات نجحت</div>
                  <div>[2024-01-15 10:30:19] INFO: تنظيف البيئة</div>
                  <div>[2024-01-15 10:30:19] SUCCESS: اكتمل الاختبار بنجاح</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            {/* Errors Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.alert className="w-5 h-5 text-red-500" />
                  جدول الأخطاء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border rounded-lg">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-border p-3 text-right font-semibold">رقم</th>
                        <th className="border border-border p-3 text-right font-semibold">وصف</th>
                        <th className="border border-border p-3 text-right font-semibold">شدة</th>
                        <th className="border border-border p-3 text-right font-semibold">الحالة</th>
                        <th className="border border-border p-3 text-right font-semibold">التاريخ</th>
                        <th className="border border-border p-3 text-right font-semibold">رابط الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "ERR-001", desc: "فشل في تحميل الصفحة", severity: "عالية", status: "مفتوح", date: "2024-01-15", link: "#" },
                        { id: "ERR-002", desc: "خطأ في التحقق من البيانات", severity: "متوسطة", status: "قيد المراجعة", date: "2024-01-14", link: "#" },
                        { id: "ERR-003", desc: "مشكلة في الاتصال", severity: "منخفضة", status: "مغلق", date: "2024-01-13", link: "#" }
                      ].map((error, index) => (
                        <tr key={index} className="hover:bg-muted/30 transition-colors">
                          <td className="border border-border p-3 font-mono text-sm">{error.id}</td>
                          <td className="border border-border p-3">{error.desc}</td>
                          <td className="border border-border p-3">
                            <Badge variant={
                              error.severity === "عالية" ? "destructive" :
                              error.severity === "متوسطة" ? "secondary" : "outline"
                            }>
                              {error.severity}
                            </Badge>
                          </td>
                          <td className="border border-border p-3">
                            <Badge variant={
                              error.status === "مفتوح" ? "destructive" :
                              error.status === "قيد المراجعة" ? "secondary" : "default"
                            }>
                              {error.status}
                            </Badge>
                          </td>
                          <td className="border border-border p-3 text-sm">{error.date}</td>
                          <td className="border border-border p-3">
                            <Button variant="ghost" size="sm" className="h-8">
                              <Icons.play className="w-3 h-3 ml-1" />
                              عرض
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Error Details Sidebar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.fileText className="w-5 h-5 text-blue-500" />
                  تفاصيل الخطأ المحدد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">معلومات الخطأ</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">رقم الخطأ:</span>
                        <span className="font-mono">ERR-001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">النوع:</span>
                        <span>خطأ في التحميل</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المتصفح:</span>
                        <span>Chrome 120.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">خطوات إعادة الإنتاج</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>فتح الصفحة الرئيسية</li>
                      <li>النقر على زر "تسجيل الدخول"</li>
                      <li>إدخال بيانات غير صحيحة</li>
                      <li>ملاحظة ظهور الخطأ</li>
                    </ol>
                  </div>
                </div>

                {/* Screenshots/Logs placeholder */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Icons.fileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">صور الشاشة والسجلات</p>
                  <p className="text-sm text-muted-foreground">سيتم عرض الصور والسجلات هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="external" className="space-y-6">
            {/* External Tools Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.workflow className="w-5 h-5 text-purple-500" />
                    GitHub Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Icons.play className="w-4 h-4 ml-2" />
                        عرض Repository
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Icons.fileText className="w-4 h-4 ml-2" />
                        Issues المرتبطة
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Icons.workflow className="w-4 h-4 ml-2" />
                        Pull Requests
                      </a>
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h5 className="font-medium mb-2">معلومات Repository</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Branch:</span>
                        <span className="font-mono">main</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Commit:</span>
                        <span className="font-mono">a1b2c3d</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.chart className="w-5 h-5 text-blue-500" />
                    JIRA Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Icons.fileText className="w-4 h-4 ml-2" />
                        عرض Ticket
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Icons.users className="w-4 h-4 ml-2" />
                        Sprint Board
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Icons.chart className="w-4 h-4 ml-2" />
                        Reports
                      </a>
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h5 className="font-medium mb-2">معلومات Ticket</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ticket ID:</span>
                        <span className="font-mono">QA-123</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="secondary">In Progress</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Tools */}
            <Card>
              <CardHeader>
                <CardTitle>أدوات إضافية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Slack", icon: Icons.message, color: "text-green-500" },
                    { name: "Teams", icon: Icons.users, color: "text-blue-500" },
                    { name: "Confluence", icon: Icons.fileText, color: "text-purple-500" },
                    { name: "TestRail", icon: Icons.chart, color: "text-orange-500" }
                  ].map((tool, index) => (
                    <Button key={index} variant="outline" className="h-20 flex-col gap-2" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <tool.icon className={`w-6 h-6 ${tool.color}`} />
                        <span className="text-sm">{tool.name}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الاختبار</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نوع الاختبار:</span>
                    <span className="font-medium">{test.type === "automated" ? "آلي" : "يدوي"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">البيئة:</span>
                    <span className="font-medium">بيئة الاختبار</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المتصفح:</span>
                    <span className="font-medium">Chrome 120.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نظام التشغيل:</span>
                    <span className="font-medium">Windows 11</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الإصدار:</span>
                    <span className="font-medium">v2.1.0</span>
                  </div>
                </CardContent>
              </Card>

              {/* Test Data */}
              <Card>
                <CardHeader>
                  <CardTitle>بيانات الاختبار</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المنشئ:</span>
                    <span className="font-medium">أحمد محمد</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                    <span className="font-medium">2024-01-10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">آخر تحديث:</span>
                    <span className="font-medium">2024-01-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">عدد التنفيذات:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">معرف الاختبار:</span>
                    <span className="font-medium font-mono text-xs">TC-2024-001</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>العلامات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">regression</Badge>
                  <Badge variant="secondary">api</Badge>
                  <Badge variant="secondary">critical</Badge>
                  <Badge variant="secondary">authentication</Badge>
                  <Badge variant="secondary">security</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل التنفيذات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "2024-01-15 10:30", status: "نجح", duration: "4.2s", version: "v2.1.0" },
                    { date: "2024-01-14 15:45", status: "نجح", duration: "3.8s", version: "v2.1.0" },
                    { date: "2024-01-13 09:20", status: "فشل", duration: "2.1s", version: "v2.0.9" },
                    { date: "2024-01-12 14:30", status: "نجح", duration: "4.5s", version: "v2.0.9" },
                    { date: "2024-01-11 11:15", status: "نجح", duration: "3.9s", version: "v2.0.8" },
                  ].map((execution, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={execution.status === "نجح" ? "default" : "destructive"}
                        >
                          {execution.status}
                        </Badge>
                        <span className="text-sm">{execution.date}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{execution.duration}</span>
                        <span>{execution.version}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
          <Button>
            <Icons.play className="w-4 h-4 ml-2" />
            تشغيل الاختبار
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}