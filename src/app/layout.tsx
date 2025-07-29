import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// Enhanced font loading with Arabic support
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
    locale: "ar_EG", // Arabic Egypt locale
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preload Arabic font for better performance */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          as="style"
        />
        {/* Viewport meta for mobile optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* Theme color that matches your OKLCH primary */}
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
          {/* Main Application Wrapper */}
          <div className="relative min-h-screen bg-background">
            {/* Background Pattern (Optional) */}
            <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10">{children}</div>
          </div>

          {/* Toast Notifications */}
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
        </ThemeProvider>
      </body>
    </html>
  );
}
