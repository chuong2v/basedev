import WinstonContext from 'winston-context'
import logger from './../../lib/log'
import Models from './../models'
import _ from 'lodash'
import Promise from 'bluebird'

export default class BaseController {
  constructor(req, res) {
    this.request = req
    this.response = res
    this.log = new WinstonContext(logger, '', {
      requestId: req.requestId
    })
    this.name = this.constructor.name || ''
    let modelName = this.name && this.name.slice(0, this.name.indexOf('Controller'))
    this.model = Models[modelName]
    _.extend(this, Models || {})
  }

  pagination(query = {}, select = {}, sort = {}, page = 0, size = 10) {
    this.log.debug(`[${this.name}][pagination] - query`, JSON.stringify(query))
    this.log.debug(`[${this.name}][pagination] - select`, JSON.stringify(select))
    this.log.debug(`[${this.name}][pagination] - sort`, JSON.stringify(sort))
    this.log.debug(`[${this.name}][pagination] - page`, page)
    this.log.debug(`[${this.name}][pagination] - size`, size)

    const from = page * size

    return Promise.all([
      this.model
        .find(query, select)
        .sort(sort)
        .skip(from)
        .limit(size),
      this.model.count(query)
    ]).spread((list, total) => {
      return { from, size, list, total }
    })
  }

  common() {
    return {
      doSomething: () => { }
    }
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