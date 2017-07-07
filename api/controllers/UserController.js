import { BaseController } from './../../core'

export default class UserController extends BaseController {
  fetch() {
    this.User.pagination().then(users => {
      this.ok(users)
    })
  }
}