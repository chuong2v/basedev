import WinstonContext from 'winston-context'
import logger from './../../lib/log'
import Models from './../models'

export default class BaseController {
  constructor(req, res) {
    this.request = req
    this.response = res
    this.log = new WinstonContext(logger, '', {
      requestId: req.requestId
    })
    let modelName = this.constructor.name || ''
    modelName = modelName && modelName.slice(0, modelName.indexOf('Controller'))
    this.model = Models[modelName]
  }

  find(query, select, sort, pagination) {
    return this.model && this.model.find(query, select)
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
    this.response.send(403, ex)
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

  handleAccepted(data) {
    this.response.send(202, data)
  }

  handleDeleted(data) {
    this.response.send(data && 200 || 204, data)
  }

  handleUpdated(data) {
    this.response.send(data && 200 || 204, data)
  }
}