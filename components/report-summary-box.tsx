import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface SummaryStat {
  label: string;
  value: string;
  description?: string;
}

interface ReportSummaryBoxProps {
  title: string;
  stats: SummaryStat[];
  note?: string;
}

export function ReportSummaryBox({ title, stats, note }: ReportSummaryBoxProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200 shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {stat.value}
              </div>
              {stat.description && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {note && (
          <div className="mt-6 pt-4 border-t border-blue-100 text-sm text-slate-500 italic">
            {note}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
