import { APIEvent } from './types/event';
import { getDateFormat } from './utils/date';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import ical from 'ical-generator';
import { RouteGenericInterface } from 'fastify/types/route';
import { getSchedule } from './utils/get-schedule';

interface Params extends RouteGenericInterface {
  Params: {
    autologin: string;
  }
}

export async function request(request: FastifyRequest<Params>, reply: FastifyReply) {
  const start: string = getDateFormat(-30);
  const end: string = getDateFormat(30);
  const calendar = ical({ name: 'Epitech Calendar' });

  try {
    const { data }: AxiosResponse<APIEvent[]> = await axios.get(`${request.params.autologin}/planning/load`, {
      baseURL: "https://intra.epitech.eu",
      params: {
        format: 'json',
        start,
        end
      }
    });
    const registered: APIEvent[] = data.filter((e: APIEvent) => e.event_registered === "registered" || e.event_registered === "present");
    registered.forEach((e: APIEvent): void => {
      const schedule = getSchedule(e);
      calendar.createEvent({
        start: schedule.start,
        end: schedule.end,
        url: e.acti_title ? `https://intra.epitech.eu/module/${e.scolaryear}/${e.codemodule}/${e.codeinstance}/${e.codeacti}/` : null,
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
