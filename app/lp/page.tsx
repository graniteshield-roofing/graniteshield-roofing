'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Star,
  Clock,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BUSINESS_CONFIG } from '@/lib/business-config';

// ✅ Formspree ID Configured
const FORMSPREE_ID = "xykgljyv";

type Step = 1 | 2 | 3;

type FormData = {
  projectType: string;
  timeframe: string;
  zip: string;
  name: string;
  phone: string;
  notes: string;
  smsConsent: boolean;
};

export default function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    timeframe: '',
    zip: '',
    name: '',
    phone: '',
    notes: '',
    smsConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = useMemo(
    () => [
      {
        value: 'standing-seam',
        label: 'Standing Seam Metal Roofing',
        description: 'Lifetime metal roof installation',
      },
      {
        value: 'replacement',
        label: 'Complete Roof Replacement',
        description: 'Full tear-off and new installation',
      },
      {
        value: 'repair',
        label: 'Roof Repair',
        description: 'Fix leaks or damage',
      },
      {
        value: 'vinyl-siding',
        label: 'Vinyl Siding Installation',
        description: 'Premium CertainTeed & Mastic options',
      },
      {
        value: 'metal-siding',
        label: 'Metal Siding Installation',
        description: 'Steel & aluminum systems',
      },
      {
        value: 'windows',
        label: 'Window Replacement',
        description: 'Energy-efficient replacements',
      },
      {
        value: 'storm-damage',
        label: 'Storm Damage / Insurance',
        description: 'Help documenting + repair plan',
      },
      {
        value: 'inspection',
        label: 'Inspection & Assessment',
        description: 'Professional evaluation',
      },
      {
        value: 'emergency',
        label: 'Emergency Service',
        description: 'Urgent repair needed',
      },
    ],
    []
  );

  const timeframes = useMemo(
    () => [
      {
        value: 'immediate',
        label: 'ASAP (Leak / Urgent)',
        description: 'Today / next available',
      },
      {
        value: '1-2weeks',
        label: '1–2 Weeks',
        description: 'Soon but not urgent',
      },
      {
        value: 'this-month',
        label: 'This Month',
        description: 'Planning this month',
      },
      {
        value: '1-3months',
        label: '1–3 Months',
        description: 'Future project',
      },
      {
        value: 'exploring',
        label: 'Just Exploring',
        description: 'Gathering options',
      },
    ],
    []
  );

  useEffect(() => {
    const service = searchParams.get('service') || searchParams.get('project');
    if (!service) return;

    const map: Record<string, string> = {
      'standing-seam-metal-roofing': 'standing-seam',
      'standing-seam': 'standing-seam',
      'metal-roofing': 'standing-seam',
      'roof-replacement': 'replacement',
      replacement: 'replacement',
      'roof-repair': 'repair',
      repair: 'repair',
      'vinyl-siding': 'vinyl-siding',
      'metal-siding': 'metal-siding',
      windows: 'windows',
      'storm-damage': 'storm-damage',
      insurance: 'storm-damage',
      inspection: 'inspection',
      emergency: 'emergency',
    };

    const mapped = map[service];
    if (mapped) {
      setFormData((prev) => ({ ...prev, projectType: mapped }));
    }
  }, [searchParams]);

  const canContinueStep1 = !!formData.projectType;
  const canContinueStep2 = !!formData.timeframe;

  const canSubmit =
    formData.name.trim().length > 1 &&
    formData.phone.trim().length >= 7 &&
    formData.zip.trim().length >= 4;

  const handleNext = () => {
    if (step === 1 && canContinueStep1) setStep(2);
    else if (step === 2 && canContinueStep2) setStep(3);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Facebook Pixel (if present)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'GraniteShield LP',
        content_category: 'Roofing Services',
        project_type: formData.projectType,
        timeframe: formData.timeframe,
        zip: formData.zip,
      });
    }

    // Google tag (if present)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: 'GraniteShield LP Form',
        project_type: formData.projectType,
        timeframe: formData.timeframe,
        zip: formData.zip,
      });
    }

    // ✅ FIXED: Send to Formspree
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit form');

      router.push('/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      alert(
        'There was a problem sending your request. Please call us directly at ' +
          BUSINESS_CONFIG.contact.phone
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="font-bold text-slate-900">GraniteShield</div>
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
            className="text-sm font-semibold text-slate-900 hover:text-slate-700 inline-flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            {BUSINESS_CONFIG.contact.phone}
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Get Your Free Exterior Assessment
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Owner-operated roofing, siding & exterior work across Southern Maine
            — built for Maine weather, with clean installs and real
            accountability.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 items-center justify-center text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />{' '}
              <span className="font-semibold">5.0</span> (50+ reviews)
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" /> 24–48 hour scheduling
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" /> Licensed &
              Insured
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardContent className="p-6 sm:p-8">
            {/* Progress */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((s, idx) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        step >= (s as Step)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      } font-semibold text-sm`}
                    >
                      {s}
                    </div>
                    {idx < 2 && (
                      <div
                        className={`w-12 h-1 ${
                          step > (s as Step) ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      What do you need help with?
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Quick tap — no long form.
                    </p>

                    <RadioGroup
                      value={formData.projectType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, projectType: value })
                      }
                      className="space-y-3"
                    >
                      {projectTypes.map((type) => (
                        <div
                          key={type.value}
                          className="flex items-start space-x-3 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
                        >
                          <RadioGroupItem
                            value={type.value}
                            id={type.value}
                            className="mt-1"
                          />
                          <Label
                            htmlFor={type.value}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="font-semibold text-slate-900">
                              {type.label}
                            </div>
                            <div className="text-sm text-slate-600">
                              {type.description}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!canContinueStep1}
                    className="w-full"
                    size="lg"
                  >
                    Continue → See Availability{' '}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>24–48 hour scheduling • $0 assessment fee</span>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      How soon?
                    </h2>
                    <p className="text-slate-600 mb-6">
                      This helps us prioritize your request.
                    </p>

                    <RadioGroup
                      value={formData.timeframe}
                      onValueChange={(value) =>
                        setFormData({ ...formData, timeframe: value })
                      }
                      className="space-y-3"
                    >
                      {timeframes.map((t) => (
                        <div
                          key={t.value}
                          className="flex items-start space-x-3 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
                        >
                          <RadioGroupItem
                            value={t.value}
                            id={t.value}
                            className="mt-1"
                          />
                          <Label
                            htmlFor={t.value}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="font-semibold text-slate-900">
                              {t.label}
                            </div>
                            <div className="text-sm text-slate-600">
                              {t.description}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canContinueStep2}
                      className="flex-1"
                      size="lg"
                    >
                      Continue <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>24–48 hour scheduling • $0 assessment fee</span>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Where should we send your estimate?
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Name + phone + zip. That’s it.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Justin"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="(207) 530-8362"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="zip">Zip Code *</Label>
                        <Input
                          id="zip"
                          inputMode="numeric"
                          value={formData.zip}
                          onChange={(e) =>
                            setFormData({ ...formData, zip: e.target.value })
                          }
                          placeholder="04074"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes">
                          Optional: What's going on?
                        </Label>
                        <Input
                          id="notes"
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                          placeholder="Leak near chimney / replacing in spring / etc."
                        />
                      </div>

                      {/* A2P 10DLC Compliance: SMS Consent Checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.smsConsent}
                          onChange={(e) =>
                            setFormData({ ...formData, smsConsent: e.target.checked })
                          }
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          I agree to receive SMS updates from GraniteShield Roofing LLC related to my
                          estimate, appointments, and service notifications.
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" /> Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      size="lg"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Get Free Assessment'}
                      {!isSubmitting && (
                        <CheckCircle2 className="ml-2 h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  {/* A2P 10DLC Compliance: Disclosure Text */}
                  <p className="text-xs text-center text-slate-500 leading-relaxed">
                    By submitting this form, you agree to receive SMS messages from GraniteShield
                    Roofing LLC related to your quote, appointments, and service updates. Message
                    frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP
                    for assistance. View our{' '}
                    <Link href="/privacy-policy" className="underline hover:text-slate-700">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms-of-service" className="underline hover:text-slate-700">
                      Terms of Service
                    </Link>
                    .
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>24–48 hour scheduling • $0 assessment fee</span>
                  </div>
                </div>
              )}
            </form>

            {/* Call option */}
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>Prefer to call?</span>
                <a
                  href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 sm:hidden">
        <div className="grid grid-cols-2">
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
            className="py-4 text-center font-semibold text-slate-900 flex items-center justify-center gap-2"
          >
            <Phone className="h-5 w-5" /> Call Now
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="py-4 text-center font-semibold bg-amber-400 text-slate-900"
          >
            Free Estimate
          </button>
        </div>
      </div>

      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} GraniteShield Roofing
      </footer>
    </div>
  );
}
