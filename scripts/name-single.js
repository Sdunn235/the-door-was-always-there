// Renames the single-file build so the file the teacher receives has a clear name.
// Runs after `vite build --mode single` (see package.json "build:single").
import { existsSync, renameSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const outDir = fileURLToPath(new URL('../dist-single/', import.meta.url));
const from = outDir + 'index.html';
const to = outDir + 'strength-to-speak.html';

if (!existsSync(from)) {
    console.error('name-single: expected ' + from + ' — did the single-file build run?');
    process.exit(1);
}

renameSync(from, to);
console.log('Single-file build ready: dist-single/strength-to-speak.html');
