import bootstrap from './lib/bootstrap'
import restify from 'restify'
import middlewares from './middlewares'
import config from 'config'
import routes from './routes'

let server = restify.createServer({
  name: 'basedev',
  version: '1.0.0'
});
bootstrap();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(...middlewares)

routes(server)

server.listen(config.get('port') || 1910, function () {
  console.log('%s listening at %s', server.name, server.url);
});