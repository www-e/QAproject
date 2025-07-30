"use client"

import { AnimatePresence } from "framer-motion"
import ChatMessage from "./ChatMessage"
import TypingIndicator from "./TypingIndicator"
import { Message } from "@/types/chat"

interface MessagesListProps {
  messages: Message[]
  isTyping: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export default function MessagesList({ messages, isTyping, messagesEndRef }: MessagesListProps) {
  // Debug logging
  console.log('MessagesList rendering with messages:', messages.length, messages)
  
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <AnimatePresence>
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            index={index} 
          />
        ))}
      </AnimatePresence>

      <TypingIndicator isTyping={isTyping} />
      <div ref={messagesEndRef} />
    </div>
  )
}
