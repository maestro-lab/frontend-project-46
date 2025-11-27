const { readFileSync } = require('fs')
const path = require('path')
const genDiff = require('../src/index.js')

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  // ... предыдущие тесты для плоских файлов ...

  test('should compare nested JSON files correctly', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')
    const expected = readFile('nested_expected.txt')
    
    const result = genDiff(filepath1, filepath2)
    expect(result.replace(/\s+/g, ' ').trim()).toEqual(expected.replace(/\s+/g, ' ').trim())
  })

  test('should compare nested YAML files correctly', () => {
    const filepath1 = getFixturePath('nested1.yml')
    const filepath2 = getFixturePath('nested2.yml')
    const expected = readFile('nested_expected.txt')
    
    const result = genDiff(filepath1, filepath2)
    expect(result.replace(/\s+/g, ' ').trim()).toEqual(expected.replace(/\s+/g, ' ').trim())
  })
})