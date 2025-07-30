"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const footerSections = {
  product: {
    title: "المنتج",
    links: [
      { name: "المميزات", href: "#features" },
      { name: "التسعير", href: "#pricing" },
      { name: "الأمان", href: "#security" },
      { name: "التحديثات", href: "#updates" },
    ],
  },
  company: {
    title: "الشركة",
    links: [
      { name: "من نحن", href: "#about" },
      { name: "فريق العمل", href: "#team" },
      { name: "الوظائف", href: "#careers" },
      { name: "اتصل بنا", href: "#contact" },
    ],
  },
  resources: {
    title: "الموارد",
    links: [
      { name: "الوثائق", href: "#docs" },
      { name: "دلائل المستخدم", href: "#guides" },
      { name: "واجهة برمجة التطبيقات", href: "#api" },
      { name: "المجتمع", href: "#community" },
    ],
  },
  support: {
    title: "الدعم",
    links: [
      { name: "مركز المساعدة", href: "#help" },
      { name: "دعم فني", href: "#support" },
      { name: "حالة النظام", href: "#status" },
      { name: "تواصل معنا", href: "#contact" },
    ],
  },
};

export function LandingFooter() {
  // The useTheme hook and handleThemeToggle function have been removed.

  return (
    <footer className="bg-gradient-to-t from-background to-primary/5 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section - Takes 2 columns */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icons.check className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    نظام الجودة
                  </h3>
                  <p className="text-sm text-muted-foreground">إدارة متقدمة</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-md">
                حلول متطورة لإدارة اختبارات الجودة مع واجهات عربية حديثة وذكاء
                اصطناعي متقدم لتحسين كفاءة المشاريع وضمان الجودة العالية.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icons.message className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icons.mail className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icons.bell className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Links Sections - Each takes 1 column */}
            {Object.entries(footerSections).map(([key, section]) => (
              <motion.div key={key} variants={fadeInUp} className="space-y-4">
                <h4 className="font-semibold text-foreground text-lg">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-8 border-t border-border/50"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-sm text-muted-foreground">
                © 2025 نظام إدارة الجودة. جميع الحقوق محفوظة.
              </p>
            </div>

            {/* Developer Credit & Tech Stack */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
              {/* Inviting Omar Button */}
              <motion.a
                href="https://omar-flax.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-primary/25">
                  <div className="flex items-center gap-2">
                    <span>Developed by Omar</span>
                    <Icons.chevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
