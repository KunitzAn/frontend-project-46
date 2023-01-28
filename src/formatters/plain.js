import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (diff) => {

  const iter = (tree, key = '') => {
    const result = tree.flatMap((item) => {
      const newKeys = [...key, item.key];

      switch (item.state) {
        case 'removed':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'added':
          return `Property '${newKeys.join('.')}' was added with value: ${stringify(item.value)}`;
        case 'changed':
          return `Property '${newKeys.join('.')}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'nested':
          return iter(item.children, newKeys);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type ${item.type}`);
      }
    });

    return result.filter((item) => item !== null).join('\n');
  };

  return iter(diff, []);
};

export default formatPlain;