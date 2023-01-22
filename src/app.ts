import fastify from 'fastify';
import AutoLoad from 'fastify-autoload';
import logger from './config/logger';
import { join } from 'path';

const app = fastify({
  logger,
  maxParamLength: 200
});

// Routes
app.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  dirNameRoutePrefix: false,
});

app.listen(Number(process.env.PORT), '0.0.0.0', (err) => {
  if (err)
    console.log("An error has occured.", err);
});
