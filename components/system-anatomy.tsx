'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { MEDIA, getResponsiveSizes } from '@/lib/media';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SystemLayer {
  id: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  microcopy: string;
  details: string[];
}

const systemLayers: SystemLayer[] = [
  {
    id: 'underlayment',
    image: MEDIA.systems.integrity.underlayment,
    title: 'Underlayment',
    microcopy: 'Moisture Defense. Locked.',
    details: [
      'Macro close-up reveals microscopic woven fiber structure of synthetic underlayment',
      'Synthetic barrier seals deck against Maine precipitation',
      'High-temperature tolerance prevents thermal breakdown',
    ],
  },
  {
    id: 'flashing',
    image: MEDIA.systems.integrity.flashing,
    title: 'Flashing',
    microcopy: 'Water Management. Precision.',
    details: [
      'Metal flashing at every penetration and transition point',
      'Overlapping technique sheds water away from vulnerable areas',
    ],
  },
  {
    id: 'ventilation',
    image: MEDIA.systems.integrity.ventilation,
    title: 'Ventilation',
    microcopy: 'Airflow. Balanced.',
    details: [
      'Ridge and soffit vents regulate attic temperature and humidity',
      'Prevents ice dam formation during freeze-thaw cycles',
    ],
  },
];

export function SystemAnatomy() {
  const [openLayer, setOpenLayer] = useState<string | null>(null);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            System Anatomy
          </h2>
          <p className="mt-3 text-slate-600 text-lg">
            The layers that protect your home
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {systemLayers.map((layer) => (
            <div
              key={layer.id}
              className="group relative overflow-hidden rounded-2xl bg-slate-50 shadow-lg transition-shadow hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={layer.image.src}
                  alt={layer.image.alt}
                  width={layer.image.width}
                  height={layer.image.height}
                  sizes={getResponsiveSizes('third')}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-semibold text-white">
                    {layer.title}
                  </h3>
                </div>
              </div>

              {/* Info Button */}
              <Dialog open={openLayer === layer.id} onOpenChange={(open) => setOpenLayer(open ? layer.id : null)}>
                <DialogTrigger asChild>
                  <button
                    className={cn(
                      'absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full',
                      'bg-white/90 backdrop-blur-sm shadow-lg transition-all',
                      'hover:bg-white hover:scale-110',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400'
                    )}
                    aria-label={`Learn more about ${layer.title}`}
                  >
                    <Info className="h-4 w-4 text-slate-700" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                      {layer.title}
                    </DialogTitle>
                    <DialogDescription className="text-base font-medium text-slate-900 pt-2">
                      {layer.microcopy}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 pt-4">
                    {layer.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                        <p className="text-sm text-slate-600 leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        {/* Mobile hint */}
        <div className="mt-8 text-center md:hidden">
          <p className="text-sm text-slate-500">
            Tap <Info className="inline h-3.5 w-3.5" /> to learn more
          </p>
        </div>
      </div>
    </section>
  );
}
