"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { DayNightSwitch } from "@/components/shsfui/switch/day-night-switch";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { fadeInUp } from "@/lib/animations";

export default function SettingsPage() {
  const { setTheme, resolvedTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reports: true,
  });

  const [profile, setProfile] = useState({
    name: "عمر أشرف",
    email: "omar.ashraf@company.com",
    role: "مدير الجودة",
    department: "ضمان الجودة",
  });

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileChange = (key: keyof typeof profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
            <p className="text-muted-foreground mt-1">
              إدارة إعدادات حسابك وتفضيلات النظام
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            <Icons.settings className="w-4 h-4 ml-1" />
            إعدادات شخصية
          </Badge>
        </div>

        <Separator />

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.users className="w-5 h-5" />
                الملف الشخصي
              </CardTitle>
              <CardDescription>
                إدارة معلومات حسابك الشخصي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-2 border-sidebar-border">
                  <AvatarImage src="/images/avatar-placeholder.jpg" alt={profile.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                    ع أ
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Icons.eye className="w-4 h-4 ml-2" />
                    تغيير الصورة
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG أو GIF. الحد الأقصى 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">المنصب</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => handleProfileChange('role', e.target.value)}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">القسم</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Icons.check className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {resolvedTheme === "light" ? (
                  <Icons.sun className="w-5 h-5" />
                ) : (
                  <Icons.moon className="w-5 h-5" />
                )}
                المظهر واللغة
              </CardTitle>
              <CardDescription>
                تخصيص مظهر النظام واللغة المفضلة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>وضع المظهر</Label>
                  <p className="text-sm text-muted-foreground">
                    اختر بين الوضع النهاري والليلي
                  </p>
                </div>
                <DayNightSwitch
                  checked={resolvedTheme === "light"}
                  onToggleChange={handleThemeToggle}
                  className="border-2 border-sidebar-border hover:border-primary/50 transition-colors"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>اللغة</Label>
                  <p className="text-sm text-muted-foreground">
                    اختر لغة واجهة النظام
                  </p>
                </div>
                <LanguageSwitcher />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.bell className="w-5 h-5" />
                الإشعارات
              </CardTitle>
              <CardDescription>
                إدارة تفضيلات الإشعارات والتنبيهات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>إشعارات البريد الإلكتروني</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي الإشعارات عبر البريد الإلكتروني
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>الإشعارات الفورية</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي الإشعارات الفورية في المتصفح
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>رسائل SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي التنبيهات المهمة عبر الرسائل النصية
                  </p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={() => handleNotificationChange('sms')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>تقارير دورية</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي التقارير الأسبوعية والشهرية
                  </p>
                </div>
                <Switch
                  checked={notifications.reports}
                  onCheckedChange={() => handleNotificationChange('reports')}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.lock className="w-5 h-5" />
                الأمان والخصوصية
              </CardTitle>
              <CardDescription>
                إدارة إعدادات الأمان وكلمة المرور
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>تغيير كلمة المرور</Label>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="كلمة المرور الحالية"
                    dir="rtl"
                  />
                  <Input
                    type="password"
                    placeholder="كلمة المرور الجديدة"
                    dir="rtl"
                  />
                  <Input
                    type="password"
                    placeholder="تأكيد كلمة المرور الجديدة"
                    dir="rtl"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Icons.lock className="w-4 h-4 ml-2" />
                  تحديث كلمة المرور
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>المصادقة الثنائية</Label>
                  <p className="text-sm text-muted-foreground">
                    تفعيل طبقة حماية إضافية لحسابك
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Icons.settings className="w-4 h-4 ml-2" />
                  إعداد
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.settings className="w-5 h-5" />
                تفضيلات النظام
              </CardTitle>
              <CardDescription>
                إعدادات متقدمة للنظام والأداء
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>تحسين الأداء للأجهزة المحمولة</Label>
                  <p className="text-sm text-muted-foreground">
                    تقليل الرسوم المتحركة لتحسين الأداء
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>حفظ البيانات تلقائياً</Label>
                  <p className="text-sm text-muted-foreground">
                    حفظ التغييرات تلقائياً كل 30 ثانية
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>وضع المطور</Label>
                  <p className="text-sm text-muted-foreground">
                    عرض معلومات تقنية إضافية
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between items-center pt-6"
        >
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
            <Icons.alert className="w-4 h-4 ml-2" />
            حذف الحساب
          </Button>
          
          <div className="space-x-2 space-x-reverse">
            <Button variant="outline">
              إلغاء
            </Button>
            <Button>
              <Icons.check className="w-4 h-4 ml-2" />
              حفظ جميع التغييرات
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}