import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type RelatedService = {
  title: string;
  description: string;
  href: string;
};

export function RelatedServices({
  items,
  title = 'Related Services',
}: {
  items: RelatedService[];
  title?: string;
}) {
  if (!items?.length) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-600 mt-2">
              Keep exploring — these services are commonly requested together in
              Southern Maine.
            </p>
          </div>

          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((s) => (
            <Card key={s.href} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm mb-5">{s.description}</p>
                <div className="mt-auto">
                  <Button className="w-full" asChild>
                    <Link href={s.href}>
                      View Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sm:hidden mt-6">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
