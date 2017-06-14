import BaseController from './BaseController'

export default class UserController extends BaseController {
  fetch() {
    this.log.info("this is result")
    this.ok({ "name": "peter" })
  }
  create() {
    this.ok({ "name": "chuong" })
  }
}