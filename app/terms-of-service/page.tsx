// app/terms-of-service/page.tsx

import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | GraniteShield Roofing',
  description: 'Terms of Service for GraniteShield Roofing LLC, including SMS messaging terms and conditions.',
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> February 21, 2026
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using the website, instant quote tool, landing pages, or any services provided by
        GraniteShield Roofing LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service.
        If you do not agree to these terms, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Services</h2>
      <p className="mb-4">
        GraniteShield Roofing LLC provides roofing, siding, and exterior services in Southern Maine. Our website
        and digital tools allow you to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Receive instant roof replacement estimates</li>
        <li>Schedule free on-site inspections</li>
        <li>Request quotes for roofing, siding, and window projects</li>
        <li>Explore financing options</li>
        <li>Contact our team via phone, email, or text</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Estimates and Quotes</h2>
      <p className="mb-4">
        All estimates provided through our instant quote tool are preliminary and based on satellite/aerial
        measurement data. These estimates are not binding. A final, binding quote will be provided only after
        an in-person inspection and measurement of your property. Actual project costs may vary based on
        roof complexity, accessibility, material selection, and other factors discovered during inspection.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Information</h2>
      <p className="mb-4">
        When you submit information through our forms, you represent that:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>The information you provide is accurate and complete</li>
        <li>You are the owner of the property or authorized to request services for it</li>
        <li>You are at least 18 years of age</li>
        <li>You consent to being contacted by GraniteShield Roofing LLC regarding your inquiry</li>
      </ul>

      {/* ── A2P 10DLC COMPLIANCE: SMS TERMS SECTION ─────────────────────── */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">5. SMS / Text Messaging Terms</h2>
      <p className="mb-4">
        By checking the SMS consent box on any of our forms, you expressly consent to receive text messages
        from GraniteShield Roofing LLC at the phone number you provided. You understand and agree to the following:
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.1 Message Types</h3>
      <p className="mb-4">You may receive text messages related to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Your roof estimate or quote delivery</li>
        <li>Appointment scheduling, confirmations, and reminders</li>
        <li>Project status updates (materials, scheduling, installation progress)</li>
        <li>Payment and invoice notifications</li>
        <li>Follow-up communications about your inquiry</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.2 Message Frequency</h3>
      <p className="mb-4">
        Message frequency varies. You will typically receive between 1 and 10 messages per month depending
        on your project status and interactions with our team.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.3 Costs</h3>
      <p className="mb-4">
        Message and data rates may apply. GraniteShield Roofing LLC is not responsible for any charges
        imposed by your wireless carrier.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.4 Opt-Out</h3>
      <p className="mb-4">
        You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any
        message. You will receive a single confirmation message and no further texts will be sent.
        Opting out of SMS does not cancel any services or affect your ability to receive quotes,
        inspections, or other services from us.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.5 Help</h3>
      <p className="mb-4">
        For assistance with text messaging, reply <strong>HELP</strong> to any message, or contact us at{' '}
        <a href="tel:+12075308362" className="text-blue-600 hover:underline">(207) 530-8362</a> or{' '}
        <a href="mailto:info@graniteshieldroofing.com" className="text-blue-600 hover:underline">info@graniteshieldroofing.com</a>.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.6 Consent Not Required for Purchase</h3>
      <p className="mb-4">
        Consent to receive text messages is not a condition of purchasing any goods or services from
        GraniteShield Roofing LLC.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.7 No Sharing</h3>
      <p className="mb-4">
        <strong>We will not sell, rent, or share your phone number or SMS opt-in data with any third parties
        for their marketing purposes.</strong>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Financing</h2>
      <p className="mb-4">
        Financing options displayed on our website are for informational purposes only and are subject to
        credit approval by our financing partners. Monthly payment estimates are approximate and may vary
        based on your credit profile, loan term, and other factors. GraniteShield Roofing LLC is not a
        lender and does not make credit decisions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
      <p className="mb-4">
        All content on this website, including text, images, logos, and software, is the property of
        GraniteShield Roofing LLC or its licensors and is protected by copyright and trademark laws.
        You may not reproduce, distribute, or create derivative works without our written permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
      <p className="mb-4">
        GraniteShield Roofing LLC provides this website and its tools &quot;as is&quot; without warranties of any kind.
        We are not liable for any damages arising from your use of our website, reliance on estimates, or
        any interruption of service. Our total liability shall not exceed the amount you paid for services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Privacy</h2>
      <p className="mb-4">
        Your use of our services is also governed by our{' '}
        <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>,
        which describes how we collect, use, and protect your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
      <p className="mb-4">
        These Terms of Service are governed by the laws of the State of Maine. Any disputes shall be
        resolved in the courts of Cumberland County, Maine.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service from time to time. Changes will be posted on this page with
        a new effective date. Your continued use of our services after changes are posted constitutes
        acceptance of the updated terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact</h2>
      <p className="mb-2">GraniteShield Roofing LLC</p>
      <p className="mb-2">Scarborough, Maine</p>
      <p className="mb-2">Email: <a href="mailto:info@graniteshieldroofing.com" className="text-blue-600 hover:underline">info@graniteshieldroofing.com</a></p>
      <p className="mb-2">Phone: <a href="tel:+12075308362" className="text-blue-600 hover:underline">(207) 530-8362</a></p>

      <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <p>
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          {' '}&bull;{' '}
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        </p>
      </div>
    </main>
  );
}
