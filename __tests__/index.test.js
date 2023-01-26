import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);


test('file json', () => {
    const filename1 = getPath('file1.json');
    const filename2 = getPath('file2.json');
    const resultname = getPath('file_result.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(parser(filename1, filename2)).toBe(result);
});

test('file yml', () => {
    const filename1 = getPath('file1.yml');
    const filename2 = getPath('file2.yml');
    const resultname = getPath('file_result.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(parser(filename1, filename2)).toBe(result);
});
