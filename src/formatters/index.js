const stylish = require('./stylish.js')
const plain = require('./plain.js')

const formatters = {
  stylish,
  plain,
}

module.exports = (formatName) => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter
}