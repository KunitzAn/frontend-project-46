import { readFileSync } from 'fs';
import path from 'path';
import makeFormatting from './formatters/index.js';
import parse from './parsers.js';
import findDiff from './buildDiff.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getFileFormat = (filename) => filename.split('.')[1];
const readFile = (filepath) => readFileSync(filepath, 'utf8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const data1 = parse(readFile(path1), getFileFormat(filepath1));
  const data2 = parse(readFile(path2), getFileFormat(filepath2));
  const diff = findDiff(data1, data2);

  const formattedDiff = makeFormatting(diff, formatName);
  return formattedDiff;
};
export default genDiff;
