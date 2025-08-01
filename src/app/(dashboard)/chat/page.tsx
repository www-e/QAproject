"use client"

import { Suspense, lazy, useEffect } from "react"
import { useChat } from "@/hooks/useChat"
import { preloadPage } from "@/lib/dynamic-imports"

// CRITICAL: Load essential chat UI immediately
import ChatHeader from "@/components/chat/ChatHeader"
import ChatInput from "@/components/chat/ChatInput"

// LAZY: Only heavy components
const MessagesList = lazy(() => import("@/components/chat/MessagesList"))
const QuickReplies = lazy(() => import("@/components/chat/QuickReplies"))


export default function ChatPage() {
  const {
    messages,
    isTyping,
    isLoading,
    messagesEndRef,
    sendMessage
  } = useChat()

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  const handleSendMessage = (message: string) => {
    sendMessage(message)
  }

  useEffect(() => {
    // Preload adjacent tabs
    preloadPage(() => import("../dashboard/page"))
    preloadPage(() => import("../tests/page"))
  }, [])

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader messageCount={messages.length} />
      
      <Suspense fallback={<div className="flex-1 bg-muted/30 rounded-lg animate-pulse" />}>
        <MessagesList 
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
      </Suspense>
      
      <Suspense fallback={<div className="h-12 bg-muted/30 rounded-lg animate-pulse" />}>
        <QuickReplies 
          onQuickReply={handleQuickReply}
          isLoading={isLoading}
        />
      </Suspense>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  )
}
