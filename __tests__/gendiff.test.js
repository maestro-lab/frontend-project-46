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
    expect(result.replace(/\s+/g, ' ').trim()).toEqual(expected.replace(/\s+/g, ' ').trim())
  })

  test('should compare flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    const expected = readFile('expected.txt')
    
    const result = genDiff(filepath1, filepath2)
    expect(result.replace(/\s+/g, ' ').trim()).toEqual(expected.replace(/\s+/g, ' ').trim())
  })

  test('should compare mixed JSON and YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.yml')
    const expected = readFile('expected.txt')
    
    const result = genDiff(filepath1, filepath2)
    expect(result.replace(/\s+/g, ' ').trim()).toEqual(expected.replace(/\s+/g, ' ').trim())
  })
})