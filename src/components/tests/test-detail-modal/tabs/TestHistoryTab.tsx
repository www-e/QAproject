import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TestHistoryTabProps {
  test: any
}

const executionHistory = [
  { date: "2024-01-15 10:30", status: "نجح", duration: "4.2s", version: "v2.1.0" },
  { date: "2024-01-14 15:45", status: "نجح", duration: "3.8s", version: "v2.1.0" },
  { date: "2024-01-13 09:20", status: "فشل", duration: "2.1s", version: "v2.0.9" },
  { date: "2024-01-12 14:30", status: "نجح", duration: "4.5s", version: "v2.0.9" },
  { date: "2024-01-11 11:15", status: "نجح", duration: "3.9s", version: "v2.0.8" },
]

export default function TestHistoryTab({ test }: TestHistoryTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>سجل التنفيذات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executionHistory.map((execution, index) => (
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
    </div>
  )
}
