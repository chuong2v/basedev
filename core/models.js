import fs from 'fs'
import path from 'path'

let modelPath = path.resolve(__dirname, './../api/models');
let models = {}
let fileNames = fs.readdirSync(modelPath)
fileNames.forEach(fileName => {
  let filePath = path.resolve(modelPath, fileName)
  models[fileName.slice(0, -3)] = require(filePath).default
})

export default models