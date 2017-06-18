import BaseController from './BaseController'

export default class UserController extends BaseController {
  fetch() {
    this.log.info("this is result")
    this.User.find().then(users=>{
      this.ok({ users })
    })
  }
  create() {
    this.ok({ "name": "chuong" })
  }
}