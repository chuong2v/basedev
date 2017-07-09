import fs from 'fs'
import path from 'path'

let controllerPath = path.resolve(__dirname, './../api/controllers');
let controllers = {}
let fileNames = fs.readdirSync(controllerPath)
fileNames.forEach(fileName => {
  let filePath = path.resolve(controllerPath, fileName)
  controllers[fileName.slice(0, -".js".length)] = require(filePath).default
})

export default controllers