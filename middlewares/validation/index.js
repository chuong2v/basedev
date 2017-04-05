import logger from './../../lib/log'
import Joi from 'joi'

export default (req, res, next) => {
  logger.debug("Validation")
  next()
}