import { APIEvent } from './types/event';
import { getDateFormat } from './utils/date';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import ical from 'ical-generator';
import { RouteGenericInterface } from 'fastify/types/route';

interface Params extends RouteGenericInterface {
  Params: {
    autologin: string;
  }
}

export async function request(request: FastifyRequest<Params>, reply: FastifyReply) {
  const { autologin } = request.params;
  const start: string = getDateFormat(-21);
  const end: string = getDateFormat(21);
  const calendar = ical({ name: 'Epitech Calendar' });
  const { INTRA_AUTOLOGIN, INTRA_BASE_URL } = process.env;

  try {
    const { data }: AxiosResponse<APIEvent[]> = await axios.get(`${autologin}/planning/load`, {
      baseURL: INTRA_BASE_URL,
      params: {
        format: 'json',
        start,
        end
      }
    });
    const registered: APIEvent[] = data.filter((e: APIEvent) => e.event_registered === "registered" || e.event_registered === "present");
    registered.forEach((e: APIEvent): void => {
      console.log(e);
      calendar.createEvent({
        start: new Date(e.start),
        end: new Date(e.end),
        url: e.acti_title ? `${INTRA_BASE_URL}/module/${e.scolaryear}/${e.codemodule}/${e.codeinstance}/${e.codeacti}/` : null,
        summary: e.acti_title || e.title,
        description: e.description || `${e.codemodule} » ${e.titlemodule}\nSemestre ${e.semester}`,
      });
    });
    reply.send(calendar.toString());
  } catch (e: unknown) {
    console.error(e as AxiosError);
    reply.code(404);
    return new Error('Invalid user autologin.');
  }
}
