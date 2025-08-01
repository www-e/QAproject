import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal } from "next/font/google";
import "./globals.css";
import "../styles/mobile-animations.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";

// PERFORMANCE OPTIMIZATION: Font loading with display swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true, // Preload primary font
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: "swap",
  preload: false, // Don't preload secondary font
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"], // PERFORMANCE: Load only needed weights
  display: "swap",
  preload: true, // Preload Arabic font
});

export const metadata: Metadata = {
  title: "QA Dashboard - Modern Analytics Platform",
  description:
    "Advanced QA automation dashboard with real-time analytics and beautiful Arabic interface",
  keywords: ["QA", "Testing", "Dashboard", "Analytics", "Arabic"],
  authors: [{ name: "QA Dashboard Team" }],
  creator: "QA Dashboard",
  publisher: "QA Dashboard",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ar_EG", 
    url: "https://qa-dashboard.com",
    title: "QA Dashboard - Modern Analytics Platform",
    description: "Advanced QA automation dashboard with stunning animations",
    siteName: "QA Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "QA Dashboard - Modern Analytics Platform",
    description: "Advanced QA automation dashboard with stunning animations",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// PERFORMANCE OPTIMIZATION: Lazy load analytics components
const LazyAnalytics = () => (
  <Suspense fallback={null}>
    <Analytics />
    <SpeedInsights />
  </Suspense>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable}`}
    >
      <head>
        {/* PERFORMANCE OPTIMIZATION: Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen bg-background">
            <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
            <div className="relative z-10">{children}</div>
          </div>
          
          {/* PERFORMANCE OPTIMIZATION: Async Toaster */}
          <Suspense fallback={null}>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "oklch(var(--card))",
                  color: "oklch(var(--card-foreground))",
                  border: "1px solid oklch(var(--border))",
                },
              }}
            />
          </Suspense>
          
          {/* PERFORMANCE OPTIMIZATION: Lazy loaded analytics */}
          <LazyAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
