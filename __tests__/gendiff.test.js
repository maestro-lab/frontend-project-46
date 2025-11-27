const { readFileSync } = require('fs')
const path = require('path')
const genDiff = require('../src/index.js')

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  // ... предыдущие тесты ...

  test('should format diff in plain format for nested JSON', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')
    const expected = readFile('plain_expected.txt')
    
    const result = genDiff(filepath1, filepath2, 'plain')
    
    // Нормализуем строки для сравнения
    const normalizedResult = result.split('\n').map(line => line.trim()).filter(line => line).join('\n')
    const normalizedExpected = expected.split('\n').map(line => line.trim()).filter(line => line).join('\n')
    
    expect(normalizedResult).toEqual(normalizedExpected)
  })

  test('should format diff in plain format for nested YAML', () => {
    const filepath1 = getFixturePath('nested1.yml')
    const filepath2 = getFixturePath('nested2.yml')
    const expected = readFile('plain_expected.txt')
    
    const result = genDiff(filepath1, filepath2, 'plain')
    
    // Нормализуем строки для сравнения
    const normalizedResult = result.split('\n').map(line => line.trim()).filter(line => line).join('\n')
    const normalizedExpected = expected.split('\n').map(line => line.trim()).filter(line => line).join('\n')
    
    expect(normalizedResult).toEqual(normalizedExpected)
  })
})