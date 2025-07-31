import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Test } from "@/types/tests"

interface TestPerformanceMetricsProps {
  test: Test
}

export default function TestPerformanceMetrics({ test }: TestPerformanceMetricsProps) {
  return (
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
  )
}
