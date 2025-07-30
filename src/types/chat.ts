export interface Message {
    id: number
    type: "ai" | "user"
    content: string
    timestamp: Date
    status: "delivered" | "pending" | "failed"
  }
  
  export interface ChatState {
    messages: Message[]
    isTyping: boolean
    isLoading: boolean
  }
  