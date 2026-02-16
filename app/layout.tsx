// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Script from 'next/script';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { EnhancedSchemaMarkup } from '@/components/enhanced-schema';
import { ReviewsSchema } from '@/components/schema-markup';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { MobileStickyCTA } from '@/components/mobile-sticky-cta';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://graniteshieldroofing.com';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${BUSINESS_CONFIG.name} | #1 Rated Roofing Contractor in Southern Maine`,
    template: `%s | ${BUSINESS_CONFIG.name}`,
  },

  description: 'Southern Maine\'s most trusted roofing contractor. Standing seam metal roofing, shingle replacement, emergency repairs. Owner-operated, 5.0★ rating. Get instant quote online.',
  
  keywords: [
    // Primary keywords
    'Maine roofing contractor',
    'roofing company Portland Maine',
    'roof replacement Maine',
    'metal roofing Maine',
    'standing seam metal roof',
    // Local keywords
    'Scarborough roofer',
    'Portland roofing',
    'South Portland roof repair',
    'Cape Elizabeth roofing',
    'Falmouth roof replacement',
    'Brunswick roofing contractor',
    'Biddeford roofer',
    'Auburn roofing',
    'Lewiston roof repair',
    // Service keywords
    'emergency roof repair Maine',
    'ice dam removal Maine',
    'roof inspection Portland',
    'shingle roof installation',
    'best roofer Southern Maine',
    // Long-tail keywords
    'instant roof quote Maine',
    'how much does roof cost Maine',
    'roofing contractor near me',
  ],

  alternates: {
    canonical: siteUrl,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  manifest: '/site.webmanifest',

  openGraph: {
    title: `${BUSINESS_CONFIG.name} | #1 Rated Roofing Contractor in Southern Maine`,
    description: 'Southern Maine\'s most trusted roofing contractor. Standing seam metal roofing, shingle replacement, emergency repairs. Get instant quote online.',
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: BUSINESS_CONFIG.name,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'GraniteShield Roofing - Southern Maine Roofing Experts',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS_CONFIG.name} | Southern Maine Roofing Experts`,
    description: 'Standing seam metal roofing, shingle replacement, emergency repairs. Owner-operated, 5.0★ rating. Get instant quote.',
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

  // Additional SEO metadata
  category: 'Roofing Contractor',
  classification: 'Business',
  
  other: {
    // Geo meta tags for local SEO
    'geo.region': 'US-ME',
    'geo.placename': 'Southern Maine',
    'geo.position': '43.859;-70.103',
    'ICBM': '43.859, -70.103',
    // Dublin Core metadata
    'DC.title': `${BUSINESS_CONFIG.name} - Southern Maine Roofing Contractor`,
    'DC.creator': 'GraniteShield Roofing & Exteriors',
    'DC.subject': 'Roofing, Metal Roofing, Roof Replacement, Maine',
    'DC.description': BUSINESS_CONFIG.branding.description,
    'DC.publisher': BUSINESS_CONFIG.name,
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.language': 'en-US',
    'DC.coverage': 'Southern Maine, USA',
    // Business verification
    'business:contact_data:street_address': 'Southern Maine',
    'business:contact_data:locality': 'Scarborough',
    'business:contact_data:region': 'Maine',
    'business:contact_data:postal_code': '04074',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:phone_number': BUSINESS_CONFIG.contact.phone,
    'business:contact_data:website': siteUrl,
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
        {/* Enhanced Schema Markup for SEO/AI */}
        <EnhancedSchemaMarkup />
        
        {/* Individual Reviews Schema for rich snippets */}
        <ReviewsSchema />

        {/* Facebook Domain Verification */}
        <meta
          name="facebook-domain-verification"
          content="9plxtrv2q4tbnmt9ttfhdy7ptv48qe"
        />
        
        {/* Google Site Verification (add your verification code) */}
        {/* <meta name="google-site-verification" content="YOUR_CODE" /> */}
        
        {/* Bing Site Verification (add your verification code) */}
        {/* <meta name="msvalidate.01" content="YOUR_CODE" /> */}
        
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for APIs */}
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        
        {/* Google Tag Manager — head script */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXXX');
          `}
        </Script>
      </head>

      <body className={`${inter.className} pb-16 md:pb-0 scroll-smooth`}>
        {/* Google Tag Manager — noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SiteHeader />
        <main className="min-h-screen pt-20">{children}</main>
        <SiteFooter />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
