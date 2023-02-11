import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const cases = [
  ['file1.json', 'file2.json', 'stylish_result.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'stylish_result.txt', 'stylish'],
  ['file1.json', 'file2.json', 'plain_result.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'plain_result.txt', 'plain'],
  ['file1.json', 'file2.json', 'json_result.txt', 'json'],
  ['file1.yml', 'file2.yml', 'json_result.txt', 'json'],
];

test.each(cases)('Compare %s and %s to expect %s in %s format', (fileName1, fileName2, resultFileName, format) => {
  const filePath1 = getPath(fileName1);
  const filePath2 = getPath(fileName2);
  const expectedResultPath = getPath(resultFileName);
  const expectedResult = readFileSync(expectedResultPath, 'utf8');
  expect(genDiff(filePath1, filePath2, format)).toBe(expectedResult);
});

const cases2 = [
  ['file1.json', 'file2.json', 'stylish_result.txt'],
  ['file1.yml', 'file2.yml', 'stylish_result.txt'],
];

test.each(cases2)('Compare %s and %s to expect %s in default format', (fileName1, fileName2, resultFileName) => {
  const filePath1 = getPath(fileName1);
  const filePath2 = getPath(fileName2);
  const expectedResultPath = getPath(resultFileName);
  const expectedResult = readFileSync(expectedResultPath, 'utf8');
  expect(genDiff(filePath1, filePath2)).toBe(expectedResult);
});
