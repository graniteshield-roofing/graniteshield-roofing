import { Clock, History } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LastUpdatedProps {
  date: string;
  changeLog?: string[];
}

export function LastUpdated({ date, changeLog }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 w-fit">
      <Clock className="h-4 w-4 text-slate-500" />
      <span className="font-medium">Data last verified:</span>
      <time dateTime={date} className="text-slate-900 font-semibold">
        {formattedDate}
      </time>
      
      {changeLog && changeLog.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <History className="h-4 w-4 text-blue-600 ml-1 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="font-semibold mb-2">Update History:</p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                {changeLog.map((log, i) => (
                  <li key={i}>{log}</li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
