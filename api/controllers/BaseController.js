import logger from './../lib/log'

export default class BaseController {
  constructor(req, res) {
    this.request = req
    this.response = res
    this.log = logger
  }
}