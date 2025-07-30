"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { fadeInUp, staggerChildren } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5 flex items-center justify-center min-h-[80vh]">
      <div className="container mx-auto px-6 flex items-center justify-center">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-5xl w-full text-center space-y-12"
        >
          {/* Centered Main CTA */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <HoverBorderGradient
              as="div"
              containerClassName="rounded-3xl w-full max-w-4xl"
            >
              <div className="bg-background border-0 p-12 space-y-8 text-center">
                <div className="space-y-6 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge variant="secondary" className="text-sm px-6 py-3">
                      🎯 ابدأ رحلتك اليوم
                    </Badge>
                  </motion.div>

                  <TextGenerateEffect
                    words="جاهز لتحويل إدارة الجودة في مشروعك؟"
                    className="text-4xl md:text-5xl font-bold text-foreground text-center"
                  />

                  <motion.p
                    className="text-xl text-muted-foreground max-w-3xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    انضم إلى المئات من الشركات التي تثق في نظامنا لإدارة
                    اختبارات الجودة بكفاءة عالية
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/signin">
                      <div className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-colors duration-200 flex items-center gap-2">
                        <Icons.play className="ml-2 h-5 w-5" />
                        ابدأ التجربة المجانية
                      </div>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg"
                    >
                      <Icons.message className="ml-2 h-5 w-5" />
                      تحدث مع فريق المبيعات
                    </Button>
                  </motion.div>
                </div>

                {/* Trust Signals */}
                <div className="flex flex-wrap justify-center items-center gap-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icons.check className="w-4 h-4 text-green-500" />
                    <span>تجربة مجانية 14 يوم</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icons.check className="w-4 h-4 text-green-500" />
                    <span>بدون بطاقة ائتمان</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icons.check className="w-4 h-4 text-green-500" />
                    <span>دعم فني 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icons.check className="w-4 h-4 text-green-500" />
                    <span>إعداد في 5 دقائق</span>
                  </div>
                </div>
              </div>
            </HoverBorderGradient>
          </motion.div>

          {/* Secondary CTAs */}
          <motion.div
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={fadeInUp}>
              <div className="p-6 rounded-xl border border-border hover:border-primary/50 transition-colors text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Icons.fileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    الوثائق والدلائل
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    دلائل شاملة وتوثيق تقني مفصل
                  </p>
                  <Button variant="outline" size="sm">
                    استكشف الوثائق
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="p-6 rounded-xl border border-border hover:border-primary/50 transition-colors text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Icons.users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">انضم للمجتمع</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    تواصل مع مطورين آخرين وشارك التجارب
                  </p>
                  <Button variant="outline" size="sm">
                    انضم الآن
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
