import { useState, useRef, useEffect, useCallback } from 'react'
import { Message } from '@/types/chat'
import { initialMessages } from '@/constants/chat'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMountedRef = useRef(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    console.log('Sending message:', content)

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
      status: "delivered",
    }

    setMessages(prevMessages => {
      const updated = [...prevMessages, userMessage]
      console.log('Updated messages with user message:', updated)
      return updated
    })

    setIsTyping(true)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API response:', data)

      if (!isMountedRef.current) return

      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: data.content,
        timestamp: new Date(data.timestamp || new Date()),
        status: "delivered",
      }

      setMessages(prevMessages => {
        const updated = [...prevMessages, aiMessage]
        console.log('Updated with AI message:', updated)
        return updated
      })

    } catch (error) {
      console.error('Chat error:', error)
      
      if (!isMountedRef.current) return
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
        status: "failed",
      }

      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      if (isMountedRef.current) {
        setIsTyping(false)
        setIsLoading(false)
      }
    }
  }, [isLoading])

  return {
    messages,
    isTyping,
    isLoading,
    messagesEndRef,
    sendMessage
  }
}
