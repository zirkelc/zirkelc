/**
 * Updates the npm downloads chart and the download numbers in the README.
 *
 * It finds all npm packages of the maintainer whose repository is on the GitHub account,
 * sums their downloads per month for the last complete months, and writes a light and a
 * dark SVG chart. Runs on Node 24 without dependencies.
 */
import { readFile, writeFile } from 'node:fs/promises';

const NPM_MAINTAINER = 'chriszirkel';
const GITHUB_ACCOUNT = 'github.com/zirkelc/';
const MONTH_COUNT = 18;
const README = 'README.md';
const CHART = 'assets/charts/downloads-total';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Theme = { ink: string; muted: string; grid: string; series: string; surface: string };
const THEMES: Record<'light' | 'dark', Theme> = {
  light: { ink: '#1f2328', muted: '#59636e', grid: '#d1d9e0', series: '#2a78d6', surface: '#ffffff' },
  dark: { ink: '#f0f6fc', muted: '#9198a1', grid: '#3d444d', series: '#3987e5', surface: '#0d1117' },
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson<RESULT>(url: string): Promise<RESULT> {
  // The npm API rate-limits fast, so wait longer after each 429.
  for (let attempt = 1; attempt <= 6; attempt++) {
    const response = await fetch(url);
    if (response.status === 429) {
      await sleep(attempt * 5_000);
      continue;
    }
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
    return (await response.json()) as RESULT;
  }
  throw new Error(`Rate limited: ${url}`);
}

async function findPackages(): Promise<Array<string>> {
  type Search = { objects: Array<{ package: { name: string; links?: { repository?: string } } }> };
  const search = await fetchJson<Search>(`https://registry.npmjs.org/-/v1/search?text=maintainer:${NPM_MAINTAINER}&size=250`);
  // Packages that the maintainer only co-maintains live in other accounts and are not counted.
  return search.objects
    .filter(({ package: pkg }) => pkg.links?.repository?.includes(GITHUB_ACCOUNT))
    .map(({ package: pkg }) => pkg.name)
    .sort();
}

/** The last complete months, oldest first, as `YYYY-MM`. */
function lastMonths(now: Date): Array<string> {
  const months: Array<string> = [];
  for (let offset = MONTH_COUNT; offset >= 1; offset--) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
    months.push(date.toISOString().slice(0, 7));
  }
  return months;
}

function lastDay(month: string): string {
  const [year, mon] = month.split('-').map(Number);
  return new Date(Date.UTC(year, mon, 0)).toISOString().slice(0, 10);
}

async function monthlyTotals(packages: Array<string>, months: Array<string>): Promise<Array<number>> {
  type Range = { downloads?: Array<{ day: string; downloads: number }> };
  const totals = new Map(months.map((month) => [month, 0]));
  const range = `${months[0]}-01:${lastDay(months[months.length - 1])}`;
  for (const name of packages) {
    const data = await fetchJson<Range>(`https://api.npmjs.org/downloads/range/${range}/${encodeURIComponent(name)}`);
    for (const { day, downloads } of data.downloads ?? []) {
      const month = day.slice(0, 7);
      if (totals.has(month)) totals.set(month, totals.get(month)! + downloads);
    }
    await sleep(1_500);
  }
  return months.map((month) => totals.get(month)!);
}

