import requestLogger from './requestLogger' 
import cors from './cors'
import tracer from './tracer'

export default [
  cors,
	tracer,
	requestLogger,
]