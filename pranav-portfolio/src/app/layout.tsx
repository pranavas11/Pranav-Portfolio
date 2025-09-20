import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/providers/audio-provider";
import { GlobalThemeToggle } from "@/components/ui/global-theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pranav's Portfolio",
  description: "Interactive portfolio with an AI-powered memoji that answers questions about me, my skills, and my experience.",
  keywords: [
    "Pranav", 
    "Portfolio", 
    "Developer",
    "Software Engineer",
    "AI",
    "Interactive", 
    "Memoji", 
    "Web Development",
    "Full Stack",
    "Next.js",
    "React"
  ],
  authors: [
    {
      name: "Pranav",
      url: "https://pranavas.dev",
    },
  ],
  creator: "Pranav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pranavas.dev",
    title: "Pranav's Portfolio",
    description: "Interactive portfolio with an AI-powered memoji that answers questions about me.",
    siteName: "Pranav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav's Portfolio",
    description: "Interactive portfolio with an AI-powered memoji that answers questions about me.",
    creator: "@pranav",
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: 'image/png',
        sizes: "any",
      }
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased transition-colors duration-300",
          inter.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} themes={['light', 'dark']}>
          <AudioProvider>
            <main className="flex min-h-screen flex-col">
              {children}
            </main>
            <GlobalThemeToggle />
            <Toaster />
          </AudioProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}