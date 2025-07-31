import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal } from "next/font/google"; // Import Tajawal font
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Instantiate the Tajawal font
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

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
      // Add the new font variable here
      className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable}`}
    >
      <head>
        {/* The manual <link> tag for the font is no longer needed */}
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
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}