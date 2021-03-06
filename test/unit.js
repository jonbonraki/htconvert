import test from 'ava';

import { readFileSync } from 'fs';
import { exec } from 'child-process-promise';
import htconvert from '../dist/htconvert';

const inputPath = './fixtures/input';
const input = readFileSync(inputPath, 'utf-8');
const output = readFileSync('./fixtures/output', 'utf-8');

test('htconvert should export a function', t => {
  t.is(typeof htconvert, 'function');
});

test('htconvert should match input with output', t => {
  t.is(htconvert(input), output);
});

test('cli input with -f arg', t => {
  return exec(`node ../dist/cli.js -f ${inputPath}`).then(result => {
    t.is(result.stdout, output+'\n');
  });
});

test('cli input with --file arg', t => {
  return exec(`node ../dist/cli.js --file ${inputPath}`).then(result => {
    t.is(result.stdout, output+'\n');
  });
});

test('cli input from stdin', t => {
  return exec(`echo "${input}" | node ../dist/cli.js`).then(result => {
    t.is(result.stdout, output+'\n\n');
  });
});
