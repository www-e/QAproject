import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Test } from "@/types/tests"


interface TestMetadataTabProps {
  test: Test
}

export default function TestMetadataTab({ test }: TestMetadataTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  )
}
