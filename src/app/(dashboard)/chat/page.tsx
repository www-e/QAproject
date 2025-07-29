"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { StatefulButton } from "@/components/ui/stateful-button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { LoaderOne } from "@/components/ui/loader"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

// Mock chat messages
const initialMessages = [
  {
    id: 1,
    type: "ai",
    content: "مرحباً! أنا مساعدك الذكي لإدارة الجودة. كيف يمكنني مساعدتك اليوم؟",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: "delivered"
  },
  {
    id: 2,
    type: "user", 
    content: "أريد تحليل نتائج الاختبارات الأخيرة",
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    status: "delivered"
  },
  {
    id: 3,
    type: "ai",
    content: "بالطبع! لقد قمت بتحليل الاختبارات الـ 247 الأخيرة. معدل النجاح 88.1% وهو تحسن بنسبة 12% عن الشهر الماضي. هل تريد تفاصيل أكثر حول نوع معين من الاختبارات؟",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    status: "delivered"
  }
]

// Suggested quick replies
const quickReplies = [
  "تحليل الأداء الشهري",
  "إحصائيات الفريق",
  "الاختبارات الفاشلة",
  "تقرير مفصل",
  "اقتراحات التحسين"
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content,
      timestamp: new Date(),
      status: "delivered" as const
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "ممتاز! دعني أحلل هذه البيانات لك. بناءً على النتائج الأخيرة، يمكنني أن أرى تحسناً ملحوظاً في أداء الاختبارات.",
        "هذا سؤال رائع! الإحصائيات تظهر أن فريقك يعمل بكفاءة عالية. معدل النجاح وصل إلى 88.1% وهو أفضل من المتوسط الصناعي.",
        "بالتأكيد يمكنني مساعدتك في هذا! لقد قمت بمراجعة البيانات وأعددت تقريراً شاملاً حول نقاط القوة والضعف.",
        "نصيحة مهمة: اقترح عليك التركيز على تحسين اختبارات الأداء حيث لاحظت انخفاضاً طفيفاً في النتائج الأخيرة."
      ]

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai" as const,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
        status: "delivered" as const
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      setIsLoading(false)
    }, 2000)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <motion.div
        className="border-b border-sidebar-border bg-background/95 backdrop-blur p-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <BackgroundGradient className="rounded-full p-1">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                🤖
              </AvatarFallback>
            </Avatar>
          </BackgroundGradient>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">المساعد الذكي</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">متصل ونشط</span>
            </div>
          </div>
          <Badge variant="secondary" className="font-arabic-numbers">
            {messages.length} رسالة
          </Badge>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'ai' && (
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    🤖
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
                <GlowingEffect>
                  <Card className={`
                    ${message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-card border-border/50'
                    }
                  `}>
                    <CardContent className="p-4">
                      {message.type === 'ai' ? (
                        <TextGenerateEffect
                          words={message.content}
                          className="text-sm leading-relaxed"
                        />
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                    </CardContent>
                  </Card>
                </GlowingEffect>
                
                <div className={`flex items-center gap-2 mt-2 text-xs text-muted-foreground ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{message.timestamp.toLocaleTimeString('ar-EG', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}</span>
                  {message.type === 'user' && (
                    <Icons.check className="w-3 h-3 text-green-500" />
                  )}
                </div>
              </div>

              {message.type === 'user' && (
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    م ع
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-4 justify-start"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  🤖
                </AvatarFallback>
              </Avatar>
              <Card className="bg-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <LoaderOne className="w-5 h-5" />
                    <span className="text-sm text-muted-foreground">يكتب...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <motion.div
        className="px-6 py-3 border-t border-sidebar-border bg-background/50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickReplies.map((reply, index) => (
            <motion.div
              key={reply}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="whitespace-nowrap text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                disabled={isLoading}
              >
                {reply}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Input Area */}
      <motion.div
        className="p-6 border-t border-sidebar-border bg-background"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="min-h-[50px] resize-none bg-sidebar-accent/50 border-sidebar-border focus:bg-background"
              dir="rtl"
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(inputValue)
                }
              }}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled={isLoading}>
              <Icons.paperclip className="w-4 h-4" />
            </Button>
            
            <StatefulButton
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="btn-primary min-w-[100px]"
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
    </div>
  )
}
