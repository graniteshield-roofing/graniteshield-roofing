'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImage {
  src: string;
  alt: string;
  title: string;
  category: string;
  featured: boolean;
  width: number;
  height: number;
}

// SEO-optimized project images - ACTUAL COMPLETED WORK
const projectImages: ProjectImage[] = [
  // SHINGLE COMPLETED WORK
  {
    src: "/images/projects/gallery/shingle-roof-completed-maine-01.webp",
    alt: "Completed architectural shingle roof replacement in Maine - aerial drone view showing gray shingles with brick chimney",
    title: "Shingle Roof Replacement - Maine",
    category: "shingle",
    featured: true,
    width: 1920,
    height: 1080
  },
  {
    src: "/images/projects/gallery/shingle-roof-completed-maine-02.webp",
    alt: "Professional shingle roof installation by GraniteShield Roofing - aerial view of completed gray architectural shingles",
    title: "Architectural Shingle Installation - Maine",
    category: "shingle",
    featured: true,
    width: 1920,
    height: 1080
  },
  {
    src: "/images/projects/gallery/shingle-roof-completed-maine-03.webp",
    alt: "New shingle roof with professional ridge cap installation - drone photography of completed roofing project",
    title: "Shingle Roof with Ridge Cap - Maine",
    category: "shingle",
    featured: false,
    width: 1920,
    height: 1080
  },
  {
    src: "/images/projects/gallery/shingle-roof-in-progress-maine.webp",
    alt: "GraniteShield roofing crew installing new shingle roof - professional roofers at work in Southern Maine",
    title: "Roof Installation In Progress",
    category: "shingle",
    featured: false,
    width: 1920,
    height: 1080
  },
  
  // STANDING SEAM METAL COMPLETED WORK
  {
    src: "/images/projects/gallery/standing-seam-metal-roof-blue-maine-01.webp",
    alt: "Blue standing seam metal roof installation in Maine - aerial drone view of completed metal roofing project",
    title: "Standing Seam Metal Roof - Blue",
    category: "metal",
    featured: true,
    width: 1920,
    height: 1440
  },
  {
    src: "/images/projects/gallery/standing-seam-metal-roof-barn-sunset-maine.webp",
    alt: "Standing seam metal roof installation on Maine barn at sunset - professional metal roofing with cupolas",
    title: "Metal Roof Installation - Barn with Cupolas",
    category: "metal",
    featured: true,
    width: 1920,
    height: 1440
  },
  {
    src: "/images/projects/gallery/standing-seam-metal-roof-two-tone-maine.webp",
    alt: "Two-tone standing seam metal roof in Maine - blue and charcoal metal roofing installation",
    title: "Two-Tone Metal Roof Installation",
    category: "metal",
    featured: true,
    width: 1920,
    height: 1440
  },
  {
    src: "/images/projects/gallery/standing-seam-metal-roof-blue-maine-02.webp",
    alt: "Professional standing seam metal roof installation - close-up aerial view of blue metal panels",
    title: "Standing Seam Metal Panels Detail",
    category: "metal",
    featured: false,
    width: 1920,
    height: 1440
  },
  {
    src: "/images/projects/gallery/standing-seam-metal-roof-blue-maine-03.webp",
    alt: "Standing seam metal roof with vents and flashing - professional metal roofing in Maine",
    title: "Metal Roof with Professional Flashing",
    category: "metal",
    featured: false,
    width: 1920,
    height: 1440
  },
  {
    src: "/images/projects/gallery/standing-seam-metal-roof-barn-maine-02.webp",
    alt: "Metal roof installation on historic Maine barn - standing seam roofing with traditional cupolas",
    title: "Historic Barn Metal Roof",
    category: "metal",
    featured: false,
    width: 1920,
    height: 1440
  },
  {
    src: "/images/projects/gallery/metal-roof-before-replacement-maine.webp",
    alt: "Old rusty metal roof before replacement - roof inspection showing need for new standing seam installation",
    title: "Before: Old Metal Roof Needing Replacement",
    category: "before",
    featured: false,
    width: 1920,
    height: 1440
  },
  {
    src: "/images/projects/gallery/standing-seam-metal-roof-detail-maine.webp",
    alt: "Standing seam metal roof ridge detail - professional metal roofing craftsmanship in Maine",
    title: "Metal Roof Ridge Detail",
    category: "metal",
    featured: false,
    width: 1920,
    height: 1440
  },
  // NEW PHOTOS FROM LATEST PROJECTS
  {
    src: "/images/projects/gallery/standing-seam-blue-residential-maine.webp",
    alt: "Blue standing seam metal roof on residential home in Maine - aerial drone view with fall foliage",
    title: "Blue Metal Roof - Residential",
    category: "metal",
    featured: true,
    width: 1200,
    height: 800
  },
  {
    src: "/images/projects/gallery/two-tone-metal-roof-closeup.webp",
    alt: "Two-tone standing seam metal roof close-up with water droplets - burgundy and charcoal panels",
    title: "Two-Tone Metal Roof Detail",
    category: "metal",
    featured: false,
    width: 1200,
    height: 800
  },
  {
    src: "/images/projects/gallery/green-metal-barn-maine.webp",
    alt: "Green standing seam metal roof on Maine barn with cupolas at sunset - agricultural roofing",
    title: "Green Metal Barn Roof",
    category: "metal",
    featured: true,
    width: 1200,
    height: 800
  },
  {
    src: "/images/projects/gallery/metal-roof-aerial-fall.webp",
    alt: "Aerial view of completed metal roof installation in Maine during fall - standing seam roofing",
    title: "Metal Roof Aerial View - Fall",
    category: "metal",
    featured: false,
    width: 1200,
    height: 800
  },
  {
    src: "/images/projects/gallery/metal-roof-chimney-maine.webp",
    alt: "Standing seam metal roof with chimney flashing detail - professional installation in Maine",
    title: "Metal Roof with Chimney",
    category: "metal",
    featured: false,
    width: 1200,
    height: 800
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'metal', label: 'Standing Seam Metal' },
  { id: 'shingle', label: 'Shingle Roofing' },
  { id: 'before', label: 'Before & After' },
];

