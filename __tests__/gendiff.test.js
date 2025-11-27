const { readFileSync } = require('fs')
const path = require('path')
const genDiff = require('../src/index.js')

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  // ... предыдущие тесты ...

  test('should format diff in json format for nested JSON', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')
    
    const result = genDiff(filepath1, filepath2, 'json')
    
    // Проверяем что результат является валидным JSON
    expect(() => JSON.parse(result)).not.toThrow()
    
    // Проверяем структуру JSON
    const parsedResult = JSON.parse(result)
    expect(Array.isArray(parsedResult)).toBe(true)
    
    // Проверяем что есть хотя бы один элемент с ожидаемыми полями
    expect(parsedResult.length).toBeGreaterThan(0)
    expect(parsedResult[0]).toHaveProperty('key')
    expect(parsedResult[0]).toHaveProperty('type')
  })

  test('should format diff in json format for nested YAML', () => {
    const filepath1 = getFixturePath('nested1.yml')
    const filepath2 = getFixturePath('nested2.yml')
    
    const result = genDiff(filepath1, filepath2, 'json')
    
    // Проверяем что результат является валидным JSON
    expect(() => JSON.parse(result)).not.toThrow()
    
    // Проверяем структуру JSON
    const parsedResult = JSON.parse(result)
    expect(Array.isArray(parsedResult)).toBe(true)
    
    // Проверяем что есть хотя бы один элемент с ожидаемыми полями
    expect(parsedResult.length).toBeGreaterThan(0)
    expect(parsedResult[0]).toHaveProperty('key')
    expect(parsedResult[0]).toHaveProperty('type')
  })
})