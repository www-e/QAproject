"use client"

import { useState } from "react"
import TestsPageHeader from "@/components/tests/TestsPageHeader"
import TestsStats from "@/components/tests/TestsStats"
import TestsFilters from "@/components/tests/TestsFilters"
import TestsTable from "@/components/tests/TestsTable"
import { useTestFilters } from "@/hooks/useTestFilters"
import { mockTests } from "@/data/mockTests"

export default function TestsPage() {
  const [isRunningTest, setIsRunningTest] = useState<string | null>(null)
  const { filters, setFilters, filteredTests } = useTestFilters(mockTests)

  const handleRunTest = async (testId: string) => {
    setIsRunningTest(testId)
    setTimeout(() => {
      setIsRunningTest(null)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <TestsPageHeader />
      
      <TestsStats tests={mockTests} />
      
      <TestsFilters 
        filters={filters} 
        onFiltersChange={setFilters} 
      />
      
      <TestsTable 
        tests={filteredTests}
        totalTests={mockTests.length}
        isRunningTest={isRunningTest}
        onRunTest={handleRunTest}
      />
    </div>
  )
}
