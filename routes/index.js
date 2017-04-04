import ApiRoutes from './../api/configs/routes'
import Controllers from './../api/controllers'
export default (server) => {
  ApiRoutes.forEach(route => {
    server[route.method](route.url, (req, res) => {
      Controllers[route.controller][route.action](req, res)
    })
  })
}