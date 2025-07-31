import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

const mockErrors = [
  { id: "ERR-001", desc: "فشل في تحميل الصفحة", severity: "عالية", status: "مفتوح", date: "2024-01-15", link: "#" },
  { id: "ERR-002", desc: "خطأ في التحقق من البيانات", severity: "متوسطة", status: "قيد المراجعة", date: "2024-01-14", link: "#" },
  { id: "ERR-003", desc: "مشكلة في الاتصال", severity: "منخفضة", status: "مغلق", date: "2024-01-13", link: "#" }
]

export default function TestErrorsTable() {
  return (
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
          {mockErrors.map((error, index) => (
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
  )
}
