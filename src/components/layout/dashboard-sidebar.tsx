"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { sidebarVariants, fadeInUp } from "@/lib/animations"

// Navigation items matching your Figma designs
const navigationItems = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: Icons.home,
    badge: null,
  },
  {
    title: "المحادثة الذكية",
    href: "/dashboard/chat",
    icon: Icons.message,
    badge: "جديد",
  },
  {
    title: "إدارة الاختبارات",
    href: "/dashboard/tests",
    icon: Icons.chart,
    badge: "12",
  },
  {
    title: "سير العمل",
    href: "/dashboard/workflow",
    icon: Icons.workflow,
    badge: null,
  },
  {
    title: "التقارير",
    href: "/dashboard/reports",
    icon: Icons.fileText,
    badge: null,
  },
  {
    title: "الإعدادات",
    href: "/dashboard/settings",
    icon: Icons.settings,
    badge: null,
  },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <motion.div
      className="h-full"
      variants={sidebarVariants}
      initial="closed"
      animate="open"
    >
      <Sidebar className="w-72 border-l border-sidebar-border bg-sidebar">
        {/* Sidebar Header */}
        <SidebarHeader className="p-6 border-b border-sidebar-border">
          <motion.div
            className="flex items-center gap-3"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center animate-glow"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Icons.check className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg font-bold text-sidebar-foreground">
                    نظام الجودة
                  </h2>
                  <p className="text-sm text-sidebar-foreground/70">
                    إدارة متقدمة
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapse Toggle */}
            <motion.div className="mr-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-8 h-8 hover:bg-sidebar-accent"
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icons.chevronRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </SidebarHeader>

        {/* Navigation Content */}
        <SidebarContent className="p-4">
          <SidebarMenu>
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href
              
              return (
                <motion.div
                  key={item.href}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <SidebarMenuItem className="mb-2">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        w-full h-12 rounded-xl transition-all duration-300 cursor-pointer
                        ${isActive 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                          : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                        }
                      `}
                    >
                      <motion.button
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center gap-3 px-4 w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-sidebar-primary-foreground' : ''}`} />
                        </motion.div>
                        
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.div
                              className="flex items-center justify-between w-full"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="font-medium text-sm">
                                {item.title}
                              </span>
                              
                              {item.badge && (
                                <Badge 
                                  variant={isActive ? "secondary" : "outline"}
                                  className="text-xs font-medium"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              )
            })}
          </SidebarMenu>

          {/* User Profile Section */}
          <motion.div
            className="mt-auto pt-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
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
                
                <AnimatePresence>
                  {!isCollapsed && (
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
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </SidebarContent>
      </Sidebar>
    </motion.div>
  )
}
