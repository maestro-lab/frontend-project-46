const { parseFile } = require('./parsers.js')
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

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(4 * depth - 2)
  const bracketIndent = ' '.repeat(4 * (depth - 1))
  
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'deleted':
        return `${indent}- ${item.key}: ${formatValue(item.value, depth + 1)}`
      case 'added':
        return `${indent}+ ${item.key}: ${formatValue(item.value, depth + 1)}`
      case 'changed':
        return `${indent}- ${item.key}: ${formatValue(item.oldValue, depth + 1)}\n${indent}+ ${item.key}: ${formatValue(item.newValue, depth + 1)}`
      case 'unchanged':
        return `${indent}  ${item.key}: ${formatValue(item.value, depth + 1)}`
      case 'nested':
        return `${indent}  ${item.key}: ${formatStylish(item.children, depth + 1)}`
      default:
        return ''
    }
  })
  
  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(4 * depth - 2)
    const bracketIndent = ' '.repeat(4 * (depth - 1))
    
    const lines = Object.entries(value).map(([key, val]) => {
      return `${indent}  ${key}: ${formatValue(val, depth + 1)}`
    })
    
    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  }
  
  if (value === null) return 'null'
  if (value === '') return ''
  return String(value)
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  
  if (format === 'stylish') {
    return formatStylish(diff)
  }
  
  return formatStylish(diff) // пока только stylish
}

module.exports = genDiff