import _ from 'lodash';

const findDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.flatMap((key) => {
    const diff = {key};
    if (!_.has(data2, key)) { // ключ есть в первом файле, но отсутствует во втором
      diff.value = data1[key];
      diff.state = 'removed'
    } else if (!_.has(data1, key)) { // ключ есть во втором файле, но отсутствует в первом
      diff.value = data2[key];
      diff.state = 'added';
    } else if (data1[key] === data2[key]) { // равны ключи и значения
      diff.value = data1[key];
      diff.state = 'unchanged';
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) { // есть вложенные объекты
      diff.value = findDiff(data1[key], data2[key]);
      diff.state = 'nested';
    } else { // ключи одинаковые, но значения разные
      diff.value = { oldValue: data1[key], newValue: data2[key] };
      diff.state = 'updated';
    }
    return diff;
  });

  return result;
};

export default findDiff;
