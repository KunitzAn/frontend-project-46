import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (diff, kyesAcc = []) => {
  const changedDiff = diff.filter((item) => item.state !== 'unchanged');

  const result = changedDiff.map((item) => {
    const curKeys = kyesAcc.concat(item.key);

    switch (item.state) {
      case 'added': {
        const value = stringify(item.value);
        return `Property '${curKeys.join('.')}' was added with value: ${value}`; }

      case 'removed':
        return `Property '${curKeys.join('.')}' was removed`;

      case 'updated': {
        const oldValue = stringify(item.value.oldValue);
        const newValue = stringify(item.value.newValue);
        return `Property '${curKeys.join('.')}' was updated. From ${oldValue} to ${newValue}`; }

      default:
        return formatPlain(item.value, curKeys);
    }

  });

  return result.join('\n');
};

export default formatPlain;

