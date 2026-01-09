#!/usr/bin/env python3
"""
Process completed roofing project photos for GraniteShield website.
Converts to WebP, optimizes, and generates SEO metadata.
"""

import os
import json
from PIL import Image
from pathlib import Path

# Directories
SHINGLES_DIR = Path("/home/ubuntu/graniteshield-roofing/public/images/projects/completed/shingles")
METAL_DIR = Path("/home/ubuntu/graniteshield-roofing/public/images/projects/completed/metal")
OUTPUT_DIR = Path("/home/ubuntu/graniteshield-roofing/public/images/projects/gallery")

# Create output directory
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Image selections with SEO metadata
SELECTED_IMAGES = [
    # SHINGLE COMPLETED WORK
    {
        "source": SHINGLES_DIR / "dji_fly_20250824_015816_0223_1755972115050_photo.JPG",
        "output": "shingle-roof-completed-maine-01.webp",
        "category": "shingle",
        "alt": "Completed architectural shingle roof replacement in Maine - aerial drone view showing gray shingles with brick chimney",
        "title": "Shingle Roof Replacement - Maine",
        "featured": True
    },
    {
        "source": SHINGLES_DIR / "dji_fly_20250824_015848_0225_1755972105727_photo.JPG",
        "output": "shingle-roof-completed-maine-02.webp",
        "category": "shingle",
        "alt": "Professional shingle roof installation by GraniteShield Roofing - aerial view of completed gray architectural shingles",
        "title": "Architectural Shingle Installation - Maine",
        "featured": True
    },
    {
        "source": SHINGLES_DIR / "dji_fly_20250824_015828_0224_1755972109466_photo.JPG",
        "output": "shingle-roof-completed-maine-03.webp",
        "category": "shingle",
        "alt": "New shingle roof with professional ridge cap installation - drone photography of completed roofing project",
        "title": "Shingle Roof with Ridge Cap - Maine",
        "featured": False
    },
    {
        "source": SHINGLES_DIR / "dji_fly_20250823_214532_0218_1755972139137_photo.JPG",
        "output": "shingle-roof-in-progress-maine.webp",
        "category": "shingle",
        "alt": "GraniteShield roofing crew installing new shingle roof - professional roofers at work in Southern Maine",
        "title": "Roof Installation In Progress",
        "featured": False
    },
    
    # STANDING SEAM METAL COMPLETED WORK
    {
        "source": METAL_DIR / "20251014_202328000_iOS.jpg",
        "output": "standing-seam-metal-roof-blue-maine-01.webp",
        "category": "metal",
        "alt": "Blue standing seam metal roof installation in Maine - aerial drone view of completed metal roofing project",
        "title": "Standing Seam Metal Roof - Blue",
        "featured": True
    },
    {
        "source": METAL_DIR / "20251017_215334000_iOS.jpg",
        "output": "standing-seam-metal-roof-barn-sunset-maine.webp",
        "category": "metal",
        "alt": "Standing seam metal roof installation on Maine barn at sunset - professional metal roofing with cupolas",
        "title": "Metal Roof Installation - Barn with Cupolas",
        "featured": True
    },
    {
        "source": METAL_DIR / "20251029_205206000_iOS.jpg",
        "output": "standing-seam-metal-roof-two-tone-maine.webp",
        "category": "metal",
        "alt": "Two-tone standing seam metal roof in Maine - blue and charcoal metal roofing installation",
        "title": "Two-Tone Metal Roof Installation",
        "featured": True
    },
    {
        "source": METAL_DIR / "20251014_202352000_iOS.jpg",
        "output": "standing-seam-metal-roof-blue-maine-02.webp",
        "category": "metal",
        "alt": "Professional standing seam metal roof installation - close-up aerial view of blue metal panels",
        "title": "Standing Seam Metal Panels Detail",
        "featured": False
    },
    {
        "source": METAL_DIR / "20251014_202408000_iOS.jpg",
        "output": "standing-seam-metal-roof-blue-maine-03.webp",
        "category": "metal",
        "alt": "Standing seam metal roof with vents and flashing - professional metal roofing in Maine",
        "title": "Metal Roof with Professional Flashing",
        "featured": False
    },
    {
        "source": METAL_DIR / "20251017_215318000_iOS.jpg",
        "output": "standing-seam-metal-roof-barn-maine-02.webp",
        "category": "metal",
        "alt": "Metal roof installation on historic Maine barn - standing seam roofing with traditional cupolas",
        "title": "Historic Barn Metal Roof",
        "featured": False
    },
    {
        "source": METAL_DIR / "20251015_190416000_iOS.jpg",
        "output": "metal-roof-before-replacement-maine.webp",
        "category": "before",
        "alt": "Old rusty metal roof before replacement - roof inspection showing need for new standing seam installation",
        "title": "Before: Old Metal Roof Needing Replacement",
        "featured": False
    },
    {
        "source": METAL_DIR / "20251029_205200000_iOS.jpg",
        "output": "standing-seam-metal-roof-detail-maine.webp",
        "category": "metal",
        "alt": "Standing seam metal roof ridge detail - professional metal roofing craftsmanship in Maine",
        "title": "Metal Roof Ridge Detail",
        "featured": False
    },
]

def process_image(img_data):
    """Process a single image: resize, convert to WebP, optimize."""
    source = img_data["source"]
    output_path = OUTPUT_DIR / img_data["output"]
    
    if not source.exists():
        print(f"  SKIP: Source not found: {source}")
        return None
    
    try:
        with Image.open(source) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize to max 1920px width while maintaining aspect ratio
            max_width = 1920
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.LANCZOS)
            
            # Save as WebP with good quality
            img.save(output_path, 'WEBP', quality=85, method=6)
            
            print(f"  OK: {img_data['output']} ({img.width}x{img.height})")
            return {
                "src": f"/images/projects/gallery/{img_data['output']}",
                "alt": img_data["alt"],
                "title": img_data["title"],
                "category": img_data["category"],
                "featured": img_data["featured"],
                "width": img.width,
                "height": img.height
            }
    except Exception as e:
        print(f"  ERROR: {source}: {e}")
        return None

def main():
    print("Processing completed roofing project photos...")
    print(f"Output directory: {OUTPUT_DIR}")
    print()
    
    manifest = []
    
    for img_data in SELECTED_IMAGES:
        result = process_image(img_data)
        if result:
            manifest.append(result)
    
    # Save manifest
    manifest_path = OUTPUT_DIR / "manifest.json"
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print()
    print(f"Processed {len(manifest)} images")
    print(f"Manifest saved to: {manifest_path}")
    
    # Print summary by category
    categories = {}
    for img in manifest:
        cat = img["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    print()
    print("Summary by category:")
    for cat, count in categories.items():
        print(f"  {cat}: {count} images")

if __name__ == "__main__":
    main()
