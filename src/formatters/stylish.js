const _ = require('lodash')

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

module.exports = formatStylish