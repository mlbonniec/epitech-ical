export function getDateFormat(shift: number): string {
    const date = new Date();

    date.setDate(date.getDate() + shift);
    return date.toISOString().slice(0, 10);
}
