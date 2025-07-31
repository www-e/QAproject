"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TestsPageHeader() {
  const [reportPortalMode, setReportPortalMode] = useState<'new-window' | 'iframe' | null>(null)

  const handleReportPortalOpen = (mode: 'new-window' | 'iframe') => {
    setReportPortalMode(mode)
    
    if (mode === 'new-window') {
      // Simulate opening ReportPortal in new window
      window.open('about:blank', '_blank', 'width=1200,height=800')
      setTimeout(() => {
        console.log('ReportPortal opened in new window')
      }, 1000)
    } else {
      // Will show iframe in the page
      console.log('ReportPortal will open in iframe')
    }
  }

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm px-4 py-2">
          🧪 مركز التحكم
        </Badge>
        <TextGenerateEffect
          words="مركز إدارة الاختبارات المتقدم"
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        />
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          تتبع وإدارة جميع اختباراتك مع لوحة تحكم متقدمة وتحليلات في الوقت الفعلي
        </p>
      </motion.div>

      {/* ReportPortal Integration */}
      <motion.div variants={fadeInUp} className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Icons.chart className="w-4 h-4" />
              فتح ReportPortal
              <Icons.chevronRight className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            <DropdownMenuItem 
              onClick={() => handleReportPortalOpen('new-window')}
              className="cursor-pointer"
            >
              <Icons.play className="ml-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>فتح في نافذة جديدة</span>
                <span className="text-xs text-muted-foreground">يفتح في تبويب منفصل</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleReportPortalOpen('iframe')}
              className="cursor-pointer"
            >
              <Icons.workflow className="ml-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>فتح داخل الصفحة</span>
                <span className="text-xs text-muted-foreground">يظهر كإطار مدمج</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* iframe ReportPortal */}
      {reportPortalMode === 'iframe' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 600 }}
          className="border rounded-lg overflow-hidden bg-background"
        >
          <div className="flex items-center justify-between p-4 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <Icons.chart className="w-5 h-5 text-primary" />
              <span className="font-medium">ReportPortal - مدمج</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setReportPortalMode(null)}
            >
              <Icons.close className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-[550px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center space-y-4">
              <Icons.chart className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-xl font-bold">ReportPortal Integration</h3>
              <p className="text-muted-foreground">سيتم تحميل ReportPortal هنا</p>
              <Badge variant="secondary">قريباً</Badge>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
