import bootstrap from './lib/bootstrap'
import express from 'express'
import bodyParser from 'body-parser'
import middlewares from './middlewares'
import config from 'config'
import routes from './routes'

bootstrap()

const server = express()
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(...middlewares)

routes(server)

const port = config.get('port') || 1910
server.listen(port, function () {
  console.log('Server is listening at port %s', port);
});