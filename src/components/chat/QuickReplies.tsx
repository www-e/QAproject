"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { quickReplies } from "@/constants/chat"

interface QuickRepliesProps {
  onQuickReply: (reply: string) => void
  isLoading: boolean
}

export default function QuickReplies({ onQuickReply, isLoading }: QuickRepliesProps) {
  return (
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
              onClick={() => onQuickReply(reply)}
              className="whitespace-nowrap text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              disabled={isLoading}
            >
              {reply}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
