"use client"

import ChatHeader from "@/components/chat/ChatHeader"
import MessagesList from "@/components/chat/MessagesList"
import QuickReplies from "@/components/chat/QuickReplies"
import ChatInput from "@/components/chat/ChatInput"
import { useChat } from "@/hooks/useChat"

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

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader messageCount={messages.length} />
      
      <MessagesList 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />
      
      <QuickReplies 
        onQuickReply={handleQuickReply}
        isLoading={isLoading}
      />
      
      <ChatInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  )
}
