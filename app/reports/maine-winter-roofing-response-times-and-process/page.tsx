import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Phone, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  BreadcrumbSchema,
  ReportSchema,
  HowToSchema,
  FAQSchema,
} from '@/components/schema-markup';
import { ReportSummaryBox } from '@/components/report-summary-box';
import { LastUpdated } from '@/components/last-updated';
import { MethodologyBlock } from '@/components/methodology-block';

const SITE_URL = 'https://graniteshieldroofing.com';
const PAGE_URL = `${SITE_URL}/reports/maine-winter-roofing-response-times-and-process`;
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2025-01-01';

export const metadata: Metadata = {
  title: `Maine Winter Roofing Response Times & Process | ${BUSINESS_CONFIG.name}`,
  description:
    'Emergency roofing response workflow in Maine: triage criteria, realistic response times, what happens when you call during winter.',
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function MaineWinterRoofingResponsePage() {
  const faqs = [
    {
      question: 'What qualifies as a roofing emergency?',
      answer:
        'Active leaks causing interior water damage, ice dams with visible leaking, storm damage creating immediate exposure, or structural concerns (sagging, collapse risk). Non-urgent issues like missing shingles without leaks can typically wait for regular scheduling.',
    },
    {
      question: 'Can you really do roof work in winter?',
      answer:
        'Yes, with constraints. Emergency repairs, ice dam removal, and temporary protection work can be done in most winter conditions. Full roof replacements are weather-dependent—we need temps above 40°F for adhesive activation and dry conditions for safe installation.',
    },
    {
      question: 'What should I do while waiting for emergency service?',
      answer:
        "Place buckets to catch interior leaks, move valuables away from affected areas, and take photos for insurance. Do NOT attempt DIY roof access in winter—ice, snow, and pitch create serious fall hazards. We'll walk you through safe temporary steps when you call.",
    },
    {
      question: 'How do you prioritize multiple emergency calls?',
      answer:
        "Triage is based on severity: active interior leaks come first, followed by imminent risk situations, then urgent-but-contained issues. We'll give you an honest timeframe based on current call volume and conditions.",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Reports', url: `${SITE_URL}/reports` },
          {
            name: 'Maine Winter Roofing Response Times & Process',
            url: PAGE_URL,
          },
        ]}
      />

      <ReportSchema
        headline="Maine Winter Roofing Response Times & Process"
        description="Emergency roofing response workflow and realistic response times for Southern Maine winter conditions"
        datePublished={DATE_PUBLISHED}
        dateModified={DATE_MODIFIED}
        url={PAGE_URL}
        about={['Emergency Roofing', 'Winter Roof Repair', 'Response Times']}
        mentions={[
          'Emergency Repair',
          'Ice Dams',
          'Maine Winter',
          'Roof Leaks',
        ]}
      />

      <HowToSchema
        name="What to Do When You Have a Winter Roof Emergency"
        description="Step-by-step process for handling a roofing emergency in Maine winter"
        url={PAGE_URL}
        steps={[
          {
            name: 'Call for Emergency Service',
            text: 'Contact GraniteShield Roofing immediately. Provide your address, describe the issue (leak location, ice dam, storm damage), and note any safety concerns.',
          },
          {
            name: 'Initial Triage Assessment',
            text: 'Our team assesses severity over the phone and provides immediate guidance for interior protection (buckets, tarps) while we schedule response.',
          },
          {
            name: 'Response Time Estimate',
            text: 'We provide a realistic timeframe based on current conditions, call volume, and issue severity. Active leaks are prioritized over non-leaking damage.',
          },
          {
            name: 'On-Site Evaluation',
            text: 'Technician arrives, performs safety assessment, identifies the source of the problem, and explains findings and recommended next steps.',
          },
          {
            name: 'Emergency Stabilization',
            text: 'We perform immediate work to stop active damage: tarping, ice dam drainage channels, temporary flashing repairs, or emergency patches.',
          },
          {
            name: 'Permanent Repair Planning',
            text: 'If conditions allow, we complete permanent repairs on-site. Otherwise, we schedule follow-up work and provide a detailed estimate and timeline.',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/reports"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-4"
            >
              ← Back to Reports
            </Link>

            <div className="inline-flex items-center rounded-full bg-red-600/90 px-4 py-2 text-sm font-semibold mb-6">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Process Guide
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Maine Winter Roofing Response Times & Process
            </h1>

            <p className="text-xl text-slate-200 leading-relaxed">
              Understand what happens when you call for emergency roofing service
              during Maine winter: triage criteria, realistic response times, and
              the step-by-step process.
            </p>

            <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white mb-1">
                    Emergency Line
                  </div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                    className="text-2xl font-bold text-white hover:text-blue-200"
                  >
                    {BUSINESS_CONFIG.contact.phone}
                  </a>
                  <div className="text-sm text-slate-200 mt-2">
                    Available 7 days/week during winter season
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <LastUpdated
              date={DATE_MODIFIED}
              changeLog={[
                'Initial process documentation published',
                'Based on 7+ years of Maine winter emergency response',
              ]}
            />
          </div>

          <div className="mb-12">
            <ReportSummaryBox
              title="Typical Response Times"
              stats={[
                {
                  label: 'Active Interior Leak',
                  value: '2–6 hours',
                  description: 'Highest priority, same-day response',
                },
                {
                  label: 'Ice Dam (No Active Leak)',
                  value: '4–24 hours',
                  description: 'Urgent, scheduled within 1 day',
                },
                {
                  label: 'Storm Damage (Exposed)',
                  value: '3–12 hours',
                  description: 'Priority based on exposure severity',
                },
                {
                  label: 'Missing Shingles (No Leak)',
                  value: '1–3 days',
                  description: 'Non-emergency, regular scheduling',
                },
                {
                  label: 'Gutter/Downspout Issues',
                  value: '2–5 days',
                  description: 'Assessed for urgency, typically non-emergency',
                },
                {
                  label: 'Preventive Inspection',
                  value: '3–7 days',
                  description: 'Regular scheduling, not emergency queue',
                },
              ]}
              note="Response times vary based on weather conditions, call volume, and travel distance. During major storm events, all timeframes may extend. We provide updated estimates when you call."
            />
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Emergency Triage Criteria
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <p className="text-slate-700 leading-relaxed mb-4">
                We use a three-tier triage system to prioritize emergency calls
                during winter. This ensures homes with active damage get help
                first, while still scheduling timely service for urgent-but-stable
                situations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 not-prose mb-12">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    Critical
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Immediate Response (2–6 hours)
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Active interior water damage from roof leak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Ice dam causing visible interior leaking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Storm damage creating immediate exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Structural concern (sagging, collapse risk)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <div className="inline-flex items-center gap-2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <Clock className="h-4 w-4" />
                    Urgent
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Same/Next-Day (4–24 hours)
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Ice dam present but no active leak yet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Storm damage without immediate interior exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Flashing failure with imminent leak risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Significant shingle loss in storm-prone area</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <CheckCircle2 className="h-4 w-4" />
                    Standard
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Regular Scheduling (1–7 days)
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Missing shingles with no leak evidence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Gutter or downspout detachment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Preventive inspection requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Routine maintenance or minor cosmetic issues</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              What Happens When You Call
            </h2>

            <div className="space-y-6 not-prose mb-12">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Initial Call & Information Gathering
                  </h4>
                  <p className="text-slate-600 mb-3">
                    You'll speak with our team (or leave a detailed message if
                    after hours). We'll ask:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Your location and contact information
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Description of the issue (where, what, when it started)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Whether there's active interior damage
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Current weather conditions at your location
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Any safety concerns or access issues
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Triage & Immediate Guidance
                  </h4>
                  <p className="text-slate-600 mb-3">
                    We assess the severity and provide immediate next steps:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Triage classification (Critical, Urgent, or Standard)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Guidance for protecting interiors (buckets, tarps, photos)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Safety warnings (do NOT go on the roof yourself)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Realistic response time estimate based on current queue
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Scheduling & Confirmation
                  </h4>
                  <p className="text-slate-600 mb-3">
                    We schedule your service call and confirm:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Estimated arrival window (we'll call en route)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Technician name and contact number
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      What to expect during the on-site visit
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Any access requirements or preparation needed
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    On-Site Evaluation
                  </h4>
                  <p className="text-slate-600 mb-3">
                    Our technician arrives and performs a thorough assessment:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Safety check (roof condition, access, weather)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Identify source of leak or damage
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Assess extent of damage (interior and exterior)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Document with photos and notes
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Explain findings and options to you
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Emergency Stabilization
                  </h4>
                  <p className="text-slate-600 mb-3">
                    We perform immediate work to stop active damage:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Tarp exposed areas to prevent further water intrusion
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Cut drainage channels in ice dams to relieve backup
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Apply temporary flashing or sealant to leaking transitions
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Emergency patches for missing shingles or torn membrane
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Secure loose materials to prevent further storm damage
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Permanent Repair Planning
                  </h4>
                  <p className="text-slate-600 mb-3">
                    We develop a plan for complete, lasting repairs:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      If conditions allow, complete permanent repairs on-site
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Provide detailed written estimate for follow-up work
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Schedule permanent repair when weather permits
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Discuss prevention strategies (ice dam solutions, maintenance)
                    </li>
                    <li className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      Assist with insurance documentation if needed
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Winter-Specific Constraints
            </h2>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Understanding Maine Winter Limitations
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    We're transparent about what's possible in winter conditions
                    and what needs to wait for better weather. Here's what affects
                    our ability to complete certain work:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h5 className="font-semibold text-slate-900 mb-2 text-sm">
                    Can Be Done in Winter
                  </h5>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Emergency tarping and temporary protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Ice dam removal via low-pressure steaming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Metal roofing installation (with constraints)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Inspections and damage assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flashing repairs (temperature-dependent)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-900 mb-2 text-sm">
                    Weather-Dependent Work
                  </h5>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Asphalt shingle installation (requires 40°F+ and dry
                        conditions)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Full roof replacements (scheduled for mild-weather windows)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Adhesive-based repairs (need warmth for proper bonding)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Siding installation (material brittleness in extreme cold)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <MethodologyBlock
                title="How to Prepare for an Emergency Call"
                sections={[
                  {
                    heading: 'Before You Call',
                    content: [
                      'Note the location and severity of the leak or damage',
                      'Take photos if safely accessible',
                      'Move valuables away from affected areas',
                      'Place buckets or tarps to catch interior water',
                      'Do NOT attempt roof access yourself—fall risk is severe in winter',
                    ],
                  },
                  {
                    heading: 'Information We'll Need',
                    content: [
                      'Your address and best contact number',
                      'Description of the problem (leak, ice dam, storm damage)',
                      'When the issue started',
                      'Whether there's active interior water damage',
                      'Any access challenges (steep driveway, narrow street, tree coverage)',
                    ],
                  },
                  {
                    heading: 'While Waiting for Service',
                    content: [
                      'Continue monitoring for changes in leak severity',
                      'Document damage with photos for insurance',
                      'Clear a path for technician access if safe to do so',
                      'Keep pets secured during service visit',
                      'Have insurance information ready if you plan to file a claim',
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 mb-12">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-red-50 to-slate-50 border-red-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Need Emergency Roofing Service?
              </h3>
              <p className="text-slate-600 mb-6">
                GraniteShield responds to roofing emergencies throughout Southern
                Maine, 7 days/week during winter season. We'll give you an honest
                assessment, realistic timeframe, and transparent next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg" asChild>
                  <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Emergency Line
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services/emergency-repair">
                    Emergency Repair Service <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
