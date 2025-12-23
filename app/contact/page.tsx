// app/contact/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BUSINESS_CONFIG, getFormattedAddress } from '@/lib/business-config';
import { BreadcrumbSchema } from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Contact ${BUSINESS_CONFIG.name} | Southern Maine`,
  description:
    'Contact GraniteShield Roofing & Exteriors for roof replacement, roof repair, standing seam metal roofing, siding, windows, inspections, and emergency repairs in Southern Maine. Call for fast scheduling and clear next steps.',
  alternates: { canonical: 'https://graniteshieldroofing.com/contact' },
};

export default function ContactPage() {
  const baseUrl = 'https://graniteshieldroofing.com';

  const hours = BUSINESS_CONFIG.hours;

  const hoursRows: Array<{ day: string; value: string }> = [
    { day: 'Monday', value: hours.monday },
    { day: 'Tuesday', value: hours.tuesday },
    { day: 'Wednesday', value: hours.wednesday },
    { day: 'Thursday', value: hours.thursday },
    { day: 'Friday', value: hours.friday },
    { day: 'Saturday', value: hours.saturday },
    { day: 'Sunday', value: hours.sunday },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Contact', url: `${baseUrl}/contact` },
        ]}
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Fast Scheduling • Owner-Operated
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Contact {BUSINESS_CONFIG.name}
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed">
              The fastest way to get on the schedule is a phone call. We’ll
              confirm your town, understand what’s going on, and give you clear
              next steps.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="cta" asChild>
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  Call Now <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
                asChild
              >
                <Link href="/lp">Request Free Estimate</Link>
              </Button>
            </div>

            <p className="mt-6 text-slate-300 flex items-start gap-2">
              <MapPin className="h-5 w-5 text-slate-300 mt-0.5 flex-shrink-0" />
              <span>{getFormattedAddress()}</span>
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Primary contact card */}
            <Card className="lg:col-span-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Get in Touch
                </h2>
                <p className="mt-2 text-slate-600">
                  Calls close faster and help us respond accurately. If you
                  prefer, you can email us or use the estimate form.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-border p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-slate-800" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Phone</div>
                        <a
                          href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                          className="text-lg font-bold text-slate-900 hover:underline"
                        >
                          {BUSINESS_CONFIG.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button variant="cta" asChild className="w-full">
                        <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-slate-800" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-slate-600">Email</div>
                        <a
                          href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                          className="text-lg font-bold text-slate-900 hover:underline break-all"
                        >
                          {BUSINESS_CONFIG.contact.email}
                        </a>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-600">
                      Best for non-urgent questions and documents.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900">
                        Prefer an online request?
                      </h3>
                      <p className="mt-2 text-slate-600">
                        Use our quick estimate form — we’ll follow up as soon as
                        possible.
                      </p>

                      <div className="mt-5 flex flex-col sm:flex-row gap-3">
                        <Button size="lg" variant="cta" asChild>
                          <Link href="/lp">
                            Request Free Estimate{' '}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>

                        <Button size="lg" variant="outline" asChild>
                          <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                            <Phone className="mr-2 h-5 w-5" />
                            Call Now
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Hours / service-area quick info */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-slate-800" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Business Hours
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {hoursRows.map((r) => (
                      <div
                        key={r.day}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="font-semibold text-slate-700">
                          {r.day}
                        </span>
                        <span className="text-slate-600">{r.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    Emergency situations vary — call and we’ll advise on next
                    steps.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-slate-800" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Service Area
                    </h2>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    {getFormattedAddress()}
                  </p>

                  <div className="mt-5">
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/areas">View Service Areas</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
