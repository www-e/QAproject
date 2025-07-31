import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import TestErrorsTable from "../components/TestErrorsTable"
import { Test } from "@/types/tests"
interface TestErrorsTabProps {
  test: Test
}

export default function TestErrorsTab({}: TestErrorsTabProps) {
  return (
    <div className="space-y-6">
      {/* Errors Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.alert className="w-5 h-5 text-red-500" />
            جدول الأخطاء
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-6">
          <TestErrorsTable />
        </CardContent>
      </Card>

      {/* Error Details */}
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
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-muted-foreground">رقم الخطأ:</span>
                  <span className="font-mono">ERR-001</span>
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-muted-foreground">النوع:</span>
                  <span>خطأ في التحميل</span>
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-muted-foreground">المتصفح:</span>
                  <span>Chrome 120.0</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">خطوات إعادة الإنتاج</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>فتح الصفحة الرئيسية</li>
                <li>النقر على زر تسجيل الدخول</li>
                <li>إدخال بيانات غير صحيحة</li>
                <li>ملاحظة ظهور الخطأ</li>
              </ol>
            </div>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Icons.fileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">صور الشاشة والسجلات</p>
            <p className="text-sm text-muted-foreground">سيتم عرض الصور والسجلات هنا</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
