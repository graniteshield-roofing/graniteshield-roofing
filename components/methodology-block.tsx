import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface MethodologyBlockProps {
  title?: string;
  sections: Array<{
    heading: string;
    content: string | string[];
  }>;
}

export function MethodologyBlock({
  title = 'Methodology',
  sections
}: MethodologyBlockProps) {
  return (
    <Card className="bg-slate-50 border-slate-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-slate-700" />
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>

        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-slate-900 mb-2">
                {section.heading}
              </h4>

              {Array.isArray(section.content) ? (
                <ul className="space-y-1 text-slate-700 text-sm">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="pl-4 relative before:content-['•'] before:absolute before:left-0">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-700 text-sm leading-relaxed">
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
