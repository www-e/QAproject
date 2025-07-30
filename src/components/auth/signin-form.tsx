"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";
import { fadeInUp, staggerChildren } from "@/lib/animations";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast.success("تم تسجيل الدخول بنجاح!", {
        description: "مرحباً بك في نظام إدارة الجودة",
        icon: <Icons.check className="w-5 h-5" />,
        classNames: {
          toast:
            "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700",
          title: "text-green-800 dark:text-green-100",
          description: "text-green-700 dark:text-green-200",
          icon: "text-green-500",
        },
        position: "top-center",
        animation: "slide-in-down",
        duration: 3000,
      });

      // Navigate to dashboard with smooth transition
      router.push("/dashboard");
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {/* Email Field */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          البريد الإلكتروني
        </Label>
        <motion.div
          className="relative"
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Input
            id="email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="input-enhanced pl-11"
            required
            dir="rtl"
          />
          <motion.div
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            whileHover={{ scale: 1.1 }}
          >
            <Icons.mail className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Password Field */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          كلمة المرور
        </Label>
        <motion.div
          className="relative"
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Input
            id="password"
            type="password"
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="input-enhanced pl-11"
            required
            dir="rtl"
          />
          <motion.div
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            whileHover={{ scale: 1.1 }}
          >
            <Icons.lock className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Remember Me & Forgot Password */}
      <motion.div
        variants={fadeInUp}
        className="flex items-center justify-between text-sm"
      >
        <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
          <input
            type="checkbox"
            className="rounded border-input focus:ring-primary focus:ring-2"
          />
          <span className="text-muted-foreground">تذكرني</span>
        </label>
        <motion.a
          href="#"
          className="text-primary hover:underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          نسيت كلمة المرور؟
        </motion.a>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={fadeInUp}>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary h-12 text-base font-medium"
        >
          {isLoading ? (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="spinner" />
              جاري تسجيل الدخول...
            </motion.div>
          ) : (
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              تسجيل الدخول
            </motion.span>
          )}
        </Button>
      </motion.div>

      {/* Demo Credentials */}
      <motion.div
        variants={fadeInUp}
        className="p-4 bg-muted/50 rounded-lg border-dashed border-2 border-muted"
      >
        <p className="text-xs text-muted-foreground text-center mb-2">
          بيانات تجريبية للعرض:
        </p>
        <div className="text-xs space-y-1 text-center">
          <p>البريد: admin@qa-dashboard.com</p>
          <p>كلمة المرور: demo123</p>
        </div>
      </motion.div>
    </motion.form>
  );
}
