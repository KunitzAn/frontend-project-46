import _ from 'lodash';

const shiftLine = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const shiftBracket = (depth) => `${' '.repeat(4).repeat(depth)}`;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => `${shiftLine(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  return `{\n${items.join('\n')}\n${shiftBracket(depth)}}`;
};

const makeStylish = (diff, depth) => {
  const items = diff.flatMap(({ key, value, state }) => {
    const signs = { added: '+ ', removed: '- ', unchanged: '  ' };

    switch (state) {
      case 'updated': {
        const curOldValue = stringify(value.oldValue, depth + 1);
        const curNewValue = stringify(value.newValue, depth + 1);

        return [`${shiftLine(depth + 1)}${signs.removed}${key}: ${curOldValue}`,
        `${shiftLine(depth + 1)}${signs.added}${key}: ${curNewValue}`];
      }

      case 'nested': {
        const curValue = makeStylish(value, depth + 1);
        return `${shiftLine(depth + 1)}${signs.unchanged}${key}: ${curValue}`;
      }

      case 'added':
      case 'removed':
      case 'unchanged':
        return `${shiftLine(depth + 1)}${signs[state]}${key}: ${stringify(value, depth + 1)}`;

      default:
        throw new Error(`Unknown type ${state}`);

    }
  });

  return `{\n${items.join('\n')}\n${shiftBracket(depth)}}`;
};

const formatStylish = (diff) => makeStylish(diff, 0);

export default formatStylish;
