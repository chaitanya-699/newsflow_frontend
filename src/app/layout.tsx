import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import SkipToContent from "@/components/accessibility/SkipToContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NewsFlow - Stay Informed",
  description: "Your personalized news experience with AI-powered insights. Stay updated with the latest news from technology, business, sports, entertainment, and more.",
  keywords: "news, technology, business, sports, entertainment, AI, personalized news, breaking news",
  authors: [{ name: "NewsFlow Team" }],
  creator: "NewsFlow",
  publisher: "NewsFlow",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://newsflow.com',
    siteName: 'NewsFlow',
    title: 'NewsFlow - Stay Informed',
    description: 'Your personalized news experience with AI-powered insights',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NewsFlow - Stay Informed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewsFlow - Stay Informed',
    description: 'Your personalized news experience with AI-powered insights',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = (stored === 'light' || stored === 'dark') ? stored : (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SkipToContent />
        <ErrorBoundary>
          <ClientLayout>{children}</ClientLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
