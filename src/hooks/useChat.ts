import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Message } from "@/types/chat";
import { initialMessages } from "@/constants/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current && isMountedRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Initialize messages on client side to avoid hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      setMessages(initialMessages);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup effect - prevent memory leaks
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading || !isMountedRef.current) return;

      // Cancel any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      const userMessage: Message = {
        id: Date.now(),
        type: "user",
        content: content.trim(),
        timestamp: new Date(),
        status: "delivered",
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setIsTyping(true);
      setIsLoading(true);

      try {
        // Use functional update to get latest messages
        const conversationHistory = await new Promise<any[]>((resolve) => {
          setMessages((currentMessages) => {
            const history = currentMessages.map((msg) => ({
              role: msg.type === "user" ? "user" : "assistant",
              content: msg.content,
            }));
            resolve(history);
            return currentMessages;
          });
        });

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content.trim(),
            history: conversationHistory,
          }),
          signal: abortControllerRef.current.signal, // Add abort signal
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();

        if (!isMountedRef.current) return;

        const aiMessage: Message = {
          id: Date.now() + 1,
          type: "ai",
          content: data.message,
          timestamp: new Date(),
          status: "delivered",
          fallback: data.fallback || false,
        };

        if (isMountedRef.current) {
          setMessages((prevMessages) => [...prevMessages, aiMessage]);
          setIsTyping(false);
          setIsLoading(false);
        }
      } catch (error) {
        if (!isMountedRef.current) return;

        // Don't show error for aborted requests
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        const errorMessage: Message = {
          id: Date.now() + 1,
          type: "ai",
          content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
          timestamp: new Date(),
          status: "failed",
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setIsTyping(false);
        setIsLoading(false);
      } finally {
        // Clear the abort controller
        abortControllerRef.current = null;
      }
    },
    [isLoading]
  );

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      messages,
      isTyping,
      isLoading,
      messagesEndRef,
      sendMessage,
    }),
    [messages, isTyping, isLoading, sendMessage]
  );
}
