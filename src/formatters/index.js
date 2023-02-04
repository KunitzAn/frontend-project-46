import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const makeFormatting = (diff, formatName) => {
  switch (formatName) {
    case 'json':
      return JSON.stringify(diff, null, '  ');
    case 'plain':
      return formatPlain(diff);
    case 'stylish':
      return formatStylish(diff);
    default:
      return formatStylish(diff);
  }
};

export default makeFormatting;
