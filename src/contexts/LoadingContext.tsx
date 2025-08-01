"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isPageReady: boolean;
  setIsPageReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleSetLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handleSetPageReady = useCallback((ready: boolean) => {
    setIsPageReady(ready);
  }, []);

  // Auto-start loading sequence when component mounts
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let animationFrame: number | null = null;
    let pageReadyTimer: NodeJS.Timeout | null = null;

    timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay before starting page animations
      animationFrame = requestAnimationFrame(() => {
        pageReadyTimer = setTimeout(() => {
          setIsPageReady(true);
        }, 100);
      });
    }, 3000);

    return () => {
      if (timer) clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (pageReadyTimer) clearTimeout(pageReadyTimer);
    };
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading: handleSetLoading,
      isPageReady,
      setIsPageReady: handleSetPageReady,
    }),
    [isLoading, isPageReady, handleSetLoading, handleSetPageReady]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
