"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TestDetailModalProps {
  test: any
  isOpen: boolean
  onClose: () => void
}

export default function TestDetailModal({ test, isOpen, onClose }: TestDetailModalProps) {
  if (!test) return null

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="execution">التنفيذ</TabsTrigger>
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
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الحالة:</span>
                    <Badge 
                      variant={
                        test.status === "نجح" ? "default" : 
                        test.status === "فشل" ? "destructive" : "secondary"
                      }
                    >
                      {test.status}
                    </Badge>
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