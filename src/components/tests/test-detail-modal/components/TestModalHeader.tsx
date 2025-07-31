import { Icons } from "@/components/ui/icons"

interface TestModalHeaderProps {
  testName: string
}

export default function TestModalHeader({ testName }: TestModalHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Icons.fileText className="w-6 h-6" />
      <div>
        <h2 className="text-lg font-semibold">تفاصيل الاختبار</h2>
        <p className="text-sm text-muted-foreground">{testName}</p>
      </div>
    </div>
  )
}
