"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { useTestFilters } from "@/hooks/useTestFilters"
import { mockTests } from "@/data/mockTests"
import { preloadPage } from "@/lib/dynamic-imports"

// CRITICAL: Load essential UI immediately
import TestsPageHeader from "@/components/tests/TestsPageHeader"
import TestsStats from "@/components/tests/TestsStats"
import TestsFilters from "@/components/tests/TestsFilters"

// LAZY: Only the heavy table component
const TestsTable = lazy(() => import("@/components/tests/TestsTable"))


export default function TestsPage() {
  const [isRunningTest, setIsRunningTest] = useState<string | null>(null)
  const { filters, setFilters, filteredTests } = useTestFilters(mockTests)

  const handleRunTest = async (testId: string) => {
    setIsRunningTest(testId)
    setTimeout(() => {
      setIsRunningTest(null)
    }, 3000)
  }

  useEffect(() => {
    // Preload adjacent tabs
    preloadPage(() => import("../dashboard/page"))
    preloadPage(() => import("../workflow/page"))
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-8">
      <TestsPageHeader />
      
      <TestsStats tests={mockTests} />
      
      <TestsFilters 
        filters={filters} 
        onFiltersChange={setFilters} 
      />
      
      <Suspense fallback={<div className="h-64 bg-muted/30 rounded-lg animate-pulse" />}>
        <TestsTable 
          tests={filteredTests}
          totalTests={mockTests.length}
          isRunningTest={isRunningTest}
          onRunTest={handleRunTest}
        />
      </Suspense>
    </div>
  )
}
