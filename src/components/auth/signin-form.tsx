"use client";

import { useState, useEffect } from "react";
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
    rememberMe: false,
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("يرجى ملء جميع الحقول المطلوبة", {
        description: "البريد الإلكتروني وكلمة المرور مطلوبان",
        icon: <Icons.alert className="w-5 h-5" />,
        classNames: {
          toast: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
          title: "text-red-800 dark:text-red-200",
          description: "text-red-600 dark:text-red-300",
          icon: "text-red-500",
        },
        position: "top-center",
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("جاري تسجيل الدخول...", {
      description: "يرجى الانتظار قليلاً",
      icon: <Icons.spinner className="w-5 h-5 animate-spin" />,
      position: "top-center",
    });

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast.dismiss(loadingToast);
      
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.1; // 90% success rate
      
      if (isSuccess) {
        // Handle remember me functionality
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('sessionExpiry', (Date.now() + 30 * 24 * 60 * 60 * 1000).toString());
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userEmail');
          localStorage.setItem('sessionExpiry', (Date.now() + 24 * 60 * 60 * 1000).toString());
        }
        
        toast.success("🎉 تم تسجيل الدخول بنجاح!", {
          description: formData.rememberMe ? "سيتم تذكر بياناتك للمرة القادمة" : "مرحباً بك في نظام إدارة الجودة",
          icon: <Icons.check className="w-6 h-6" />,
          classNames: {
            toast: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-lg",
            title: "text-green-800 dark:text-green-200 font-semibold",
            description: "text-green-600 dark:text-green-300",
            icon: "text-green-500",
          },
          position: "top-center",
          duration: 4000,
        });

        // Navigate to dashboard with smooth transition
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        // Show error toast
        toast.error("فشل في تسجيل الدخول", {
          description: "يرجى التحقق من البريد الإلكتروني وكلمة المرور",
          icon: <Icons.alert className="w-5 h-5" />,
          classNames: {
            toast: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 border-red-200 dark:border-red-800 shadow-lg",
            title: "text-red-800 dark:text-red-200 font-semibold",
            description: "text-red-600 dark:text-red-300",
            icon: "text-red-500",
          },
          position: "top-center",
          duration: 5000,
        });
      }
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const savedEmail = localStorage.getItem('userEmail') || '';
    
    if (rememberMe && savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, []);

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
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
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
