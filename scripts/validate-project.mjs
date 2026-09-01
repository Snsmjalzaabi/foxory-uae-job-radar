import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);
const required = [
  'README.md', 'LICENSE', 'CONTRIBUTING.md', 'SECURITY.md',
  'config/config.example.json', 'config/keywords.example.json',
  'docs/setup.md', 'docs/email-setup.md', 'docs/telegram-setup.md',
  'docs/tracking.md', 'docs/customization.md', 'docs/architecture.html',
  'examples/sample-job-alert.eml', 'examples/tracker-template.csv',
  'workflows/foxory-uae-job-radar.json',
];

const errors = [];
const textFiles = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !['.git', 'node_modules'].includes(entry.name)) await walk(path);
    else if (entry.isFile()) textFiles.push(path);
  }
}

for (const path of required) {
  try { await readFile(new URL(path, root)); }
  catch { errors.push(`Missing required file: ${path}`); }
}

for (const path of ['config/config.example.json','config/keywords.example.json','workflows/foxory-uae-job-radar.json']) {
  try { JSON.parse(await readFile(new URL(path, root), 'utf8')); }
  catch (error) { errors.push(`Invalid JSON in ${path}: ${error.message}`); }
}

const workflow = JSON.parse(await readFile(new URL('workflows/foxory-uae-job-radar.json', root), 'utf8'));
const nodeNames = new Set(workflow.nodes?.map(node => node.name));
for (const name of ['Job Alert Inbox','Load Configuration','Score Job','Remove Recent Duplicates','Route by Score','Send Telegram Alert','Build Tracker Row']) {
  if (!nodeNames.has(name)) errors.push(`Workflow is missing node: ${name}`);
}
if (workflow.active !== false) errors.push('Public workflow export must be inactive');
if (workflow.nodes?.some(node => node.credentials)) errors.push('Workflow export contains a credentials object');

try {
  const code = name => workflow.nodes.find(node => node.name === name).parameters.jsCode;
  const run = (name, items = [], staticData = {}) =>
    new Function('$input', '$getWorkflowStaticData', code(name))(
      { all: () => items },
      () => staticData,
    );
  const sample = run('Synthetic Sample Alert');
  const configured = run('Load Configuration', sample);
  const scored = run('Score Job', configured);
  const staticData = {};
  const unique = run('Remove Recent Duplicates', scored, staticData);
  const duplicate = run('Remove Recent Duplicates', scored, staticData);
  if (scored[0]?.json?.score !== 90) errors.push(`Synthetic alert should score 90, received ${scored[0]?.json?.score}`);
  if (scored[0]?.json?.location !== 'Dubai') errors.push('Synthetic alert location extraction failed');
  if (unique.length !== 1 || duplicate.length !== 0) errors.push('Duplicate suppression behavior failed');
} catch (error) {
  errors.push(`Core workflow execution failed: ${error.message}`);
}

await walk(rootPath);
const forbidden = [
  { name: 'private key', pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'GitHub token', pattern: /gh[pousr]_[A-Za-z0-9_]{30,}/ },
  { name: 'Telegram bot token', pattern: /\b\d{7,12}:[A-Za-z0-9_-]{30,}\b/ },
  { name: 'AWS access key', pattern: /\bAKIA[0-9A-Z]{16}\b/ },
];
for (const path of textFiles) {
  const content = await readFile(path, 'utf8').catch(() => '');
  for (const rule of forbidden) if (rule.pattern.test(content)) errors.push(`${rule.name} pattern found in ${relative(rootPath, path)}`);
}

const html = await readFile(new URL('docs/architecture.html', root), 'utf8');
for (const feature of ['Full flow','Start guided tour','data-theme','No scraping']) {
  if (!html.includes(feature)) errors.push(`Architecture page is missing: ${feature}`);
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Validated ${textFiles.length} files: JSON, workflow safety, required docs, and secret patterns passed.`);
