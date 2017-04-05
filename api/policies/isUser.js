import logger from './../../lib/log'

export default (req, res, next) => {
  logger.debug("isUser")
  next()
}