import uuid from 'uuid'

export default (req, res, next) => {
	req.requestId = req.headers['x-request-id'] || uuid()
  next()
}