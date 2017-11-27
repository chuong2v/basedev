import { BaseController } from './../../core'

export default class UserController extends BaseController {
  fetch() {
    this.paginate({}, {}, {}, this.request.query.page).then(users => {
      this.ok(users)
    })
  }
}