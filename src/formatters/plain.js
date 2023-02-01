import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (diff, keysAcc = []) => {
  const changedDiff = diff.filter((item) => item.state !== 'unchanged');

  const result = changedDiff.map((item) => {
    const curKeys = keysAcc.concat(item.key);
    const buildPropertyPath = (keys) => keys.join('.');

    switch (item.state) {
      case 'added': {
        const value = stringify(item.value);
        return `Property '${buildPropertyPath(curKeys)}' was added with value: ${value}`; }

      case 'removed':
        return `Property '${buildPropertyPath(curKeys)}' was removed`;

      case 'updated': {
        const oldValue = stringify(item.value.oldValue);
        const newValue = stringify(item.value.newValue);
        return `Property '${buildPropertyPath(curKeys)}' was updated. From ${oldValue} to ${newValue}`; }

      case 'nested': {
        return formatPlain(item.value, curKeys);
      }

      default:
        throw new Error(`Unknown type ${item.state}`);
    }
  });

  return result.join('\n');
};

export default formatPlain;
