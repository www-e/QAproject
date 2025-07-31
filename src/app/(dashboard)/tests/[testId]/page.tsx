// src/app/(dashboard)/tests/[testId]/page.tsx
"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TestOverviewTab from "@/components/tests/test-detail-modal/tabs/TestOverviewTab";
import TestExecutionTab from "@/components/tests/test-detail-modal/tabs/TestExecutionTab";
import TestErrorsTab from "@/components/tests/test-detail-modal/tabs/TestErrorsTab";
import TestExternalTab from "@/components/tests/test-detail-modal/tabs/TestExternalTab";
import TestMetadataTab from "@/components/tests/test-detail-modal/tabs/TestMetadataTab";
import TestHistoryTab from "@/components/tests/test-detail-modal/tabs/TestHistoryTab";
import { mockTests } from "@/data/mockTests";
import { staggerChildren, fadeInUp } from "@/lib/animations";

interface TestDetailPageProps {
  params: Promise<{ testId: string }>;
}

export default function TestDetailPage({ params }: TestDetailPageProps) {
  const { testId } = use(params);
  const router = useRouter();
  
  // Find the test (in real app, this would be an API call)
  const test = mockTests.find(t => t.id === testId);
  
  if (!test) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">الاختبار غير موجود</h1>
        <Button onClick={() => router.push("/tests")}>
          العودة إلى الاختبارات
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-6 space-y-6"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div 
        variants={fadeInUp}
        className="flex items-center justify-between bg-card p-6 rounded-xl border shadow-sm"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <Icons.chevronRight className="w-4 h-4 rotate-180" />
            رجوع
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold">{test.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">معرف الاختبار:</span>
              <code className="text-sm bg-muted px-2 py-1 rounded">{test.id}</code>
              <Badge variant="outline">{test.type}</Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Icons.settings className="w-4 h-4 ml-2" />
            تعديل
          </Button>
          <Button>
            <Icons.play className="w-4 h-4 ml-2" />
            تشغيل الاختبار
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeInUp}>
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="w-full h-auto p-1 bg-muted/50 rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 w-full">
              <TabsTrigger 
                value="overview" 
                className="px-4 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                نظرة عامة
              </TabsTrigger>
              <TabsTrigger 
                value="execution" 
                className="px-4 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                التنفيذ
              </TabsTrigger>
              <TabsTrigger 
                value="errors" 
                className="px-4 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                الأخطاء
              </TabsTrigger>
              <TabsTrigger 
                value="external" 
                className="px-4 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                الروابط الخارجية
              </TabsTrigger>
              <TabsTrigger 
                value="metadata" 
                className="px-4 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                البيانات الوصفية
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="px-4 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                السجل
              </TabsTrigger>
            </div>
          </TabsList>

          {/* Tab Content */}
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <TabsContent value="overview" className="m-0">
              <TestOverviewTab
                test={test}
                currentStatus={test.status}
                onStatusChange={(status) => console.log("Status changed:", status)}
              />
            </TabsContent>

            <TabsContent value="execution" className="m-0">
              <TestExecutionTab test={test} />
            </TabsContent>

            <TabsContent value="errors" className="m-0">
              <TestErrorsTab test={test} />
            </TabsContent>

            <TabsContent value="external" className="m-0">
              <TestExternalTab test={test} />
            </TabsContent>

            <TabsContent value="metadata" className="m-0">
              <TestMetadataTab test={test} />
            </TabsContent>

            <TabsContent value="history" className="m-0">
              <TestHistoryTab test={test} />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
