import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TestStatusDropdown from "./TestStatusDropdown"

interface TestBasicInfoProps {
  test: any
  currentStatus: string
  onStatusChange: (status: string) => void
}

export default function TestBasicInfo({ test, currentStatus, onStatusChange }: TestBasicInfoProps) {
  return (
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
          <TestStatusDropdown 
            currentStatus={currentStatus}
            onStatusChange={onStatusChange}
          />
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
  )
}
