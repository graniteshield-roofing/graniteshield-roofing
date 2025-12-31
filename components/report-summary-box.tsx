import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-sm font-medium text-slate-600 mb-1">
                {stat.label}
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              {stat.description && (
                <div className="text-xs text-slate-500">{stat.description}</div>
              )}
            </div>
          ))}
        </div>

        {note && (
          <p className="mt-4 text-sm text-slate-600 italic border-l-4 border-blue-400 pl-4 py-2">
            {note}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
