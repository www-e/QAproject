"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import TestOverviewTab from "./tabs/TestOverviewTab"
import TestExecutionTab from "./tabs/TestExecutionTab"
import TestErrorsTab from "./tabs/TestErrorsTab"
import TestExternalTab from "./tabs/TestExternalTab"
import TestMetadataTab from "./tabs/TestMetadataTab"
import TestHistoryTab from "./tabs/TestHistoryTab"

interface TestDetailModalProps {
  test: any
  isOpen: boolean
  onClose: () => void
}

export default function TestDetailModal({ test, isOpen, onClose }: TestDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState(test?.status || "قيد التنفيذ")
  
  if (!test) return null

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus)
    console.log(`Status changed to: ${newStatus}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[98vw] max-w-none h-[98vh] max-h-none p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-background/95 backdrop-blur">
            <DialogTitle className="flex items-center gap-3">
              <Icons.fileText className="w-6 h-6" />
              تفاصيل الاختبار: {test.name}
            </DialogTitle>
          </DialogHeader>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
            {/* Responsive Tab Navigation */}
            <div className="border-b bg-background/95 backdrop-blur">
              <div className="px-6 py-2">
                <TabsList className="w-full h-auto p-1 bg-muted/50 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1 w-full">
                    <TabsTrigger 
                      value="overview" 
                      className="text-xs md:text-sm px-3 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                      <span className="hidden sm:inline">نظرة عامة</span>
                      <span className="sm:hidden">عامة</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="execution" 
                      className="text-xs md:text-sm px-3 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                      التنفيذ
                    </TabsTrigger>
                    <TabsTrigger 
                      value="errors" 
                      className="text-xs md:text-sm px-3 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                      الأخطاء
                    </TabsTrigger>
                    <TabsTrigger 
                      value="external" 
                      className="text-xs md:text-sm px-3 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                      <span className="hidden lg:inline">الروابط الخارجية</span>
                      <span className="lg:hidden">الروابط</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="metadata" 
                      className="text-xs md:text-sm px-3 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                      <span className="hidden md:inline">البيانات الوصفية</span>
                      <span className="md:hidden">البيانات</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="history" 
                      className="text-xs md:text-sm px-3 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                      السجل
                    </TabsTrigger>
                  </div>
                </TabsList>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="overview" className="m-0 p-6 focus:outline-none">
                <TestOverviewTab 
                  test={test} 
                  currentStatus={currentStatus}
                  onStatusChange={handleStatusChange}
                />
              </TabsContent>

              <TabsContent value="execution" className="m-0 p-6 focus:outline-none">
                <TestExecutionTab test={test} />
              </TabsContent>

              <TabsContent value="errors" className="m-0 p-6 focus:outline-none">
                <TestErrorsTab test={test} />
              </TabsContent>

              <TabsContent value="external" className="m-0 p-6 focus:outline-none">
                <TestExternalTab test={test} />
              </TabsContent>

              <TabsContent value="metadata" className="m-0 p-6 focus:outline-none">
                <TestMetadataTab test={test} />
              </TabsContent>

              <TabsContent value="history" className="m-0 p-6 focus:outline-none">
                <TestHistoryTab test={test} />
              </TabsContent>
            </div>

            {/* Footer Actions */}
            <div className="border-t bg-background/95 backdrop-blur px-6 py-4">
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  إغلاق
                </Button>
                <Button>
                  <Icons.play className="w-4 h-4 ml-2" />
                  تشغيل الاختبار
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
