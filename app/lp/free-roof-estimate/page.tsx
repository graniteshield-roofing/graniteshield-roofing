'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Shield,
  Star,
  Award,
  Clock,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BUSINESS_CONFIG } from '@/lib/business-config';

type Step = 1 | 2 | 3;

type FormData = {
  projectType: string;
  urgency: string;
  zip: string;
  name: string;
  phone: string;
  notes: string;
};

export default function FreeRoofEstimatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    urgency: '',
    zip: '',
    name: '',
    phone: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const service = searchParams.get('service') || searchParams.get('project');
    if (!service) return;

    const map: Record<string, string> = {
      'roof-replacement': 'roof-replacement',
      replacement: 'roof-replacement',
      'roof-repair': 'roof-repair',
      repair: 'roof-repair',
      'standing-seam-metal-roofing': 'metal-roofing',
      'standing-seam': 'metal-roofing',
      'metal-roofing': 'metal-roofing',
      siding: 'siding',
      windows: 'windows',
      'storm-damage': 'storm-damage',
      insurance: 'storm-damage',
    };

    const mapped = map[service];
    if (mapped) setFormData((p) => ({ ...p, projectType: mapped }));
  }, [searchParams]);

  const projectTypes = [
    { value: 'metal-roofing', label: 'Standing Seam Metal Roofing' },
    { value: 'roof-replacement', label: 'Roof Replacement' },
    { value: 'roof-repair', label: 'Roof Repair / Leak' },
    { value: 'siding', label: 'Siding' },
    { value: 'windows', label: 'Windows' },
    { value: 'storm-damage', label: 'Storm Damage / Insurance' },
  ];

  const urgencyOptions = [
    { value: 'asap', label: 'ASAP (Leak / Urgent)' },
    { value: '1-2-weeks', label: '1–2 Weeks' },
    { value: 'this-month', label: 'This Month' },
    { value: 'planning', label: 'Planning / Researching' },
  ];

  const canContinueStep1 = !!formData.projectType;
  const canContinueStep2 = !!formData.urgency;

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

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timeframe: formData.urgency,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit form');
      router.push('/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form. Please call us directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">
            GraniteShield Roofing
          </div>
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            {BUSINESS_CONFIG.contact.phone}
          </a>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Free Assessment + Fast Scheduling
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                Owner-operated roofing & exteriors across Southern Maine. Clean
                installs, tight detailing, and clear communication from start to
                finish.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                What you’ll get
              </h3>
              <div className="space-y-3">
                {[
                  'Free assessment + honest recommendations',
                  'Fast scheduling (most within 24–48 hours)',
                  'Owner oversight on every project',
                ].map((t) => (
                  <div key={t} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Card className="shadow-xl">
              <CardContent className="p-6 sm:p-8">
                {/* Progress Indicators */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((s, index) => (
                      <div key={s} className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            step >= s
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-600'
                          } font-semibold text-sm`}
                        >
                          {s}
                        </div>
                        {index < 2 && (
                          <div
                            className={`w-12 h-1 ${
                              step > s ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                          What do you need help with?
                        </h2>
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
                                className="flex-1 cursor-pointer font-semibold text-slate-900"
                              >
                                {type.label}
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
                        Continue <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                          How soon?
                        </h2>
                        <RadioGroup
                          value={formData.urgency}
                          onValueChange={(value) =>
                            setFormData({ ...formData, urgency: value })
                          }
                          className="space-y-3"
                        >
                          {urgencyOptions.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-start space-x-3 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                className="mt-1"
                              />
                              <Label
                                htmlFor={option.value}
                                className="flex-1 cursor-pointer font-semibold text-slate-900"
                              >
                                {option.label}
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
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNext}
                          disabled={!canContinueStep2}
                          className="flex-1"
                          size="lg"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Your Contact Info
                      </h2>
                      <div className="space-y-4">
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Full Name"
                          required
                        />
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="Phone Number"
                          required
                        />
                        <Input
                          value={formData.zip}
                          onChange={(e) =>
                            setFormData({ ...formData, zip: e.target.value })
                          }
                          placeholder="Zip Code"
                          required
                        />
                        <Input
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                          placeholder="Notes (Optional)"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          onClick={handleBack}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1"
                          size="lg"
                          disabled={!canSubmit || isSubmitting}
                        >
                          {isSubmitting ? 'Sending...' : 'Get Free Assessment'}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
