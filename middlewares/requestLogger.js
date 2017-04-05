import logger from './../lib/log'

export default (req, res, next) => {
	logger.debug("Request::", req.method, req.url)
  next()
}