import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import './globals.css';
import { JsonLd } from '@/components/json-ld';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { MotionProvider } from '@/components/motion-provider';
import { NavigationProvider } from '@/components/navigation-provider';
import { ScrollProgress } from '@/components/scroll-progress';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SmoothScroll } from '@/components/smooth-scroll';
import { TOD_INIT_SCRIPT } from '@/lib/time-of-day';

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

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

// Adobe Fonts web project (IvyPresto Display) — domains: tarnnn.com,
// *.vercel.app, localhost. Manage at fonts.adobe.com/my_fonts#web_projects.
const ADOBE_FONTS_KIT = 'https://use.typekit.net/cml5ijv.css';

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
      <head>
        {/* Resolve morning / golden / night before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: TOD_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        {}
        <link rel="stylesheet" href={ADOBE_FONTS_KIT} />
      </head>
      <body
        className={`${sfProDisplay.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        <NextIntlClientProvider>
          <MotionProvider>
            <NavigationProvider>
              <SmoothScroll />
              <ScrollProgress />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ScrollToTop />
            </NavigationProvider>
          </MotionProvider>
        </NextIntlClientProvider>
        <div aria-hidden className="grain" />
        <Analytics />
      </body>
    </html>
  );
}
