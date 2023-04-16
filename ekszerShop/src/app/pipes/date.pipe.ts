import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: number, ...args: unknown[]): string {
    let tzoffset = (new Date(date)).getTimezoneOffset() * 60000;
    let minOffSet = new Date(date).getTime() - tzoffset
    let localISOTime = (new Date(minOffSet)).toISOString().replace('Z', '').replace('T', ' ').substring(0,16);
    return localISOTime;
  }
}
