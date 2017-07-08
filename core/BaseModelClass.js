import Promise from 'bluebird'

class BaseModelClass {
  static pagination(query = {}, page = 1, size = 10, select = {}, sort = {}) {
    let from = (page - 1) * size
    return Promise.all([
      this.find(query, select).sort(sort).skip(from).limit(size),
      this.count(query)
    ]).spread((list, total) => ({ total, from, size, list }))
  }
}

export default BaseModelClass