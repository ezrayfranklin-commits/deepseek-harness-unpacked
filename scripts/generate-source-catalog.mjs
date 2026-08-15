import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = process.argv[2];
if (!root) throw new Error('Usage: node scripts/generate-source-catalog.mjs <deepseek-harness-root>');

const markdown = readFileSync(join(root, 'docs/tool-catalog.md'), 'utf8');
const sections = markdown.split(/^## /m).slice(1);
const tools = [];
const categoryOf = (pkg) => {
  if (/tool-cordis/.test(pkg)) return 'Cordis Runtime';
  if (/tool-fs|str-replace/.test(pkg)) return 'File System';
  if (/bash|pwsh|terminal/.test(pkg)) return 'Shell & Terminal';
  if (/subagent/.test(pkg)) return 'Agents';
  if (/session-query|tool-jobs/.test(pkg)) return 'Session & Jobs';
  if (/goal|schedule/.test(pkg)) return 'Goals & Schedule';
  if (/web|lsp|skill/.test(pkg)) return 'Search & Intelligence';
  if (/ask-user/.test(pkg)) return 'Interaction';
  return 'Planning & Workflow';
};

for (const section of sections) {
  const packageMatch = section.match(/^`([^`]+)`/);
  if (!packageMatch) continue;
  const packageName = packageMatch[1];
  const toolParts = section.split(/^### /m).slice(1);
  for (const part of toolParts) {
    const nameMatch = part.match(/^`([^`]+)`/);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    const beforeSchema = part.slice(nameMatch[0].length).trim();
    const description = (beforeSchema.match(/^([^\n]+(?:\n(?!```|Source:)[^\n]+)*)/)?.[1] ?? '').replace(/\n/g, ' ').trim();
    const schemaText = part.match(/```json\n([\s\S]*?)\n```/)?.[1];
    let params = [];
    if (schemaText) {
      try { params = Object.keys(JSON.parse(schemaText).properties ?? {}); } catch {}
    }
    const source = part.match(/Source: \[`([^`]+)`\]/)?.[1] ?? '';
    tools.push({ name, packageName, category: categoryOf(packageName), description, params, source });
  }
}

const packagesRoot = join(root, 'packages');
const architecture = readdirSync(packagesRoot).filter(name => statSync(join(packagesRoot, name)).isDirectory()).sort().map(group => {
  const groupRoot = join(packagesRoot, group);
  const packages = readdirSync(groupRoot).filter(name => statSync(join(groupRoot, name)).isDirectory()).sort().map(name => {
    const srcRoot = join(groupRoot, name, 'src');
    let files = 0;
    const walk = dir => { for (const entry of readdirSync(dir, { withFileTypes: true })) entry.isDirectory() ? walk(join(dir, entry.name)) : files++; };
    try { walk(srcRoot); } catch {}
    return { name, files, path: `packages/${group}/${name}` };
  });
  return { group, count: packages.length, files: packages.reduce((sum, item) => sum + item.files, 0), packages };
});

const commands = [
  { name: '/feedback', category: 'Session', input: '<text>', description: 'Record feedback about the current session.', source: 'packages/feedback/command-feedback/src/index.ts' },
  { name: '/goal', category: 'Agent Control', input: '[<objective>|clear|edit <objective>|pause|resume]', description: 'Set, inspect, edit, pause, resume, or clear a long-running goal.', source: 'packages/goal/command-goal/src/index.ts' },
  { name: '/plan', category: 'Agent Control', input: '[off|message]', description: 'Enter plan mode, leave it, or enter with an initial planning message.', source: 'packages/plan/plan-mode/src/index.ts' },
  { name: '/permission', category: 'Configuration', input: '<preset>', description: 'Switch the sandbox mode and approval-policy preset.', source: 'packages/interaction/permission-presets/src/index.ts' },
  { name: '/compact', category: 'Session', input: '', description: 'Compact older conversation history on demand.', source: 'packages/compaction/command-compact/src/index.ts' },
  { name: '/export', category: 'Session', input: '', description: 'Download the current Session log as a ZIP archive in the Web client.', source: 'packages/session-query/session-log-export/src/index.ts' },
  { name: '/model', category: 'Configuration', input: '<selection>', description: 'Open the model picker and select a provider route and model.', source: 'packages/client/ui-model-selection/src/client/index.ts' },
];

const output = `// Generated from deepseek-ai/deepseek-harness. Do not edit by hand.\nexport const toolCatalog = ${JSON.stringify(tools, null, 2)};\n\nexport const architectureCatalog = ${JSON.stringify(architecture, null, 2)};\n\nexport const commandCatalog = ${JSON.stringify(commands, null, 2)};\n`;
writeFileSync('src/generated-catalog.js', output);
console.log(`Generated ${tools.length} tools, ${architecture.length} architecture groups, and ${commands.length} commands.`);
