"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { CustomToast } from "@/components/ui/custom-toast";
import { fadeInUp, staggerChildren } from "@/lib/animations";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [toastState, setToastState] = useState<{
    isVisible: boolean;
    type: "loading" | "success" | "error";
    title: string;
    description?: string;
  }>({
    isVisible: false,
    type: "loading",
    title: "",
    description: ""
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setToastState({
        isVisible: true,
        type: "error",
        title: "يرجى ملء جميع الحقول المطلوبة",
        description: "البريد الإلكتروني وكلمة المرور مطلوبان"
      });
      
      setTimeout(() => {
        setToastState(prev => ({ ...prev, isVisible: false }));
      }, 4000);
      return;
    }

    setIsLoading(true);

    // Show loading toast
    setToastState({
      isVisible: true,
      type: "loading",
      title: "جاري تسجيل الدخول...",
      description: "يرجى الانتظار قليلاً"
    });

    // More realistic authentication simulation
    setTimeout(() => {
      setIsLoading(false);
      
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
        
        // Store success message for dashboard
        localStorage.setItem('showWelcomeToast', 'true');
        localStorage.setItem('welcomeMessage', formData.rememberMe ? "سيتم تذكر بياناتك للمرة القادمة" : "مرحباً بك في نظام إدارة الجودة");

        // Navigate to dashboard immediately for faster feel
        setToastState(prev => ({ ...prev, isVisible: false }));
        router.push("/dashboard");
      } else {
        // Show error toast
        setToastState({
          isVisible: true,
          type: "error",
          title: "فشل في تسجيل الدخول",
          description: "يرجى التحقق من البريد الإلكتروني وكلمة المرور"
        });
        
        setTimeout(() => {
          setToastState(prev => ({ ...prev, isVisible: false }));
        }, 5000);
      }
    }, 1500); // More realistic timing
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
    <>
      <CustomToast
        isVisible={toastState.isVisible}
        type={toastState.type}
        title={toastState.title}
        description={toastState.description}
        onClose={() => setToastState(prev => ({ ...prev, isVisible: false }))}
      />
      
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
    </>
  );
}
