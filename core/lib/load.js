import fs from 'fs'
import path from 'path'

export default function load(type) {
  let folderPath = path.resolve(__dirname, `./../../api/${type}`)
  let returnObject = {}
  let fileNames = fs.readdirSync(folderPath)
  fileNames.forEach(fileName => {
    let filePath = path.resolve(folderPath, fileName)
    returnObject[fileName.slice(0, -".js".length)] = require(filePath).default
  })
  return returnObject
}