import type { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify';
import { request } from '../request';

export default async function (app: FastifyInstance, _opts: FastifyServerOptions): Promise<void> {
  app.get('/events/:autologin', request);
};
