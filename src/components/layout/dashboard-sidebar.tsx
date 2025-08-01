"use client";

import { useState, memo, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { Sidebar, SidebarBody, useSidebar } from "@/components/ui/sidebar";
import { fadeInUp } from "@/lib/animations";
import { useTouchOptimizations } from "@/lib/touch-optimizations";

// 1. Corrected navigation items with full, functional paths
const navigationItems = [
  {
    label: "لوحة التحكم",
    href: "/dashboard",
    icon: <Icons.home className="w-5 h-5" />,
    badge: null,
  },
  {
    label: "المحادثة الذكية",
    href: "/chat",
    icon: <Icons.message className="w-5 h-5" />,
    badge: "جديد",
  },
  {
    label: "إدارة الاختبارات",
    href: "/tests",
    icon: <Icons.chart className="w-5 h-5" />,
    badge: "12",
  },
  {
    label: "سير العمل",
    href: "/workflow",
    icon: <Icons.workflow className="w-5 h-5" />,
    badge: null,
  },
  {
    label: "التقارير",
    href: "/reports",
    icon: <Icons.fileText className="w-5 h-5" />,
    badge: null,
  },
  {
    label: "الإعدادات",
    href: "/settings",
    icon: <Icons.settings className="w-5 h-5" />,
    badge: null,
  },
];

// A new, separate component for the link content to better handle the badge
const SidebarLinkContent = memo(
  ({
    link,
    open,
    isActive,
  }: {
    link: (typeof navigationItems)[0];
    open: boolean;
    isActive: boolean;
  }) => (
    <div
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2 w-full",
        !open && "justify-center"
      )}
    >
      {link.icon}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 flex items-center justify-between"
          >
            <span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre">
              {link.label}
            </span>
            {link.badge && (
              <Badge
                variant={isActive ? "secondary" : "default"}
                className="text-xs font-medium"
              >
                {link.badge}
              </Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
);

SidebarLinkContent.displayName = "SidebarLinkContent";

export const DashboardSidebar = memo(function DashboardSidebar() {
  const { open, setOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { createTouchHandler } = useTouchOptimizations();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [pathname, isMobile, open, setOpen]);

  // Add swipe gesture support for mobile
  useEffect(() => {
    if (!isMobile) return;

    const touchHandler = createTouchHandler(
      undefined, // No tap handler needed
      (direction) => {
        if (direction === "left" && open) {
          setOpen(false);
        }
      }
    );

    const sidebarElement = document.querySelector('[data-sidebar="true"]');
    if (sidebarElement) {
      // Fix: Type cast the handlers to EventListener
      const onTouchStart = touchHandler.onTouchStart as EventListener;
      const onTouchEnd = touchHandler.onTouchEnd as EventListener;

      sidebarElement.addEventListener("touchstart", onTouchStart);
      sidebarElement.addEventListener("touchend", onTouchEnd);

      return () => {
        sidebarElement.removeEventListener("touchstart", onTouchStart);
        sidebarElement.removeEventListener("touchend", onTouchEnd);
      };
    }
  }, [isMobile, open, setOpen, createTouchHandler]);

  // Memoize navigation items to prevent recreation on every render
  const memoizedNavigationItems = useMemo(() => navigationItems, []);

  return (
    <div className="h-full">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody
          className={cn("gap-10", !open && "items-center py-4")}
          data-sidebar="true"
        >
          {/* Main content container */}
          <div className="flex flex-col justify-between h-full">
            {/* Top part: Logo and Nav */}
            <motion.div
              className="flex flex-col overflow-y-auto overflow-x-hidden"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              {/* Logo Section */}
              <motion.div
                className={cn(
                  "flex items-center gap-3",
                  open ? "px-6 py-6 border-b border-sidebar-border" : "p-0 mb-4"
                )}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center animate-glow"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Icons.check className="w-5 h-5 text-primary-foreground" />
                </motion.div>

                {open && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="overflow-hidden"
                  >
                    {isMobile ? (
                      <h2 className="text-xl font-bold text-sidebar-foreground">
                        QA
                      </h2>
                    ) : (
                      <>
                        <h2 className="text-lg font-bold text-sidebar-foreground">
                          نظام الجودة
                        </h2>
                        <p className="text-sm text-sidebar-foreground/70">
                          إدارة متقدمة
                        </p>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 px-4 py-4">
                {memoizedNavigationItems.map((item, idx) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative"
                    >
                      {/* 2. Modern Next.js Link without legacyBehavior */}
                      <Link
                        href={item.href}
                        className={cn(
                          "relative flex items-center h-12 rounded-xl transition-all duration-300",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                            : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <SidebarLinkContent
                          link={item}
                          open={open}
                          isActive={isActive}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* User Profile Section (Bottom) */}
            <motion.div
              className={cn(open ? "px-4 pb-6" : "p-0")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div
                className={cn(
                  "flex items-center gap-3",
                  open &&
                    "p-4 bg-sidebar-accent rounded-xl border border-sidebar-border"
                )}
              >
                <motion.div
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-primary-foreground font-medium text-sm">
                    ع أ
                  </span>
                </motion.div>

                {open && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      عمر أشرف
                    </p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">
                      مدير الجودة
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
});
