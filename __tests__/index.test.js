import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
    const filename1 = getPath('file1.json');
    const filename2 = getPath('file2.json');
    const resultname = getPath('file_result.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(parser(filename1, filename2)).toBe(result);
});

test('yml', () => {
    const filename1 = getPath('file1.yml');
    const filename2 = getPath('file2.yml');
    const resultname = getPath('file_result.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(parser(filename1, filename2)).toBe(result);
});
