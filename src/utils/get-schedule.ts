import { APIEvent } from 'types/event';
import { Schedule } from 'types/schedule';

export function getSchedule(request: APIEvent): Schedule {
  const splitted = (request.rdv_group_registered || request.rdv_indiv_registered)?.split('|');

  return {
    start: splitted ? new Date(splitted[0]) : new Date(request.start),
    end: splitted ? new Date(splitted[1]) : new Date(request.end),
  };
}
