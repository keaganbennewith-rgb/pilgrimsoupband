import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('tmp/lighthouse-report.json', 'utf8'));
const thresholds = {
  performance: 0.75,
  accessibility: 0.9,
  'best-practices': 0.8,
  seo: 0.9
};

const failures = Object.entries(thresholds)
  .map(([category, minScore]) => {
    const score = report.categories?.[category]?.score;
    return { category, minScore, score };
  })
  .filter(({ score, minScore }) => typeof score !== 'number' || score < minScore);

if (failures.length) {
  console.error('Lighthouse threshold failures:');
  for (const failure of failures) {
    console.error(`- ${failure.category}: ${failure.score ?? 'missing'} < ${failure.minScore}`);
  }
  process.exit(1);
}

console.log('Lighthouse thresholds passed.');
