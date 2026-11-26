import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Geometry and content boundaries can be checked without launching a browser.
// Interaction/focus/appearance remain covered by browser review.
const temporary = mkdtempSync(join(tmpdir(), 'tony-explorer-check-'));
try {
  execFileSync(resolve('node_modules/.bin/tsc'), ['src/explorer/model.ts', '--outDir', temporary, '--module', 'esnext', '--moduleResolution', 'bundler', '--target', 'ES2022', '--skipLibCheck', '--ignoreConfig'], { stdio: 'inherit' });
  writeFileSync(join(temporary, 'package.json'), '{"type":"module"}');
  const compiledModel = join(temporary, 'explorer/model.js');
  // The production bundler resolves extensionless imports. Node's test loader
  // needs the emitted extension; keep source logic unchanged.
  writeFileSync(compiledModel, readFileSync(compiledModel, 'utf8').replace('"../content/profile"', '"../content/profile.js"'));
  const { apps, makeWindow, fitWindow, publicProjects, projectId } = await import(pathToFileURL(compiledModel));
  assert.equal(new Set(publicProjects.map(projectId)).size, publicProjects.length, 'Public project routes must be unique');
  assert(publicProjects.every(project => project.status !== 'local-private' && /^https:\/\//.test(project.link?.href ?? '')), 'Every Explorer project must have an existing public destination');
  const viewports = [{ width: 320, height: 360 }, { width: 375, height: 670 }, { width: 768, height: 884 }, { width: 1440, height: 760 }];
  let checked = 0;
  for (const bounds of viewports) for (const app of apps) {
    const initial = makeWindow(app.id, bounds, checked++);
    const assertFits = item => {
      assert(item.x >= 0 && item.y >= 0, 'Title bar must not escape the top or left edge');
      assert(item.x + item.width <= bounds.width && item.y + item.height <= bounds.height, 'Close/resize controls must stay in the desktop');
      assert(item.width >= 280 && item.height >= 240, 'Window must retain a readable minimum area');
    };
    assertFits(initial);
    for (const x of [-2000, 0, 4000]) for (const y of [-2000, 0, 4000]) {
      assertFits(fitWindow({ ...initial, x, y, width: 2000, height: 1700 }, bounds));
    }
  }
  const html = readFileSync('dist/index.html', 'utf8');
  for (const text of ['Tony <em>Wu.</em>', 'P.Eng (ON, BC), MIRSE, PMP, CSEP', 'Project source and credits', 'id="world-atlas"', 'id="playground"', 'view=explorer']) assert(html.includes(text), `Prerender must preserve ${text}`);
  assert(!html.includes('dist/server'), 'Server output is not a public asset');
  console.log(`Explorer checks passed: ${publicProjects.length} existing public project routes, ${checked * 10} viewport/drag/resize bounds, prerendered identity and credits.`);
} finally { rmSync(temporary, { recursive: true, force: true }); }
