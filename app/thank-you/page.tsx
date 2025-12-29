import Link from "next/link";
import { CheckCircle2, Phone, Clock, Star, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_CONFIG } from "@/lib/business-config";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Thank You for Contacting Us!
            </h1>

            <p className="text-xl text-slate-600 mb-8">
              Your free inspection request has been received. We&apos;ll contact you within 24 hours to schedule your appointment.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                What Happens Next?
              </h2>

              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">We&apos;ll Call You</h3>
                    <p className="text-slate-600 text-sm">
                      A GraniteShield team member will reach out within 24 hours to schedule your free inspection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Free Inspection</h3>
                    <p className="text-slate-600 text-sm">
                      We&apos;ll conduct a comprehensive 25-point inspection with photo documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Detailed Estimate</h3>
                    <p className="text-slate-600 text-sm">
                      Receive a transparent, itemized estimate with multiple options and warranty details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-900 mb-1">24-Hour Response</div>
                <div className="text-sm text-slate-600">Fast scheduling</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-900 mb-1">5.0 Rating</div>
                <div className="text-sm text-slate-600">Verified reviews</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-900 mb-1">Owner-Operated</div>
                <div className="text-sm text-slate-600">Quality Work</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900 text-white p-6 rounded-lg">
                <p className="text-sm mb-3">Need immediate assistance?</p>
                <a
                  href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                  className="text-2xl font-bold hover:text-blue-400 transition-colors inline-flex items-center"
                >
                  <Phone className="h-6 w-6 mr-2" />
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </div>

              <div className="text-sm text-slate-600">
                <p className="mb-2">You can also reach us at:</p>
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  Return to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Check out our reviews on{" "}
            <a
              href={BUSINESS_CONFIG.reputation.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Google
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
