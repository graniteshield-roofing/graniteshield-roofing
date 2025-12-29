/**
 * Town Content Loader
 * Loads markdown content for town pages with fallback to generated content
 */

import fs from 'fs';
import path from 'path';

export interface TownMarkdownContent {
  // Frontmatter fields
  town: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  quickAnswer: string;

  // Body content sections
  intro: string;
  localConditions: string;
  services: string;
  whyGraniteShield: string;
  faqs: string;
  cta: string;
  projectStory: string;
}

/**
 * Simple frontmatter parser
 * Extracts YAML-style frontmatter between --- delimiters
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const [, frontmatterText, body] = match;
  const frontmatter: Record<string, string> = {};

  // Parse frontmatter lines (simple key: "value" format)
  const lines = frontmatterText.split('\n');
  lines.forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

/**
 * Extract markdown sections by heading
 */
function extractSections(markdown: string): Record<string, string> {
  const sections: Record<string, string> = {};

  // Split by ## headings
  const headingRegex = /^## (.+)$/gm;
  const parts = markdown.split(headingRegex);

  // First part is before any heading (usually empty)
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].trim();
    const content = parts[i + 1] ? parts[i + 1].trim() : '';
    sections[heading] = content;
  }

  return sections;
}

/**
 * Load town markdown content
 * Returns null if file doesn't exist (for fallback to generated content)
 */
export function loadTownContent(slug: string): TownMarkdownContent | null {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'towns');
    const filePath = path.join(contentDir, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(fileContent);
    const sections = extractSections(body);

    return {
      // Frontmatter
      town: frontmatter.town || '',
      slug: frontmatter.slug || slug,
      metaTitle: frontmatter.metaTitle || '',
      metaDescription: frontmatter.metaDescription || '',
      quickAnswer: frontmatter.quickAnswer || '',

      // Body sections
      intro: sections['Intro'] || '',
      localConditions: sections['Local Conditions'] || '',
      services: sections['Services'] || '',
      whyGraniteShield: sections['Why GraniteShield'] || '',
      faqs: sections['FAQs'] || '',
      cta: sections['CTA'] || '',
      projectStory: sections['Project Story (Placeholder)'] || '',
    };
  } catch (error) {
    // Return null on any error to fallback to generated content
    console.error(`Error loading town content for ${slug}:`, error);
    return null;
  }
}

/**
 * Check if town has markdown content available
 */
export function hasTownContent(slug: string): boolean {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'towns');
    const filePath = path.join(contentDir, `${slug}.md`);
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}
