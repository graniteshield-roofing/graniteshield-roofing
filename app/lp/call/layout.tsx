import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Call GraniteShield Roofing — Speak Directly With the Owner',
  description:
    'Talk to Justin, the owner of GraniteShield Roofing. Standing seam metal roofing, roof replacement, emergency repairs in Southern Maine. No call center, no voicemail maze.',
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
  // This layout wraps the call LP but still inherits the root layout
  // The page itself handles hiding the default sticky CTA
  return <>{children}</>;
}
