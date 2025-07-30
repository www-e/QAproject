"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link" // Import Link for navigation
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { 
  Sidebar, 
  SidebarBody, 
  SidebarLink, 
} from "@/components/ui/sidebar"
import { fadeInUp } from "@/lib/animations"

// 1. Corrected navigation items with full paths
const navigationItems = [
  {
    label: "لوحة التحكم",
    href: "/dashboard",
    icon: <Icons.home className="w-5 h-5" />,
    badge: null,
  },
  {
    label: "المحادثة الذكية", 
    href: "/dashboard/chat",
    icon: <Icons.message className="w-5 h-5" />,
    badge: "جديد",
  },
  {
    label: "إدارة الاختبارات",
    href: "/dashboard/tests",
    icon: <Icons.chart className="w-5 h-5" />,
    badge: "12",
  },
  {
    label: "سير العمل",
    href: "/dashboard/workflow", 
    icon: <Icons.workflow className="w-5 h-5" />,
    badge: null,
  },
  {
    label: "التقارير",
    href: "/dashboard/reports",
    icon: <Icons.fileText className="w-5 h-5" />,
    badge: null,
  },
  {
    label: "الإعدادات",
    href: "/dashboard/settings",
    icon: <Icons.settings className="w-5 h-5" />,
    badge: null,
  },
]

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="h-full">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className={cn(
          "gap-10", // Removed justify-between to allow natural flex layout
          !open && "items-center py-4" 
        )}>
          {/* Enhanced Header */}
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
                open ? "px-6 py-6 border-b border-sidebar-border" : "p-0"
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
                  <h2 className="text-lg font-bold text-sidebar-foreground">
                    نظام الجودة
                  </h2>
                  <p className="text-sm text-sidebar-foreground/70">
                    إدارة متقدمة
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2 px-4 py-4">
              {navigationItems.map((item, idx) => {
                // 2. Corrected isActive logic
                const isActive = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Wrap SidebarLink with Next.js Link */}
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarLink 
                        link={item}
                        className={cn(
                          "relative h-12 rounded-xl transition-all duration-300",
                          // 3. Corrected active link styling
                          isActive 
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                            : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground',
                          !open && "justify-center"
                        )}
                      />
                    </Link>
                    
                    {item.badge && open && (
                      <Badge 
                        variant={isActive ? "secondary" : "default"}
                        className="absolute top-2 left-2 text-xs font-medium"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* User Profile Section */}
          <motion.div 
            className={cn("mt-auto", open ? "px-4 pb-6" : "p-0")} // Use mt-auto for alignment
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className={cn(
              "flex items-center gap-3",
              open && "p-4 bg-sidebar-accent rounded-xl border border-sidebar-border"
            )}>
              <motion.div
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-primary-foreground font-medium text-sm">
                  م ع
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
                    محمد علي
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">
                    مدير الجودة
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </SidebarBody>
      </Sidebar>
    </div>
  )
}