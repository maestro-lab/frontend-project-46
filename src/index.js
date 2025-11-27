import { parseFile } from './parsers.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  
  // Пока просто возвращаем информацию о файлах
  return `File1: ${JSON.stringify(data1, null, 2)}\nFile2: ${JSON.stringify(data2, null, 2)}\nFormat: ${format}`
}

export default genDiff