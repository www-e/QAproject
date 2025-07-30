"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { fadeInUp, staggerChildren } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-16"
        >
          {/* Main CTA Content */}
          <motion.div variants={fadeInUp} className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="text-sm px-6 py-3 bg-primary/10 text-primary border-primary/20">
                🚀 ابدأ رحلتك اليوم
              </Badge>
            </motion.div>

            <TextGenerateEffect
              words="جاهز لتحويل إدارة الجودة في مشروعك؟"
              className="text-4xl md:text-6xl font-bold text-foreground text-center leading-tight"
            />

            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              انضم إلى المئات من الشركات التي تثق في نظامنا لإدارة اختبارات الجودة بكفاءة عالية
            </motion.p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: 500, label: "شركة تثق بنا", icon: Icons.users },
              { value: 99.9, label: "نسبة الجاهزية", icon: Icons.check },
              { value: 24, label: "دعم فني", icon: Icons.bell }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      <NumberTicker value={stat.value} />
                      {stat.label === "نسبة الجاهزية" && "%"}
                      {stat.label === "دعم فني" && "/7"}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/signin">
                <div className="group relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-10 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl">
                  <Icons.play className="ml-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                  ابدأ التجربة المجانية
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-5 text-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Icons.message className="ml-2 h-6 w-6" />
                تحدث مع فريق المبيعات
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-border/30"
          >
            {[
              "تجربة مجانية 14 يوم",
              "بدون بطاقة ائتمان", 
              "دعم فني 24/7",
              "إعداد في 5 دقائق"
            ].map((feature, index) => (
              <motion.div 
                key={feature}
                className="flex items-center gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="p-1 bg-green-500/10 rounded-full">
                  <Icons.check className="w-4 h-4 text-green-500" />
                </div>
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Secondary CTAs */}
          <motion.div
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center space-y-6 bg-background/50 backdrop-blur-sm border-border/50 hover:border-blue-500/30 transition-all duration-300 group">
                <div className="p-4 bg-blue-500/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Icons.fileText className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3">الوثائق والدلائل</h3>
                  <p className="text-muted-foreground mb-6">
                    دلائل شاملة وتوثيق تقني مفصل لجميع المميزات
                  </p>
                  <Button variant="outline" className="w-full">
                    استكشف الوثائق
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center space-y-6 bg-background/50 backdrop-blur-sm border-border/50 hover:border-green-500/30 transition-all duration-300 group">
                <div className="p-4 bg-green-500/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Icons.users className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3">انضم للمجتمع</h3>
                  <p className="text-muted-foreground mb-6">
                    تواصل مع مطورين آخرين وشارك التجارب والحلول
                  </p>
                  <Button variant="outline" className="w-full">
                    انضم الآن
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
