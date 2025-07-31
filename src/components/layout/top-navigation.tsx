"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Correct import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DayNightSwitch } from "@/components/shsfui/switch/day-night-switch";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Icons } from "@/components/ui/icons";
import { fadeInUp } from "@/lib/animations";

// Breadcrumb mapping for Arabic navigation
const breadcrumbMap: Record<string, { label: string; href: string }[]> = {
  "/dashboard": [{ label: "الرئيسية", href: "/dashboard" }],
  "/dashboard/chat": [
    { label: "الرئيسية", href: "/dashboard" },
    { label: "المحادثة الذكية", href: "/dashboard/chat" },
  ],
  "/dashboard/tests": [
    { label: "الرئيسية", href: "/dashboard" },
    { label: "إدارة الاختبارات", href: "/dashboard/tests" },
  ],
  "/dashboard/workflow": [
    { label: "الرئيسية", href: "/dashboard" },
    { label: "سير العمل", href: "/dashboard/workflow" },
  ],
  "/dashboard/reports": [
    { label: "الرئيسية", href: "/dashboard" },
    { label: "التقارير", href: "/dashboard/reports" },
  ],
  "/dashboard/settings": [
    { label: "الرئيسية", href: "/dashboard" },
    { label: "الإعدادات", href: "/dashboard/settings" },
  ],
};

export function TopNavigation() {
  const pathname = usePathname();
  // Use the centralized theme hook
  const { setTheme, resolvedTheme } = useTheme();
  const breadcrumbs = breadcrumbMap[pathname] || [];

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-sidebar-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Breadcrumb Navigation */}
        <motion.div
          className="flex items-center space-x-4 space-x-reverse"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <motion.div
                  key={breadcrumb.href}
                  className="flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage className="font-medium text-foreground">
                        {breadcrumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={breadcrumb.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="mx-2" />
                  )}
                </motion.div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Center Search */}
        <motion.div
          className="flex-1 max-w-md mx-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Icons.search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="البحث في النظام..."
              className="w-full bg-sidebar-accent/50 border-sidebar-border pr-10 focus:bg-background transition-colors"
              dir="rtl"
            />
          </div>
        </motion.div>

        {/* Right Actions */}
        <motion.div
          className="flex items-center space-x-4 space-x-reverse"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative">
              <Icons.bell className="h-5 w-5" />
              <motion.div
                className="absolute -top-1 -left-1 h-3 w-3 bg-destructive rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <span className="text-[10px] text-destructive-foreground font-bold">
                  3
                </span>
              </motion.div>
            </Button>
          </motion.div>

          {/* Language Switcher */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, type: "spring" }}
          >
            <LanguageSwitcher />
          </motion.div>

          {/* Your Beautiful Day-Night Switch - Now correctly controlled */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <DayNightSwitch
              checked={resolvedTheme === "light"}
              onToggle={handleThemeToggle}
              className="border-2 border-sidebar-border hover:border-primary/50 transition-colors"
            />
          </motion.div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 border-2 border-sidebar-border">
                    <AvatarImage src="/images/avatar-placeholder.jpg" alt="عمر أشرف" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      ع أ
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute -bottom-0.5 -left-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-56 glass"
              align="end"
              forceMount
              dir="rtl"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">عمر أشرف</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    مدير الجودة
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs mt-1">
                    متصل الآن
                  </Badge>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <Icons.users className="ml-2 h-4 w-4" />
                <span>الملف الشخصي</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Icons.settings className="ml-2 h-4 w-4" />
                <span>الإعدادات</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Icons.bell className="ml-2 h-4 w-4" />
                <span>الإشعارات</span>
                <Badge variant="destructive" className="mr-auto text-xs">
                  3
                </Badge>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => {
                  // Handle logout
                  console.log("Logout clicked");
                }}
              >
                <Icons.close className="ml-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  );
}
