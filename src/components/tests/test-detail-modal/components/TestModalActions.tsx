import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface TestModalActionsProps {
  onClose: () => void
}

export default function TestModalActions({ onClose }: TestModalActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-4 border-t">
      <Button variant="outline" onClick={onClose}>
        إغلاق
      </Button>
      <Button>
        <Icons.play className="w-4 h-4 ml-2" />
        تشغيل الاختبار
      </Button>
    </div>
  )
}
