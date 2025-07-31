"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import TestDetailModal from "./test-detail-modal/TestDetailModal"
import { fadeInUp } from "@/lib/animations"

// Enhanced Test Row component with click functionality
function TestRow({ test, index, isRunningTest, onRunTest, onRowClick }: any) {
  return (
    <tr 
      className="hover:bg-sidebar-accent/50 transition-colors border-b border-border/30 cursor-pointer"
      onClick={() => onRowClick(test)}
    >
      <td className="p-3 font-mono text-sm">{test.id}</td>
      <td className="p-3 font-medium">{test.name}</td>
      <td className="p-3">
        <Badge variant="outline">{test.type}</Badge>
      </td>
      <td className="p-3">
        <Badge 
          variant={
            test.status === "نجح" ? "default" : 
            test.status === "فشل" ? "destructive" : "secondary"
          }
        >
          {test.status}
        </Badge>
      </td>
      <td className="p-3">{test.success}%</td>
      <td className="p-3">{test.assignee}</td>
      <td className="p-3">
        <Button 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation()
            onRunTest(test.id)
          }}
          disabled={isRunningTest === test.id}
        >
          {isRunningTest === test.id ? (
            <>
              <Icons.spinner className="w-4 h-4 ml-2 animate-spin" />
              جاري التشغيل
            </>
          ) : (
            <>
              <Icons.play className="w-4 h-4 ml-2" />
              تشغيل
            </>
          )}
        </Button>
      </td>
    </tr>
  )
}

interface TestsTableProps {
  tests: any[]
  totalTests: number
  isRunningTest: string | null
  onRunTest: (testId: string) => void
}

export default function TestsTable({ tests, totalTests, isRunningTest, onRunTest }: TestsTableProps) {
  const [selectedTest, setSelectedTest] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = (test: any) => {
    setSelectedTest(test)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTest(null)
  }

  console.log("TestsTable rendering with:", { tests: tests.length, totalTests })
  
  return (
    <>
      <div className="w-full">
        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl font-bold">قائمة الاختبارات</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {tests.length} من {totalTests}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  انقر على أي صف لعرض التفاصيل
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <table className="w-full" dir="rtl">
                <thead>
                  <tr className="bg-sidebar-accent/30">
                    <th className="text-right p-3 font-semibold">معرف الاختبار</th>
                    <th className="text-right p-3 font-semibold">اسم الاختبار</th>
                    <th className="text-right p-3 font-semibold">النوع</th>
                    <th className="text-right p-3 font-semibold">الحالة</th>
                    <th className="text-right p-3 font-semibold">معدل النجاح</th>
                    <th className="text-right p-3 font-semibold">المسؤول</th>
                    <th className="text-right p-3 font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.length > 0 ? (
                    tests.map((test, index) => (
                      <TestRow
                        key={test.id}
                        test={test}
                        index={index}
                        isRunningTest={isRunningTest}
                        onRunTest={onRunTest}
                        onRowClick={handleRowClick}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-8">
                        <p className="text-muted-foreground">لا توجد اختبارات</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Detail Modal */}
      <TestDetailModal 
        test={selectedTest}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
