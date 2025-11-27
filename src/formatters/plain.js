const _ = require('lodash')

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((item) => {
    const currentPath = path ? `${path}.${item.key}` : item.key
    
    switch (item.type) {
      case 'deleted':
        return `Property '${currentPath}' was removed`
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(item.value)}`
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`
      case 'nested':
        return formatPlain(item.children, currentPath)
      case 'unchanged':
        return []
      default:
        return []
    }
  })
  
  return lines.filter(line => line !== '').join('\n')
}

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  if (value === null) {
    return 'null'
  }
  return String(value)
}

module.exports = formatPlain