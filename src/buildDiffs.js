import _ from 'lodash';

const diff = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2);
    keys.sort();
   const result = [];
   result.push('{');
   keys.map((key) => {
    // если равны ключи и значения
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        result.push(`    ${key}: ${data1[key]}`);
      }
    }
    // если ключи равны, но значения разные
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        result.push(`  - ${key}: ${data1[key]}`);
        result.push(`  + ${key}: ${data2[key]}`);
      }
    }
    // если ключ есть в первом файле но отсутствует во втором
    if (_.has(data1, key) && !_.has(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}`);
    }
    // если ключ есть во втором файле но отсутствует в первом
    if (!_.has(data1, key) && _.has(data2, key)) {
      result.push(`  + ${key}: ${data2[key]}`);
    }
  });
  result.push('}');
  return result.join('\n');
}

export default diff;