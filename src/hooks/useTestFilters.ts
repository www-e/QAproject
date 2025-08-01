import { useState, useMemo, useCallback } from "react"
import { Test, TestFilters } from "@/types/tests"

export function useTestFilters(tests: Test[]) {
  const [filters, setFilters] = useState<TestFilters>({
    searchTerm: "",
    statusFilter: "all",
    typeFilter: "all"
  })

  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           test.id.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesStatus = filters.statusFilter === "all" || test.status === filters.statusFilter
      const matchesType = filters.typeFilter === "all" || test.type === filters.typeFilter
      
      return matchesSearch && matchesStatus && matchesType
    })
  }, [tests, filters])

  // Memoize setFilters to prevent unnecessary re-renders
  const memoizedSetFilters = useCallback((newFilters: TestFilters) => {
    setFilters(newFilters)
  }, [])

  return useMemo(() => ({
    filters,
    setFilters: memoizedSetFilters,
    filteredTests
  }), [filters, memoizedSetFilters, filteredTests])
}
