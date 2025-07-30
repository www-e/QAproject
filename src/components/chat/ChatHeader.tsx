"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BackgroundGradient } from "@/components/ui/background-gradient"

interface ChatHeaderProps {
  messageCount: number
}

export default function ChatHeader({ messageCount }: ChatHeaderProps) {
  return (
    <motion.div
      className="border-b border-sidebar-border bg-background/95 backdrop-blur p-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <BackgroundGradient className="rounded-full p-1">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
              🤖
            </AvatarFallback>
          </Avatar>
        </BackgroundGradient>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            المساعد الذكي
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">متصل ونشط</span>
          </div>
        </div>
        <Badge variant="secondary" className="font-arabic-numbers">
          {messageCount} رسالة
        </Badge>
      </div>
    </motion.div>
  )
}
