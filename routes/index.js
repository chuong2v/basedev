import _ from 'lodash'
import ApiRoutes from './../api/configs/routes'
import { Controllers } from './../core'
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
      if (ControllerClass) {
        let controllerObject = new ControllerClass(req, res);
        let action = controllerObject[route.action];
 console.log("action ", action);
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