function formatShort(value: number): string {
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(2))}M`;
  return `${Math.round(value / 1_000)}k`;
}

/** A round number that the total is above, for "more than 1M". */
function formatAtLeast(value: number): string {
  if (value >= 1_000_000) return `${Math.floor(value / 100_000) / 10}M`;
  if (value >= 100_000) return `${Math.floor(value / 100_000) * 100}k`;
  return `${Math.floor(value / 10_000) * 10}k`;
}

function niceStep(max: number): number {
  const raw = max / 5;
  const power = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 2.5, 5, 10].map((factor) => factor * power).find((step) => step >= raw)!;
}

function monthLabel(month: string, withYear: boolean): string {
  const [year, mon] = month.split('-');
  return MONTH_NAMES[Number(mon) - 1] + (withYear ? ` ${year}` : '');
}

function chart(theme: Theme, months: Array<string>, values: Array<number>): string {
  const [width, height] = [880, 260];
  const [left, right, top, bottom] = [52, 96, 34, 28];
  const step = niceStep(Math.max(...values));
  const yMax = Math.ceil((Math.max(...values) * 1.08) / step) * step;
  const last = values.length - 1;
  const x = (index: number) => left + (index * (width - left - right)) / last;
  const y = (value: number) => top + (height - top - bottom) * (1 - value / yMax);
  const font = '-apple-system,BlinkMacSystemFont,Segoe UI,Noto Sans,Helvetica,Arial,sans-serif';

  const parts: Array<string> = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="${font}">`,
    `<text x="${left}" y="16" font-size="13" font-weight="600" fill="${theme.ink}">npm downloads per month, all packages</text>`,
  ];
  for (let value = 0; value <= yMax; value += step) {
    parts.push(`<line x1="${left}" x2="${width - right}" y1="${y(value).toFixed(1)}" y2="${y(value).toFixed(1)}" stroke="${theme.grid}" stroke-width="1"/>`);
    parts.push(`<text x="${left - 8}" y="${(y(value) + 4).toFixed(1)}" font-size="11" text-anchor="end" fill="${theme.muted}">${value ? formatShort(value) : '0'}</text>`);
  }
  months.forEach((month, index) => {
    const mon = Number(month.slice(5));
    // One label per quarter, counted back from the last month, so the newest month is always labeled.
    if ((last - index) % 3 !== 0) return;
    const withYear = index === last % 3 || (mon <= 3 && index !== last);
    parts.push(`<text x="${x(index).toFixed(1)}" y="${height - 8}" font-size="11" text-anchor="middle" fill="${theme.muted}">${monthLabel(month, withYear)}</text>`);
  });
  const points = values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(' ');
  parts.push(`<polygon points="${x(0).toFixed(1)},${y(0).toFixed(1)} ${points} ${x(last).toFixed(1)},${y(0).toFixed(1)}" fill="${theme.series}" fill-opacity="0.16"/>`);
  parts.push(`<polyline points="${points}" fill="none" stroke="${theme.series}" stroke-width="2" stroke-linejoin="round"/>`);
  for (const index of [0, last]) {
    parts.push(`<circle cx="${x(index).toFixed(1)}" cy="${y(values[index]).toFixed(1)}" r="4" fill="${theme.series}" stroke="${theme.surface}" stroke-width="2"/>`);
  }
  parts.push(`<text x="${(x(0) + 8).toFixed(1)}" y="${(y(values[0]) - 10).toFixed(1)}" font-size="12" fill="${theme.ink}">${formatShort(values[0])}</text>`);
  parts.push(`<text x="${(x(last) + 10).toFixed(1)}" y="${(y(values[last]) + 4).toFixed(1)}" font-size="13" font-weight="600" fill="${theme.ink}">${formatShort(values[last])}</text>`);
  parts.push('</svg>');
  return `${parts.join('\n')}\n`;
}

function monthLong(month: string): string {
  const [year, mon] = month.split('-');
  return `${MONTH_LONG[Number(mon) - 1]} ${year}`;
}

async function main() {
  const packages = await findPackages();
  const months = lastMonths(new Date());
  const values = await monthlyTotals(packages, months);
  console.log(`${packages.length} packages, ${months[0]} to ${months[months.length - 1]}: ${formatShort(values[0])} to ${formatShort(values[values.length - 1])}`);

  for (const [name, theme] of Object.entries(THEMES)) {
    await writeFile(`${CHART}-${name}.svg`, chart(theme, months, values));
  }

  const first = values[0];
  const latest = values[values.length - 1];
  const alt = `npm downloads per month of all my packages, from ${formatShort(first)} in ${monthLong(months[0])} to ${formatShort(latest)} in ${monthLong(months[months.length - 1])}`;
  const readme = await readFile(README, 'utf8');
  const updated = readme
    .replace(/(<img alt=")npm downloads per month[^"]*(")/, `$1${alt}$2`)
    .replace(/(<!-- downloads -->)[^<]*(<!-- \/downloads -->)/, `$1${formatAtLeast(latest)}$2`);
  await writeFile(README, updated);
}

await main();
