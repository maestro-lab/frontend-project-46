const { parseFile } = require('./parsers.js')
const _ = require('lodash')

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy(_.union(keys1, keys2))
  
  const diff = allKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' }
    }
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' }
    }
    if (data1[key] !== data2[key]) {
      return { 
        key, 
        oldValue: data1[key], 
        newValue: data2[key], 
        type: 'changed' 
      }
    }
    return { key, value: data1[key], type: 'unchanged' }
  })
  
  return diff
}

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'deleted':
        return `  - ${item.key}: ${item.value}`
      case 'added':
        return `  + ${item.key}: ${item.value}`
      case 'changed':
        return `  - ${item.key}: ${item.oldValue}\n  + ${item.key}: ${item.newValue}`
      case 'unchanged':
        return `    ${item.key}: ${item.value}`
      default:
        return ''
    }
  })
  
  return `{\n${lines.join('\n')}\n}`
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  return formatDiff(diff)
}

module.exports = genDiff