// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { OrganizationSchema } from '@/components/schema-markup';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { MobileStickyCTA } from '@/components/mobile-sticky-cta';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://graniteshieldroofing.com';
const ogImage =
  'https://res.cloudinary.com/durhnu8rr/image/upload/v1766122201/Untitled_1640_x_720_px_Mobile_Video_1_pnhryl.jpg';

// ✅ FIX: remove Viewport typing (Next 13.5.1 doesn't export it)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.branding.tagline}`,
    template: `%s | ${BUSINESS_CONFIG.name}`,
  },

  description: BUSINESS_CONFIG.branding.description,
  keywords: [...BUSINESS_CONFIG.branding.keywords],

  alternates: {
    canonical: siteUrl,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  openGraph: {
    title: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.branding.tagline}`,
    description: BUSINESS_CONFIG.branding.description,
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: BUSINESS_CONFIG.name,
    images: [
      {
        url: ogImage,
        width: 1640,
        height: 720,
        alt: `${BUSINESS_CONFIG.name} — Roofing & Exteriors in Southern Maine`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.branding.tagline}`,
    description: BUSINESS_CONFIG.branding.description,
    images: [ogImage],
  },

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>

      <body className={`${inter.className} pb-16 md:pb-0 scroll-smooth`}>
        <SiteHeader />
        <main className="min-h-screen pt-20">{children}</main>
        <SiteFooter />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
