import { useState, useRef, useEffect } from 'react'
import { Message } from '@/types/chat'
import { initialMessages } from '@/constants/chat'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
      status: "delivered",
    }

    // Update state immediately to show user message
    setMessages(prev => {
      const newMessages = [...prev, userMessage]
      console.log('Updated messages:', newMessages) // Debug log
      return newMessages
    })
    
    setIsTyping(true)
    setIsLoading(true)

    try {
      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      // Add AI response
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: data.content,
        timestamp: new Date(data.timestamp),
        status: "delivered",
      }

      setMessages(prev => {
        const newMessages = [...prev, aiMessage]
        console.log('Updated messages with AI:', newMessages) // Debug log
        return newMessages
      })

    } catch (error) {
      console.error('Chat error:', error)
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
        status: "failed",
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsLoading(false)
    }
  }

  return {
    messages,
    isTyping,
    isLoading,
    messagesEndRef,
    sendMessage
  }
}
