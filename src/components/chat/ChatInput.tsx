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
      console.log('Sending from input:', inputValue) // Debug log
      onSendMessage(inputValue.trim())
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
      className="border-t border-sidebar-border bg-background p-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        {/* Multi-row Textarea */}
        <div className="relative">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتب رسالتك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
            className="min-h-[100px] max-h-[200px] resize-none bg-sidebar-accent/50 border-sidebar-border focus:bg-background text-base leading-relaxed"
            dir="rtl"
            disabled={isLoading}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          
          {/* Character count */}
          <div className="absolute bottom-2 left-3 text-xs text-muted-foreground">
            {inputValue.length}/1000
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="h-9"
              title="إرفاق ملف"
            >
              <Icons.paperclip className="w-4 h-4 ml-2" />
              إرفاق
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="h-9"
              title="مسح النص"
              onClick={() => setInputValue("")}
            >
              <Icons.close className="w-4 h-4 ml-2" />
              مسح
            </Button>
          </div>

          <StatefulButton
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading || inputValue.length > 1000}
            className="btn-primary min-w-[120px] h-9"
            idleText="إرسال"
            loadingText="جاري الإرسال..."
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
