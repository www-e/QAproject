"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { Icons } from "@/components/ui/icons";
import { preloadPage } from "@/lib/dynamic-imports";

// CRITICAL: Load essential UI immediately
import WorkflowHeader from "@/components/workflow/WorkflowHeader";
import WorkflowStats from "@/components/workflow/WorkflowStats";

// LAZY: Only heavy components
const WorkflowSteps = lazy(() => import("@/components/workflow/WorkflowSteps"));



// Workflow steps data
const workflowSteps = [
  {
    id: 1,
    title: "تخطيط الاختبار",
    description: "تحديد متطلبات الاختبار وإعداد الخطة الشاملة",
    status: "مكتمل",
    progress: 100,
    duration: "2 أيام",
    assignee: "فريق التخطيط",
    icon: Icons.fileText,
    color: "green",
    tasks: [
      { name: "تحليل المتطلبات", completed: true },
      { name: "إعداد خطة الاختبار", completed: true },
      { name: "تحديد البيئات", completed: true },
    ],
  },
  {
    id: 2,
    title: "تصميم حالات الاختبار",
    description: "إنشاء وتصميم حالات الاختبار المفصلة",
    status: "مكتمل",
    progress: 100,
    duration: "3 أيام",
    assignee: "محللو الجودة",
    icon: Icons.settings,
    color: "green",
    tasks: [
      { name: "كتابة حالات الاختبار", completed: true },
      { name: "مراجعة الحالات", completed: true },
      { name: "اعتماد النهائي", completed: true },
    ],
  },
  {
    id: 3,
    title: "إعداد البيئة",
    description: "تجهيز بيئة الاختبار والأدوات المطلوبة",
    status: "قيد التنفيذ",
    progress: 75,
    duration: "1 يوم",
    assignee: "فريق البنية التحتية",
    icon: Icons.settings,
    color: "blue",
    tasks: [
      { name: "إعداد الخوادم", completed: true },
      { name: "تثبيت الأدوات", completed: true },
      { name: "اختبار الاتصال", completed: false },
    ],
  },
  {
    id: 4,
    title: "تنفيذ الاختبارات",
    description: "تشغيل جميع حالات الاختبار وتسجيل النتائج",
    status: "معلق",
    progress: 0,
    duration: "5 أيام",
    assignee: "فريق الاختبار",
    icon: Icons.play,
    color: "orange",
    tasks: [
      { name: "اختبارات الوحدة", completed: false },
      { name: "اختبارات التكامل", completed: false },
      { name: "اختبارات النظام", completed: false },
    ],
  },
  {
    id: 5,
    title: "تقييم النتائج",
    description: "تحليل نتائج الاختبارات وإعداد التقارير",
    status: "لم يبدأ",
    progress: 0,
    duration: "2 أيام",
    assignee: "مدير الجودة",
    icon: Icons.chart,
    color: "gray",
    tasks: [
      { name: "تحليل النتائج", completed: false },
      { name: "إعداد التقرير", completed: false },
      { name: "التوصيات", completed: false },
    ],
  },
  {
    id: 6,
    title: "الاعتماد النهائي",
    description: "اعتماد النتائج والموافقة على الإصدار",
    status: "لم يبدأ",
    progress: 0,
    duration: "1 يوم",
    assignee: "الإدارة العليا",
    icon: Icons.check,
    color: "gray",
    tasks: [
      { name: "مراجعة التقرير", completed: false },
      { name: "الموافقة النهائية", completed: false },
      { name: "الإعلان عن الإصدار", completed: false },
    ],
  },
];

export default function WorkflowPage() {
  const [isExecuting, setIsExecuting] = useState<number | null>(null);

  const handleExecuteStep = async (stepId: number) => {
    setIsExecuting(stepId);
    // Simulate execution
    setTimeout(() => {
      setIsExecuting(null);
    }, 3000);
  };

  const completedSteps = workflowSteps.filter(
    (step) => step.status === "مكتمل"
  ).length;
  const totalSteps = workflowSteps.length;
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  useEffect(() => {
    // Preload adjacent tabs
    preloadPage(() => import("../tests/page"))
    preloadPage(() => import("../reports/page"))
  }, [])

  return (
    <div className="container mx-auto container-responsive space-y-6 sm:space-y-8">
      <WorkflowHeader />
      
      <WorkflowStats 
        completedSteps={completedSteps}
        totalSteps={totalSteps}
        overallProgress={overallProgress}
      />
      
      <Suspense fallback={<div className="h-96 bg-muted rounded-lg animate-pulse" />}>
        <WorkflowSteps 
          workflowSteps={workflowSteps}
          isExecuting={isExecuting}
          onExecuteStep={handleExecuteStep}
        />
      </Suspense>
    </div>
  );
}
