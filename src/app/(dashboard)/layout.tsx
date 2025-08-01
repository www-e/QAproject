"use client"

import { motion } from "framer-motion"
import { Suspense, memo } from "react"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar" // ✅ CORRECT: Named import
import { TopNavigation } from "@/components/layout/top-navigation" // ✅ CORRECT: Named import  
import { SidebarProvider } from "@/components/ui/sidebar"
import { pageTransitions } from "@/lib/animations"

// PERFORMANCE OPTIMIZATION: Memoized loading fallback
const LayoutLoader = memo(() => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="spinner" />
  </div>
))
LayoutLoader.displayName = "LayoutLoader"

// PERFORMANCE OPTIMIZATION: Memoized sidebar wrapper - NO SUSPENSE for critical UI
const SidebarWrapper = memo(() => (
  <motion.aside
    className="relative z-30" // ✅ UNCHANGED: Sidebar stays on the left
    initial={{ x: -300, opacity: 0 }} // ✅ UNCHANGED: Original animation
    animate={{ x: 0, opacity: 1 }} // ✅ UNCHANGED: Original animation
    transition={{ duration: 0.3, ease: "easeOut" }} // ✅ UNCHANGED: Original timing
  >
    <DashboardSidebar />
  </motion.aside>
))
SidebarWrapper.displayName = "SidebarWrapper"

// PERFORMANCE OPTIMIZATION: Memoized header wrapper - NO SUSPENSE for critical UI
const HeaderWrapper = memo(() => (
  <motion.header
    className="relative z-20" // ✅ UNCHANGED: Original styling
    initial={{ y: -50, opacity: 0 }} // ✅ UNCHANGED: Original animation
    animate={{ y: 0, opacity: 1 }} // ✅ UNCHANGED: Original animation
    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }} // ✅ UNCHANGED: Original timing
  >
    <TopNavigation />
  </motion.header>
))
HeaderWrapper.displayName = "HeaderWrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background"> {/* ✅ UNCHANGED: Original container */}
      {/* ✅ UNCHANGED: Using Your Aceternity SidebarProvider */}
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden"> {/* ✅ UNCHANGED: Original flex layout */}
          {/* ✅ SIDEBAR STAYS ON THE LEFT - All animations preserved */}
          <SidebarWrapper />

          {/* ✅ UNCHANGED: Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden"> {/* ✅ UNCHANGED: Original layout */}
            {/* ✅ UNCHANGED: Top Navigation with all original animations */}
            <HeaderWrapper />

            {/* ✅ UNCHANGED: Page Content with Smooth Transitions */}
            <main className="flex-1 overflow-auto"> {/* ✅ UNCHANGED: Original main area */}
              <motion.div
                className="h-full" // ✅ UNCHANGED: Original styling
                variants={pageTransitions} // ✅ UNCHANGED: Original animations
                initial="initial" // ✅ UNCHANGED: Original animation states
                animate="animate" // ✅ UNCHANGED: Original animation states
                exit="exit" // ✅ UNCHANGED: Original animation states
              >
                {/* PERFORMANCE OPTIMIZATION: Suspense boundary for children */}
                <Suspense fallback={<LayoutLoader />}>
                  {children}
                </Suspense>
              </motion.div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
