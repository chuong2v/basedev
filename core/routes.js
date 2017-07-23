import _ from 'lodash'
import Controllers from './controllers'
import Policies from './policies'
import routes from './../api/routes'

let transformedRoutes = routes.map(route => {
  let list = route.trim().split(' ').filter(item => item);
  return {
    method: list[0].trim(),
    url: list[1].trim(),
    controller: list[2].trim(),
    action: list[3].trim(),
    policies: (list[4] || "").split(',').map(item => item.trim())
  }
})

export default (server) => {
  transformedRoutes.forEach(route => {
    if (Array.isArray(route.policies) && route.policies.length > 0) {
      route.policies.forEach(policy => server.use(Policies[policy]))
    } else if (Policies.default) {
      server.use(Policies[Policies.default])
    }

    server[route.method](route.url, (req, res) => {
      let ControllerClass = Controllers[route.controller];
      if (ControllerClass) {
        let controllerObject = new ControllerClass(req, res);
        let action = controllerObject[route.action];
        if (_.isFunction(action)) {
          action.call(controllerObject);
        } else {
          res.send({ error: "Action not found." })
        }
      } else {
        res.send({ error: "Action not found." })
      }
    })
  })
}