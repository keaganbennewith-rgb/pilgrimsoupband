import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('index.html', 'utf8');
const attrs = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);
const failures = [];

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
    failures.push(`${value} -> missing local file ${cleanPath}`);
  }
}

if (failures.length) {
  console.error('Broken local links:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked ${attrs.length} links/assets; local references exist.`);
