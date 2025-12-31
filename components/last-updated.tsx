import { Clock } from 'lucide-react';

interface LastUpdatedProps {
  date: string;
  changeLog?: string[];
}

export function LastUpdated({ date, changeLog }: LastUpdatedProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <Clock className="h-4 w-4 text-slate-500" />
        <span className="font-medium">Last updated:</span>
        <time dateTime={date} className="text-slate-900 font-semibold">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      {changeLog && changeLog.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="text-xs font-medium text-slate-600 mb-2">
            Recent Updates:
          </div>
          <ul className="space-y-1">
            {changeLog.map((change, idx) => (
              <li key={idx} className="text-xs text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-0">
                {change}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
