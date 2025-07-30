"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Icons } from "@/components/ui/icons";
import { fadeInUp, staggerChildren } from "@/lib/animations";

// Mock data for demonstration
const dashboardStats = [
  {
    title: "إجمالي الاختبارات",
    value: 1247,
    change: "+12%",
    changeType: "positive",
    icon: Icons.chart,
    color: "primary",
  },
  {
    title: "الاختبارات الناجحة",
    value: 1098,
    change: "88.1%",
    changeType: "positive",
    icon: Icons.check,
    color: "green",
  },
  {
    title: "الاختبارات الفاشلة",
    value: 149,
    change: "11.9%",
    changeType: "negative",
    icon: Icons.alert,
    color: "red",
  },
  {
    title: "فريق الاختبار",
    value: 24,
    change: "نشط",
    changeType: "neutral",
    icon: Icons.users,
    color: "blue",
  },
];

const recentTests = [
  {
    name: "اختبار واجهة المستخدم",
    status: "مكتمل",
    progress: 100,
    time: "قبل 5 دقائق",
  },
  {
    name: "اختبار الأداء",
    status: "قيد التنفيذ",
    progress: 67,
    time: "قبل 12 دقيقة",
  },
  { name: "اختبار الأمان", status: "معلق", progress: 25, time: "قبل ساعة" },
  { name: "اختبار التكامل", status: "فشل", progress: 45, time: "قبل ساعتين" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      {/* Welcome Section using Your Text Generate Effect */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="text-center space-y-4"
      >
        <TextGenerateEffect
          words="مرحباً بك في لوحة تحكم الجودة المتقدمة"
          className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        />
        <motion.p
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          تتبع أداء اختباراتك وإدارة جودة مشاريعك بأحدث التقنيات والذكاء
          الاصطناعي
        </motion.p>
      </motion.div>

      {/* Stats Grid using Your Bento Grid */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {dashboardStats.map((stat, index) => (
            <BentoGridItem
              key={stat.title}
              title={
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                  </div>
                  <span className="font-medium">{stat.title}</span>
                </div>
              }
              description={
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <NumberTicker
                      value={stat.value}
                      className="text-3xl font-bold text-foreground"
                    />
                    <Badge
                      variant={
                        stat.changeType === "positive"
                          ? "default"
                          : stat.changeType === "negative"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs font-medium"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stat.changeType === "positive"
                      ? "تحسن هذا الشهر"
                      : stat.changeType === "negative"
                      ? "انخفاض هذا الشهر"
                      : "حالياً"}
                  </p>
                </div>
              }
              header={
                <BackgroundGradient
                  className="rounded-lg p-4 h-full"
                  containerClassName="h-full"
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/30 rounded-lg flex items-center justify-center`}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <stat.icon
                        className={`w-16 h-16 text-${stat.color}-500/80`}
                      />
                    </motion.div>
                  </div>
                </BackgroundGradient>
              }
              className={`${
                index === 0 || index === 3 ? "md:col-span-2" : ""
              } card-hover`}
            />
          ))}
        </BentoGrid>
      </motion.div>

      {/* Quick Actions using Your Hover Border Gradient */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="h-full">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl h-full"
            className="w-full bg-background text-foreground p-6 text-center space-y-4 h-full flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
              <Icons.message className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">المحادثة الذكية</h3>
              <p className="text-sm text-muted-foreground mb-4">
                احصل على مساعدة فورية من الذكاء الاصطناعي
              </p>
              <Button className="w-full btn-primary pointer-events-none">
                بدء المحادثة
              </Button>
            </div>
          </HoverBorderGradient>
        </motion.div>

        <motion.div variants={fadeInUp} className="h-full">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl h-full"
            className="w-full bg-background text-foreground p-6 text-center space-y-4 h-full flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="p-3 bg-green-500/10 rounded-full w-fit mx-auto">
              <Icons.chart className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">التقارير المتقدمة</h3>
              <p className="text-sm text-muted-foreground mb-4">
                تحليلات شاملة لأداء الاختبارات
              </p>
              <Button variant="outline" className="w-full pointer-events-none">
                عرض التقارير
              </Button>
            </div>
          </HoverBorderGradient>
        </motion.div>

        <motion.div variants={fadeInUp} className="h-full">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl h-full"
            className="w-full bg-background text-foreground p-6 text-center space-y-4 h-full flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="p-3 bg-blue-500/10 rounded-full w-fit mx-auto">
              <Icons.settings className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">إعدادات النظام</h3>
              <p className="text-sm text-muted-foreground mb-4">
                تخصيص النظام حسب احتياجاتك
              </p>
              <Button
                variant="secondary"
                className="w-full pointer-events-none"
              >
                الإعدادات
              </Button>
            </div>
          </HoverBorderGradient>
        </motion.div>
      </motion.div>

      {/* Recent Tests Section using Your Glowing Effect */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.h2
          className="text-2xl font-bold text-foreground"
          variants={fadeInUp}
        >
          الاختبارات الأخيرة
        </motion.h2>

        <div className="grid gap-4">
          {recentTests.map((test, index) => (
            <motion.div
              key={test.name}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <GlowingEffect>
                <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
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
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              التقدم
                            </span>
                            <span className="font-medium">
                              {test.progress}%
                            </span>
                          </div>
                          <Progress value={test.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="text-left mr-6">
                        <p className="text-sm text-muted-foreground">
                          {test.time}
                        </p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          <Icons.eye className="w-4 h-4 ml-1" />
                          عرض
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </GlowingEffect>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
