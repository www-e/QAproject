"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Icons } from "@/components/ui/icons"
import { Message } from "@/types/chat"
import { useState, useEffect } from "react"

interface ChatMessageProps {
  message: Message
  index: number
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const [formattedTime, setFormattedTime] = useState<string>("")
  
  // Fix hydration mismatch by formatting time on client side only
  useEffect(() => {
    setFormattedTime(
      message.timestamp.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    )
  }, [message.timestamp])

  // Debug logging to see if component receives data
  console.log('ChatMessage rendering:', { 
    id: message.id, 
    type: message.type, 
    content: message.content.substring(0, 50) + '...',
    hasContent: !!message.content 
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex gap-4 ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.type === "ai" && (
        <Avatar className="w-10 h-10 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            🤖
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[70%] ${
          message.type === "user" ? "order-first" : ""
        }`}
      >
        <div className="relative">
          <GlowingEffect 
            disabled={false}
            glow={true}
            className="absolute inset-0"
          />
          <Card
            className={`relative z-10 ${
              message.type === "user"
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-card border-border/50"
            }`}
          >
            <CardContent className="p-4">
              <div 
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ minHeight: '20px' }}
              >
                {message.content || 'No content available'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          className={`flex items-center gap-2 mt-2 text-xs text-muted-foreground ${
            message.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <span>
            {formattedTime}
          </span>
          {message.type === "user" && (
            <Icons.check className={`w-3 h-3 ${
              message.status === "delivered" ? "text-green-500" : 
              message.status === "failed" ? "text-red-500" : "text-gray-400"
            }`} />
          )}
        </div>
      </div>

      {message.type === "user" && (
        <Avatar className="w-10 h-10 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            م ع
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  )
}
