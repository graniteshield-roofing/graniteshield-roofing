#!/usr/bin/env node
import sharp from 'sharp';
import { writeFile } from 'fs/promises';

async function generateAppleIcon() {
  // Create a simple SVG for the icon
  const svg = `
    <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" fill="#0f172a" rx="24"/>
      <text
        x="90"
        y="125"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="72"
        font-weight="700"
        fill="white"
        text-anchor="middle">GS</text>
    </svg>
  `;

  // Convert to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .resize(180, 180)
    .png()
    .toBuffer();

  await writeFile('/home/user/graniteshield-roofing/app/apple-icon.png', pngBuffer);
  console.log('✓ Generated app/apple-icon.png (180x180)');
}

generateAppleIcon().catch(console.error);
