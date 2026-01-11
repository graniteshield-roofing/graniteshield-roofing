'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MEDIA, getResponsiveSizes } from '@/lib/media';
import { cn } from '@/lib/utils';

type ProjectPhase = 'before' | 'during' | 'after';

const phases: { key: ProjectPhase; label: string; caption: string }[] = [
  {
    key: 'during',
    label: 'During',
    caption: 'Precision installation with owner oversight',
  },
  {
    key: 'after',
    label: 'After',
    caption: 'Clean finish engineered for decades',
  },
];

export function FeaturedProject() {
  const [activePhase, setActivePhase] = useState<ProjectPhase>('during');

  const images = {
    before: MEDIA.projects.featured1.before,
    during: MEDIA.projects.featured1.during,
    after: MEDIA.projects.featured1.after,
  };

  return (
    <section className="bg-[#FAFAFA] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            During. After.
          </h2>
        </div>

        {/* Segmented Control */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-slate-200/60 p-1">
            {phases.map((phase) => (
              <button
                key={phase.key}
                onClick={() => setActivePhase(phase.key)}
                className={cn(
                  'rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1',
                  activePhase === phase.key
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                )}
                aria-pressed={activePhase === phase.key}
              >
                {phase.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Container */}
        <div className="relative mx-auto max-w-5xl">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">
            {phases.map((phase) => (
              <div
                key={phase.key}
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  activePhase === phase.key ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                style={{
                  // Respect prefers-reduced-motion
                  transitionDuration:
                    typeof window !== 'undefined' &&
                    window.matchMedia('(prefers-reduced-motion: reduce)').matches
                      ? '0ms'
                      : '500ms',
                }}
              >
                <Image
                  src={images[phase.key].src}
                  alt={images[phase.key].alt}
                  width={images[phase.key].width}
                  height={images[phase.key].height}
                  sizes={getResponsiveSizes('full')}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="mt-4 text-center">
            {phases.map((phase) => (
              <p
                key={phase.key}
                className={cn(
                  'text-sm text-slate-600 transition-opacity duration-300',
                  activePhase === phase.key ? 'opacity-100' : 'opacity-0 absolute'
                )}
              >
                {phase.caption}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
