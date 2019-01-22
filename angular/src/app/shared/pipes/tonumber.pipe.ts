import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: any, arg: any = 1000): string {
    if (value == null)
      return "Н/Д";
    else
      return Number(value / arg).toFixed(2);
  }

}
