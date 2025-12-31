import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle2 } from 'lucide-react';

interface MethodologyBlockProps {
  title?: string;
  sections: Array<{
    heading: string;
    content: string | string[];
  }>;
}

export function MethodologyBlock({
  title = 'Data Collection Methodology',
  sections
}: MethodologyBlockProps) {
  return (
    <Card className="bg-slate-50 border-slate-200 mt-12">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
          <FileText className="h-5 w-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
            {title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {section.heading}
              </h4>
              {Array.isArray(section.content) ? (
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
