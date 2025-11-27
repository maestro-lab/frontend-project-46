const { parseFile } = require('./parsers.js')
const getFormatter = require('./formatters/index.js')
const _ = require('lodash')

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy(_.union(keys1, keys2))
  
  const diff = allKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]
    
    if (!_.has(data2, key)) {
      return { key, value: value1, type: 'deleted' }
    }
    if (!_.has(data1, key)) {
      return { key, value: value2, type: 'added' }
    }
    
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { 
        key, 
        children: buildDiff(value1, value2), 
        type: 'nested' 
      }
    }
    
    if (!_.isEqual(value1, value2)) {
      return { 
        key, 
        oldValue: value1, 
        newValue: value2, 
        type: 'changed' 
      }
    }
    
    return { key, value: value1, type: 'unchanged' }
  })
  
  return diff
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  const formatter = getFormatter(format)
  
  return formatter(diff)
}

module.exports = genDiff