import logger from './../../lib/log'
import WinstonContext from 'winston-context'

export default class BaseController {
  constructor(req, res) {
    this.request = req
    this.response = res
    this.log = new WinstonContext(logger, '', {
      requestId: req.requestId
    })
  }

  serverError(ex) {
    this.response.send(500, ex)
  }

  badRequest(ex) {
    this.response.send(400, ex)
  }

  unauthorized(ex) {
    this.response.send(401, ex)
  }

  forbidden(ex) {
    this.response.send(401, ex)
  }

  notFound(ex) {
    this.response.send(404, ex)
  }

  ok(data) {
    this.response.send(200, data)
  }

  handleCreated(data) {
    this.response.send(201, data)
  }

  handleUpdated(data) {
    this.response.send(202, data)
  }
}