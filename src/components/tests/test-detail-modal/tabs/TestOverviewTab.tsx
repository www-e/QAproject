import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TestBasicInfo from "../components/TestBasicInfo"
import TestPerformanceMetrics from "../components/TestPerformanceMetrics"
import { Test } from "@/types/tests"


interface TestOverviewTabProps {
  test: Test;
  currentStatus: Test["status"];
  onStatusChange: (status: Test["status"]) => void;
}

export default function TestOverviewTab({ test, currentStatus, onStatusChange }: TestOverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TestBasicInfo 
          test={test}
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
        />
        <TestPerformanceMetrics test={test} />
      </div>

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
    </div>
  )
}
