import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { ScrollArea } from "@/components/ui/scroll-area"

const mockErrors = [
  { id: "ERR-001", desc: "فشل في تحميل الصفحة", severity: "عالية", status: "مفتوح", date: "2024-01-15" },
  { id: "ERR-002", desc: "خطأ في التحقق من البيانات", severity: "متوسطة", status: "قيد المراجعة", date: "2024-01-14" },
  { id: "ERR-003", desc: "مشكلة في الاتصال", severity: "منخفضة", status: "مغلق", date: "2024-01-13" }
]

export default function TestErrorsTable() {
  return (
    <div className="w-full">
      {/* Mobile/Tablet View - Card Layout */}
      <div className="block lg:hidden space-y-4">
        {mockErrors.map((error, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium">{error.id}</span>
              <Badge variant={
                error.severity === "عالية" ? "destructive" :
                error.severity === "متوسطة" ? "secondary" : "outline"
              }>
                {error.severity}
              </Badge>
            </div>
            <p className="text-sm">{error.desc}</p>
            <div className="flex items-center justify-between">
              <Badge variant={
                error.status === "مفتوح" ? "destructive" :
                error.status === "قيد المراجعة" ? "secondary" : "default"
              }>
                {error.status}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{error.date}</span>
                <Button variant="ghost" size="sm" className="h-8">
                  <Icons.play className="w-3 h-3 ml-1" />
                  عرض
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden lg:block">
        <ScrollArea className="w-full">
          <div className="min-w-[800px]">
            <table className="w-full border-collapse border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-right font-semibold w-[100px]">رقم</th>
                  <th className="border border-border p-3 text-right font-semibold min-w-[200px]">وصف</th>
                  <th className="border border-border p-3 text-right font-semibold w-[100px]">شدة</th>
                  <th className="border border-border p-3 text-right font-semibold w-[120px]">الحالة</th>
                  <th className="border border-border p-3 text-right font-semibold w-[100px]">التاريخ</th>
                  <th className="border border-border p-3 text-right font-semibold w-[100px]">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {mockErrors.map((error, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="border border-border p-3 font-mono text-sm">{error.id}</td>
                    <td className="border border-border p-3">
                      <div className="max-w-[300px] truncate" title={error.desc}>
                        {error.desc}
                      </div>
                    </td>
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
        </ScrollArea>
      </div>
    </div>
  )
}
