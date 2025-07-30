"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"
import Link from "next/link"

const recentTests = [
  {
    id: "TC-001",
    name: "اختبار واجهة المستخدم",
    status: "مكتمل",
    progress: 100,
    time: "قبل 5 دقائق",
    type: "automated"
  },
  {
    id: "TC-002",
    name: "اختبار الأداء",
    status: "قيد التنفيذ",
    progress: 67,
    time: "قبل 12 دقيقة",
    type: "automated"
  },
  {
    id: "TC-003",
    name: "اختبار الأمان",
    status: "معلق",
    progress: 25,
    time: "قبل ساعة",
    type: "manual"
  },
  {
    id: "TC-004",
    name: "اختبار التكامل",
    status: "فشل",
    progress: 45,
    time: "قبل ساعتين",
    type: "automated"
  }
]

export default function DashboardRecentTests() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <motion.h2
          className="text-2xl font-bold text-foreground"
          variants={fadeInUp}
        >
          الاختبارات الأخيرة
        </motion.h2>
        <Link href="/tests">
          <Button variant="outline" size="sm">
            <Icons.eye className="w-4 h-4 ml-2" />
            عرض الكل
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {recentTests.map((test, index) => (
          <motion.div
            key={test.id}
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {test.id}
                      </span>
                      <h3 className="font-semibold text-lg">{test.name}</h3>
                      <Badge
                        variant={
                          test.status === "مكتمل"
                            ? "default"
                            : test.status === "قيد التنفيذ"
                            ? "secondary"
                            : test.status === "معلق"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {test.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {test.type === "automated" ? "آلي" : "يدوي"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">التقدم</span>
                        <span className="font-medium">{test.progress}%</span>
                      </div>
                      <Progress value={test.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="text-left mr-6 flex flex-col items-end gap-2">
                    <p className="text-sm text-muted-foreground">{test.time}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Icons.eye className="w-4 h-4 ml-1" />
                        عرض
                      </Button>
                      {test.status !== "مكتمل" && (
                        <Button variant="outline" size="sm">
                          <Icons.play className="w-4 h-4 ml-1" />
                          تشغيل
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}