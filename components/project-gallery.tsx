'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectImage {
  name: string;
  alt: string;
  category: string;
  webp: string;
  jpg: string;
}

// SEO-optimized project images with proper alt text
const projectImages: ProjectImage[] = [
  {
    name: "maine-home-shingle-roof-drone-view",
    alt: "Aerial drone view of Maine home with architectural shingle roof - GraniteShield Roofing inspection",
    category: "drone-inspection",
    webp: "/images/projects/hero/maine-home-shingle-roof-drone-view.webp",
    jpg: "/images/projects/hero/maine-home-shingle-roof-drone-view.jpg"
  },
  {
    name: "maine-residential-roof-aerial",
    alt: "Aerial view of residential roof in Southern Maine - professional drone inspection",
    category: "drone-inspection",
    webp: "/images/projects/hero/maine-residential-roof-aerial.webp",
    jpg: "/images/projects/hero/maine-residential-roof-aerial.jpg"
  },
  {
    name: "maine-home-roof-skylights-aerial",
    alt: "Drone aerial view of Maine home roof with skylights - fall foliage background",
    category: "completed-project",
    webp: "/images/projects/hero/maine-home-roof-skylights-aerial.webp",
    jpg: "/images/projects/hero/maine-home-roof-skylights-aerial.jpg"
  },
  {
    name: "shingle-roof-chimney-maine",
    alt: "Architectural shingle roof with brick chimney in Maine - professional installation",
    category: "shingle-roofing",
    webp: "/images/projects/shingle/shingle-roof-chimney-maine.webp",
    jpg: "/images/projects/shingle/shingle-roof-chimney-maine.jpg"
  },
  {
    name: "gray-architectural-shingles-skylights",
    alt: "Gray architectural shingle roof with skylights - Maine roof replacement",
    category: "shingle-roofing",
    webp: "/images/projects/shingle/gray-architectural-shingles-skylights.webp",
    jpg: "/images/projects/shingle/gray-architectural-shingles-skylights.jpg"
  },
  {
    name: "chimney-flashing-shingle-roof",
    alt: "Brick chimney with professional flashing on shingle roof - Maine roofing",
    category: "chimney-flashing",
    webp: "/images/projects/chimney/chimney-flashing-shingle-roof.webp",
    jpg: "/images/projects/chimney/chimney-flashing-shingle-roof.jpg"
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'drone-inspection', label: 'Drone Inspections' },
  { id: 'shingle-roofing', label: 'Shingle Roofing' },
  { id: 'completed-project', label: 'Completed Projects' },
  { id: 'chimney-flashing', label: 'Chimney & Flashing' },
];

export function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  const filteredImages = activeCategory === 'all' 
    ? projectImages 
    : projectImages.filter(img => img.category === activeCategory);

  return (
    <section className="py-16 bg-slate-50" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="gallery-heading" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Roofing Projects in Maine
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our portfolio of completed roofing projects across Southern Maine. 
            From shingle replacements to metal roofing installations, see the quality craftsmanship 
            that sets GraniteShield apart.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <article 
              key={image.name}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <picture>
                <source srcSet={image.webp} type="image/webp" />
                <Image
                  src={image.jpg}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full aspect-[4/3]">
              <picture>
                <source srcSet={selectedImage.webp} type="image/webp" />
                <Image
                  src={selectedImage.jpg}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </picture>
              <button 
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="absolute bottom-4 left-4 right-4 text-white text-center bg-black/50 rounded-lg p-3">
                {selectedImage.alt}
              </p>
            </div>
          </div>
        )}

        {/* Schema.org ImageGallery markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              "name": "GraniteShield Roofing Projects Gallery",
              "description": "Portfolio of completed roofing projects in Southern Maine by GraniteShield Roofing & Exteriors",
              "image": projectImages.map(img => ({
                "@type": "ImageObject",
                "name": img.name,
                "description": img.alt,
                "contentUrl": `https://graniteshieldroofing.com${img.jpg}`,
                "thumbnailUrl": `https://graniteshieldroofing.com${img.webp}`,
              }))
            })
          }}
        />
      </div>
    </section>
  );
}

export default ProjectGallery;
