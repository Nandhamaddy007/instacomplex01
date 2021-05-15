import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args == 'size') return value != null ? value.split('-')[0] : null;
    return value != null ? value.split('-')[1] : null;
  }
}
