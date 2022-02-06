import { APIEvent } from 'types/event';
import { Schedule } from 'types/schedule';

/**
 * Returns a interface with start and end date
 * @remarks
 * This function gives you the start and end dates from the Epitech API.
 * @param request An APIEvent object
 * @returns A structure containing two properties: start and end.
 * @example
 * const schedule = getSchedule(event);
 * console.log(schedule.start, schedule.end);
 */
export function getSchedule(request: APIEvent): Schedule {
  const splitted = (request.rdv_group_registered || request.rdv_indiv_registered)?.split('|');

  return {
    start: splitted ? new Date(splitted[0]) : new Date(request.start),
    end: splitted ? new Date(splitted[1]) : new Date(request.end),
  };
}