export function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === 'all' 
    ? projectImages 
    : projectImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'metal': return 'Standing Seam Metal';
      case 'shingle': return 'Architectural Shingles';
      case 'before': return 'Before & After';
      default: return category;
    }
  };

  return (
    <section className="py-16 bg-slate-50" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="gallery-heading" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Completed Roofing Projects
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our portfolio of standing seam metal roofs and architectural shingle installations 
            across Southern Maine. Real projects, real craftsmanship.
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
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          itemScope 
          itemType="https://schema.org/ImageGallery"
        >
          {filteredImages.map((image, index) => (
            <article 
              key={image.src}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-200 cursor-pointer shadow-md hover:shadow-xl transition-shadow"
              onClick={() => openLightbox(index)}
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                itemProp="contentUrl"
              />
              <meta itemProp="name" content={image.title} />
              <meta itemProp="description" content={image.alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium text-sm">{image.title}</p>
                <p className="text-white/80 text-xs">{getCategoryLabel(image.category)}</p>
              </div>
              {image.featured && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedIndex !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-slate-300 z-50"
              onClick={closeLightbox}
              aria-label="Close image"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white hover:text-slate-300 z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white hover:text-slate-300 z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div 
              className="relative max-w-5xl max-h-[85vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].alt}
                width={filteredImages[selectedIndex].width}
                height={filteredImages[selectedIndex].height}
                className="object-contain w-full h-full max-h-[85vh]"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center">
                <p className="text-white font-medium">{filteredImages[selectedIndex].title}</p>
                <p className="text-white/70 text-sm mt-1">{filteredImages[selectedIndex].alt}</p>
              </div>
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
              "name": "GraniteShield Roofing Completed Projects Gallery",
              "description": "Portfolio of completed standing seam metal and shingle roofing projects in Southern Maine by GraniteShield Roofing & Exteriors",
              "image": projectImages.map(img => ({
                "@type": "ImageObject",
                "name": img.title,
                "description": img.alt,
                "contentUrl": `https://graniteshieldroofing.com${img.src}`,
              }))
            })
          }}
        />
      </div>
    </section>
  );
}

export default ProjectGallery;
