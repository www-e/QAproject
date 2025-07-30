import { Test } from "@/types/tests"

export const mockTests: Test[] = [
  {
    id: "T-001",
    name: "اختبار واجهة المستخدم الرئيسية",
    type: "UI Testing",
    status: "مكتمل",
    priority: "عالية",
    duration: "45 دقيقة",
    lastRun: "2025-07-29T10:30:00",
    success: 95,
    assignee: "أحمد محمد",
    environment: "Production"
  },
  {
    id: "T-002", 
    name: "اختبار أداء قاعدة البيانات",
    type: "Performance",
    status: "قيد التنفيذ",
    priority: "متوسطة",
    duration: "2 ساعة",
    lastRun: "2025-07-29T14:15:00",
    success: 78,
    assignee: "فاطمة علي",
    environment: "Staging"
  },
  {
    id: "T-003",
    name: "اختبار الأمان والحماية",
    type: "Security",
    status: "فشل",
    priority: "عالية جداً",
    duration: "1.5 ساعة",
    lastRun: "2025-07-29T09:00:00",
    success: 45,
    assignee: "محمد حسن",
    environment: "Testing"
  },
  {
    id: "T-004",
    name: "اختبار التكامل مع API",
    type: "Integration",
    status: "معلق",
    priority: "متوسطة",
    duration: "30 دقيقة",
    lastRun: "2025-07-28T16:45:00",
    success: 88,
    assignee: "سارة أحمد",
    environment: "Development"
  },
  {
    id: "T-005",
    name: "اختبار التحميل والاستجابة",
    type: "Load Testing",
    status: "مكتمل",
    priority: "عالية",
    duration: "3 ساعات",
    lastRun: "2025-07-29T11:00:00",
    success: 92,
    assignee: "عمر خالد",
    environment: "Production"
  }
]
