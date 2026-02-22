// app/privacy-policy/page.tsx

import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | GraniteShield Roofing',
  description: 'Learn how GraniteShield Roofing collects, uses, and protects your information, including our SMS messaging practices.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> February 21, 2026
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
      <p className="mb-4">
        GraniteShield Roofing LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This policy describes
        how we collect, use, and share your personal information through our website, lead forms, instant quote tool,
        and digital advertising campaigns (including Facebook Ads, Meta Lead Ads, Google Ads, and other platforms).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
      <p className="mb-4">We may collect the following personal information:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Full name (first and last)</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Property address, ZIP code, or service area</li>
        <li>Details about your roofing, siding, or window project</li>
        <li>Roof measurement data (area, pitch, material type)</li>
        <li>Financing preferences and intent</li>
        <li>SMS consent status and timestamp</li>
        <li>Device and browser information (user agent, IP address)</li>
        <li>Advertising identifiers (GCLID, FBCLID, UTM parameters)</li>
        <li>Cookie identifiers (_fbp, _fbc, _ga)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
      <p className="mb-4">We may use your information to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Respond to your inquiries and schedule consultations</li>
        <li>Provide instant roof estimates and detailed proposals</li>
        <li>Send follow-up communications via phone, text (SMS), or email</li>
        <li>Send appointment reminders and service notifications via SMS</li>
        <li>Process financing applications on your behalf</li>
        <li>Improve our marketing, advertising, and conversion tracking</li>
        <li>Report conversions to advertising platforms (Meta, Google) for campaign optimization</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Collect Information</h2>
      <p className="mb-4">We may collect personal data through:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Our instant quote tool and lead capture forms</li>
        <li>Facebook and Instagram Lead Ads</li>
        <li>Forms submitted on our website and landing pages</li>
        <li>Phone calls, text messages, or emails</li>
        <li>Cookies and analytics tools (e.g., Meta Pixel, Google Analytics, Google Ads)</li>
        <li>Server-side tracking (Conversions API, Enhanced Conversions)</li>
      </ul>

      {/* ── A2P 10DLC COMPLIANCE: SMS MESSAGING SECTION ─────────────────── */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">5. SMS / Text Messaging</h2>
      <p className="mb-4">
        When you provide your phone number and check the SMS consent box on any of our forms, you are opting in to
        receive text messages from GraniteShield Roofing LLC. By opting in, you agree to the following:
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.1 Types of Messages</h3>
      <p className="mb-4">You may receive the following types of SMS messages:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Quote and estimate delivery</li>
        <li>Appointment confirmations and reminders</li>
        <li>Service status updates (scheduling, materials, installation)</li>
        <li>Follow-up communications related to your roofing project</li>
        <li>Payment and invoice notifications</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.2 Message Frequency</h3>
      <p className="mb-4">
        Message frequency varies based on your project status and interactions. You will typically receive
        between 1 and 10 messages per month. We will never send marketing blasts or promotional messages
        unrelated to your active project or inquiry.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.3 Message and Data Rates</h3>
      <p className="mb-4">
        Standard message and data rates may apply depending on your mobile carrier and plan. GraniteShield
        Roofing LLC is not responsible for any charges from your wireless provider.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.4 Opt-Out</h3>
      <p className="mb-4">
        You can opt out of SMS messages at any time by replying <strong>STOP</strong> to any message you
        receive from us. After opting out, you will receive one final confirmation message and no further
        texts will be sent. Opting out of SMS does not affect other communication channels (email, phone).
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.5 Help</h3>
      <p className="mb-4">
        For help with SMS messaging, reply <strong>HELP</strong> to any message, or contact us directly at{' '}
        <a href="tel:+12075308362" className="text-blue-600 hover:underline">(207) 530-8362</a> or{' '}
        <a href="mailto:info@graniteshieldroofing.com" className="text-blue-600 hover:underline">info@graniteshieldroofing.com</a>.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.6 No Sharing of SMS Data</h3>
      <p className="mb-4">
        <strong>We do not sell, rent, or share your phone number or SMS consent data with any third parties
        for their marketing purposes.</strong> Your phone number and opt-in status are used solely for the
        purposes described in this policy and are stored securely in our systems.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">5.7 Consent is Not Required for Purchase</h3>
      <p className="mb-4">
        Consenting to receive SMS messages is not a condition of purchasing any goods or services from
        GraniteShield Roofing LLC. You may still receive a quote, schedule an inspection, or hire us for
        roofing services without opting in to text messages.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Sharing Information</h2>
      <p className="mb-4">
        We do not sell your personal information. We may share it with trusted service providers solely for the
        purposes listed above, including:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>CRM systems (GoHighLevel) for lead management</li>
        <li>Communication platforms (OpenPhone) for calling and texting</li>
        <li>Email delivery services (Resend) for transactional emails</li>
        <li>Advertising platforms (Meta, Google) for conversion tracking and optimization</li>
        <li>Financing partners for loan processing (with your explicit consent)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies & Tracking</h2>
      <p className="mb-4">
        We use cookies and similar technologies to understand visitor behavior, measure advertising effectiveness,
        and improve user experience. This includes:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Meta Pixel and Conversions API (CAPI) for Facebook/Instagram ad tracking</li>
        <li>Google Analytics and Google Ads conversion tracking</li>
        <li>First-party cookies for session management and attribution</li>
      </ul>
      <p className="mb-4">
        You can disable cookies via your browser settings. Note that disabling cookies may affect the
        functionality of our website and instant quote tool.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Data Security</h2>
      <p className="mb-4">
        We take reasonable technical and organizational steps to secure your information, including encrypted
        data transmission (HTTPS/TLS), secure database storage, and access controls. However, no system is
        100% secure. Use this site at your own risk.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Data Retention</h2>
      <p className="mb-4">
        We retain your personal information for as long as necessary to fulfill the purposes described in this
        policy, or as required by law. SMS consent records are retained for a minimum of 5 years for compliance
        purposes. You may request deletion of your data at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. Your Rights</h2>
      <p className="mb-4">
        You may request access to, correction of, or deletion of your personal information by contacting us.
        You may also opt out of SMS messages at any time by replying STOP, and opt out of email communications
        by clicking the unsubscribe link in any email.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. Updates</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. Changes will be posted on this page with a new
        effective date. We encourage you to review this policy periodically.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact</h2>
      <p className="mb-2">GraniteShield Roofing LLC</p>
      <p className="mb-2">Scarborough, Maine</p>
      <p className="mb-2">Email: <a href="mailto:info@graniteshieldroofing.com" className="text-blue-600 hover:underline">info@graniteshieldroofing.com</a></p>
      <p className="mb-2">Phone: <a href="tel:+12075308362" className="text-blue-600 hover:underline">(207) 530-8362</a></p>

      <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <p>
          <Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>
          {' '}&bull;{' '}
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        </p>
      </div>
    </main>
  );
}
