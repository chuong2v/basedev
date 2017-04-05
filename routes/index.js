import ApiRoutes from './../api/configs/routes'
import Controllers from './../api/controllers'
import Policies from './../api/policies'

export default (server) => {
  ApiRoutes.forEach(route => {
    if (Array.isArray(route.policies) && route.policies.length > 0)
      route.policies.forEach(policy => server.use(Policies[policy]))

    server[route.method](route.url, (req, res) => {
      Controllers[route.controller][route.action](req, res)
    })
  })
}