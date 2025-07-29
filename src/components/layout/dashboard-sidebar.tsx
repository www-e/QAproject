"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { 
  Sidebar, 
  SidebarBody, 
  SidebarProvider, 
  SidebarLink, 
  DesktopSidebar 
} from "@/components/ui/sidebar"
import { fadeInUp } from "@/lib/animations"

// Navigation items matching your Figma designs
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
  const [open, setOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="h-full">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 bg-sidebar border-l border-sidebar-border">
          {/* Enhanced Header */}
          <motion.div 
            className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Logo Section */}
            <motion.div 
              className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border"
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

            {/* Navigation Links Using Your Aceternity SidebarLink */}
            <div className="flex flex-col gap-2 px-4 py-4">
              {navigationItems.map((item, idx) => {
                const isActive = pathname === item.href
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    <SidebarLink 
                      link={item}
                      className={`
                        relative h-12 rounded-xl transition-all duration-300 
                        ${isActive 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                          : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                        }
                      `}
                    />
                    
                    {/* Badge for notifications */}
                    {item.badge && open && (
                      <Badge 
                        variant={isActive ? "secondary" : "outline"}
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
            className="px-4 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="p-4 bg-sidebar-accent rounded-xl border border-sidebar-border">
              <div className="flex items-center gap-3">
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
            </div>
          </motion.div>
        </SidebarBody>
      </Sidebar>
    </div>
  )
}
