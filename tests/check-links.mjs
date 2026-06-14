import fs from 'node:fs';
import path from 'node:path';

const htmlFiles = fs.readdirSync(process.cwd()).filter((file) => file.endsWith('.html'));
const failures = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const attrs = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);
  checked += attrs.length;

  for (const value of attrs) {
    if (
      value.startsWith('#') ||
      value.startsWith('mailto:') ||
      value.startsWith('tel:') ||
      value.startsWith('data:') ||
      value.startsWith('http://') ||
      value.startsWith('https://')
    ) {
      continue;
    }

    const cleanPath = decodeURIComponent(value.split('#')[0].split('?')[0]);
    const localPath = path.join(process.cwd(), cleanPath);
    if (!fs.existsSync(localPath)) {
      failures.push(`${file}: ${value} -> missing local file ${cleanPath}`);
    }
  }
}

if (failures.length) {
  console.error('Broken local links:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked ${checked} links/assets across ${htmlFiles.length} HTML files; local references exist.`);
