// app/privacy-policy/page.tsx

import React from 'react';

export const metadata = {
  title: 'Privacy Policy | GraniteShield Roofing',
  description: 'Learn how GraniteShield Roofing collects, uses, and protects your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> December 27, 2025
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
      <p className="mb-4">
        GraniteShield Roofing (“we,” “our,” or “us”) is committed to protecting your privacy. This policy describes
        how we collect, use, and share your personal information through our website and lead forms (including
        Facebook Ads, Meta Lead Ads, and other digital campaigns).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
      <p className="mb-4">We may collect the following personal information:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>ZIP code or service area</li>
        <li>Details about your roofing, siding, or window project</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
      <p className="mb-4">We may use your information to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Respond to your inquiries and schedule consultations</li>
        <li>Provide estimates or proposals</li>
        <li>Send follow-up communications via phone, text, or email</li>
        <li>Improve our marketing and advertising</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Collect Information</h2>
      <p className="mb-4">We may collect personal data through:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Facebook and Instagram Lead Ads</li>
        <li>Forms submitted on our website</li>
        <li>Phone calls, texts, or emails</li>
        <li>Cookies and analytics tools (e.g., Meta Pixel, Google Analytics)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sharing Information</h2>
      <p className="mb-4">
        We do not sell your information. We may share it with service providers (e.g. CRM systems, ad platforms, or communication tools) only for the purposes listed above.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies & Tracking</h2>
      <p className="mb-4">
        We may use cookies or similar technologies to understand visitor behavior and improve user experience.
        You can disable cookies via your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Security</h2>
      <p className="mb-4">
        We take reasonable steps to secure your information, but no system is 100% secure. Use this site at your own risk.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights</h2>
      <p className="mb-4">
        You may request access to, correction of, or deletion of your personal information by contacting us.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Updates</h2>
      <p className="mb-4">
        We may update this privacy policy. Changes will be posted on this page with a new effective date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact</h2>
      <p className="mb-2">GraniteShield Roofing</p>
      <p className="mb-2">Email: info@graniteshieldroofing.com</p>
      <p className="mb-2">Phone: (207) 530-8362</p>
    </main>
  );
}
