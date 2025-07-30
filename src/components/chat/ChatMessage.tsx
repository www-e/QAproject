"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Icons } from "@/components/ui/icons"
import { Message } from "@/types/chat"

interface ChatMessageProps {
  message: Message
  index: number
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
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
        <GlowingEffect>
          <Card
            className={`
              ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-card border-border/50"
              }
            `}
          >
            <CardContent className="p-4">
              {message.type === "ai" ? (
                <TextGenerateEffect
                  words={message.content}
                  className="text-sm leading-relaxed"
                />
              ) : (
                <p className="text-sm leading-relaxed">
                  {message.content}
                </p>
              )}
            </CardContent>
          </Card>
        </GlowingEffect>

        <div
          className={`flex items-center gap-2 mt-2 text-xs text-muted-foreground ${
            message.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <span>
            {message.timestamp.toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
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
