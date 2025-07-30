"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import DashboardRecentTests from "@/components/dashboard/DashboardRecentTests";
import { CustomToast } from "@/components/ui/custom-toast";
import { staggerChildren } from "@/lib/animations";

export default function DashboardPage() {
  const [welcomeToast, setWelcomeToast] = useState({
    isVisible: false,
    message: ""
  });

  useEffect(() => {
    // Check for welcome toast from sign-in
    const showWelcome = localStorage.getItem('showWelcomeToast');
    const welcomeMessage = localStorage.getItem('welcomeMessage');
    
    if (showWelcome === 'true' && welcomeMessage) {
      setWelcomeToast({
        isVisible: true,
        message: welcomeMessage
      });
      
      // Clean up localStorage
      localStorage.removeItem('showWelcomeToast');
      localStorage.removeItem('welcomeMessage');
      
      // Auto-hide after 4 seconds
      setTimeout(() => {
        setWelcomeToast(prev => ({ ...prev, isVisible: false }));
      }, 4000);
    }
  }, []);

  return (
    <>
      <CustomToast
        isVisible={welcomeToast.isVisible}
        type="success"
        title="🎉 مرحباً بك في لوحة التحكم!"
        description={welcomeToast.message}
        onClose={() => setWelcomeToast(prev => ({ ...prev, isVisible: false }))}
      />
      
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="container mx-auto container-responsive space-y-8 animate-fade-in"
      >
        <DashboardHeader />
        
        <DashboardStats />
        
        <DashboardQuickActions />
        
        <DashboardRecentTests />
      </motion.div>
    </>
  );
}
