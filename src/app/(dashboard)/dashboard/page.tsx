"use client";

import { motion } from "framer-motion";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import DashboardRecentTests from "@/components/dashboard/DashboardRecentTests";
import { staggerChildren } from "@/lib/animations";

export default function DashboardPage() {
  return (
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
  );
}
