import BaseController from './BaseController'

export default class UserController extends BaseController {
  fetch() {
    console.log("herer")
    this.pagination().then(users => {
      this.ok(users)
    })
  }
  create() {
    this.ok({ "name": "chuong" })
  }
}