import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import './globals.css';
import { JsonLd } from '@/components/json-ld';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { NavigationProvider } from '@/components/navigation-provider';
import { ScrollProgress } from '@/components/scroll-progress';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SmoothScroll } from '@/components/smooth-scroll';
import { ThemeProvider } from '@/components/theme-provider';

const sfProDisplay = localFont({
  src: [
    {
      path: './fonts/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    { path: './fonts/SF-Pro-Display-Bold.otf', weight: '700', style: 'normal' },
    {
      path: './fonts/SF-Pro-Display-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro-display',
  display: 'swap',
  preload: true,
});

const SITE_URL = 'https://www.tarnnn.com';
const TITLE = 'Taranjit Kang — Senior Full Stack Software Developer';
const DESCRIPTION =
  'Senior full-stack software developer specializing in Java, Spring Boot, React, and cloud. Shipped products for Intuit, Royal Bank of Canada, NCR, and Rogers.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Taranjit Kang',
  },
  description: DESCRIPTION,
  keywords: [
    'Taranjit Kang',
    'Full Stack Developer',
    'Software Engineer',
    'Java',
    'Spring Boot',
    'React',
    'TypeScript',
    'AWS',
    'Microservices',
    'Portfolio',
  ],
  authors: [{ name: 'Taranjit Kang' }],
  creator: 'Taranjit Kang',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', sizes: '48x48' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.svg' }],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Taranjit Kang',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@Tarn__K',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sfProDisplay.variable} antialiased`}>
        <JsonLd />
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavigationProvider>
              <SmoothScroll />
              <ScrollProgress />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ScrollToTop />
            </NavigationProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
