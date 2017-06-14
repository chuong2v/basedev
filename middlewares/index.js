import requestLogger from './requestLogger' 
import validation from './validation' 
import cors from './cors'
import tracer from './tracer'

export default [
  cors,
	tracer,
	requestLogger,
	validation,
]