"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Interface for the button's props, making it type-safe and declarative
interface StatefulButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  idleText?: string;
  loadingText?: string;
  successText?: string;
  children?: React.ReactNode;
}

// The main component, now using a declarative approach with AnimatePresence
export const StatefulButton = ({
  className,
  children,
  isLoading = false,
  isSuccess = false,
  idleText = "Submit",
  loadingText = "Loading",
  successText = "Success",
  ...props
}: StatefulButtonProps) => {
  return (
    <motion.button
      layout
      className={cn(
        "flex min-w-[100px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200",
        {
          "bg-secondary text-secondary-foreground": isLoading,
          "bg-green-600 text-white": isSuccess,
          "bg-primary hover:bg-primary/90": !isLoading && !isSuccess,
          "cursor-not-allowed": isLoading || isSuccess,
        },
        className
      )}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25, transition: { duration: 0.1 } }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <Loader />
            <span>{loadingText}</span>
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25, transition: { duration: 0.1 } }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <CheckIcon />
            <span>{successText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25, transition: { duration: 0.1 } }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <>
              {idleText}
              {children}
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Your original Loader component - UNCHANGED
const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

// Your original CheckIcon component - UNCHANGED
const CheckIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};