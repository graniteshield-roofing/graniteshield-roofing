#!/usr/bin/env python3
"""
Image processing script for GraniteShield Roofing website.
Filters, optimizes, and organizes project photos with SEO-friendly naming.
"""

import os
import shutil
from PIL import Image
import json

# Configuration
RAW_DIR = "/home/ubuntu/graniteshield-roofing/public/images/projects/raw"
OUTPUT_DIR = "/home/ubuntu/graniteshield-roofing/public/images/projects"
HERO_DIR = "/home/ubuntu/graniteshield-roofing/public/images/hero"

# Photos to EXCLUDE (personal/non-roofing content)
EXCLUDE_PHOTOS = [
    # Indoor family photos
    "DJI_20251011183724_0099_D.JPG",
    "DJI_20251011183727_0100_D.JPG",
    "DJI_20251011183734_0101_D.JPG",
    # Wildlife/nature shots
    "DJI_20251010182917_0084_D.JPG",
    "DJI_20251010182918_0085_D.JPG",
    "DJI_20251010182920_0086_D.JPG",
    # Truck/non-roofing
    "DJI_20251010163601_0061_D.JPG",
]

# Photo categories with SEO-friendly names and alt text
PHOTO_CATEGORIES = {
    # Hero/Featured images - best drone shots
    "hero": {
        "DJI_20251012173136_0183_D.JPG": {
            "name": "maine-home-shingle-roof-drone-view",
            "alt": "Aerial drone view of Maine home with architectural shingle roof - GraniteShield Roofing inspection",
            "category": "drone-inspection"
        },
        "DJI_20251012173145_0184_D.JPG": {
            "name": "maine-residential-roof-aerial",
            "alt": "Aerial view of residential roof in Southern Maine - professional drone inspection",
            "category": "drone-inspection"
        },
        "20251017_192904000_iOS.jpg": {
            "name": "maine-home-roof-skylights-aerial",
            "alt": "Drone aerial view of Maine home roof with skylights - fall foliage background",
            "category": "completed-project"
        },
    },
    
    # Shingle roofing projects
    "shingle": {
        "DJI_20251010145740_0053_D.JPG": {
            "name": "shingle-roof-chimney-maine",
            "alt": "Architectural shingle roof with brick chimney in Maine - professional installation",
            "category": "shingle-roofing"
        },
        "20251030_203138000_iOS.jpg": {
            "name": "gray-architectural-shingles-skylights",
            "alt": "Gray architectural shingle roof with skylights - Maine roof replacement",
            "category": "shingle-roofing"
        },
        "20251030_203140000_iOS.jpg": {
            "name": "shingle-roof-detail-maine",
            "alt": "Close-up of architectural shingle installation in Maine",
            "category": "shingle-roofing"
        },
        "20251030_203148000_iOS.jpg": {
            "name": "roof-shingles-skylight-installation",
            "alt": "Architectural shingles with skylight installation - Maine roofing project",
            "category": "shingle-roofing"
        },
    },
    
    # Metal roofing / Before shots
    "metal": {
        "20251015_190348000_iOS.jpg": {
            "name": "old-metal-roof-replacement-needed",
            "alt": "Aging metal roof needing replacement - Maine barn roof inspection",
            "category": "before-after"
        },
        "20251015_190402000_iOS.jpg": {
            "name": "rusty-metal-roof-maine",
            "alt": "Rusty metal roof requiring replacement in Maine",
            "category": "before-after"
        },
    },
    
    # Chimney and flashing work
    "chimney": {
        "20251101_181834000_iOS.jpg": {
            "name": "chimney-flashing-shingle-roof",
            "alt": "Brick chimney with professional flashing on shingle roof - Maine roofing",
            "category": "chimney-flashing"
        },
        "20251101_181854000_iOS.jpg": {
            "name": "chimney-roof-detail-maine",
            "alt": "Chimney and roof detail - professional Maine roofing installation",
            "category": "chimney-flashing"
        },
    },
    
    # Drone inspection shots
    "inspection": {
        "DJI_20251010145807_0054_D.JPG": {
            "name": "drone-roof-inspection-maine-1",
            "alt": "Professional drone roof inspection in Maine - GraniteShield Roofing",
            "category": "drone-inspection"
        },
        "DJI_20251010145827_0055_D.JPG": {
            "name": "drone-roof-inspection-maine-2",
            "alt": "Aerial roof inspection using drone technology - Southern Maine",
            "category": "drone-inspection"
        },
        "DJI_20251010181445_0067_D.JPG": {
            "name": "aerial-home-inspection-maine",
            "alt": "Aerial home and roof inspection - Maine residential property",
            "category": "drone-inspection"
        },
        "DJI_20251010181454_0068_D.JPG": {
            "name": "drone-roof-survey-maine",
            "alt": "Drone roof survey for accurate measurements - Maine roofing contractor",
            "category": "drone-inspection"
        },
    },
    
    # Additional project photos
    "projects": {
        "20251017_192706000_iOS.jpg": {
            "name": "maine-roof-project-1",
            "alt": "Completed roofing project in Southern Maine",
            "category": "completed-project"
        },
        "20251017_192710000_iOS.jpg": {
            "name": "maine-roof-project-2",
            "alt": "Professional roof installation - Maine home",
            "category": "completed-project"
        },
        "20251017_192722000_iOS.jpg": {
            "name": "maine-roof-project-3",
            "alt": "Quality roofing work in Maine - GraniteShield",
            "category": "completed-project"
        },
        "20251029_205200000_iOS.jpg": {
            "name": "roof-replacement-maine-1",
            "alt": "Roof replacement project in Maine",
            "category": "completed-project"
        },
        "20251029_205206000_iOS.jpg": {
            "name": "roof-replacement-maine-2",
            "alt": "Professional roof replacement - Southern Maine",
            "category": "completed-project"
        },
    }
}

