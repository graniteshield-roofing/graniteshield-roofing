#!/usr/bin/env node

/**
 * Convert all fake .webp files to real WebP format
 */

import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = join(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function convertToWebP(filePath) {
  try {
    console.log(`${colors.cyan}Converting:${colors.reset} ${filePath.replace(projectRoot + '/', '')}`);

    await sharp(filePath)
      .webp({ quality: 90, effort: 6 })
      .toFile(filePath + '.tmp');

    // Replace original with converted
    await sharp(filePath + '.tmp')
      .toFile(filePath);

    // Clean up temp file
    const fs = await import('fs/promises');
    await fs.unlink(filePath + '.tmp');

    console.log(`${colors.green}✓ Converted${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.yellow}⚠ Error converting ${filePath}:${colors.reset}`, error.message);
    return false;
  }
}

async function main() {
  console.log(`${colors.cyan}Converting images to WebP format...${colors.reset}\n`);

  const imagesDir = join(projectRoot, 'public', 'images');
  const webpFiles = [];

  for await (const file of getFiles(imagesDir)) {
    if (file.endsWith('.webp')) {
      webpFiles.push(file);
    }
  }

  console.log(`Found ${webpFiles.length} .webp files to convert\n`);

  let converted = 0;
  for (const file of webpFiles) {
    const success = await convertToWebP(file);
    if (success) converted++;
  }

  console.log(`\n${colors.green}Converted ${converted}/${webpFiles.length} files to WebP format${colors.reset}`);
}

main().catch(console.error);
