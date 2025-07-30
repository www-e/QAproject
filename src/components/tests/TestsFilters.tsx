"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Icons } from "@/components/ui/icons"
import { fadeInUp } from "@/lib/animations"
import { TestFilters } from "@/types/tests"

interface TestsFiltersProps {
  filters: TestFilters
  onFiltersChange: (filters: TestFilters) => void
}

export default function TestsFilters({ filters, onFiltersChange }: TestsFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, statusFilter: value })
  }

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, typeFilter: value })
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <BackgroundGradient className="rounded-2xl p-1">
        <Card className="bg-background border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Icons.search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="البحث في الاختبارات..."
                    value={filters.searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pr-10 h-12 bg-sidebar-accent/50 border-sidebar-border focus:bg-background"
                    dir="rtl"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={filters.statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="حالة الاختبار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="مكتمل">مكتمل</SelectItem>
                    <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                    <SelectItem value="فشل">فشل</SelectItem>
                    <SelectItem value="معلق">معلق</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.typeFilter} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="نوع الاختبار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="UI Testing">اختبار واجهة</SelectItem>
                    <SelectItem value="Performance">اختبار أداء</SelectItem>
                    <SelectItem value="Security">اختبار أمان</SelectItem>
                    <SelectItem value="Integration">اختبار تكامل</SelectItem>
                    <SelectItem value="Load Testing">اختبار تحميل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </motion.div>
  )
}
