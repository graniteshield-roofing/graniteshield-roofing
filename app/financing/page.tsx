import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, DollarSign, CreditCard, FileText, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Roof Financing in Maine | Payment Plans for Your Project | ${BUSINESS_CONFIG.name}`,
  description:
    'Flexible financing for roof replacement, metal roofs, and major repairs in Maine. Monthly payment options from $150-$650. Quick application, transparent terms, no pressure.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/financing',
  },
};

export default function FinancingPage() {
  const paymentExamples = [
    {
      projectSize: '$12,000 - $18,000',
      projectType: 'Typical Asphalt Shingle Roof',
      example: 'As low as $150 - $280/month',
      term: '60-84 month terms available',
    },
    {
      projectSize: '$24,000 - $35,000',
      projectType: 'Standing Seam Metal Roof',
      example: 'As low as $280 - $520/month',
      term: '84-120 month terms available',
    },
    {
      projectSize: '$30,000 - $45,000',
      projectType: 'Metal Roof + Siding Project',
      example: 'As low as $350 - $650/month',
      term: '84-144 month terms available',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Quick Conversation',
      description: 'After your roof inspection and estimate, we'll explain financing options if you're interested. No obligation to apply.',
      icon: Phone,
    },
    {
      step: '2',
      title: 'Simple Application',
      description: 'Apply online or over the phone in 10-15 minutes. Basic info: name, address, income, social security number for credit check.',
      icon: FileText,
    },
    {
      step: '3',
      title: 'Fast Decision',
      description: 'Most applicants receive a decision within minutes. You'll see available terms, rates, and monthly payment options.',
      icon: CheckCircle2,
    },
    {
      step: '4',
      title: 'Review & Accept',
      description: 'No pressure. Review the terms, ask questions, and accept only if it makes sense for your budget. You can walk away anytime.',
      icon: FileText,
    },
    {
      step: '5',
      title: 'Schedule Your Project',
      description: 'Once approved and accepted, we schedule your roof installation. Financing pays us directly when work is complete.',
      icon: Calendar,
    },
  ];

  const benefits = [
    'No upfront payment required',
    'Competitive rates for qualified applicants',
    'Terms from 60 to 144 months',
    'Fixed monthly payments (no surprises)',
    'No prepayment penalties',
    'Quick online application',
    'Decision in minutes, not days',
    'Partner: Sunlight Financial (established lender)',
  ];

  const faqs = [
    {
      question: 'Can I really finance a new roof in Maine?',
      answer:
        'Yes. We partner with Sunlight Financial to offer payment plans for roof replacement, metal roofing, and major repairs. Financing is available for projects typically $5,000 and up.',
    },
    {
      question: 'What credit score do I need?',
      answer:
        'There's no published minimum, but applicants with credit scores of 640+ typically have the best approval odds and lowest rates. Fair credit may qualify for higher-rate options. We encourage you to apply - the credit check is a soft pull until you accept terms.',
    },
    {
      question: 'How much can I finance?',
      answer:
        'Financing amounts typically range from $5,000 to $100,000 depending on creditworthiness and income. Most residential roof projects in Maine fall in the $12,000-$45,000 range.',
    },
    {
      question: 'What are the interest rates?',
      answer:
        'Rates vary based on credit profile, loan term, and current market conditions. Qualified applicants may see rates from 6.99% to 15.99% APR. You'll see your specific rate during the application process before accepting.',
    },
    {
      question: 'Are there any fees?',
      answer:
        'No application fees. No prepayment penalties. Some loan programs may have origination fees, which are disclosed upfront in your loan terms before you accept.',
    },
    {
      question: 'How long does the application take?',
      answer:
        'The application itself takes 10-15 minutes. You'll typically receive a decision within minutes. If additional documentation is needed, it may take 1-2 business days.',
    },
    {
      question: 'Will applying hurt my credit score?',
      answer:
        'The initial application uses a soft credit pull, which does NOT affect your credit score. Only if you accept a loan offer and proceed does it become a hard inquiry.',
    },
    {
      question: 'Can I pay off the loan early without penalty?',
      answer:
        'Yes. There are no prepayment penalties. If you want to pay off your roof loan early, you can do so at any time and save on interest.',
    },
    {
      question: 'What if I'm denied?',
      answer:
        'If you don't qualify for financing, we can still discuss alternative payment options or phased project approaches. We're here to help you solve the roofing problem, not push a loan.',
    },
    {
      question: 'Do I need a down payment?',
      answer:
        'Not necessarily. Many financing programs allow 100% financing with no down payment. Some applicants choose to make a down payment to lower monthly costs, but it's not required.',
    },
    {
      question: 'When do payments start?',
      answer:
        'First payment is typically due 30-45 days after project completion, depending on the loan terms you select.',
    },
    {
      question: 'Can I finance if I already have a mortgage?',
      answer:
        'Yes. Roof financing is a separate personal loan, not a home equity loan or second mortgage. It doesn't affect your existing mortgage.',
    },
    {
      question: 'What information do I need to apply?',
      answer:
        'You'll need: full name, date of birth, address, social security number, annual income, and employment information. The process is similar to applying for a credit card.',
    },
    {
      question: 'Is financing available for roof repairs, or only replacements?',
      answer:
        'Financing is available for both repairs and replacements, though most lenders have a minimum project size (typically $5,000). Smaller repairs are usually paid directly.',
    },
    {
      question: 'Do you work with any other lenders besides Sunlight Financial?',
      answer:
        'Sunlight Financial is our primary partner, but we can discuss other options if needed. Our goal is to help you find a payment solution that works, not lock you into one lender.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Roof Financing',
          description:
            'Flexible financing options for roof replacement, metal roofing, and major repairs in Maine. Monthly payment plans, quick approval, transparent terms.',
          url: 'https://graniteshieldroofing.com/financing',
        }}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://graniteshieldroofing.com' },
          {
            name: 'Financing',
            url: 'https://graniteshieldroofing.com/financing',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-green-600/90 px-4 py-2 text-sm font-semibold">
              <CreditCard className="mr-2 h-4 w-4" />
              Flexible Payment Options Available
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Roof Financing in Maine
            </h1>

            <p className="mt-6 text-xl text-slate-200">
              Don't let upfront costs delay a roof your home needs. We offer flexible financing
              for roof replacement, metal roofs, and major repairs with monthly payments starting
              around $150-$280 for typical projects.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-14 px-8">
                <Link href="/lp/free-roof-estimate">
                  Get Estimate + Discuss Financing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 px-8 bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
              >
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call to Learn More
                </a>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <p className="text-sm text-slate-300">
                <strong className="text-white">Zero pressure.</strong> Financing is one option - not a requirement.
                We'll explain your choices and you decide what makes sense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Examples */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Example Monthly Payments
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Here's what typical Maine roofing projects might cost per month with financing.
            Your actual rate and payment depend on credit profile and chosen term.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {paymentExamples.map((example) => (
              <Card key={example.projectType} className="border-2 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <div className="text-sm font-semibold text-green-600 mb-2">
                    {example.projectSize}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {example.projectType}
                  </h3>
                  <div className="text-3xl font-extrabold text-blue-600 mb-2">
                    {example.example}
                  </div>
                  <p className="text-sm text-slate-600">{example.term}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg max-w-4xl mx-auto">
            <p className="text-sm text-slate-600">
              <strong>Important Disclaimer:</strong> These are illustrative examples only, not guaranteed rates or offers.
              Actual monthly payments depend on approved loan amount, interest rate (based on creditworthiness),
              and term length selected. Rates typically range from 6.99% to 15.99% APR for qualified applicants.
              Subject to credit approval.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why Finance Your Roof Project?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-lg bg-white border border-slate-200 p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-800">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 mb-6">
              Ready to discuss financing for your roof project?
            </p>
            <Button variant="cta" size="lg" asChild>
              <Link href="/lp/free-roof-estimate">
                Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            How Roof Financing Works
          </h2>

          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white text-xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                <div className="hidden md:block flex-shrink-0">
                  <step.icon className="h-10 w-10 text-slate-300" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Our Financing Partner: Sunlight Financial
                </h3>
                <p className="text-slate-700">
                  We partner with Sunlight Financial, an established lender specializing in home improvement financing.
                  They handle the application, approval, and loan servicing. We're here to answer roofing questions,
                  not to push loans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Financing Questions Answered
          </h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <Card key={f.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {f.question}
                  </h3>
                  <p className="text-slate-600">{f.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-6">
              Questions about financing your roofing project? Let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link href="/lp/free-roof-estimate">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
