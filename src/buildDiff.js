import _ from 'lodash';

const findDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.flatMap((key) => {
    // ключ есть в первом файле, но отсутствует во втором
    if (!_.has(data2, key)) {
      return { 
        key, 
        value: data1[key], 
        state: 'removed' 
      };
    }
    // ключ есть во втором файле, но отсутствует в первом
    if (!_.has(data1, key)) {
      return { 
        key, 
        value: data2[key], 
        state: 'added' 
      };
    }
    // равны ключи и значения
    if (data1[key] === data2[key]) {
      return { 
        key, 
        value: data1[key], 
        state: 'unchanged' 
      };
    }
    // есть вложенные объекты
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { 
        key, 
        value: findDiff(data1[key], data2[key]), 
        state: 'nested' 
      };
    }
    // ключи одинаковые, но значения разные
    return { 
      key, 
      value: { oldValue: data1[key], newValue: data2[key] }, 
      state: 'updated' 
    };
  });

  return result;
};

export default findDiff;