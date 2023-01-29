import formatStylish from './stylish.js';
import formatJson from './json.js';
import formatPlain from './plain.js';

const makeFormatting = (diff, formatName) => {
  switch (formatName) {
    case 'json':
      return formatJson(diff);
    case 'plain':
      return formatPlain(diff);
    case 'stylish':
      return formatStylish(diff);
    default:
      return formatStylish(diff);
  }
};

export default makeFormatting;
