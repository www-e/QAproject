import { useState, useRef, useEffect, useCallback } from 'react'
import { Message } from '@/types/chat'
import { initialMessages } from '@/constants/chat'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const isMountedRef = useRef(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Initialize messages on client side to avoid hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      setMessages(initialMessages)
      setIsInitialized(true)
    }
  }, [isInitialized])

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
      // Prepare conversation history for API
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: content.trim(),
          history: conversationHistory  // Add history support
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API response:', data)

      if (!isMountedRef.current) return

      // Handle fallback responses for Arabic prefixes
      if (data.fallback) {
        console.log('Using fallback response for Arabic prefix')
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: data.message,  // Changed from data.content to data.message
        timestamp: new Date(),
        status: "delivered",
        fallback: data.fallback || false  // Track if it's a fallback response
      }

      setMessages(prevMessages => {
        const updated = [...prevMessages, aiMessage]
        console.log('Updated with AI message:', updated)
        return updated
      })

      // Stop typing indicator immediately after adding AI message
      setIsTyping(false)
      setIsLoading(false)

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
      
      // Stop typing indicator on error
      setIsTyping(false)
      setIsLoading(false)
    }
  }, [isLoading, messages])  // Add messages to dependency array

  return {
    messages,
    isTyping,
    isLoading,
    messagesEndRef,
    sendMessage
  }
}
