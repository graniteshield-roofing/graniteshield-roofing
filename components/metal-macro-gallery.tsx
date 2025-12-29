'use client';

import Image from 'next/image';
import { MEDIA, getResponsiveSizes } from '@/lib/media';

const macros = [
  {
    id: 'seam',
    ...MEDIA.services.metal.macros.seam,
    label: 'Seam Lock Geometry',
  },
  {
    id: 'panel',
    ...MEDIA.services.metal.macros.panel,
    label: 'Premium Finish',
  },
  {
    id: 'water',
    ...MEDIA.services.metal.macros.water,
    label: 'Water Beading',
  },
];

export function MetalMacroGallery() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            Craftsmanship, Up Close
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {macros.map((macro) => (
            <div
              key={macro.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={macro.src}
                  alt={macro.alt}
                  width={macro.width}
                  height={macro.height}
                  sizes={getResponsiveSizes('third')}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-slate-600">{macro.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
