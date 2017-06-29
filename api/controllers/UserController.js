import BaseController from './BaseController'

export default class UserController extends BaseController {
  fetch() {
    this.User.pagination().then(users => {
      users.list = users.list.map(user => {
        return user.toJSON()
      })
      this.ok(users)
    })
  }
}