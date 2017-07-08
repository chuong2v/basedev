import { BaseController } from './../../core'

export default class UserController extends BaseController {
  fetch() {
    this.pagination().then(users => {
      this.ok(users)
    })
  }
}