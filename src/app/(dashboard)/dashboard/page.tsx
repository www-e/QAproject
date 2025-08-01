"use client";

import { motion } from "framer-motion";
import { useEffect, useState, Suspense, lazy } from "react";
import { CustomToast } from "@/components/ui/custom-toast";
import { staggerChildren } from "@/lib/animations";
import { preloadPage } from "@/lib/dynamic-imports";

// CRITICAL: Load essential components immediately for smooth UX
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";

// LAZY: Only truly heavy/optional components
const DashboardQuickActions = lazy(
  () => import("@/components/dashboard/DashboardQuickActions")
);
const DashboardRecentTests = lazy(
  () => import("@/components/dashboard/DashboardRecentTests")
);

// Loading fallback for components
const ComponentLoader = () => (
  <div className="h-32 bg-muted rounded-lg animate-pulse" />
);

export default function DashboardPage() {
  const [welcomeToast, setWelcomeToast] = useState({
    isVisible: false,
    message: "",
  });

  useEffect(() => {
    // Check for welcome toast from sign-in
    const showWelcome = localStorage.getItem("showWelcomeToast");
    const welcomeMessage = localStorage.getItem("welcomeMessage");

    if (showWelcome === "true" && welcomeMessage) {
      setWelcomeToast({
        isVisible: true,
        message: welcomeMessage,
      });

      // Clean up localStorage
      localStorage.removeItem("showWelcomeToast");
      localStorage.removeItem("welcomeMessage");

      // Auto-hide after 4 seconds
      setTimeout(() => {
        setWelcomeToast((prev) => ({ ...prev, isVisible: false }));
      }, 4000);
    }

    // Preload adjacent tabs for faster navigation
    preloadPage(() => import("../chat/page"));
    preloadPage(() => import("../tests/page"));
  }, []);

  return (
    <>
      <CustomToast
        isVisible={welcomeToast.isVisible}
        type="success"
        title="🎉 مرحباً بك في لوحة التحكم!"
        description={welcomeToast.message}
        onClose={() =>
          setWelcomeToast((prev) => ({ ...prev, isVisible: false }))
        }
      />

      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="container mx-auto container-responsive space-y-8 animate-fade-in"
      >
        <DashboardHeader />
        
        <DashboardStats />

        <Suspense fallback={<ComponentLoader />}>
          <DashboardQuickActions />
        </Suspense>

        <Suspense fallback={<ComponentLoader />}>
          <DashboardRecentTests />
        </Suspense>
      </motion.div>
    </>
  );
}
