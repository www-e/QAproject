import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { Test } from "@/types/tests"

interface TestExecutionTabProps {
  test: Test
}

const executionSteps = [
  { step: "إعداد البيئة", status: "مكتمل", time: "0.5s" },
  { step: "تحميل البيانات", status: "مكتمل", time: "1.2s" },
  { step: "تنفيذ الاختبار", status: "مكتمل", time: "2.1s" },
  { step: "التحقق من النتائج", status: "مكتمل", time: "0.3s" },
  { step: "تنظيف البيئة", status: "مكتمل", time: "0.2s" },
]

const executionLogs = [
  "[2024-01-15 10:30:15] INFO: بدء تنفيذ الاختبار",
  "[2024-01-15 10:30:15] INFO: إعداد البيئة...",
  "[2024-01-15 10:30:16] INFO: تحميل البيانات التجريبية",
  "[2024-01-15 10:30:17] INFO: تنفيذ حالات الاختبار",
  "[2024-01-15 10:30:19] INFO: جميع الاختبارات نجحت",
  "[2024-01-15 10:30:19] INFO: تنظيف البيئة",
  "[2024-01-15 10:30:19] SUCCESS: اكتمل الاختبار بنجاح"
]

export default function TestExecutionTab({}: TestExecutionTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>خطوات التنفيذ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executionSteps.map((step, index) => (
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

      <Card>
        <CardHeader>
          <CardTitle>سجل التنفيذ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-60 overflow-y-auto">
            {executionLogs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
