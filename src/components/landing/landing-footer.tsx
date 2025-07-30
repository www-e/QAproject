"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const footerLinks = {
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
  legal: {
    title: "القانونية",
    links: [
      { name: "الخصوصية", href: "#privacy" },
      { name: "الخدمة", href: "#terms" },
      { name: "ملفات تعريف الارتباط", href: "#cookies" },
      { name: "التراخيص", href: "#licenses" },
    ],
  },
};

export function LandingFooter() {
  // The useTheme hook and handleThemeToggle function have been removed.

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center animate-glow"
                  whileHover={{ scale: 1.05, rotate: 5 }}
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

              {/* The DayNightSwitch has been removed from here */}

              {/* Social Links */}
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icons.message className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icons.mail className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icons.bell className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <motion.div key={key} variants={fadeInUp} className="space-y-4">
                <h4 className="font-semibold text-foreground">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
          className="py-6 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 نظام إدارة الجودة. جميع الحقوق محفوظة.
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://omar-flax.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Developed by Omar
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
