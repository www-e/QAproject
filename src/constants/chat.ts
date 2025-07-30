export const quickReplies = [
    "تحليل الأداء الشهري",
    "إحصائيات الفريق", 
    "الاختبارات الفاشلة",
    "تقرير مفصل",
    "اقتراحات التحسين",
  ]
  
  export const initialMessages = [
    {
      id: 1,
      type: "ai" as const,
      content: "مرحباً! أنا مساعدك الذكي لإدارة الجودة. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "delivered" as const,
    },
    {
      id: 2,
      type: "user" as const,
      content: "أريد تحليل نتائج الاختبارات الأخيرة",
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      status: "delivered" as const,
    },
    {
      id: 3,
      type: "ai" as const,
      content: "بالطبع! لقد قمت بتحليل الاختبارات الـ 247 الأخيرة. معدل النجاح 88.1% وهو تحسن بنسبة 12% عن الشهر الماضي. هل تريد تفاصيل أكثر حول نوع معين من الاختبارات؟",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      status: "delivered" as const,
    },
  ]
  