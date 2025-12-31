import Link from 'next/link';
import { User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ContentAuthorProps {
  authorName?: string;
  authorTitle?: string;
  reviewDate?: string;
  showReviewedBy?: boolean;
}

/**
 * E-E-A-T Authorship Component
 * Displays visible authorship attribution for content pages
 * Supports both "Written by" and "Reviewed by" contexts
 */
export function ContentAuthor({
  authorName = 'Justin Laflamme',
  authorTitle = 'Founder & Owner, GraniteShield Roofing',
  reviewDate,
  showReviewedBy = false,
}: ContentAuthorProps) {
  const actionText = showReviewedBy ? 'Reviewed by' : 'Written by';

  return (
    <Card className="border-blue-100 bg-blue-50/30">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-slate-700" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">
              {actionText}
            </div>
            <div className="text-lg font-bold text-slate-900">
              <Link
                href="/about"
                className="hover:text-blue-700 transition-colors"
              >
                {authorName}
              </Link>
            </div>
            <div className="text-sm text-slate-600 mt-1">{authorTitle}</div>
            {reviewDate && (
              <div className="text-xs text-slate-500 mt-2">
                Last updated: {reviewDate}
              </div>
            )}
            <p className="text-sm text-slate-700 mt-3 leading-relaxed">
              {authorName} has over a decade of hands-on roofing experience in
              Southern Maine, specializing in metal roofing, ice dam prevention,
              and climate-specific installations. All content reflects
              real-world field experience, not generic roofing advice.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ExpertiseBoxProps {
  title?: string;
  points?: string[];
}

/**
 * Maine Climate Expertise Box
 * Highlights local expertise and climate-specific knowledge
 */
export function MaineExpertiseBox({
  title = 'Maine Climate Expertise',
  points = [
    'Heavy snow load engineering (50+ PSF)',
    'Ice dam prevention & ventilation systems',
    'Coastal salt air & wind resistance (up to 130 MPH)',
    'Freeze-thaw cycle roof system design',
  ],
}: ExpertiseBoxProps) {
  return (
    <Card className="border-slate-200 bg-slate-50">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">{title}</h3>
        <ul className="space-y-2">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          We engineer every roof for Southern Maine conditions — not generic
          roofing standards.
        </p>
      </CardContent>
    </Card>
  );
}
