import BaseController from './BaseController'

export default class UserController extends BaseController {
  fetch() {
    this.response.send({ "name": "peter" })
  }
  create() {
    this.response.send({ "name": "chuong" })
  }
}