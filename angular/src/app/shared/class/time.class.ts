export class Time {
  public static toParam(value: number): string {
    const date = new Date(value);
    const utc = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON();
    return `?time=${utc}`;
  }
}
