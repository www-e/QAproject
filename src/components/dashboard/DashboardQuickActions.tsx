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
      className="max-w-6xl mx-auto"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {quickActions.map((action) => (
          <motion.div key={action.title} variants={fadeInUp} className="h-full">
            <HoverBorderGradient
              as="div"
              containerClassName="rounded-2xl h-full"
              className="w-full bg-background text-foreground p-8 text-center h-full flex flex-col justify-between cursor-pointer group"
            >
              {/* Icon Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 bg-${action.color}-500/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className={`w-10 h-10 text-${action.color}-500`} />
                </div>
                
                {/* Content Section */}
                <div className="space-y-3">
                  <h3 className="font-bold text-xl text-foreground">{action.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Button Section */}
              <div className="mt-6">
                <Link href={action.href} className="block">
                  <Button 
                    className={`w-full h-12 text-base font-medium transition-all duration-300 ${
                      action.color === "primary" ? "btn-primary hover:shadow-lg hover:shadow-primary/25" : 
                      action.color === "green" ? "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-600/25" :
                      "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-600/25"
                    }`}
                  >
                    {action.buttonText}
                  </Button>
                </Link>
              </div>
            </HoverBorderGradient>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}