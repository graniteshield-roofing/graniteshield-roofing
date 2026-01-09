import type { Metadata } from 'next';
import Script from 'next/script';
import { BUSINESS_CONFIG } from '@/lib/business-config';

const baseUrl = 'https://graniteshieldroofing.com';
const peakvexUrl = 'https://quote-graniteshieldroofing.com';

export const metadata: Metadata = {
  title: 'Instant Roof Quote | Get Your Price in 60 Seconds | GraniteShield',
  description:
    'Get an instant, accurate roof quote for your Maine home. No appointment needed. Enter your address and see pricing in under 60 seconds. Standing seam metal & shingle options. Powered by LiDAR technology.',
  keywords: [
    'instant roof quote Maine',
    'roof price calculator',
    'roof cost estimator Maine',
    'online roof quote',
    'roofing estimate Portland Maine',
    'how much does roof cost Maine',
    'free roof estimate',
    'metal roof quote Maine',
    'shingle roof quote',
    'roof replacement cost calculator',
  ],
  alternates: {
    canonical: `${baseUrl}/instant-quote`,
  },
  openGraph: {
    title: 'Instant Roof Quote | Get Your Price in 60 Seconds',
    description: 'Get an instant, accurate roof quote for your Maine home. No appointment needed. Enter your address and see pricing in under 60 seconds.',
    url: `${baseUrl}/instant-quote`,
    siteName: BUSINESS_CONFIG.name,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-instant-quote.jpg`,
        width: 1200,
        height: 630,
        alt: 'GraniteShield Instant Roof Quote Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instant Roof Quote | Get Your Price in 60 Seconds',
    description: 'Get an instant, accurate roof quote for your Maine home. No appointment needed.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Schema markup for the instant quote tool
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PeakVex Instant Roof Quote',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  description: 'Advanced LiDAR-powered instant roof measurement and quote tool for Maine homeowners. Get accurate pricing in under 60 seconds.',
  url: `${baseUrl}/instant-quote`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@type': 'LocalBusiness',
    name: BUSINESS_CONFIG.name,
    telephone: BUSINESS_CONFIG.contact.phone,
  },
  featureList: [
    'Satellite roof measurement',
    'LiDAR accuracy',
    'Instant pricing',
    'Standing seam metal options',
    'Shingle roof options',
    'No appointment required',
    'No obligation quote',
  ],
  screenshot: `${baseUrl}/images/instant-quote-screenshot.png`,
};

// FAQ schema for common questions
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is the instant roof quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our instant quote tool uses LiDAR and satellite technology to measure your roof with professional-grade accuracy. The estimate provided is typically within 5-10% of the final price, with a final in-person measurement confirming the exact cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to schedule an appointment for a quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No appointment is needed for an instant quote. Simply enter your Maine address and receive an accurate estimate in under 60 seconds. If you want to proceed, we\'ll schedule a final measurement visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What roofing options are included in the quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our instant quote shows pricing for both standing seam metal roofing and premium architectural shingles, so you can compare options and choose what\'s best for your home and budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the instant quote free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the instant quote is completely free with no obligation. You can get as many quotes as you need to plan your roofing project.',
      },
    },
  ],
};

export default function InstantQuotePage() {
  return (
    <>
      <Script
        id="schema-software-application"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <Script
        id="schema-faq-instant-quote"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      {/* Full-screen PeakVex embed */}
      <div className="min-h-screen w-full">
        <iframe
          src={peakvexUrl}
          title="GraniteShield Instant Roof Quote - Powered by PeakVex"
          className="w-full h-screen border-0"
          style={{
            minHeight: '100vh',
            height: '100%',
            width: '100%',
          }}
          allow="geolocation"
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
