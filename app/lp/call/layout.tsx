import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraniteShield Roofing — Southern Maine Roofing Contractor',
  description:
    'GraniteShield Roofing serves Southern Maine with standing seam metal roofing, roof replacement, and emergency repairs. Licensed, insured, and owner-supervised. Call for a consultation.',
  robots: {
    index: false, // Don't index the ads landing page
    follow: false,
  },
};

export default function CallLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
