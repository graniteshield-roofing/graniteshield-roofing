#!/usr/bin/env node

/**
 * WebP Validation Script
 * Checks if all .webp files are actually valid WebP format
 */

import { readFile, writeFile } from 'fs/promises';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
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

async function checkWebPFile(filePath) {
  try {
    const buffer = await readFile(filePath);

    // WebP signature: RIFF....WEBP
    const isRIFF = buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46;
    const isWEBP = buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;

    return isRIFF && isWEBP;
  } catch (error) {
    console.error(`${colors.red}Error reading ${filePath}:${colors.reset}`, error.message);
    return false;
  }
}

async function main() {
  console.log(`${colors.cyan}Checking WebP file validity...${colors.reset}\n`);

  const imagesDir = join(projectRoot, 'public', 'images');
  const webpFiles = [];

  for await (const file of getFiles(imagesDir)) {
    if (file.endsWith('.webp')) {
      webpFiles.push(file);
    }
  }

  console.log(`Found ${webpFiles.length} .webp files\n`);

  const invalid = [];

  for (const file of webpFiles) {
    const isValid = await checkWebPFile(file);
    const relativePath = file.replace(projectRoot + '/', '');

    if (isValid) {
      console.log(`${colors.green}✓${colors.reset} ${relativePath}`);
    } else {
      console.log(`${colors.red}✗${colors.reset} ${relativePath} - INVALID WebP`);
      invalid.push(relativePath);
    }
  }

  console.log(`\n${colors.cyan}Results:${colors.reset}`);
  console.log(`Valid: ${webpFiles.length - invalid.length}`);
  console.log(`Invalid: ${invalid.length}`);

  if (invalid.length > 0) {
    console.log(`\n${colors.yellow}Invalid files need conversion:${colors.reset}`);
    invalid.forEach(f => console.log(`  - ${f}`));
    process.exit(1);
  } else {
    console.log(`\n${colors.green}All WebP files are valid!${colors.reset}`);
    process.exit(0);
  }
}

main().catch(console.error);
