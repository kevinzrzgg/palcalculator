import { describe, expect, it } from 'vitest';
import fs from 'node:fs';

describe('static frontend contract', () => {
  it('ships sitemap, robots, and schema data placeholders', () => {
    expect(fs.existsSync('public/sitemap.xml')).toBe(true);
    expect(fs.readFileSync('public/robots.txt', 'utf8')).toContain('Disallow: /share/');
    expect(fs.readFileSync('public/data/schema-version.json', 'utf8')).toContain('DATASET_VERSION_PENDING');
  });
  it('keeps disclaimer and pricing posture in rendered source', () => {
    const source = fs.readFileSync('src/main.tsx', 'utf8');
    expect(source).toContain('unofficial fan-made tool');
    expect(source).toContain('Free for normal player use at MVP');
    expect(source).toContain('No login or payment required');
  });
});
