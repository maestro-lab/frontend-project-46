const { readFileSync } = require('fs')
const path = require('path')

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = readFileSync(absolutePath, 'utf-8')
  return content
}

const parseFile = (filepath) => {
  const content = getFileContent(filepath)
  const extension = path.extname(filepath).toLowerCase()
  
  switch (extension) {
    case '.json':
      return JSON.parse(content)
    default:
      throw new Error(`Unsupported file format: ${extension}`)
  }
}

module.exports = { parseFile, getFileContent }