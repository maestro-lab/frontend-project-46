const { readFileSync } = require('fs')
const path = require('path')
const genDiff = require('../src/index.js')

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  test('should compare flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expected = readFile('expected.txt')
    
    const result = genDiff(filepath1, filepath2)
    
    // Нормализуем пробелы для сравнения
    const normalizedResult = result.replace(/\s+/g, ' ').trim()
    const normalizedExpected = expected.replace(/\s+/g, ' ').trim()
    
    expect(normalizedResult).toEqual(normalizedExpected)
  })
})