"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Icons } from "@/components/ui/icons"
import { fadeInUp } from "@/lib/animations"

// Simple Test Row component inline
function TestRow({ test, index, isRunningTest, onRunTest }: any) {
  return (
    <tr className="hover:bg-sidebar-accent/50 transition-colors border-b border-border/30">
      <td className="p-3 font-mono text-sm">{test.id}</td>
      <td className="p-3 font-medium">{test.name}</td>
      <td className="p-3">
        <Badge variant="outline">{test.type}</Badge>
      </td>
      <td className="p-3">
        <Badge>{test.status}</Badge>
      </td>
      <td className="p-3">{test.success}%</td>
      <td className="p-3">{test.assignee}</td>
      <td className="p-3">
        <Button size="sm" onClick={() => onRunTest(test.id)}>
          تشغيل
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
  console.log("TestsTable rendering with:", { tests: tests.length, totalTests })
  
  return (
    <div className="w-full">
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold">قائمة الاختبارات</span>
            <Badge variant="secondary">
              {tests.length} من {totalTests}
            </Badge>
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
  )
}