def process_image(input_path, output_path, max_width=1920, quality=85):
    """Process and optimize image for web."""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize if larger than max_width
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.LANCZOS)
            
            # Save as WebP for better compression
            webp_path = output_path.rsplit('.', 1)[0] + '.webp'
            img.save(webp_path, 'WEBP', quality=quality, optimize=True)
            
            # Also save as JPG for fallback
            jpg_path = output_path.rsplit('.', 1)[0] + '.jpg'
            img.save(jpg_path, 'JPEG', quality=quality, optimize=True)
            
            return webp_path, jpg_path
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return None, None

def main():
    # Create output directories
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(HERO_DIR, exist_ok=True)
    
    # Track all processed images for JSON manifest
    image_manifest = []
    
    # Process each category
    for category, photos in PHOTO_CATEGORIES.items():
        category_dir = os.path.join(OUTPUT_DIR, category)
        os.makedirs(category_dir, exist_ok=True)
        
        for original_name, meta in photos.items():
            input_path = os.path.join(RAW_DIR, original_name)
            
            if not os.path.exists(input_path):
                print(f"Warning: {original_name} not found, skipping...")
                continue
            
            output_name = meta["name"]
            output_path = os.path.join(category_dir, output_name + ".jpg")
            
            print(f"Processing: {original_name} -> {output_name}")
            
            webp_path, jpg_path = process_image(input_path, output_path)
            
            if webp_path:
                # Add to manifest
                image_manifest.append({
                    "original": original_name,
                    "name": meta["name"],
                    "alt": meta["alt"],
                    "category": meta["category"],
                    "webp": webp_path.replace("/home/ubuntu/graniteshield-roofing/public", ""),
                    "jpg": jpg_path.replace("/home/ubuntu/graniteshield-roofing/public", ""),
                })
                
                # Copy hero images to hero directory
                if category == "hero":
                    hero_webp = os.path.join(HERO_DIR, os.path.basename(webp_path))
                    hero_jpg = os.path.join(HERO_DIR, os.path.basename(jpg_path))
                    shutil.copy(webp_path, hero_webp)
                    shutil.copy(jpg_path, hero_jpg)
    
    # Save manifest for use in components
    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, 'w') as f:
        json.dump(image_manifest, f, indent=2)
    
    print(f"\nProcessed {len(image_manifest)} images")
    print(f"Manifest saved to: {manifest_path}")

if __name__ == "__main__":
    main()
