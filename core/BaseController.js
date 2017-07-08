import WinstonContext from 'winston-context'
import logger from './../lib/log'
import Models from './models'
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
    let modelName = this.name && this.name.slice(0, -"Controller".length)
    this.model = this.model || Models[modelName]
    if (!this.helper) {
      try {
        this.helper = require(`${this.name}.helper`)
      } catch (e) {
        this.log.warn(`[${this.name}] - has no controller helper`, e.toString())
      }
    }
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
    this.response.status(500).send(ex)
  }

  badRequest(ex) {
    this.response.status(400).send(ex)
  }

  unauthorized(ex) {
    this.response.status(401).send(ex)
  }

  forbidden(ex) {
    this.response.status(403).send(ex)
  }

  notFound(ex) {
    this.response.status(404).send(ex)
  }

  ok(data) {
    this.response.status(200).send(data)
  }

  handleCreated(data) {
    this.response.status(201).send(data)
  }

  handleAccepted(data) {
    this.response.status(202).send(data)
  }

  handleDeleted(data) {
    this.response.status(data && 200 || 204).send(data)
  }

  handleUpdated(data) {
    this.response.status(data && 200 || 204).send(data)
  }
}