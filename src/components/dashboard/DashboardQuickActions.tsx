"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"
import Link from "next/link"

const quickActions = [
  {
    title: "المحادثة الذكية",
    description: "احصل على مساعدة فورية من الذكاء الاصطناعي",
    icon: Icons.message,
    color: "primary",
    href: "/chat",
    buttonText: "بدء المحادثة"
  },
  {
    title: "التقارير المتقدمة",
    description: "تحليلات شاملة لأداء الاختبارات",
    icon: Icons.chart,
    color: "green",
    href: "/reports",
    buttonText: "عرض التقارير"
  },
  {
    title: "إدارة الاختبارات",
    description: "تشغيل وإدارة جميع الاختبارات",
    icon: Icons.settings,
    color: "blue",
    href: "/tests",
    buttonText: "إدارة الاختبارات"
  }
]

export default function DashboardQuickActions() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {quickActions.map((action, index) => (
        <motion.div key={action.title} variants={fadeInUp} className="h-full">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl h-full"
            className="w-full bg-background text-foreground p-6 text-center space-y-4 h-full flex flex-col justify-center items-center cursor-pointer"
          >
            <div className={`p-3 bg-${action.color}-500/10 rounded-full w-fit mx-auto`}>
              <action.icon className={`w-8 h-8 text-${action.color}-500`} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {action.description}
              </p>
              <Link href={action.href}>
                <Button 
                  className={`w-full ${
                    action.color === "primary" ? "btn-primary" : 
                    action.color === "green" ? "bg-green-600 hover:bg-green-700" :
                    "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {action.buttonText}
                </Button>
              </Link>
            </div>
          </HoverBorderGradient>
        </motion.div>
      ))}
    </motion.div>
  )
}