"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StatefulButton } from "@/components/ui/stateful-button"
import { Icons } from "@/components/ui/icons"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      className="mobile-nav-spacing border-t border-sidebar-border bg-background safe-area-bottom p-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <div className="flex-1">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتب رسالتك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
            className="min-h-[80px] max-h-[200px] resize-none bg-sidebar-accent/50 border-sidebar-border focus:bg-background text-responsive-sm"
            dir="rtl"
            disabled={isLoading}
            onKeyDown={handleKeyDown}
            rows={3}
          />
        </div>

        <div className="flex gap-2 justify-end sm:justify-start">
          <Button
            variant="outline"
            size="icon"
            disabled={isLoading}
            className="touch-target"
            title="إرفاق ملف"
          >
            <Icons.paperclip className="w-4 h-4" />
          </Button>

          <StatefulButton
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="btn-primary btn-mobile flex-1 sm:flex-none sm:min-w-[100px]"
            idleText="إرسال"
            loadingText="جاري الإرسال"
            successText="تم الإرسال"
            isLoading={isLoading}
          >
            <Icons.send className="w-4 h-4 ml-2" />
          </StatefulButton>
        </div>
      </div>
    </motion.div>
  )
}
