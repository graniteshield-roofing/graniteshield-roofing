'use client';

import Script from 'next/script';

/**
 * PeakVex Widget Component
 * 
 * Injects the PeakVex widget script EXACTLY as provided:
 * <script src="..." data-company="..."></script>
 * <div id="peakvex-quote"></div>
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_PEAKVEX_WIDGET_SRC: Widget script URL
 * - NEXT_PUBLIC_PEAKVEX_COMPANY_SLUG: Company slug for data-company attribute
 */
export function PeakVexWidget() {
  const widgetSrc = process.env.NEXT_PUBLIC_PEAKVEX_WIDGET_SRC;
  const companySlug = process.env.NEXT_PUBLIC_PEAKVEX_COMPANY_SLUG;

  // If widget config is missing, show fallback
  if (!widgetSrc || !companySlug) {
    return (
      <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-lg font-semibold text-slate-900 mb-2">
          Widget Configuration Required
        </p>
        <p className="text-sm text-slate-600 mb-4">
          To enable instant quotes, please configure the PeakVex widget environment variables.
        </p>
        <p className="text-xs text-slate-500">
          Required: <code className="bg-slate-200 px-2 py-1 rounded">NEXT_PUBLIC_PEAKVEX_WIDGET_SRC</code> and{' '}
          <code className="bg-slate-200 px-2 py-1 rounded">NEXT_PUBLIC_PEAKVEX_COMPANY_SLUG</code>
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 
        IMPORTANT: This script tag matches EXACTLY what was provided:
        - src attribute: widget script URL
        - data-company attribute: company slug
        No modifications to the markup structure.
      */}
      <Script
        src={widgetSrc}
        data-company={companySlug}
        strategy="afterInteractive"
      />
      <div id="peakvex-quote"></div>
    </>
  );
}
