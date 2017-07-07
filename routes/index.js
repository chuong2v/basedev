import ApiRoutes from './../api/configs/routes'
import { Controllers } from 'basedev-core'
import Policies from './../api/policies'

export default (server) => {
  ApiRoutes.forEach(route => {
    if (Array.isArray(route.policies) && route.policies.length > 0) {
      route.policies.forEach(policy => server.use(Policies[policy]))
    } else if (Policies.all) {
      server.use(Policies[Policies.all])
    }

    server[route.method](route.url, (req, res) => {
      let ControllerClass = Controllers[route.controller];
      new ControllerClass(req, res)[route.action]()
    })
  })
}